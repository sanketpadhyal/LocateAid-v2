const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const GEOAPIFY_KEY = "";
const ADMIN_PASSWORD = ""; // Hardcoded password

// 🔐 Telegram credentials
const TELEGRAM_BOT_TOKEN = "";
const TELEGRAM_CHAT_ID = "";

// 🔐 OpenRouter API Key
const OPENROUTER_API_KEY =
  "sk-or
  "";

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve admin.html and other frontend files

// 🔔 Telegram log helpers
const sendTelegramMessage = async (message) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      },
    );
  } catch (err) {
    console.error("Telegram message failed:", err.message);
  }
};

const sendLoginLog = async (adminPassword) => {
  const message = `🔐 *Admin Logged In*\n🔑 Password: ${adminPassword}\n🕒 ${new Date().toLocaleString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
    },
  )}`;
  await sendTelegramMessage(message);
};

const sendCityLog = async (city, count, adminName, services) => {
  const formattedServices = services
    .map((s) => {
      const name = s.name || "Unnamed";
      const type = s.type || "Unknown";
      const address = s.address || "No address";
      const lat = s.lat || "N/A";
      const lng = s.lng || "N/A";
      return `• ${name} (${type})\n  📍 ${address}\n  🧭 [${lat}, ${lng}]`;
    })
    .join("\n\n");

  const rawJson = JSON.stringify(services, null, 2);

  const message = `🛠️ *New City Update*\n📍 City: ${city}\n➕ Services Added: ${count}\n👤 By: ${adminName}\n🕒 ${new Date().toLocaleString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
    },
  )}\n\n📋 *Details:*\n${formattedServices}\n\n🧾 *Raw JSON:*\n\`\`\`\n${rawJson}\n\`\`\``;

  await sendTelegramMessage(message);
};

app.get("/api/getEmergency", async (req, res) => {
  const city = req.query.city?.toLowerCase();
  let lat = req.query.lat;
  let lng = req.query.lng;

  let localData = [];
  let apiResults = [];

  // 1️⃣ Check local JSON first
  if (city) {
    const filePath = path.join(__dirname, `${city}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) localData = parsed;
      } catch (e) {
        console.error("Error reading local city data:", e.message);
      }
    }
  }

  // 2️⃣ If coordinates missing, fetch via city
  if (!lat || !lng) {
    if (city) {
      try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`;
        const nomRes = await axios.get(nominatimUrl, {
          headers: { "User-Agent": "LocateAid/1.0" },
        });
        if (nomRes.data.length > 0) {
          lat = nomRes.data[0].lat;
          lng = nomRes.data[0].lon;
        }
      } catch (err) {
        console.error("Failed to fetch city coordinates:", err.message);
      }
    }
  }

  // 3️⃣ Fetch from Geoapify API if coordinates available
  if (lat && lng) {
    const radius = 5000;
    const categories = [
      "service.fire_station",
      "healthcare.hospital",
      "service.police",
    ].join(",");
    const apiUrl = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lng},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const features = response.data.features;

      apiResults = features.map((f) => ({
        name: f.properties.name || "Unnamed",
        type: f.properties.categories?.[0] || "Emergency",
        address: f.properties.formatted || "No address",
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      }));
    } catch (err) {
      console.error("Geoapify API failed:", err.message);
    }
  }

  // 4️⃣ Merge results
  let mergedResults = [];
  let source = "none";

  if (localData.length > 0 && apiResults.length > 0) {
    // Merge both
    mergedResults = [...localData, ...apiResults];
    source = "merged";
  } else if (localData.length > 0) {
    mergedResults = localData;
    source = "local";
  } else if (apiResults.length > 0) {
    mergedResults = apiResults;
    source = "api";
  }

  return res.json({ source, places: mergedResults });
});

// ✅ Admin login + Telegram log
app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: "Password required." });

  if (password === ADMIN_PASSWORD) {
    await sendLoginLog(password);
    return res.json({ success: true });
  } else {
    return res.status(401).json({ error: "Wrong password." });
  }
});

// ✅ Admin: Add or append city data + Telegram log
app.post("/api/admin/addCity", async (req, res) => {
  const { city, data, password } = req.body;
  const adminName = "sanket";

  if (!city || !Array.isArray(data)) {
    return res.status(400).json({ error: "City and valid data required." });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const filePath = path.join(__dirname, `${city.toLowerCase()}.json`);
  let existingData = [];

  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      existingData = JSON.parse(raw);
      if (!Array.isArray(existingData)) existingData = [];
    } catch (e) {
      console.error("Error reading existing data:", e.message);
    }
  }

  const merged = [...existingData, ...data];
  try {
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
    await sendCityLog(city, data.length, adminName, data);
    return res.json({
      success: true,
      message: `City '${city}' updated with ${data.length} service(s).`,
    });
  } catch (e) {
    return res.status(500).json({ error: "Failed to save city data." });
  }
});

// ✅ AI Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, user_chat_id } = req.body;
    if (!message) return res.status(400).json({ error: "Message required." });

    // Check for developer question first
    const devKeywords = [
      "who made you",
      "who is your developer",
      "who programmed you",
    ];
    let botReply = "";
    if (devKeywords.some((kw) => message.toLowerCase().includes(kw))) {
      botReply =
        "I was developed by Sanket Padhyal, a passionate web developer.";
    } else {
      // Get AI response from OpenRouter
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          temperature: 0.0, // strict adherence
          messages: [
            {
              role: "system",
              content: `
You are AI Medi Help Assistant. Provide safe, concise, professional first-aid and emergency medical guidance. Avoid giving prescriptions or casual conversation.
Do NOT mention OpenAI or any other developers or teams.
You are female ai medi assistant.
Don't do timepass.
              `,
            },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      botReply =
        response.data.choices?.[0]?.message?.content ||
        "⚠️ Sorry, I couldn’t process that.";
    }

    // Log query + reply in Telegram (single message)
    await sendTelegramMessage(
      `💬 *AI Query Received*\nUser ID: ${user_chat_id}\nMessage: ${message}\nReply: ${botReply}`,
    );

    return res.json({ reply: botReply });
  } catch (err) {
    console.error("Chat API error:", err.response?.data || err.message);
    return res.status(500).json({ error: "AI service unavailable." });
  }
});

// ✅ Bot Webhook to handle user messages
app.post("/api/bot-webhook", async (req, res) => {
  const { message } = req.body;
  if (!message || !message.from) return res.sendStatus(200);

  const userId = message.from.id;
  const text = message.text;

  try {
    // Developer question check
    const devKeywords = [
      "who made you",
      "who is your developer",
      "who programmed you",
    ];
    let botReply = "";
    if (devKeywords.some((kw) => text.toLowerCase().includes(kw))) {
      botReply =
        "I was developed by Sanket Padhyal, a passionate web developer.";
    } else {
      // Get AI response
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          temperature: 0.0, // strict adherence
          messages: [
            {
              role: "system",
              content: `
You are AI Medi Help Assistant. Provide safe, concise, professional first-aid and emergency medical guidance. Avoid giving prescriptions or casual conversation.
Do NOT mention OpenAI or any other developers or teams.
              `,
            },
            { role: "user", content: text },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      botReply =
        response.data.choices?.[0]?.message?.content ||
        "⚠️ Sorry, I couldn’t process that.";
    }

    // Send AI reply to user
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { chat_id: userId, text: botReply },
    );

    // Log in admin channel
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: `💬 *AI Query Received*\nMessage: ${text}\nReply: ${botReply}`,
        parse_mode: "Markdown",
      },
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("LocateAid 🚑 backend is live.");
});

// 🚀 Send Telegram log when server starts
const sendServerLiveLog = async () => {
  const message = `🚀 *LocateAid Server is Live!*\n✅ Running on port: ${PORT}\n🕒 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;
  await sendTelegramMessage(message);
};

// 🔔 Logout log helper
const sendLogoutLog = async () => {
  const message = `👋 *Admin Logged Out*\n🕒 ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;
  await sendTelegramMessage(message);
};

// ✅ Admin logout + Telegram log
app.post("/api/admin/logout", async (req, res) => {
  try {
    await sendLogoutLog();
    return res.json({ success: true, message: "Logged out successfully." });
  } catch (e) {
    return res.status(500).json({ error: "Failed to log logout." });
  }
});

// 🛑 Server shutdown log helper with greeting
const sendServerShutdownLog = async () => {
  const now = new Date();
  const timeString = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const hour = now.getHours();

  let greeting = "Good night 🌙";
  if (hour >= 5 && hour < 12) greeting = "Good morning ☀️";
  else if (hour >= 12 && hour < 17) greeting = "Good afternoon 🌤️";
  else if (hour >= 17 && hour < 21) greeting = "Good evening 🌆";

  const message = `🛑 *LocateAid Server is Turned Off*\n${greeting}\n🕒 ${timeString}`;
  await sendTelegramMessage(message);
};

// 🧹 Graceful shutdown on Ctrl+C or kill
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down LocateAid server...");
  await sendServerShutdownLog();
  process.exit();
});

process.on("SIGTERM", async () => {
  console.log("🛑 Termination signal received.");
  await sendServerShutdownLog();
  process.exit();
});

app.listen(PORT, async () => {
  console.log(`✅ LocateAid server running on port ${PORT}`);
  await sendServerLiveLog();
});
