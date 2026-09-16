(function () {
  "use strict";

  var STORAGE_KEY = "adhan-app-v2";
  var CITIES = [
    { name: "Strasbourg", country: "France", lat: 48.5734, lon: 7.7521 },
    { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { name: "Lyon", country: "France", lat: 45.764, lon: 4.8357 },
    { name: "Marseille", country: "France", lat: 43.2965, lon: 5.3698 },
    { name: "Bruxelles", country: "Belgique", lat: 50.8503, lon: 4.3517 },
    { name: "Genève", country: "Suisse", lat: 46.2044, lon: 6.1432 },
    { name: "Alger", country: "Algérie", lat: 36.7538, lon: 3.0588 },
    { name: "Oran", country: "Algérie", lat: 35.6971, lon: -0.6308 },
    { name: "Casablanca", country: "Maroc", lat: 33.5731, lon: -7.5898 },
    { name: "Rabat", country: "Maroc", lat: 34.0209, lon: -6.8416 },
    { name: "Tunis", country: "Tunisie", lat: 36.8065, lon: 10.1815 },
    { name: "Istanbul", country: "Türkiye", lat: 41.0082, lon: 28.9784 },
    { name: "Makkah", country: "Saudi Arabia", lat: 21.4225, lon: 39.8262 },
    { name: "Madinah", country: "Saudi Arabia", lat: 24.4672, lon: 39.6024 },
    { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708 },
    { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
    { name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
    { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
    { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
    { name: "Dakar", country: "Senegal", lat: 14.7167, lon: -17.4677 },
    { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011 },
    { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456 },
    { name: "Kuala Lumpur", country: "Malaysia", lat: 3.139, lon: 101.6869 },
    { name: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
    { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 }
  ];

  var I18N = {
    fr: {
      tagline: "Horaires de prière",
      changeLocation: "Changer de ville",
      nextPrayer: "Prochaine prière",
      duaTitle: "Dou'a",
      settingsTitle: "Réglages",
      language: "Langue",
      method: "Méthode de calcul",
      madhab: "École pour Asr",
      hour12: "Format 12 heures",
      volume: "Volume",
      credit: "Horaires calculés sur votre appareil. Laissez l'onglet ouvert pour les alertes.",
      chooseCity: "Choisir une ville",
      locationHelp: "Sur ordinateur, tapez votre ville. Sur téléphone, vous pouvez aussi utiliser la position GPS.",
      useGps: "Utiliser ma position",
      cityPlaceholder: "Strasbourg, Paris, Alger…",
      close: "Fermer",
      itsTime: "C'est l'heure",
      stop: "Arrêter",
      bearing: "Direction",
      distance: "Distance à la Kaaba",
      enableCompass: "Démarrer la boussole",
      gpsFail: "Position indisponible. Choisissez une ville.",
      facing: "Vous êtes face à la Qibla",
      turn: "Tournez-vous jusqu'à ce que la Kaaba soit en haut",
      desktopHint: "Tenez le téléphone à plat, écran vers le ciel, puis appuyez sur Démarrer la boussole.",
      pcHint: "Sur ordinateur, le nord reste en haut. La Kaaba indique la Qibla depuis votre ville. Utilisez un téléphone pour la boussole live.",
      headingLabel: "Cap",
      compassDenied: "Permission refusée. iPhone : Réglages → Safari → Mouvement et orientation → Autoriser, puis rechargez.",
      compassUnavailable: "Pas de boussole sur cet appareil. Le haut de l'écran = nord.",
      compassWait: "Autorisez le mouvement si demandé, puis tenez le téléphone à plat.",
      compassCalibrate: "Bougez le téléphone en 8 pour calibrer la boussole.",
      times: "Horaires",
      qibla: "Qibla",
      settings: "Réglages",
      km: "km",
      until: "dans",
      sectionTimes: "Horaires selon le pays",
      sectionAlerts: "Alerte de prière",
      highLat: "Hautes latitudes",
      highLatAuto: "Automatique",
      highLatMiddle: "Milieu de la nuit",
      highLatSeventh: "1/7 de la nuit",
      highLatAngle: "Angle du crépuscule",
      offsets: "Ajustement (minutes)",
      offsetHelp: "Décalez chaque prière pour coller à votre mosquée.",
      alertOff: "Aucune alerte",
      alertOffHelp: "Pas de son ni de notification",
      alertNotify: "Notification simple",
      alertNotifyHelp: "Un rappel discret, sans adhan",
      alertAdhan: "Jouer l'adhan",
      alertAdhanHelp: "Son de l'appel à la prière",
      testAlert: "Tester l'alerte",
      dismiss: "OK",
      recommended: "Recommandé pour",
      sectionMawaqit: "Mosquée (Mawaqit)",
      mawaqitHelp: "Les horaires officiels de votre mosquée, comme sur l'écran Mawaqit.",
      mawaqitEnable: "Utiliser les horaires Mawaqit",
      mawaqitSearch: "Rechercher une mosquée",
      mawaqitSearchPh: "Grande Mosquée, Strasbourg…",
      mawaqitNearby: "Mosquées autour de moi",
      mawaqitClear: "Retirer la mosquée",
      mawaqitFail: "Impossible de charger Mawaqit. Uploadez aussi mawaqit.php sur OVH.",
      mawaqitEmpty: "Aucune mosquée trouvée.",
      mawaqitIqama: "Afficher l'iqama",
      mawaqitUsing: "Horaires Mawaqit",
      jumua: "Jumu'a",
      iqama: "Iqama",
      groups: {
        europe: "Europe",
        maghreb: "Afrique du Nord",
        gulf: "Moyen-Orient et Golfe",
        asia: "Asie",
        americas: "Amériques"
      },
      methods: {
        uoif: "France / Belgique (UOIF)",
        mwl: "Ligue islamique mondiale",
        moonsighting: "Royaume-Uni (Moonsighting)",
        turkey: "Turquie (Diyanet)",
        algeria: "Algérie",
        morocco: "Maroc",
        tunisia: "Tunisie",
        egypt: "Égypte",
        makkah: "Arabie saoudite (Umm al-Qura)",
        dubai: "Émirats (Dubaï)",
        kuwait: "Koweït",
        qatar: "Qatar",
        karachi: "Pakistan / Inde (Karachi)",
        singapore: "Singapour / Malaisie / Indonésie",
        tehran: "Iran (Téhéran)",
        isna: "Amérique du Nord (ISNA)"
      },
      prayers: {
        fajr: "Fajr",
        sunrise: "Chourouk",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha"
      }
    },
    en: {
      tagline: "Prayer times",
      changeLocation: "Change city",
      nextPrayer: "Next prayer",
      duaTitle: "Du'a",
      settingsTitle: "Settings",
      language: "Language",
      method: "Calculation method",
      madhab: "Asr school",
      hour12: "12-hour clock",
      volume: "Volume",
      credit: "Times are calculated on your device. Keep this tab open for alerts.",
      chooseCity: "Choose a city",
      locationHelp: "On a computer, type your city. On a phone, you can also use GPS.",
      useGps: "Use my location",
      cityPlaceholder: "Strasbourg, Paris, Algiers…",
      close: "Close",
      itsTime: "It is time",
      stop: "Stop",
      bearing: "Direction",
      distance: "Distance to Kaaba",
      enableCompass: "Start compass",
      gpsFail: "Location unavailable. Please choose a city.",
      facing: "You are facing the Qibla",
      turn: "Turn until the Kaaba is at the top",
      desktopHint: "Hold the phone flat, screen facing the sky, then tap Start compass.",
      pcHint: "On a computer, north stays at the top. The Kaaba mark is the Qibla from your city. Use a phone for the live compass.",
      headingLabel: "Heading",
      compassDenied: "Permission denied. iPhone: Settings → Safari → Motion & Orientation Access → On, then reload.",
      compassUnavailable: "No compass on this device. Top of the screen = north.",
      compassWait: "Allow motion if asked, then hold the phone flat.",
      compassCalibrate: "Move the phone in a figure-8 to calibrate the compass.",
      times: "Times",
      qibla: "Qibla",
      settings: "Settings",
      km: "km",
      until: "in",
      sectionTimes: "Times by country",
      sectionAlerts: "Prayer alert",
      highLat: "High latitudes",
      highLatAuto: "Automatic",
      highLatMiddle: "Middle of the night",
      highLatSeventh: "1/7 of the night",
      highLatAngle: "Twilight angle",
      offsets: "Adjustment (minutes)",
      offsetHelp: "Shift each prayer to match your local mosque.",
      alertOff: "No alert",
      alertOffHelp: "No sound and no notification",
      alertNotify: "Simple notification",
      alertNotifyHelp: "A quiet reminder, without adhan",
      alertAdhan: "Play the adhan",
      alertAdhanHelp: "Play the call to prayer",
      testAlert: "Test alert",
      dismiss: "OK",
      recommended: "Recommended for",
      sectionMawaqit: "Mosque (Mawaqit)",
      mawaqitHelp: "Official times from your mosque, as shown on the Mawaqit screen.",
      mawaqitEnable: "Use Mawaqit mosque times",
      mawaqitSearch: "Search for a mosque",
      mawaqitSearchPh: "Grand Mosque, Strasbourg…",
      mawaqitNearby: "Mosques near me",
      mawaqitClear: "Remove mosque",
      mawaqitFail: "Could not load Mawaqit. Also upload mawaqit.php to OVH.",
      mawaqitEmpty: "No mosque found.",
      mawaqitIqama: "Show iqama",
      mawaqitUsing: "Mawaqit times",
      jumua: "Jumu'ah",
      iqama: "Iqama",
      groups: {
        europe: "Europe",
        maghreb: "North Africa",
        gulf: "Middle East & Gulf",
        asia: "Asia",
        americas: "Americas"
      },
      methods: {
        uoif: "France / Belgium (UOIF)",
        mwl: "Muslim World League",
        moonsighting: "United Kingdom (Moonsighting)",
        turkey: "Turkey (Diyanet)",
        algeria: "Algeria",
        morocco: "Morocco",
        tunisia: "Tunisia",
        egypt: "Egypt",
        makkah: "Saudi Arabia (Umm al-Qura)",
        dubai: "UAE (Dubai)",
        kuwait: "Kuwait",
        qatar: "Qatar",
        karachi: "Pakistan / India (Karachi)",
        singapore: "Singapore / Malaysia / Indonesia",
        tehran: "Iran (Tehran)",
        isna: "North America (ISNA)"
      },
      prayers: {
        fajr: "Fajr",
        sunrise: "Sunrise",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha"
      }
    },
    ar: {
      tagline: "مواقيت الصلاة",
      changeLocation: "تغيير المدينة",
      nextPrayer: "الصلاة القادمة",
      duaTitle: "دعاء",
      settingsTitle: "الإعدادات",
      language: "اللغة",
      method: "طريقة الحساب",
      madhab: "مذهب العصر",
      hour12: "نظام 12 ساعة",
      volume: "الصوت",
      credit: "تُحسب المواقيت على جهازك. أبقِ هذه الصفحة مفتوحة للتنبيهات.",
      chooseCity: "اختر مدينة",
      locationHelp: "على الحاسوب اكتب مدينتك. على الهاتف يمكنك استخدام الموقع.",
      useGps: "استخدم موقعي",
      cityPlaceholder: "ستراسبورغ، باريس، الجزائر…",
      close: "إغلاق",
      itsTime: "حان وقت",
      stop: "إيقاف",
      bearing: "الاتجاه",
      distance: "المسافة إلى الكعبة",
      enableCompass: "تشغيل البوصلة",
      gpsFail: "تعذر تحديد الموقع. اختر مدينة.",
      facing: "أنت مواجه للقبلة",
      turn: "أدر الجهاز حتى تكون الكعبة في الأعلى",
      desktopHint: "أمسك الهاتف بشكل أفقي والشاشة نحو السماء ثم اضغط تشغيل البوصلة.",
      pcHint: "على الحاسوب يبقى الشمال في الأعلى. علامة الكعبة هي اتجاه القبلة من مدينتك. استخدم الهاتف للبوصلة المباشرة.",
      headingLabel: "الاتجاه",
      compassDenied: "رُفض الإذن. آيفون: الإعدادات ← Safari ← الحركة والاتجاه ← تشغيل ثم أعد التحميل.",
      compassUnavailable: "لا توجد بوصلة على هذا الجهاز. أعلى الشاشة = الشمال.",
      compassWait: "اسمح بالحركة إن طُلب منك، وأمسك الهاتف بشكل أفقي.",
      compassCalibrate: "حرّك الهاتف على شكل 8 لمعايرة البوصلة.",
      times: "المواقيت",
      qibla: "القبلة",
      settings: "الإعدادات",
      km: "كم",
      until: "بعد",
      sectionTimes: "المواقيت حسب البلد",
      sectionAlerts: "تنبيه الصلاة",
      highLat: "خطوط العرض العالية",
      highLatAuto: "تلقائي",
      highLatMiddle: "منتصف الليل",
      highLatSeventh: "سُبع الليل",
      highLatAngle: "زاوية الشفق",
      offsets: "تعديل (بالدقائق)",
      offsetHelp: "حرّك كل صلاة لتتوافق مع مسجدك.",
      alertOff: "بدون تنبيه",
      alertOffHelp: "لا صوت ولا إشعار",
      alertNotify: "إشعار بسيط",
      alertNotifyHelp: "تذكير هادئ بدون أذان",
      alertAdhan: "تشغيل الأذان",
      alertAdhanHelp: "صوت الأذان",
      testAlert: "تجربة التنبيه",
      dismiss: "حسنًا",
      recommended: "موصى به لـ",
      sectionMawaqit: "المسجد (Mawaqit)",
      mawaqitHelp: "الأوقات الرسمية لمسجدك كما تظهر على شاشة مواقيت.",
      mawaqitEnable: "استخدام أوقات Mawaqit",
      mawaqitSearch: "البحث عن مسجد",
      mawaqitSearchPh: "المسجد الكبير، ستراسبورغ…",
      mawaqitNearby: "مساجد قريبة مني",
      mawaqitClear: "إزالة المسجد",
      mawaqitFail: "تعذر تحميل Mawaqit. ارفع أيضاً ملف mawaqit.php إلى OVH.",
      mawaqitEmpty: "لم يتم العثور على مسجد.",
      mawaqitIqama: "إظهار الإقامة",
      mawaqitUsing: "أوقات Mawaqit",
      jumua: "الجمعة",
      iqama: "الإقامة",
      groups: {
        europe: "أوروبا",
        maghreb: "شمال أفريقيا",
        gulf: "الشرق الأوسط والخليج",
        asia: "آسيا",
        americas: "الأمريكتان"
      },
      methods: {
        uoif: "فرنسا / بلجيكا (UOIF)",
        mwl: "رابطة العالم الإسلامي",
        moonsighting: "بريطانيا (رؤية الهلال)",
        turkey: "تركيا",
        algeria: "الجزائر",
        morocco: "المغرب",
        tunisia: "تونس",
        egypt: "مصر",
        makkah: "السعودية (أم القرى)",
        dubai: "الإمارات (دبي)",
        kuwait: "الكويت",
        qatar: "قطر",
        karachi: "باكستان / الهند",
        singapore: "سنغافورة / ماليزيا / إندونيسيا",
        tehran: "إيران (طهران)",
        isna: "أمريكا الشمالية (ISNA)"
      },
      prayers: {
        fajr: "الفجر",
        sunrise: "الشروق",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء"
      }
    }
  };

  var ARABIC = {
    fajr: "الفجر",
    sunrise: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء"
  };

  var DUAS = [
    {
      id: "rabbana",
      tag: { fr: "Coran 2:201", en: "Quran 2:201", ar: "البقرة ٢٠١" },
      ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      fr: "Seigneur, donne-nous une belle part ici-bas et dans l'au-delà, et protège-nous du châtiment du Feu.",
      en: "Our Lord, give us good in this world and in the Hereafter, and protect us from the punishment of the Fire."
    },
    {
      id: "afterSalah",
      tag: { fr: "Après la prière", en: "After prayer", ar: "بعد الصلاة" },
      ar: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      fr: "Ô Allah, aide-moi à T'évoquer, à Te remercier et à T'adorer de la plus belle manière.",
      en: "O Allah, help me to remember You, thank You, and worship You in the best way."
    },
    {
      id: "adhan",
      tag: { fr: "Après l'adhan", en: "After the adhan", ar: "بعد الأذان" },
      ar: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
      fr: "Ô Allah, Seigneur de cet appel parfait et de la prière qui s'élève, accorde à Muhammad la Wasila et le rang d'honneur que Tu lui as promis.",
      en: "O Allah, Lord of this perfect call and of the prayer about to be established, grant Muhammad the Wasila and the honored station You promised him."
    },
    {
      id: "knowledge",
      tag: { fr: "Coran 20:114", en: "Quran 20:114", ar: "طه ١١٤" },
      ar: "رَّبِّ زِدْنِي عِلْمًا",
      fr: "Seigneur, augmente-moi en science.",
      en: "My Lord, increase me in knowledge."
    },
    {
      id: "morning",
      tag: { fr: "Le matin", en: "Morning", ar: "الصباح" },
      ar: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      fr: "Nous entamons le matin, et toute la royauté appartient à Allah. Louange à Allah.",
      en: "We have entered the morning, and the dominion belongs to Allah. All praise is for Allah."
    },
    {
      id: "evening",
      tag: { fr: "Le soir", en: "Evening", ar: "المساء" },
      ar: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      fr: "Nous entamons le soir, et toute la royauté appartient à Allah. Louange à Allah.",
      en: "We have entered the evening, and the dominion belongs to Allah. All praise is for Allah."
    },
    {
      id: "guidance",
      tag: { fr: "Al-Fatiha", en: "Al-Fatiha", ar: "الفاتحة" },
      ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      fr: "Guide-nous sur le droit chemin.",
      en: "Guide us on the straight path."
    },
    {
      id: "trust",
      tag: { fr: "Coran 3:173", en: "Quran 3:173", ar: "آل عمران ١٧٣" },
      ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      fr: "Allah nous suffit, et quel excellent Protecteur.",
      en: "Allah is sufficient for us, and He is the best Disposer of affairs."
    }
  ];

  var ICONS = {
    fajr: '<svg viewBox="0 0 24 24"><path d="M15.5 3.5A8 8 0 1 0 20 14.2 6.5 6.5 0 0 1 15.5 3.5z"/></svg>',
    sunrise: '<svg viewBox="0 0 24 24"><path d="M4 19h16v2H4zm8-15 1.8 4.2L18 10l-4.2 1.2L12 15.5l-1.8-4.3L6 10l4.2-1.3z"/></svg>',
    dhuhr: '<svg viewBox="0 0 24 24"><path d="M11 2h2v3h-2zm0 17h2v3h-2zM2 11h3v2H2zm17 0h3v2h-3zM5.6 4.2 7.8 6.4 6.4 7.8 4.2 5.6zm12.4 12 2.2 2.2-1.4 1.4-2.2-2.2zM4.2 18.4 6.4 16.2 7.8 17.6 5.6 19.8zm12-12 2.2-2.2 1.4 1.4-2.2 2.2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>',
    asr: '<svg viewBox="0 0 24 24"><path d="M7 16a5 5 0 0 1 9.6-2 4 4 0 1 1 .4 6H7a4 4 0 0 1 0-4z"/></svg>',
    maghrib: '<svg viewBox="0 0 24 24"><path d="M4 18h16v2H4zm8-12a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z"/></svg>',
    isha: '<svg viewBox="0 0 24 24"><path d="M14 4a8 8 0 1 0 6 12 6.5 6.5 0 0 1-6-12zm4.2 1.3 1.1 2.3 2.5.2-2 1.7.7 2.4-2.3-1.4-2.3 1.4.7-2.4-2-1.7 2.5-.2z"/></svg>'
  };

  var PRAYERS = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  var ADHAN_PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
  var OFFSET_KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  var METHOD_GROUPS = [
    { id: "europe", methods: ["uoif", "mwl", "moonsighting", "turkey"] },
    { id: "maghreb", methods: ["algeria", "morocco", "tunisia", "egypt"] },
    { id: "gulf", methods: ["makkah", "dubai", "kuwait", "qatar"] },
    { id: "asia", methods: ["karachi", "singapore", "tehran"] },
    { id: "americas", methods: ["isna"] }
  ];
  var COUNTRY_METHOD = {
    france: "uoif",
    belgium: "uoif",
    belgique: "uoif",
    luxembourg: "uoif",
    switzerland: "mwl",
    suisse: "mwl",
    germany: "mwl",
    allemagne: "mwl",
    netherlands: "mwl",
    spain: "mwl",
    espagne: "mwl",
    italy: "mwl",
    "united kingdom": "moonsighting",
    "royaume-uni": "moonsighting",
    turkey: "turkey",
    türkiye: "turkey",
    turquie: "turkey",
    algeria: "algeria",
    algérie: "algeria",
    morocco: "morocco",
    maroc: "morocco",
    tunisia: "tunisia",
    tunisie: "tunisia",
    egypt: "egypt",
    égypte: "egypt",
    senegal: "mwl",
    "saudi arabia": "makkah",
    "arabie saoudite": "makkah",
    "united arab emirates": "dubai",
    uae: "dubai",
    "émirats arabes unis": "dubai",
    kuwait: "kuwait",
    koweït: "kuwait",
    qatar: "qatar",
    pakistan: "karachi",
    india: "karachi",
    inde: "karachi",
    bangladesh: "karachi",
    singapore: "singapore",
    singapour: "singapore",
    malaysia: "singapore",
    malaisie: "singapore",
    indonesia: "singapore",
    indonésie: "singapore",
    iran: "tehran",
    "united states": "isna",
    "états-unis": "isna",
    canada: "isna"
  };

  function detectLang() {
    var lang = (navigator.language || "fr").slice(0, 2).toLowerCase();
    return I18N[lang] ? lang : "fr";
  }

  function loadState() {
    var fallback = {
      lat: 48.5734,
      lon: 7.7521,
      city: "Strasbourg",
      country: "France",
      method: "uoif",
      madhab: "shafi",
      highLat: "auto",
      offsets: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 },
      lang: detectLang(),
      hour12: false,
      theme: "dark",
      alertMode: "off",
      volume: 0.9,
      askedLocation: false,
      timesSource: "calc",
      mawaqit: null,
      showIqama: true
    };
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved) return fallback;
      var merged = Object.assign({}, fallback, saved);
      merged.offsets = Object.assign({}, fallback.offsets, saved.offsets || {});
      if (!saved.alertMode) {
        merged.alertMode = saved.adhan ? "adhan" : saved.notify ? "notify" : "off";
      }
      return merged;
    } catch (e) {
      return fallback;
    }
  }

  var state = loadState();
  var todayTimes = null;
  var tomorrowTimes = null;
  var todayIqama = null;
  var mawaqitTimer = null;
  var lastFired = "";
  var searchTimer = null;
  var lastDate = "";
  var toastTimer = null;
  var duaIndex = 0;
  var duaTimer = null;

  var audio = document.getElementById("adhanAudio");

  function t(key) {
    var pack = I18N[state.lang] || I18N.fr;
    var parts = key.split(".");
    var value = pack;
    for (var i = 0; i < parts.length; i++) value = value ? value[parts[i]] : "";
    return value || key;
  }

  function renderClock() {
    var timeEl = document.getElementById("nowTime");
    var dateEl = document.getElementById("nowDateShort");
    if (!timeEl) return;
    var now = new Date();
    var locale = state.lang === "ar" ? "ar" : state.lang === "fr" ? "fr-FR" : "en-GB";
    timeEl.textContent = now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: state.hour12
    });
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString(locale, {
        weekday: "short",
        day: "numeric",
        month: "short"
      });
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "light" ? "#f3f6fb" : "#070b1a");
  }

  function applyLang() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    renderNav();
    fillMethods();
    document.getElementById("langSelect").value = state.lang;
    document.getElementById("methodSelect").value = state.method;
    document.getElementById("madhabSelect").value = state.madhab;
    document.getElementById("highLatSelect").value = state.highLat || "auto";
    document.getElementById("hour12Toggle").checked = state.hour12;
    document.getElementById("volume").value = state.volume;
    OFFSET_KEYS.forEach(function (name) {
      var input = document.getElementById("offset" + name);
      if (input) input.value = state.offsets[name.toLowerCase()] || 0;
    });
    var mode = state.alertMode || "off";
    document.querySelectorAll("input[name=alertMode]").forEach(function (input) {
      input.checked = input.value === mode;
    });
    updateAlertUi();
    updateMethodHint();
    document.getElementById("mawaqitToggle").checked = state.timesSource === "mawaqit";
    document.getElementById("iqamaToggle").checked = !!state.showIqama;
    updateMawaqitUi();
    updateCredit();
    renderClock();
    renderDua();
  }

  function renderNav() {
    var items = [
      { id: "times", label: t("times"), icon: '<svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm.5 3h-1.5v6l4.5 2.7.8-1.3-3.8-2.2z"/></svg>' },
      { id: "settings", label: t("settings"), icon: '<svg viewBox="0 0 24 24"><path d="M10 3h4l.6 2.2a7 7 0 0 1 1.7 1l2.1-.7 2 3.5-1.6 1.5a7 7 0 0 1 0 2l1.6 1.5-2 3.5-2.1-.7a7 7 0 0 1-1.7 1L14 21h-4l-.6-2.2a7 7 0 0 1-1.7-1l-2.1.7-2-3.5 1.6-1.5a7 7 0 0 1 0-2L3.6 9.5l2-3.5 2.1.7a7 7 0 0 1 1.7-1zm2 6.5A2.5 2.5 0 1 0 12 14a2.5 2.5 0 0 0 0-5z"/></svg>' }
    ];
    document.querySelectorAll("[data-nav]").forEach(function (nav) {
      nav.innerHTML = items.map(function (item) {
        return '<button class="nav-btn" type="button" data-go="' + item.id + '">' + item.icon + "<span>" + item.label + "</span></button>";
      }).join("");
    });
    var current = document.querySelector(".panel.active");
    setActiveNav(current ? current.dataset.panel : "times");
  }

  function fillMethods() {
    var select = document.getElementById("methodSelect");
    select.innerHTML = METHOD_GROUPS.map(function (group) {
      return "<optgroup label=\"" + t("groups." + group.id) + "\">" +
        group.methods.map(function (key) {
          return '<option value="' + key + '">' + t("methods." + key) + "</option>";
        }).join("") +
        "</optgroup>";
    }).join("");
  }

  function methodForCountry(country) {
    if (!country) return "";
    return COUNTRY_METHOD[country.toLowerCase()] || "";
  }

  function updateMethodHint() {
    var hint = document.getElementById("methodHint");
    if (!hint) return;
    var suggested = methodForCountry(state.country);
    if (suggested) {
      hint.textContent = t("recommended") + " " + state.country + " : " + t("methods." + suggested);
    } else {
      hint.textContent = "";
    }
  }

  function updateAlertUi() {
    var mode = state.alertMode || "off";
    document.getElementById("adhanOptions").classList.toggle("hidden", mode !== "adhan");
    document.getElementById("testAdhan").classList.toggle("hidden", mode === "off");
    document.querySelectorAll(".alert-choice").forEach(function (label) {
      var input = label.querySelector("input");
      label.classList.toggle("active", !!(input && input.checked));
    });
  }

  function showPanel(id) {
    document.querySelectorAll(".panel").forEach(function (panel) {
      panel.classList.toggle("active", panel.dataset.panel === id);
    });
    setActiveNav(id);
  }

  function setActiveNav(id) {
    document.querySelectorAll(".nav-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-go") === id);
    });
  }

  function paramsFor() {
    var params;
    switch (state.method) {
      case "isna": params = adhan.CalculationMethod.NorthAmerica(); break;
      case "egypt": params = adhan.CalculationMethod.Egyptian(); break;
      case "makkah": params = adhan.CalculationMethod.UmmAlQura(); break;
      case "karachi": params = adhan.CalculationMethod.Karachi(); break;
      case "turkey": params = adhan.CalculationMethod.Turkey(); break;
      case "dubai": params = adhan.CalculationMethod.Dubai(); break;
      case "kuwait": params = adhan.CalculationMethod.Kuwait(); break;
      case "qatar": params = adhan.CalculationMethod.Qatar(); break;
      case "singapore": params = adhan.CalculationMethod.Singapore(); break;
      case "tehran": params = adhan.CalculationMethod.Tehran(); break;
      case "moonsighting": params = adhan.CalculationMethod.MoonsightingCommittee(); break;
      case "mwl": params = adhan.CalculationMethod.MuslimWorldLeague(); break;
      case "algeria":
        params = adhan.CalculationMethod.MuslimWorldLeague();
        params.fajrAngle = 18;
        params.ishaAngle = 17;
        break;
      case "morocco":
        params = adhan.CalculationMethod.Other();
        params.fajrAngle = 18;
        params.ishaAngle = 17;
        break;
      case "tunisia":
        params = adhan.CalculationMethod.Other();
        params.fajrAngle = 18;
        params.ishaAngle = 18;
        break;
      default:
        params = adhan.CalculationMethod.Other();
        params.fajrAngle = 12;
        params.ishaAngle = 12;
    }
    params.madhab = state.madhab === "hanafi" ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;
    var coords = new adhan.Coordinates(state.lat, state.lon);
    var rule = state.highLat || "auto";
    if (rule === "middle") params.highLatitudeRule = adhan.HighLatitudeRule.MiddleOfTheNight;
    else if (rule === "seventh") params.highLatitudeRule = adhan.HighLatitudeRule.SeventhOfTheNight;
    else if (rule === "angle") params.highLatitudeRule = adhan.HighLatitudeRule.TwilightAngle;
    else params.highLatitudeRule = adhan.HighLatitudeRule.recommended(coords);
    var off = state.offsets || {};
    params.adjustments = {
      fajr: Number(off.fajr) || 0,
      sunrise: 0,
      dhuhr: Number(off.dhuhr) || 0,
      asr: Number(off.asr) || 0,
      maghrib: Number(off.maghrib) || 0,
      isha: Number(off.isha) || 0
    };
    return { params: params, coords: coords };
  }

  function parseHm(hm, date) {
    var parts = String(hm || "00:00").split(":");
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(parts[0]) || 0, Number(parts[1]) || 0, 0);
  }

  function calendarDay(calendar, date) {
    if (!calendar) return null;
    var month = calendar[date.getMonth()];
    if (!month) return null;
    return month[String(date.getDate())] || month[date.getDate()] || null;
  }

  function timesFromList(list, date, shuruq) {
    var fajr, sunrise, dhuhr, asr, maghrib, isha;
    if (list && list.length >= 6) {
      fajr = list[0]; sunrise = list[1]; dhuhr = list[2]; asr = list[3]; maghrib = list[4]; isha = list[5];
    } else if (list && list.length >= 5) {
      fajr = list[0]; sunrise = shuruq; dhuhr = list[1]; asr = list[2]; maghrib = list[3]; isha = list[4];
    } else {
      return null;
    }
    return {
      fajr: parseHm(fajr, date),
      sunrise: parseHm(sunrise || fajr, date),
      dhuhr: parseHm(dhuhr, date),
      asr: parseHm(asr, date),
      maghrib: parseHm(maghrib, date),
      isha: parseHm(isha, date)
    };
  }

  function wrapTimes(dates, yesterdayIsha) {
    var obj = Object.assign({}, dates);
    obj.timeForPrayer = function (name) { return obj[name]; };
    obj.nextPrayer = function (now) {
      for (var i = 0; i < ADHAN_PRAYERS.length; i++) {
        if (obj[ADHAN_PRAYERS[i]] > now) return ADHAN_PRAYERS[i];
      }
      return "none";
    };
    obj.currentPrayer = function (now) {
      if (now < obj.fajr) return "none";
      var current = "fajr";
      for (var i = 0; i < PRAYERS.length; i++) {
        if (now >= obj[PRAYERS[i]]) current = PRAYERS[i];
      }
      return current;
    };
    obj._yesterdayIsha = yesterdayIsha || null;
    return obj;
  }

  function iqamaFromSpec(adhanDate, spec) {
    if (!spec && spec !== 0) return null;
    var text = String(spec).trim();
    if (!text) return null;
    if (text.charAt(0) === "+" || text.charAt(0) === "-") {
      var copy = new Date(adhanDate.getTime());
      copy.setMinutes(copy.getMinutes() + parseInt(text, 10));
      return copy;
    }
    if (text.indexOf(":") >= 0) return parseHm(text, adhanDate);
    return null;
  }

  function wrapIqama(adhanObj, specs) {
    if (!adhanObj || !specs) return null;
    var names = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    var out = {};
    names.forEach(function (name, i) {
      out[name] = iqamaFromSpec(adhanObj[name], specs[i]);
    });
    return out;
  }

  async function mawaqitRequest(params) {
    var qs = Object.keys(params).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
    if (params.action === "search") {
      try {
        var direct = "https://mawaqit.net/api/2.0/mosque/search?";
        if (params.word) direct += "word=" + encodeURIComponent(params.word);
        else direct += "lat=" + encodeURIComponent(params.lat) + "&lon=" + encodeURIComponent(params.lon);
        var resDirect = await fetch(direct);
        if (resDirect.ok) return resDirect.json();
      } catch (e) {}
    }
    var res = await fetch("mawaqit.php?" + qs);
    if (!res.ok) throw new Error("mawaqit");
    var data = await res.json();
    if (data && data.error) throw new Error(data.error);
    return data;
  }

  function useCalculatedTimes() {
    var cfg = paramsFor();
    var now = new Date();
    todayTimes = new adhan.PrayerTimes(cfg.coords, now, cfg.params);
    var tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrowTimes = new adhan.PrayerTimes(cfg.coords, tomorrow, cfg.params);
    todayIqama = null;
  }

  async function loadMawaqitTimes() {
    var mosque = state.mawaqit;
    if (!mosque || !mosque.slug) throw new Error("no mosque");
    var data = await mawaqitRequest({ action: "mosque", slug: mosque.slug });
    var now = new Date();
    var tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    var todayList = calendarDay(data.calendar, now) || data.times;
    var tomorrowList = calendarDay(data.calendar, tomorrow);
    var yesterdayList = calendarDay(data.calendar, yesterday);
    var todayObj = timesFromList(todayList, now, data.shuruq);
    if (!todayObj) throw new Error("no times");
    var yIsha = yesterdayList ? timesFromList(yesterdayList, yesterday, data.shuruq).isha : null;
    todayTimes = wrapTimes(todayObj, yIsha);
    if (tomorrowList) {
      tomorrowTimes = wrapTimes(timesFromList(tomorrowList, tomorrow, data.shuruq), todayObj.isha);
    } else {
      var cfg = paramsFor();
      tomorrowTimes = new adhan.PrayerTimes(cfg.coords, tomorrow, cfg.params);
    }
    var iqamaSpecs = calendarDay(data.iqamaCalendar, now);
    todayIqama = wrapIqama(todayTimes, iqamaSpecs);
    if (typeof data.latitude === "number") state.lat = data.latitude;
    if (typeof data.longitude === "number") state.lon = data.longitude;
    if (data.name) {
      state.mawaqit.name = data.name;
      state.city = data.name;
    }
    state.mawaqit.jumua = data.jumua || mosque.jumua;
    save();
  }

  function updateCredit() {
    var note = document.getElementById("creditNote");
    if (!note) return;
    if (state.timesSource === "mawaqit" && state.mawaqit && state.mawaqit.name) {
      note.textContent = t("mawaqitUsing") + " — " + state.mawaqit.name + ". " + t("credit");
    } else {
      note.textContent = t("credit");
    }
  }

  function updateMawaqitUi() {
    var on = state.timesSource === "mawaqit";
    document.getElementById("mawaqitBox").classList.toggle("hidden", !on);
    document.getElementById("calcTimesFields").classList.toggle("hidden", on);
    document.getElementById("mawaqitToggle").checked = on;
    document.getElementById("iqamaToggle").checked = !!state.showIqama;
    var box = document.getElementById("mawaqitSelected");
    if (on && state.mawaqit && state.mawaqit.name) {
      var jumua = state.mawaqit.jumua ? "<div>" + t("jumua") + " " + state.mawaqit.jumua + "</div>" : "";
      box.innerHTML = "<strong>" + state.mawaqit.name + "</strong>" +
        (state.mawaqit.localisation ? "<div>" + state.mawaqit.localisation + "</div>" : "") +
        jumua +
        '<button class="ghost" type="button" id="mawaqitClear">' + t("mawaqitClear") + "</button>";
    } else {
      box.innerHTML = "";
    }
    updateCredit();
  }

  function renderMawaqitResults(list) {
    var box = document.getElementById("mawaqitResults");
    if (!list || !list.length) {
      box.innerHTML = '<p class="field-help">' + t("mawaqitEmpty") + "</p>";
      return;
    }
    box.innerHTML = list.slice(0, 8).map(function (item) {
      var name = String(item.label || item.name || "").replace(/"/g, "");
      var loc = String(item.localisation || "").replace(/"/g, "");
      var slug = String(item.slug || "").replace(/"/g, "");
      var jumua = item.jumua || "";
      return '<button class="mosque-item" type="button" data-slug="' + slug +
        '" data-name="' + name +
        '" data-lat="' + item.latitude +
        '" data-lon="' + item.longitude +
        '" data-loc="' + loc +
        '" data-jumua="' + jumua +
        '"><span><strong>' + name + "</strong><small>" + loc + "</small></span></button>";
    }).join("");
  }

  async function searchMawaqit(query) {
    if (!query || query.length < 2) {
      document.getElementById("mawaqitResults").innerHTML = "";
      return;
    }
    try {
      var list = await mawaqitRequest({ action: "search", word: query });
      renderMawaqitResults(Array.isArray(list) ? list : []);
    } catch (e) {
      document.getElementById("mawaqitResults").innerHTML = '<p class="field-help">' + t("mawaqitFail") + "</p>";
    }
  }

  async function nearbyMawaqit() {
    try {
      var list = await mawaqitRequest({ action: "search", lat: state.lat, lon: state.lon });
      renderMawaqitResults(Array.isArray(list) ? list : []);
    } catch (e) {
      document.getElementById("mawaqitResults").innerHTML = '<p class="field-help">' + t("mawaqitFail") + "</p>";
    }
  }

  async function selectMawaqitMosque(mosque) {
    state.timesSource = "mawaqit";
    state.mawaqit = mosque;
    state.lat = mosque.lat;
    state.lon = mosque.lon;
    state.city = mosque.name;
    state.country = "";
    save();
    document.getElementById("mawaqitResults").innerHTML = "";
    document.getElementById("mawaqitSearch").value = "";
    updateMawaqitUi();
    await computeTimes();
  }

  async function computeTimes() {
    try {
      if (state.timesSource === "mawaqit" && state.mawaqit && state.mawaqit.slug) {
        await loadMawaqitTimes();
      } else {
        useCalculatedTimes();
      }
    } catch (e) {
      useCalculatedTimes();
      if (state.timesSource === "mawaqit") {
        document.getElementById("mawaqitResults").innerHTML = '<p class="field-help">' + t("mawaqitFail") + "</p>";
      }
    }
    updateLocationLabel();
    updateCredit();
    renderTimes();
  }

  function formatTime(date) {
    return date.toLocaleTimeString(state.lang === "ar" ? "ar" : state.lang, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: state.hour12
    });
  }

  function nextInfo(now) {
    var name = todayTimes.nextPrayer(now);
    if (name === adhan.Prayer.None || name === "none") {
      return { name: "fajr", time: tomorrowTimes.fajr, tomorrow: true };
    }
    return { name: name, time: todayTimes.timeForPrayer(name), tomorrow: false };
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function renderTimes() {
    if (!todayTimes) return;
    var now = new Date();
    var next = nextInfo(now);
    document.getElementById("nextName").textContent = t("prayers." + next.name);
    document.getElementById("nextArabic").textContent = ARABIC[next.name];
    var locale = state.lang === "ar" ? "ar-SA" : state.lang === "fr" ? "fr-FR" : "en-GB";
    document.getElementById("gregorianDate").textContent = now.toLocaleDateString(locale, {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
    try {
      document.getElementById("hijriDate").textContent = new Intl.DateTimeFormat(locale + "-u-ca-islamic", {
        day: "numeric", month: "long", year: "numeric"
      }).format(now);
    } catch (e) {
      document.getElementById("hijriDate").textContent = "";
    }

    var diff = next.time - now;
    if (diff < 0) diff = 0;
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var remain = pad(h) + ":" + pad(m) + ":" + pad(s);
    document.getElementById("countdown").textContent = remain;
    var sideName = document.getElementById("sideNextName");
    var sideTime = document.getElementById("sideNextTime");
    if (sideName) sideName.textContent = t("prayers." + next.name);
    if (sideTime) sideTime.textContent = remain;

    var current = todayTimes.currentPrayer(now);
    var start = current === adhan.Prayer.None || current === "none"
      ? (todayTimes._yesterdayIsha || (function () {
          var y = new Date(now);
          y.setDate(y.getDate() - 1);
          return new adhan.PrayerTimes(paramsFor().coords, y, paramsFor().params).isha;
        })())
      : todayTimes.timeForPrayer(current);
    var span = next.time - start;
    var done = span > 0 ? Math.min(100, Math.max(0, ((now - start) / span) * 100)) : 0;
    document.getElementById("progressBar").style.width = done + "%";

    document.getElementById("prayerList").innerHTML = PRAYERS.map(function (name) {
      var time = todayTimes[name];
      var isNext = name === next.name && !next.tomorrow;
      var passed = time <= now && name !== next.name;
      var extra = "";
      if (name === "dhuhr" && now.getDay() === 5 && state.timesSource === "mawaqit" && state.mawaqit && state.mawaqit.jumua) {
        extra += '<div class="iqama">' + t("jumua") + " " + state.mawaqit.jumua + "</div>";
      }
      if (state.showIqama && todayIqama && todayIqama[name]) {
        extra += '<div class="iqama">' + t("iqama") + " " + formatTime(todayIqama[name]) + "</div>";
      }
      return '<article class="prayer' + (isNext ? " next" : "") + (passed ? " passed" : "") + '">' +
        ICONS[name] +
        "<div><h2>" + t("prayers." + name) + '</h2><div class="ar">' + ARABIC[name] + "</div>" + extra + "</div>" +
        "<time>" + formatTime(time) + "</time></article>";
    }).join("");
  }

  function updateLocationLabel() {
    if (state.timesSource === "mawaqit" && state.mawaqit && state.mawaqit.name) {
      document.getElementById("cityName").textContent = state.mawaqit.name;
      document.getElementById("cityMeta").textContent = t("mawaqitUsing") + " · " + t("changeLocation");
      return;
    }
    document.getElementById("cityName").textContent = state.city;
    document.getElementById("cityMeta").textContent = state.country ? state.country + " · " + t("changeLocation") : t("changeLocation");
  }

  function pickDuaForNow() {
    var hour = new Date().getHours();
    var id = hour < 10 ? "morning" : hour >= 17 ? "evening" : "afterSalah";
    var found = DUAS.findIndex(function (dua) { return dua.id === id; });
    duaIndex = found >= 0 ? found : 0;
  }

  function renderDua() {
    var dua = DUAS[duaIndex];
    if (!dua) return;
    document.getElementById("duaArabic").textContent = dua.ar;
    document.getElementById("duaTag").textContent = (dua.tag && dua.tag[state.lang]) || dua.tag.fr;
    document.getElementById("duaMeaning").textContent = state.lang === "ar" ? "" : (dua[state.lang] || dua.fr);
    document.getElementById("duaDots").innerHTML = DUAS.map(function (_, i) {
      return '<button type="button" data-dua="' + i + '"' + (i === duaIndex ? ' class="active"' : "") + ' aria-label="' + (i + 1) + '"></button>';
    }).join("");
  }

  function shiftDua(step) {
    duaIndex = (duaIndex + step + DUAS.length) % DUAS.length;
    renderDua();
    restartDuaTimer();
  }

  function restartDuaTimer() {
    if (duaTimer) clearInterval(duaTimer);
    duaTimer = setInterval(function () {
      duaIndex = (duaIndex + 1) % DUAS.length;
      renderDua();
    }, 18000);
  }

  function setLocation(city) {
    state.lat = city.lat;
    state.lon = city.lon;
    state.city = city.name;
    state.country = city.country || "";
    state.askedLocation = true;
    if (state.timesSource === "mawaqit") {
      state.timesSource = "calc";
      updateMawaqitUi();
    }
    var suggested = methodForCountry(state.country);
    if (suggested) {
      state.method = suggested;
      var methodSelect = document.getElementById("methodSelect");
      if (methodSelect) methodSelect.value = suggested;
    }
    save();
    computeTimes();
    updateMethodHint();
    closeLocation();
  }

  function openLocation() {
    document.getElementById("locationModal").classList.add("open");
    document.getElementById("citySearch").focus();
  }

  function closeLocation() {
    document.getElementById("locationModal").classList.remove("open");
  }

  function renderChips() {
    document.getElementById("cityChips").innerHTML = CITIES.map(function (city) {
      return '<button class="chip" type="button" data-city="' + city.name + '">' + city.name + "</button>";
    }).join("");
  }

  async function searchCity(query) {
    if (!query || query.length < 2) {
      document.getElementById("cityResults").innerHTML = "";
      return;
    }
    try {
      var url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(query) + "&count=6&language=" + state.lang;
      var res = await fetch(url);
      var data = await res.json();
      var results = data.results || [];
      document.getElementById("cityResults").innerHTML = results.map(function (item) {
        var label = [item.name, item.admin1, item.country].filter(Boolean).join(", ");
        return '<button class="city-item" type="button" data-lat="' + item.latitude + '" data-lon="' + item.longitude + '" data-name="' + item.name.replace(/"/g, "") + '" data-country="' + (item.country || "").replace(/"/g, "") + '"><span>' + label + "</span></button>";
      }).join("") || "";
    } catch (e) {
      document.getElementById("cityResults").innerHTML = "";
    }
  }

  function useGps() {
    if (!navigator.geolocation) {
      alert(t("gpsFail"));
      return;
    }
    navigator.geolocation.getCurrentPosition(async function (pos) {
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;
      var city = { name: t("times") === "Horaires" ? "Position actuelle" : "Current location", country: "", lat: lat, lon: lon };
      try {
        var res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude=" + lon + "&localityLanguage=" + state.lang);
        var data = await res.json();
        city.name = data.city || data.locality || data.principalSubdivision || city.name;
        city.country = data.countryName || "";
      } catch (e) {}
      setLocation(city);
    }, function () {
      alert(t("gpsFail"));
    }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 });
  }

  function maybeAskGps() {
    if (state.askedLocation || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (pos) {
      useGpsFrom(pos.coords.latitude, pos.coords.longitude);
    }, function () {
      state.askedLocation = true;
      save();
    }, { timeout: 5000, maximumAge: 600000 });
  }

  async function useGpsFrom(lat, lon) {
    var city = { name: "GPS", country: "", lat: lat, lon: lon };
    try {
      var res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude=" + lon + "&localityLanguage=" + state.lang);
      var data = await res.json();
      city.name = data.city || data.locality || city.name;
      city.country = data.countryName || "";
    } catch (e) {}
    setLocation(city);
  }

  function playAdhanSound() {
    audio.volume = Number(state.volume);
    var start = function () {
      var p = audio.play();
      if (p && p.catch) p.catch(function () {});
    };
    try {
      audio.currentTime = 0;
    } catch (e) {}
    if (audio.readyState >= 2) {
      start();
      return;
    }
    var onReady = function () {
      audio.removeEventListener("canplay", onReady);
      start();
    };
    audio.addEventListener("canplay", onReady);
    audio.load();
  }

  function unlockAudio() {
    audio.volume = Number(state.volume);
    var play = audio.play();
    if (play && play.then) {
      play.then(function () {
        if (!document.getElementById("adhanOverlay").classList.contains("open")) {
          audio.pause();
          audio.currentTime = 0;
        }
      }).catch(function () {});
    }
  }

  function showSimpleNotification(name) {
    document.getElementById("toastName").textContent = t("prayers." + name) + " — " + ARABIC[name];
    document.getElementById("simpleToast").classList.add("open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 8000);
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    try {
      new Notification(t("itsTime") + " — " + t("prayers." + name), {
        body: ARABIC[name],
        tag: "adhan-notify-" + name,
        silent: true,
        icon: new URL("icons/icon.svg", location.href).href
      });
    } catch (e) {}
  }

  function triggerAlert(name) {
    var mode = state.alertMode || "off";
    if (mode === "off") return;
    audio.pause();
    if (mode === "adhan") {
      document.getElementById("adhanName").textContent = t("prayers." + name);
      document.getElementById("adhanArabic").textContent = ARABIC[name];
      document.getElementById("adhanOverlay").classList.add("open");
      playAdhanSound();
      return;
    }
    document.getElementById("adhanOverlay").classList.remove("open");
    showSimpleNotification(name);
  }

  function hideToast() {
    document.getElementById("simpleToast").classList.remove("open");
  }

  function stopAdhan() {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("adhanOverlay").classList.remove("open");
    hideToast();
  }

  function checkAdhan() {
    if (!todayTimes || (state.alertMode || "off") === "off") return;
    var now = new Date();
    ADHAN_PRAYERS.forEach(function (name) {
      var time = todayTimes[name];
      var stamp = now.toDateString() + "-" + name;
      if (now >= time && now < time.getTime() + 45000 && lastFired !== stamp) {
        lastFired = stamp;
        triggerAlert(name);
      }
    });
  }

  async function enableAlertsIfNeeded(mode) {
    if (mode === "adhan") unlockAudio();
    if ((mode === "notify" || mode === "adhan") && "Notification" in window && Notification.permission !== "granted") {
      try { await Notification.requestPermission(); } catch (e) {}
    }
  }

  function tick() {
    var today = new Date().toDateString();
    if (lastDate && lastDate !== today) computeTimes();
    lastDate = today;
    renderTimes();
    renderClock();
    checkAdhan();
  }

  function bind() {
    document.body.addEventListener("click", function (event) {
      var go = event.target.closest("[data-go]");
      if (go) {
        var panelId = go.getAttribute("data-go");
        showPanel(panelId);
      }
      var cityChip = event.target.closest("[data-city]");
      if (cityChip) {
        var found = CITIES.find(function (c) { return c.name === cityChip.getAttribute("data-city"); });
        if (found) setLocation(found);
      }
      var mosqueBtn = event.target.closest(".mosque-item");
      if (mosqueBtn) {
        selectMawaqitMosque({
          slug: mosqueBtn.getAttribute("data-slug"),
          name: mosqueBtn.getAttribute("data-name"),
          lat: parseFloat(mosqueBtn.getAttribute("data-lat")),
          lon: parseFloat(mosqueBtn.getAttribute("data-lon")),
          localisation: mosqueBtn.getAttribute("data-loc") || "",
          jumua: mosqueBtn.getAttribute("data-jumua") || ""
        });
      }
      if (event.target.id === "mawaqitClear") {
        state.timesSource = "calc";
        save();
        updateMawaqitUi();
        computeTimes();
      }
      var duaDot = event.target.closest("[data-dua]");
      if (duaDot) {
        duaIndex = Number(duaDot.getAttribute("data-dua"));
        renderDua();
        restartDuaTimer();
      }
      var cityItem = event.target.closest(".city-item");
      if (cityItem) {
        setLocation({
          name: cityItem.getAttribute("data-name"),
          country: cityItem.getAttribute("data-country"),
          lat: parseFloat(cityItem.getAttribute("data-lat")),
          lon: parseFloat(cityItem.getAttribute("data-lon"))
        });
      }
    });

    document.getElementById("mawaqitToggle").addEventListener("change", function (e) {
      state.timesSource = e.target.checked ? "mawaqit" : "calc";
      save();
      updateMawaqitUi();
      computeTimes();
      if (e.target.checked && !(state.mawaqit && state.mawaqit.slug)) nearbyMawaqit();
    });
    document.getElementById("iqamaToggle").addEventListener("change", function (e) {
      state.showIqama = e.target.checked;
      save();
      renderTimes();
    });
    document.getElementById("mawaqitSearch").addEventListener("input", function (e) {
      clearTimeout(mawaqitTimer);
      mawaqitTimer = setTimeout(function () { searchMawaqit(e.target.value.trim()); }, 280);
    });
    document.getElementById("mawaqitNearby").addEventListener("click", nearbyMawaqit);
    document.getElementById("openLocation").addEventListener("click", openLocation);
    document.getElementById("closeLocation").addEventListener("click", closeLocation);
    document.getElementById("locationModal").addEventListener("click", function (e) {
      if (e.target.id === "locationModal") closeLocation();
    });
    document.getElementById("useGps").addEventListener("click", useGps);
    document.getElementById("citySearch").addEventListener("input", function (e) {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () { searchCity(e.target.value.trim()); }, 280);
    });
    document.getElementById("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      save();
      applyTheme();
    });
    document.getElementById("langSelect").addEventListener("change", function (e) {
      state.lang = e.target.value;
      save();
      applyLang();
      computeTimes();
    });
    document.getElementById("methodSelect").addEventListener("change", function (e) {
      state.method = e.target.value;
      save();
      computeTimes();
      updateMethodHint();
    });
    document.getElementById("madhabSelect").addEventListener("change", function (e) {
      state.madhab = e.target.value;
      save();
      computeTimes();
    });
    document.getElementById("highLatSelect").addEventListener("change", function (e) {
      state.highLat = e.target.value;
      save();
      computeTimes();
    });
    OFFSET_KEYS.forEach(function (name) {
      document.getElementById("offset" + name).addEventListener("change", function (e) {
        var value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = 0;
        value = Math.max(-15, Math.min(30, value));
        e.target.value = value;
        state.offsets[name.toLowerCase()] = value;
        save();
        computeTimes();
      });
    });
    document.getElementById("hour12Toggle").addEventListener("change", function (e) {
      state.hour12 = e.target.checked;
      save();
      renderTimes();
      renderClock();
    });
    document.querySelectorAll("input[name=alertMode]").forEach(function (input) {
      input.addEventListener("change", async function (e) {
        if (!e.target.checked) return;
        state.alertMode = e.target.value;
        save();
        updateAlertUi();
        await enableAlertsIfNeeded(state.alertMode);
      });
    });
    document.getElementById("volume").addEventListener("input", function (e) {
      state.volume = Number(e.target.value);
      audio.volume = state.volume;
      save();
    });
    document.getElementById("testAdhan").addEventListener("click", function () {
      var name = nextInfo(new Date()).name;
      triggerAlert(name);
      if (state.alertMode === "notify") enableAlertsIfNeeded("notify");
    });
    document.getElementById("stopAdhan").addEventListener("click", stopAdhan);
    document.getElementById("dismissToast").addEventListener("click", hideToast);
    document.getElementById("duaPrev").addEventListener("click", function () { shiftDua(-1); });
    document.getElementById("duaNext").addEventListener("click", function () { shiftDua(1); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        var timesOpen = document.getElementById("panel-times").classList.contains("active");
        var modalOpen = document.getElementById("locationModal").classList.contains("open");
        if (timesOpen && !modalOpen) shiftDua(e.key === "ArrowRight" ? 1 : -1);
      }
      if (e.key !== "Escape") return;
      closeLocation();
      stopAdhan();
    });
  }

  function initSky() {
    var canvas = document.getElementById("sky");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var stars = [];
    var shooting = null;
    var last = 0;
    var nextShot = 2500;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var w = 0;
    var h = 0;
    var rafId = 0;

    var lastLight = null;

    function isLight() {
      return document.documentElement.getAttribute("data-theme") === "light";
    }

    function seed() {
      var light = isLight();
      lastLight = light;
      var count = light
        ? Math.round(Math.min(48, Math.max(22, (w * h) / 28000)))
        : Math.round(Math.min(180, Math.max(70, (w * h) / 11000)));
      if (reduce) count = Math.min(count, light ? 16 : 80);
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: light ? 1 + Math.random() * 1.4 : Math.random() * 1.6 + 0.4,
          s: 0.35 + Math.random() * 1.4,
          p: Math.random() * Math.PI * 2,
          drift: (Math.random() - 0.5) * 0.12,
          fall: light ? 0.12 + Math.random() * 0.22 : 0.08 + Math.random() * 0.28,
          sway: 0.5 + Math.random() * 1.1,
          kind: Math.random()
        });
      }
    }

    function resize() {
      var light = isLight();
      var dpr = light ? 1 : Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function spawnShot() {
      shooting = {
        x: Math.random() * w * 0.72,
        y: Math.random() * h * 0.38,
        len: 70 + Math.random() * 110,
        speed: 11 + Math.random() * 9,
        life: 0,
        max: 38 + Math.random() * 22,
        ang: 0.35 + Math.random() * 0.35
      };
    }

    function paint(now) {
      rafId = requestAnimationFrame(paint);
      if (document.hidden) return;
      var light = isLight();
      if (light && now - last < 48) return;
      var dt = Math.min(40, now - last || 16);
      last = now;
      if (light !== lastLight) resize();
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        if (!reduce) {
          if (light) {
            st.y += st.fall * dt * 0.045;
            if (st.y > h + 6) {
              st.y = -6;
              st.x = Math.random() * w;
            }
          } else {
            st.x += st.drift * dt * 0.02;
            st.y += st.drift * dt * 0.012;
            if (st.x < -4) st.x = w + 4;
            if (st.x > w + 4) st.x = -4;
            if (st.y < -4) st.y = h + 4;
            if (st.y > h + 4) st.y = -4;
          }
        }

        if (light) {
          ctx.fillStyle = st.kind > 0.55
            ? "rgba(212, 175, 55, 0.42)"
            : "rgba(110, 160, 220, 0.36)";
          ctx.fillRect(st.x, st.y, st.r, st.r);
          continue;
        }

        var tw = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(now * 0.0012 * st.s + st.p));

        var alpha = tw * 0.95;
        var color;
        if (st.kind > 0.8) color = "rgba(240, 215, 140, " + alpha + ")";
        else if (st.kind < 0.2) color = "rgba(140, 190, 255, " + alpha + ")";
        else color = "rgba(230, 238, 255, " + alpha + ")";

        if (st.r > 1.15 && tw > 0.62) {
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r * 3.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(160, 200, 255, " + (tw * 0.16) + ")";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      if (reduce || light) return;
      if (!shooting && now > nextShot) spawnShot();
      if (!shooting) return;

      shooting.life += dt * 0.065;
      shooting.x += Math.cos(shooting.ang) * shooting.speed * dt * 0.065;
      shooting.y += Math.sin(shooting.ang) * shooting.speed * dt * 0.065;
      var fade = 1 - shooting.life / shooting.max;
      if (fade <= 0) {
        shooting = null;
        nextShot = now + 8000 + Math.random() * 9000;
        return;
      }
      var tx = shooting.x - Math.cos(shooting.ang) * shooting.len;
      var ty = shooting.y - Math.sin(shooting.ang) * shooting.len;
      var grad = ctx.createLinearGradient(tx, ty, shooting.x, shooting.y);
      grad.addColorStop(0, "rgba(140, 190, 255, 0)");
      grad.addColorStop(1, "rgba(230, 238, 255, " + fade + ")");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(shooting.x, shooting.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(shooting.x, shooting.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, " + fade + ")";
      ctx.fill();
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(paint);
    return function () { cancelAnimationFrame(rafId); };
  }

  function init() {
    audio.volume = Number(state.volume);
    pickDuaForNow();
    applyTheme();
    applyLang();
    renderChips();
    renderClock();
    bind();
    computeTimes();
    restartDuaTimer();
    initSky();
    maybeAskGps();
    setInterval(tick, 1000);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  init();
})();
