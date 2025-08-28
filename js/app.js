    const locateBtn = document.getElementById('locateBtn');
    const manualBtn = document.getElementById('manualBtn');
    const fallbackSearchBtn = document.getElementById('fallbackSearchBtn');
    const manualInput = document.getElementById('manualCityInput');
    const manualSearchBtn = document.getElementById('manualSearchBtn');
    const manualSearchArea = document.getElementById('manualSearchArea');
    const status = document.getElementById('status');
    const results = document.getElementById('results');

    const BASE_URL = "YOUR_BACKEND_LINK";

    locateBtn.addEventListener('click', () => {
      status.textContent = "Fetching your location...";
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          status.textContent = "Fetching nearby services...";
          try {
            const res = await fetch(`${BASE_URL}/api/getEmergency?lat=${latitude}&lng=${longitude}`);
            const data = await res.json();
            displayResults(data.places || data.data);
          } catch (err) {
            status.textContent = "Something went wrong Side Server is turned off contact developer.";
          }
        },
        () => {
          status.textContent = "Location permission denied.";
        }
      );
    });

    manualBtn.addEventListener('click', () => {
      manualSearchArea.classList.toggle('hidden');
      manualInput.focus();
    });

    fallbackSearchBtn.addEventListener('click', () => {
      manualSearchArea.classList.remove('hidden');
      manualInput.focus();
    });

    manualSearchBtn.addEventListener('click', () => {
      const city = manualInput.value.trim();
      if (!city) {
        status.textContent = "Please enter a city name.";
        return;
      }
      fetchByCity(city);
    });

    async function fetchByCity(city) {
      status.textContent = `Searching emergency services in "${city}"...`;
      try {
        const res = await fetch(`${BASE_URL}/api/getEmergency?city=${city.toLowerCase()}`);
        const data = await res.json();
        document.title = `LocateAid | Results in ${city}`;
        displayResults(data.data || data.places);
      } catch (err) {
        status.textContent = "Side Server is turned off, contact developer.";
      }
    }

    function getReadableType(type) {
      if (type.includes("hospital")) return "Hospital";
      if (type.includes("fire_station")) return "Fire Station";
      if (type.includes("police")) return "Police Station";
      return "Emergency Service";
    }

    function displayResults(places) {
      if (places?.length > 0) {
        results.innerHTML = places.map(place => {
          const mapQuery = encodeURIComponent(`${place.name} ${place.address || ''}`);
          const mapLink = `
            <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" 
               target="_blank" 
               class="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-gray-100 text-sm text-blue-600 rounded hover:bg-gray-200 transition">
              <img src="https://www.gstatic.com/images/branding/product/1x/maps_48dp.png" alt="Google Maps" class="w-4 h-4" />
              View on Map
            </a>`;
          return `
            <div class="border rounded p-4 shadow bg-white">
              <h3 class="text-lg font-bold">${place.name}</h3>
              <p class="text-sm text-gray-600">${getReadableType(place.type)}</p>
              <p class="text-sm">${place.address}</p>
              ${mapLink}
            </div>`;
        }).join('');
        status.textContent = "";
        fallbackSearchBtn.classList.add("hidden");
      } else {
        status.innerHTML = `
          🚨 <span>No nearby hospitals, fire stations, or police found.</span>
          <br/>Try another city or click "Find Manually".
        `;
        results.innerHTML = "";
        fallbackSearchBtn.classList.remove("hidden");
      }
    }

        const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

        const translations = {
      en: { home: "Home", about: "About", contact: "Contact",
        mainHeading: "Find Emergency Help Near You",
        mainSubheading: "Click below to allow location access or manually search by city.",
        allowLocation: "Allow Location Access", searchCity: "Search by City Instead",
        findManually: "Find Manually", search: "Search" },
      hi: { home: "होम", about: "के बारे में", contact: "संपर्क",
        mainHeading: "आपके पास आपातकालीन सहायता खोजें",
        mainSubheading: "नीचे क्लिक करके स्थान की अनुमति दें या शहर से खोजें।",
        allowLocation: "स्थान की अनुमति दें", searchCity: "शहर द्वारा खोजें",
        findManually: "मैन्युअली खोजें", search: "खोजें" },
      mr: { home: "मुख्यपृष्ठ", about: "माहिती", contact: "संपर्क",
        mainHeading: "आपल्याजवळील आपत्कालीन मदत शोधा",
        mainSubheading: "खाली क्लिक करून लोकेशन परवानगी द्या किंवा शहराद्वारे शोधा.",
        allowLocation: "लोकेशन परवानगी द्या", searchCity: "शहराने शोधा",
        findManually: "मॅन्युअली शोधा", search: "शोधा" },
      gu: { home: "મુખ્ય પૃષ્ઠ", about: "વિશે", contact: "સંપર્ક",
        mainHeading: "તમારા નજીકની આપાતકાલીન મદદ શોધો",
        mainSubheading: "સ્થાનની પરવાનગી આપવા માટે નીચે ક્લિક કરો અથવા શહેર દ્વારા શોધો.",
        allowLocation: "સ્થાનની પરવાનગી આપો", searchCity: "શહેર દ્વારા શોધો",
        findManually: "મેન્યુઅલી શોધો", search: "શોધો" }
    };

    function applyLanguage(lang) {
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      const savedLang = localStorage.getItem("selectedLanguage") || "en";
      applyLanguage(savedLang);
    });