  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Emergency numbers data with translations
  const emergencyNumbers = {
  en: [
    { type: "All Emergencies", number: "112", description: "Unified emergency (police, fire, ambulance, women & child, disaster)" },
    { type: "Police", number: "100", description: "Police assistance" },
    { type: "Fire", number: "101", description: "Fire emergency" },
    { type: "Ambulance", number: "102", description: "Medical transport" },
    { type: "Emergency Ambulance / Disaster", number: "108", description: "NHM ambulance and disaster service" },
    { type: "Women’s Helpline", number: "1091", description: "General support for women" },
    { type: "Women – Domestic Abuse", number: "181", description: "Domestic abuse assistance" },
    { type: "Child Helpline", number: "1098", description: "Children in difficult situations" },
    { type: "Missing Child / Women", number: "1094", description: "Support for missing children and women" },
    { type: "Road Accident Emergency Service", number: "1073", description: "General road accident assistance" },
    { type: "Road Accident (Private Highways)", number: "1033", description: "Highway accidents private ops" },
    { type: "Railway Accident", number: "1072", description: "Railway emergency" },
    { type: "Disaster Management (NDMA)", number: "1078", description: "National disaster management" },
    { type: "Relief Commissioner – Natural Calamities", number: "1070", description: "Natural calamity relief" },
    { type: "Tourist Helpline", number: "1363", description: "Tourist assistance" },
    { type: "LPG Leak", number: "1906", description: "Gas leak emergency" },
    { type: "AIDS Helpline", number: "1097", description: "HIV/AIDS assistance" },
    { type: "Central Vigilance Commission", number: "1964", description: "Anti-corruption assistance" },
    { type: "Health Helpline", number: "104", description: "State-level health support (Arogyavani)" },
    { type: "AASRA (Suicide Prevention)", number: "+91-22-27546669", description: "24×7 mental health support" },
    { type: "Vandrevala Foundation", number: "+91-9999666555", description: "24/7 counselling" },
    { type: "Samaritans Mumbai", number: "+91-8422984530", description: "Emotional support 3pm–9pm" },
    { type: "1Life Crisis Support", number: "+91-78930 78930", description: "24/7 crisis support" },
    { type: "Sneha India (Chennai)", number: "+91-44-2464 0060", description: "24/7 mental health support" },
    { type: "Lifeline Foundation (Kolkata)", number: "+91-90880 30303 / 033-4044 7437", description: "10am–10pm support" },
    { type: "iCall (TISS)", number: "Operational Mon–Sat (10am–8pm)", description: "Counselling via phone & email" },
    { type: "Befrienders India", number: "Local 15+ cities", description: "Crisis helplines nationwide" }
  ],
  hi: [
    { type: "सभी आपात स्थिति", number: "112", description: "संयुक्त आपातकाल (पुलिस, अग्नि, एम्बुलेंस, महिला और बाल, आपदा)" },
    { type: "पुलिस", number: "100", description: "पुलिस सहायता" },
    { type: "अग्नि", number: "101", description: "अग्नि आपातकाल" },
    { type: "एम्बुलेंस", number: "102", description: "चिकित्सीय परिवहन" },
    { type: "आपातकालीन एम्बुलेंस / आपदा", number: "108", description: "NHM एम्बुलेंस और आपदा सेवा" },
    { type: "महिला हेल्पलाइन", number: "1091", description: "महिलाओं के लिए सामान्य सहायता" },
    { type: "महिला – घरेलू हिंसा", number: "181", description: "घरेलू हिंसा सहायता" },
    { type: "चाइल्ड हेल्पलाइन", number: "1098", description: "कठिन परिस्थितियों में बच्चे" },
    { type: "गुमशुदा बच्चा / महिला", number: "1094", description: "गुम बच्चों और महिलाओं के लिए सहायता" },
    { type: "सड़क दुर्घटना आपातकालीन सेवा", number: "1073", description: "सड़क दुर्घटना सहायता" },
    { type: "सड़क दुर्घटना (निजी हाईवे)", number: "1033", description: "हाईवे दुर्घटना निजी संचालन" },
    { type: "रेलवे दुर्घटना", number: "1072", description: "रेलवे आपातकाल" },
    { type: "आपदा प्रबंधन (NDMA)", number: "1078", description: "राष्ट्रीय आपदा प्रबंधन" },
    { type: "राहत आयुक्त – प्राकृतिक आपदा", number: "1070", description: "प्राकृतिक आपदा राहत" },
    { type: "पर्यटक हेल्पलाइन", number: "1363", description: "पर्यटक सहायता" },
    { type: "LPG लीकेज", number: "1906", description: "गैस रिसाव आपातकाल" },
    { type: "एड्स हेल्पलाइन", number: "1097", description: "HIV/AIDS सहायता" },
    { type: "केंद्रीय सतर्कता आयोग", number: "1964", description: "भ्रष्टाचार विरोधी सहायता" },
    { type: "स्वास्थ्य हेल्पलाइन", number: "104", description: "राज्य स्तरीय स्वास्थ्य सहायता (Arogyavani)" },
    { type: "AASRA (आत्महत्या रोकथाम)", number: "+91-22-27546669", description: "24×7 मानसिक स्वास्थ्य सहायता" },
    { type: "Vandrevala फाउंडेशन", number: "+91-9999666555", description: "24/7 परामर्श" },
    { type: "Samaritans मुंबई", number: "+91-8422984530", description: "भावनात्मक सहायता 3pm–9pm" },
    { type: "1Life संकट समर्थन", number: "+91-78930 78930", description: "24/7 संकट सहायता" },
    { type: "Sneha इंडिया (चेन्नई)", number: "+91-44-2464 0060", description: "24/7 मानसिक स्वास्थ्य सहायता" },
    { type: "Lifeline फाउंडेशन (कोलकाता)", number: "+91-90880 30303 / 033-4044 7437", description: "10am–10pm सहायता" },
    { type: "iCall (TISS)", number: "सोम–शनि (10am–8pm)", description: "फोन और ईमेल के माध्यम से परामर्श" },
    { type: "Befrienders इंडिया", number: "स्थानीय 15+ शहर", description: "राष्ट्रीय संकट हेल्पलाइन" }
  ],
  mr: [
    { type: "सर्व आपत्कालीन सेवा", number: "112", description: "एकत्रित आपत्कालीन सेवा (पोलीस, अग्निशमन, रुग्णवाहिका, महिला व बाल, आपत्ती)" },
    { type: "पोलीस", number: "100", description: "पोलीस सहाय्य" },
    { type: "अग्निशमन", number: "101", description: "अग्निशमन आपत्कालीन" },
    { type: "रुग्णवाहिका", number: "102", description: "वैद्यकीय परिवहन" },
    { type: "आपत्कालीन रुग्णवाहिका / आपत्ती", number: "108", description: "NHM रुग्णवाहिका आणि आपत्ती सेवा" },
    { type: "महिला हेल्पलाइन", number: "1091", description: "महिलांसाठी सामान्य सहाय्य" },
    { type: "महिला – कौटुंबिक हिंसा", number: "181", description: "घरेलू हिंसा सहाय्य" },
    { type: "बाल हेल्पलाइन", number: "1098", description: "अडचणींमध्ये मुलांसाठी सहाय्य" },
    { type: "गहाळ बाल / महिला", number: "1094", description: "गहाळ मुलं व महिलांसाठी सहाय्य" },
    { type: "रस्त्यावरील अपघात आपत्कालीन सेवा", number: "1073", description: "सामान्य रस्त्यावरील अपघात सहाय्य" },
    { type: "रस्त्यावरील अपघात (खाजगी हायवे)", number: "1033", description: "हायवे अपघात खाजगी संचालन" },
    { type: "रेल्वे अपघात", number: "1072", description: "रेल्वे आपत्कालीन" },
    { type: "आपत्ती व्यवस्थापन (NDMA)", number: "1078", description: "राष्ट्रीय आपत्ती व्यवस्थापन" },
    { type: "सहाय्य आयुक्त – नैसर्गिक आपत्ती", number: "1070", description: "नैसर्गिक आपत्ती सहाय्य" },
    { type: "पर्यटक हेल्पलाइन", number: "1363", description: "पर्यटक सहाय्य" },
    { type: "LPG गळती", number: "1906", description: "गॅस गळती आपत्कालीन" },
    { type: "AIDS हेल्पलाइन", number: "1097", description: "HIV/AIDS सहाय्य" },
    { type: "केंद्रीय सतर्कता आयोग", number: "1964", description: "भ्रष्टाचार विरोधी सहाय्य" },
    { type: "आरोग्य हेल्पलाइन", number: "104", description: "राज्य स्तरीय आरोग्य सहाय्य (Arogyavani)" },
    { type: "AASRA (आत्महत्ये प्रतिबंध)", number: "+91-22-27546669", description: "24×7 मानसिक आरोग्य सहाय्य" },
    { type: "Vandrevala फाउंडेशन", number: "+91-9999666555", description: "24/7 सल्ला" },
    { type: "Samaritans मुंबई", number: "+91-8422984530", description: "भावनिक सहाय्य 3pm–9pm" },
    { type: "1Life संकट सहाय्य", number: "+91-78930 78930", description: "24/7 संकट सहाय्य" },
    { type: "Sneha इंडिया (चेन्नई)", number: "+91-44-2464 0060", description: "24/7 मानसिक आरोग्य सहाय्य" },
    { type: "Lifeline फाउंडेशन (कोलकाता)", number: "+91-90880 30303 / 033-4044 7437", description: "10am–10pm सहाय्य" },
    { type: "iCall (TISS)", number: "सोम–शनि (10am–8pm)", description: "फोन व ईमेल मार्गे सल्ला" },
    { type: "Befrienders इंडिया", number: "स्थानिक 15+ शहर", description: "राष्ट्रीय संकट हेल्पलाइन" }
  ],
  gu: [
    { type: "બધી આપાતકાલીન સેવા", number: "112", description: "એકસાથે આપાતકાલીન સેવા (પોલીસ, આગ, એમ્બ્યુલન્સ, મહિલા અને બાળક, આપત્તિ)" },
    { type: "પોલીસ", number: "100", description: "પોલીસ સહાય" },
    { type: "અગ્નિશામક", number: "101", description: "આગ આપાતકાલીન" },
    { type: "એમ્બ્યુલન્સ", number: "102", description: "ચિકિત્સા પરિવહન" },
    { type: "આપાતકાલીન એમ્બ્યુલન્સ / આપત્તિ", number: "108", description: "NHM એમ્બ્યુલન્સ અને આપત્તિ સેવા" },
    { type: "મહિલા હેલ્પલાઇન", number: "1091", description: "મહિલાઓ માટે સામાન્ય સહાય" },
    { type: "મહિલા – ગૃહહિંસા", number: "181", description: "ઘરેલુ હિંસા સહાય" },
    { type: "બાળ હેલ્પલાઇન", number: "1098", description: "કઠિન પરિસ્થિતિમાં બાળકો" },
    { type: "ગુમ થયેલ બાળક / મહિલા", number: "1094", description: "ગુમ થયેલ બાળકો અને મહિલાઓ માટે સહાય" },
    { type: "રસ્તા અકસ્માત આપાતકાલીન સેવા", number: "1073", description: "સામાન્ય રસ્તા અકસ્માત સહાય" },
    { type: "રસ્તા અકસ્માત (ખાજગી હાઇવે)", number: "1033", description: "હાઇવે અકસ્માત ખાનગી કામગીરી" },
    { type: "રેલ્વે અકસ્માત", number: "1072", description: "રેલ્વે આપાતકાલીન" },
    { type: "આપત્તિ વ્યવસ્થાપન (NDMA)", number: "1078", description: "રાષ્ટ્રીય આપત્તિ વ્યવસ્થાપન" },
    { type: "રાહત કમિશનર – કુદરતી આપત્તિઓ", number: "1070", description: "કુદરતી આપત્તિ રાહત" },
    { type: "પર્યટક હેલ્પલાઇન", number: "1363", description: "પર્યટક સહાય" },
    { type: "LPG લીક", number: "1906", description: "ગેસ લીક આપાતકાલીન" },
    { type: "AIDS હેલ્પલાઇન", number: "1097", description: "HIV/AIDS સહાય" },
    { type: "સેન્ટ્રલ વિજિલન્સ કમિશન", number: "1964", description: "ભ્રષ્ટાચાર વિરોધી સહાય" },
    { type: "હેલ્થ હેલ્પલાઇન", number: "104", description: "રાજ્ય સ્તરીય આરોગ્ય સહાય (Arogyavani)" },
    { type: "AASRA (આત્મહત્યા નિવારણ)", number: "+91-22-27546669", description: "24×7 માનસિક આરોગ્ય સહાય" },
    { type: "Vandrevala ફાઉન્ડેશન", number: "+91-9999666555", description: "24/7 સલાહ" },
    { type: "Samaritans મુંબઈ", number: "+91-8422984530", description: "ભાવનાત્મક સહાય 3pm–9pm" },
    { type: "1Life ક્રાઇસિસ સપોર્ટ", number: "+91-78930 78930", description: "24/7 ક્રાઇસિસ સહાય" },
    { type: "Sneha ઇન્ડિયા (ચેન્નઈ)", number: "+91-44-2464 0060", description: "24/7 માનસિક આરોગ્ય સહાય" },
    { type: "Lifeline ફાઉન્ડેશન (કોલકાતા)", number: "+91-90880 30303 / 033-4044 7437", description: "10am–10pm સહાય" },
    { type: "iCall (TISS)", number: "સોમ–શનિ (10am–8pm)", description: "ફોન અને ઈમેલ મારફતે સલાહ" },
    { type: "Befrienders ઇન્ડિયા", number: "સ્થાનિક 15+ શહેરો", description: "રાષ્ટ્રીય ક્રાઇસિસ હેલ્પલાઇન" }
  ]
};


  const grid = document.getElementById("emergencyGrid");

  function renderEmergencyCards(lang) {
  grid.innerHTML = ""; // Clear existing cards
  emergencyNumbers[lang].forEach(item => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 flex flex-col justify-between";
    card.innerHTML = `
      <h3 class="text-xl font-bold text-blue-600 mb-2">${item.type}</h3>
      <p class="text-gray-700 mb-2">${item.description}</p>
      <p class="text-lg font-semibold mb-4">${item.number}</p>
      <a href="tel:${item.number}" class="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
        Call Now
      </a>
    `;
    grid.appendChild(card);
  });
}


  // Full page translations
  const translations = {
  en: { 
    pageTitle: "Emergency Numbers | LocateAid",
    logoText: "LocateAid",
    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    emergencyHeading: "Emergency Numbers",
    emergencyDesc: "Quick access to all essential emergency contacts in India.",
    logoTextFooter: "LocateAid",
    footerContact: "Contact",
    footerEmail: "Email: sanketpadhyal3@gmail.com",
    footerCopyright: "© 2025 LocateAid. All rights reserved."
  },
  hi: { 
    pageTitle: "आपातकालीन नंबर | LocateAid",
    logoText: "LocateAid",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क करें",
    emergencyHeading: "आपातकालीन नंबर",
    emergencyDesc: "भारत में सभी आवश्यक आपातकालीन संपर्कों तक त्वरित पहुँच।",
    logoTextFooter: "LocateAid",
    footerContact: "संपर्क करें",
    footerEmail: "ईमेल: sanketpadhyal3@gmail.com",
    footerCopyright: "© 2025 LocateAid। सर्वाधिकार सुरक्षित।"
  },
  mr: { 
    pageTitle: "आपत्कालीन क्रमांक | LocateAid",
    logoText: "LocateAid",
    navHome: "मुख्यपृष्ठ",
    navAbout: "आमच्याबद्दल",
    navContact: "संपर्क",
    emergencyHeading: "आपत्कालीन क्रमांक",
    emergencyDesc: "भारतातील सर्व आवश्यक आपत्कालीन संपर्कांपर्यंत त्वरीत प्रवेश.",
    logoTextFooter: "LocateAid",
    footerContact: "संपर्क",
    footerEmail: "ईमेल: sanketpadhyal3@gmail.com",
    footerCopyright: "© 2025 LocateAid. सर्व हक्क राखीव."
  },
  gu: { 
    pageTitle: "આપાતકાલીન નંબર | LocateAid",
    logoText: "LocateAid",
    navHome: "હોમ",
    navAbout: "અમારા વિશે",
    navContact: "સંપર્ક",
    emergencyHeading: "આપાતકાલીન નંબર",
    emergencyDesc: "ભારતમાં તમામ જરૂરી આપાતકાલીન સંપર્કો સુધી ઝડપી ઍક્સેસ.",
    logoTextFooter: "LocateAid",
    footerContact: "સંપર્ક",
    footerEmail: "ઇમેલ: sanketpadhyal3@gmail.com",
    footerCopyright: "© 2025 LocateAid. સર્વ અધિકાર સંરક્ષિત."
  }
};


  function applyTranslations(lang) {
    localStorage.setItem("selectedLanguage", lang);
    document.documentElement.setAttribute("lang", lang);

    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if(translations[lang] && translations[lang][key]){
        el.innerHTML = translations[lang][key];
      }
      el.style.opacity = 0;
      el.style.transition = "opacity 0.6s ease";
      setTimeout(() => { el.style.opacity = 1; }, 50);
    });

    if(translations[lang] && translations[lang].pageTitle){
      document.title = translations[lang].pageTitle;
    }

    // Render emergency cards
    renderEmergencyCards(lang);
  }

  // Auto-apply saved language
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  applyTranslations(savedLang);