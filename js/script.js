// Mobile Menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Hero image slider
const heroSlider = document.getElementById("heroSlider");
const images = [
  "./assets/emergency1.png",
  "./assets/emergency2.png",
  "./assets/emergency3.png",
  "./assets/emergency5.png"
];
let index = 0;

setInterval(() => {
  heroSlider.classList.add("opacity-0"); 

  setTimeout(() => {
    index = (index + 1) % images.length;
    heroSlider.src = images[index];
    heroSlider.classList.remove("opacity-0"); 
  }, 700); 
}, 4000);


// Language Modal open/close
const langBtn = document.getElementById("langBtn");
const langBtnMobile = document.getElementById("langBtnMobile");
const langModal = document.getElementById("langModal");
const closeModal = document.getElementById("closeModal");

langBtn.addEventListener("click", () => langModal.classList.remove("hidden"));
langBtnMobile.addEventListener("click", () => langModal.classList.remove("hidden"));
closeModal.addEventListener("click", () => langModal.classList.add("hidden"));
langModal.addEventListener("click", (e) => {
  if (e.target === langModal) langModal.classList.add("hidden");
});

// Translations
const translations = {
  en: { 
    home: "Home", about: "About", contact: "Contact", language: "Language",
    heroTitle: "Find emergency services near you — fast.",
    heroDesc: "LocateAid helps you locate hospitals, police, and more using your live location. Stay safe, stay informed.",
    askaid: "Ask A.I", getStarted: "Get Started", adminPanel: "Admin Panel",
    emergency: "Emergency Numbers",
    footerDesc: "Your fastest way to find emergency services nearby. Stay safe, stay aware.", 
    footerContact: "Contact" 
  },
  hi: { 
    home: "होम", about: "हमारे बारे में", contact: "संपर्क", language: "भाषा",
    heroTitle: "आपके पास आपातकालीन सेवाएँ खोजें — तुरंत।",
    heroDesc: "LocateAid आपकी लाइव लोकेशन से अस्पताल, पुलिस और अधिक खोजने में मदद करता है। सुरक्षित रहें, सूचित रहें।",
    askaid: "एआई से पूछो", getStarted: "शुरू करें", adminPanel: "एडमिन पैनल",
    emergency: "आपातकालीन नंबर",
    footerDesc: "आपके पास आपातकालीन सेवाएं खोजने का सबसे तेज़ तरीका। सुरक्षित रहें, जागरूक रहें।", 
    footerContact: "संपर्क" 
  },
  mr: { 
    home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", contact: "संपर्क", language: "भाषा",
    heroTitle: "तुमच्या जवळच्या आपत्कालीन सेवा शोधा — जलद.",
    heroDesc: "LocateAid तुम्हाला तुमच्या ठिकाणावरून हॉस्पिटल, पोलीस आणि आणखी सेवा शोधायला मदत करते. सुरक्षित रहा, माहितीपूर्ण रहा.",
    askaid: "AI ला विचारा", getStarted: "सुरु करा", adminPanel: "प्रशासन पॅनेल",
    emergency: "आपत्कालीन नंबर",
    footerDesc: "तुमच्या जवळच्या आपत्कालीन सेवा शोधण्याचा सर्वात जलद मार्ग. सुरक्षित रहा, जागरूक रहा.", 
    footerContact: "संपर्क" 
  },
  gu: { 
    home: "હોમ", about: "અમારા વિષે", contact: "સંપર્ક", language: "ભાષા",
    heroTitle: "તમારા નજીકની ઇમરજન્સી સેવાઓ શોધો — ઝડપી.",
    heroDesc: "LocateAid તમને તમારા સ્થાન પરથી હોસ્પિટલ, પોલીસ અને વધુ શોધવામાં મદદ કરે છે. સુરક્ષિત રહો, માહિતીગત રહો.",
    askaid: "AI ને પૂછો", getStarted: "શરૂઆત કરો", adminPanel: "એડમિન પેનલ",
    emergency: "એમરજન્સી નંબર",
    footerDesc: "તમારા નજીકની ઇમરજન્સી સેવાઓ શોધવાનો ઝડપી રસ્તો. સુરક્ષિત રહો, જાગૃત રહો.", 
    footerContact: "સંપર્ક" 
  }
};

// Set language function
function setLanguage(lang) {
  localStorage.setItem("selectedLanguage", lang);
  document.documentElement.setAttribute("lang", lang);

  document.getElementById("nav-home").textContent = translations[lang].home;
  document.getElementById("nav-about").textContent = translations[lang].about;
  document.getElementById("nav-contact").textContent = translations[lang].contact;
  document.getElementById("lang-text").textContent = translations[lang].language;
  document.getElementById("m-nav-home").textContent = translations[lang].home;
  document.getElementById("m-nav-about").textContent = translations[lang].about;
  document.getElementById("m-nav-contact").textContent = translations[lang].contact;
  document.getElementById("hero-title").textContent = translations[lang].heroTitle;
  document.getElementById("hero-desc").textContent = translations[lang].heroDesc;
  document.getElementById("askaid-text").textContent = translations[lang].askaid;
  document.getElementById("emergencyBtn").textContent = translations[lang].emergency; 
  document.getElementById("get-started").textContent = translations[lang].getStarted;
  document.getElementById("admin-panel").textContent = translations[lang].adminPanel;
  document.getElementById("footer-desc").textContent = translations[lang].footerDesc;
  document.getElementById("footer-contact").textContent = translations[lang].footerContact;

  langModal.classList.add("hidden");
}

// Auto-apply saved language
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  if (translations[savedLang]) setLanguage(savedLang);
});
