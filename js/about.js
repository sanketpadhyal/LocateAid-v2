  // mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Translation data
  const translations = {
        en: {
          pageTitle: "About | LocateAid",
          logoText: "LocateAid",
          navHome: "Home",
          navAbout: "About",
          navContact: "Contact",
          aboutHeading: "About LocateAid",
          aboutDescription: "LocateAid is your trusted emergency companion. Whether you're in a new city or need urgent help, we use your live location to find nearby hospitals, police stations, and more — instantly.",
          journeyHeading: "🌱 Our Journey",
          journeyText1: "Built in 2025 by Sanket Padhyal, LocateAid was made entirely from scratch — no templates. It’s a project crafted with love, code, and real-world need.",
          journeyText2: "I’m a self-taught developer with over 15+ live websites and 4+ backend projects. This idea came from a real problem: finding emergency help quickly in unknown cities. From backend APIs to manual city support and a beautiful mobile experience — it’s all custom-built.",
          aboutAccessibility: "We made this website very easy and minimal — just like a government website, with no loading issues and no fancy UI/UX. It’s designed to be accessible and usable for everyone during emergencies. We also have an admin panel to manually add cities or locations that aren't covered by the live API.",
          githubProfile: "GitHub Profile",
          logoTextFooter: "LocateAid",
          footerContact: "Contact",
          footerEmail: "Email: sanketpadhyal3@gmail.com",
          footerCopyright: "© 2025 LocateAid. All rights reserved."
        },
        hi: {
          pageTitle: "के बारे में | LocateAid",
          logoText: "LocateAid",
          navHome: "होम",
          navAbout: "के बारे में",
          navContact: "संपर्क करें",
          aboutHeading: "LocateAid के बारे में",
          aboutDescription: "LocateAid आपका भरोसेमंद आपातकालीन साथी है। चाहे आप किसी नए शहर में हों या तत्काल मदद चाहिए, हम आपके लाइव लोकेशन का उपयोग करके निकटतम अस्पताल, पुलिस स्टेशन और अधिक खोजते हैं।",
          journeyHeading: "🌱 हमारी यात्रा",
          journeyText1: "2025 में <strong>Sanket Padhyal</strong> द्वारा बनाया गया, LocateAid पूरी तरह से खरोंच से बनाया गया था — कोई टेम्पलेट नहीं। यह प्यार, कोड और वास्तविक दुनिया की आवश्यकता से तैयार किया गया एक प्रोजेक्ट है।",
          journeyText2: "मैं एक स्व-शिक्षित डेवलपर हूँ, मेरे 15+ लाइव वेबसाइट और 4+ बैकएंड प्रोजेक्ट्स हैं। यह विचार एक वास्तविक समस्या से आया: अज्ञात शहरों में तेजी से आपातकालीन मदद ढूंढना। बैकएंड API से लेकर मैनुअल सिटी सपोर्ट और सुंदर मोबाइल अनुभव तक — सब कुछ कस्टम-बिल्ट है।",
          aboutAccessibility: "हमने इस वेबसाइट को बहुत आसान और न्यूनतम बनाया — बिल्कुल सरकारी वेबसाइट की तरह, कोई लोडिंग समस्या या फैंसी UI/UX नहीं। यह आपातकालीन स्थितियों में सभी के लिए सुलभ और उपयोग में आसान होने के लिए डिज़ाइन किया गया है। हमारे पास उन शहरों या स्थानों को मैन्युअल रूप से जोड़ने के लिए एक एडमिन पैनल भी है जो लाइव API द्वारा कवर नहीं हैं।",
          githubProfile: "GitHub प्रोफ़ाइल",
          logoTextFooter: "LocateAid",
          footerContact: "संपर्क करें",
          footerEmail: "ईमेल: sanketpadhyal3@gmail.com",
          footerCopyright: "© 2025 LocateAid. सर्वाधिकार सुरक्षित।"
        },
        mr: {
          pageTitle: "बद्दल | LocateAid",
          logoText: "LocateAid",
          navHome: "मुख्यपृष्ठ",
          navAbout: "बद्दल",
          navContact: "संपर्क",
          aboutHeading: "LocateAid बद्दल",
          aboutDescription: "LocateAid आपला विश्वासार्ह आपत्कालीन सहकारी आहे. तुम्ही नवीन शहरात असाल किंवा तातडीची मदत हवी असेल, आम्ही तुमच्या लाइव्ह लोकेशनचा वापर करून जवळच्या रुग्णालये, पोलिस स्टेशन आणि अधिक शोधतो.",
          journeyHeading: "🌱 आमची यात्रा",
          journeyText1: "2025 मध्ये <strong>Sanket Padhyal</strong> यांनी तयार केले, LocateAid पूर्णपणे शून्यापासून बनवले गेले — कोणतेही टेम्पलेट नाही. हा प्रेम, कोड आणि वास्तविक गरजांसह तयार केलेला प्रोजेक्ट आहे.",
          journeyText2: "मी एक सेल्फ-टॉइच्ड डेव्हलपर आहे, ज्याचे 15+ लाइव वेबसाइट्स आणि 4+ बॅकएंड प्रोजेक्ट्स आहेत. हा विचार एका वास्तविक समस्येतून आला: अज्ञात शहरांमध्ये त्वरीत आपत्कालीन मदत शोधणे. बॅकएंड API पासून मॅन्युअल सिटी सपोर्ट आणि सुंदर मोबाइल अनुभव — सर्व काही कस्टम-बिल्ट आहे.",
          aboutAccessibility: "आम्ही ही वेबसाइट खूप सोपी आणि मिनिमल ठेवली आहे — अगदी सरकारी वेबसाइटसारखी, कोणतीही लोडिंग समस्या किंवा फँसी UI/UX नाही. ही आपत्कालीन परिस्थितीत सर्वांसाठी प्रवेशयोग्य आणि वापरण्यास सोपी बनवलेली आहे. आमच्याकडे अ‍ॅडमिन पॅनेल देखील आहे जे मॅन्युअली त्या शहर किंवा ठिकाणी जोडते जे लाइव API द्वारे कव्हर केलेले नाहीत.",
          githubProfile: "GitHub प्रोफाइल",
          logoTextFooter: "LocateAid",
          footerContact: "संपर्क",
          footerEmail: "ईमेल: sanketpadhyal3@gmail.com",
          footerCopyright: "© 2025 LocateAid. सर्व हक्क राखीव."
        },
        gu: {
          pageTitle: "વિશે | LocateAid",
          logoText: "LocateAid",
          navHome: "હોમ",
          navAbout: "વિશે",
          navContact: "સંપર્ક કરો",
          aboutHeading: "LocateAid વિશે",
          aboutDescription: "LocateAid તમારો વિશ્વસનીય આકસ્મિક સાથી છે. તમે નવા શહેરમાં હોવ અથવા તાત્કાલિક મદદની જરૂર હોય, અમે તમારા જીવંત સ્થાનનો ઉપયોગ કરીને નજીકના હોસ્પિટલ, પોલીસ સ્ટેશન અને વધુ શોધીશું.",
          journeyHeading: "🌱 અમારી સફર",
          journeyText1: "2025 માં <strong>Sanket Padhyal</strong> દ્વારા બનાવવામાં આવ્યું, LocateAid સંપૂર્ણપણે શૂન્યથી બનાવવામાં આવ્યું હતું — કોઈ ટેમ્પલેટ્સ નહીં. તે પ્રેમ, કોડ અને વાસ્તવિક જરૂરિયાત સાથે બનાવવામાં આવેલ પ્રોજેક્ટ છે.",
          journeyText2: "હું એક સ્વયં-શિક્ષિત ડેવલપર છું, મારી પાસે 15+ જીવંત વેબસાઇટ્સ અને 4+ બેકએન્ડ પ્રોજેક્ટ્સ છે. આ વિચાર એક ખરેખર સમસ્યા પરથી આવ્યો: અજ્ઞાત શહેરોમાં ઝડપી આકસ્મિક મદદ શોધવી. બેકએન્ડ API થી મેન્યુઅલ શહેર સપોર્ટ અને સુંદર મોબાઇલ અનુભવ — બધું કસ્ટમ-બિલ્ટ છે.",
          aboutAccessibility: "અમે આ વેબસાઇટ ખૂબ સરળ અને લઘુતમ બનાવ્યું છે — બિલકુલ સરકારી વેબસાઇટની જેમ, કોઈ લોડિંગ સમસ્યા અથવા ફેંસી UI/UX નથી. તે આકસ્મિક સ્થિતિમાં દરેક માટે ઍક્સેસિબલ અને વાપરવા માટે સરળ બનાવવામાં આવ્યું છે. અમારી પાસે એડમિન પેનલ પણ છે જે હસ્તચલિત રીતે તે શહેર અથવા સ્થળોને ઉમેરે છે જે લાઇવ API દ્વારા આવરી લેવામાં આવેલ નથી.",
          githubProfile: "GitHub પ્રોફાઇલ",
          logoTextFooter: "LocateAid",
          footerContact: "સંપર્ક કરો",
          footerEmail: "ઇમેલ: sanketpadhyal3@gmail.com",
          footerCopyright: "© 2025 LocateAid. તમામ અધિકાર સંગ્રહિત છે."
        }
    
  };

  // Get user-selected language from index.html
  const userLang = localStorage.getItem("selectedLanguage") || "en";

  // Apply translations 
  const i18nElements = document.querySelectorAll("[data-i18n]");
  i18nElements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(translations[userLang] && translations[userLang][key]){
      el.innerHTML = translations[userLang][key];
    }
    el.style.opacity = 0;        // start hidden
    el.style.transition = "opacity 0.6s ease";
    setTimeout(() => { el.style.opacity = 1; }, 50);
  });