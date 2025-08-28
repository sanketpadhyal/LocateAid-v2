const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const BACKEND_URL = "YOUR_BACKEND_LINK";

function appendMessage(sender, text, isTyping=false) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "flex justify-end" : "flex justify-start";

  if(isTyping){
    msg.innerHTML = `
      <div class="px-4 py-2 rounded-2xl max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none flex items-center gap-2">
        <img src="assets/robot.png" alt="bot" class="w-6 h-6"/>
        <span class="typing-dots">Typing<span class="dots">...</span></span>
      </div>`;
  } else {
    const botIcon = `<img src="assets/robot.png" alt="bot" class="w-6 h-6 inline-block mr-1"/>`;
    const warningIcon = `<img src="assets/warning.png" alt="warning" class="w-6 h-6 inline-block mr-1"/>`;

    msg.innerHTML = `
      <div class="px-4 py-2 rounded-2xl max-w-[80%] ${sender==='user'
        ?'bg-blue-600 text-white rounded-br-none'
        :'bg-gray-200 text-gray-800 rounded-bl-none'}">
        ${sender==='bot' ? botIcon : ''}${sender==='bot' && !text ? '' : text}
      </div>`;
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  userInput.value = "";

  // Add typing animation
  const typingMsg = appendMessage("bot", "", true);

  try {
    const res = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();

    // Replace typing animation with actual response
    typingMsg.innerHTML = `
      <div class="px-4 py-2 rounded-2xl max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
        <img src="assets/robot.png" alt="bot" class="w-6 h-6 inline-block mr-1"/>
        ${data.reply || "Sorry, no response."}
      </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    typingMsg.innerHTML = `
      <div class="px-4 py-2 rounded-2xl max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
        <img src="assets/warning.png" alt="warning" class="w-6 h-6 inline-block mr-1"/>
        Error connecting to AI service.
      </div>`;
    console.error(err);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Full page translation
const translations = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    heading: "AI Medi Help Assistant",
    subheading: "Ask me about emergency situations, first aid tips, or medical guidance. I’ll try to guide you instantly.",
    inputPlaceholder: "Type your medical question...",
    sendBtn: "Send"
  },
  hi: {
    home: "होम",
    about: "हमारे बारे में",
    contact: "संपर्क",
    heading: "एआई मेडिकल हेल्प असिस्टेंट",
    subheading: "आपातकालीन परिस्थितियों, प्राथमिक चिकित्सा सुझाव या चिकित्सा मार्गदर्शन के बारे में मुझसे पूछें। मैं तुरंत मार्गदर्शन करने की कोशिश करूंगा।",
    inputPlaceholder: "अपना सवाल लिखें...",
    sendBtn: "भेजें"
  },
  mr: {
    home: "मुख्यपृष्ठ",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
    heading: "एआय मेडिकल हेल्प असिस्टंट",
    subheading: "आपत्कालीन परिस्थिती, प्राथमिक उपचार टिप्स किंवा वैद्यकीय मार्गदर्शन विचारू शकता. मी लगेच मार्गदर्शन करण्याचा प्रयत्न करेन.",
    inputPlaceholder: "आपला प्रश्न टाका...",
    sendBtn: "पाठवा"
  },
  gu: {
    home: "હોમ",
    about: "અમારા વિષે",
    contact: "સંપર્ક",
    heading: "એઆઈ મેડિકલ હેલ્પ અસિસ્ટન્ટ",
    subheading: "આપાતકાલીન પરિસ્થિતિઓ, પ્રથમ સારવાર ટિપ્સ અથવા મેડિકલ માર્ગદર્શન માટે મારો ઉપયોગ કરો. હું તરત માર્ગદર્શન આપવાનો પ્રયત્ન કરીશ.",
    inputPlaceholder: "તમારો પ્રશ્ન ટાઇપ કરો...",
    sendBtn: "મોકલો"
  }
};

// Apply saved language from index.html
window.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("selectedLanguage") || "en";
  const t = translations[lang] || translations.en;

  // Navbar
  document.querySelectorAll('[data-i18n="home"]').forEach(el => el.textContent = t.home);
  document.querySelectorAll('[data-i18n="about"]').forEach(el => el.textContent = t.about);
  document.querySelectorAll('[data-i18n="contact"]').forEach(el => el.textContent = t.contact);

  // Headings
  document.querySelector('[data-i18n="heading"]').textContent = t.heading;
  document.querySelector('[data-i18n="subheading"]').textContent = t.subheading;

  // Input & button
  const input = document.querySelector('#userInput');
  if(input) input.placeholder = t.inputPlaceholder;

  const btn = document.querySelector('#sendBtn');
  if(btn) btn.textContent = t.sendBtn;
});

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });