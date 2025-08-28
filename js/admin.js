  const BASE_URL = "https://90852828-3f6b-4e58-bf3f-05c9efb6fc03-00-wv6hgzor1jk7.sisko.replit.dev";


  if (window.location.pathname === "/admin.html") {
    window.location.replace("/admin");
  }

  const loginSection = document.getElementById("loginSection");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const backBtn = document.getElementById("backBtn");
  let adminPassword = "";

  function showAlert(targetId, message, type = "success") {
    const alert = document.getElementById(targetId);
    alert.textContent = message;
    alert.className = `alert-box alert-${type}`;
    alert.style.display = "block";
    setTimeout(() => {
      alert.style.display = "none";
    }, 3000);
  }

  //  Login
  loginBtn.addEventListener("click", async () => {
    adminPassword = document.getElementById("adminPassword").value;
    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      if (res.ok) {
        loginSection.classList.add("hidden");
        adminPanel.classList.remove("hidden");
        logoutBtn.classList.remove("hidden");
        showAlert("panelAlert", "✅ Logged in successfully!", "success");
      } else {
        showAlert("loginAlert", "❌ Incorrect password. Try again!", "error");
      }
    } catch (error) {
      showAlert("loginAlert", "🚫 Server is offline. Contact developer.", "error");
    }
  });

  //  Logout
  async function logoutAdmin() {
    if (!adminPassword) return;
    try {
      await fetch(`${BASE_URL}/api/admin/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
    } catch (err) {
      console.error("Logout API failed", err);
    }
    adminPassword = "";
    loginSection.classList.remove("hidden");
    adminPanel.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    showAlert("loginAlert", "👋 Logged out successfully.", "success");
  }

  logoutBtn.addEventListener("click", logoutAdmin);

  // Back button should also logout before redirect
  backBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await logoutAdmin();
    window.location.href = "index.html";
  });

  // Auto logout when leaving page
  window.addEventListener("beforeunload", logoutAdmin);

  // Add City
  document.getElementById("submitBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim().toLowerCase();
    const theirCity = document.getElementById("theirCityInput").value.trim();
    const name = document.getElementById("nameInput").value.trim();
    const address = document.getElementById("addressInput").value.trim();
    const lat = parseFloat(document.getElementById("latInput").value);
    const lng = parseFloat(document.getElementById("lngInput").value);
    const type = document.getElementById("typeInput").value;
    const mapLink = document.getElementById("mapLinkInput").value.trim();

    if (!city || !name || !address || !type) {
      showAlert("panelAlert", "⚠️ Please fill in all required fields.", "error");
      return;
    }

    const payload = {
      city,
      password: adminPassword,
      data: [{
        name,
        address,
        lat: isNaN(lat) ? undefined : lat,
        lng: isNaN(lng) ? undefined : lng,
        type,
        city: theirCity || undefined,
        mapLink: mapLink || undefined,
      }],
    };

    try {
      const res = await fetch(`${BASE_URL}/api/admin/addCity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showAlert("panelAlert", "🎉 Emergency service added!", "success");
      } else {
        showAlert("panelAlert", "❌ Failed to add service.", "error");
      }
    } catch (error) {
      showAlert("panelAlert", "🚫 Server is offline. Contact developer.", "error");
    }
  });