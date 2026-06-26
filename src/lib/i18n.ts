export type Lang = "cs" | "en";

export const translations = {
  cs: {
    // Nav
    nav: {
      services: "Služby",
      team: "Tým",
      gallery: "Galerie",
      reviews: "Recenze",
      contact: "Kontakt",
      book: "Rezervovat",
    },
    // Hero
    hero: {
      welcome: "Vítejte v",
      tagline:
        "Kde se krása setkává s uměním. Profesionální péče o vlasy, nehty, make-up a pleť v příjemném prostředí — pro ženy i muže.",
      cta: "Rezervovat termín",
      viewServices: "Zobrazit služby",
      stats: [
        { value: "5+", label: "Let zkušeností" },
        { value: "500+", label: "Spokojených klientů" },
        { value: "4", label: "Odborných stylistů" },
      ],
    },
    // Services
    services: {
      sectionLabel: "Co nabízíme",
      heading: "Naše služby",
      subheading:
        "Od rychlého střihu po kompletní proměnu — nabízíme vše, co potřebujete, abyste vypadali a cítili se skvěle.",
      pricePlaceholder: "Volejte",
      priceNote: "Při objednání předem (telefonicky nebo online) získáte slevu 100 Kč. Ceny jsou orientační.",
      items: [
        {
          title: "Vlasy",
          description:
            "Střihy, barvení a styling pro ženy i muže. Péče přizpůsobená každému typu vlasů.",
          groups: [
            {
              label: "Střihy",
              items: [
                { name: "Pánský střih", price: "300 Kč" },
                { name: "Dámský střih", price: "od 300 Kč" },
                { name: "Dětský střih (1–6 let)", price: "250 Kč" },
              ],
            },
            {
              label: "Vousy",
              items: [
                { name: "Úprava vousů", price: "200 Kč" },
                { name: "Střih + vousy komplet", price: "450 Kč" },
              ],
            },
            {
              label: "Barva & chemie",
              items: [
                { name: "Melír – kratší vlasy", price: "1 200 Kč" },
                { name: "Melír – k ramenům", price: "1 700 Kč" },
                { name: "Melír – delší vlasy", price: "2 000 Kč" },
                { name: "Perma vlasů", price: "od 700 Kč" },
              ],
            },
            {
              label: "Mytí",
              items: [
                { name: "Kratší vlasy", price: "250 Kč" },
                { name: "Delší vlasy", price: "350 Kč" },
              ],
            },
          ],
        },
        {
          title: "Nehty",
          description:
            "Akrylové nehty, francie, ombré a nail art dle přání. Prodloužení a design přizpůsobíme každé klientce.",
          groups: [
            {
              label: "Akrylové",
              items: [
                { name: "Nové akrylové", price: "od 450 Kč" },
                { name: "Doplnění akrylových", price: "od 400 Kč" },
              ],
            },
            {
              label: "Design",
              items: [
                { name: "Francie", price: "od 450 Kč" },
                { name: "Ombré", price: "od 450 Kč" },
                { name: "Prodloužení nehtů", price: "100–300 Kč" },
                { name: "Jakýkoliv design", price: "100–300 Kč" },
              ],
            },
          ],
        },
        {
          title: "Pedikúra",
          description:
            "Profesionální péče o nohy pro ženy i muže. Relaxační a estetická pedikúra s výběrem barev.",
          groups: [
            {
              label: "Základní",
              items: [
                { name: "Pánská pedikúra", price: "400 Kč" },
                { name: "Dámská pedikúra", price: "od 350 Kč" },
              ],
            },
            {
              label: "S lakem",
              items: [
                { name: "Jednobarevná", price: "450 Kč" },
                { name: "Dvoubarevná", price: "500 Kč" },
                { name: "Francie", price: "480 Kč" },
              ],
            },
          ],
        },
        {
          title: "Make-up & Řasy",
          description:
            "Profesionální líčení, prodloužení řas a úprava obočí.",
          groups: [
            {
              label: "",
              items: [
                { name: "Celodenní make-up", price: "—" },
                { name: "Prodloužení řas", price: "—" },
                { name: "Úprava & barvení obočí", price: "—" },
                { name: "Lifting řas", price: "—" },
              ],
            },
          ],
        },
      ],
    },
    // Team
    team: {
      sectionLabel: "Náš tým",
      heading: "Naši specialisté",
      subheading:
        "Tým zkušených odborníků v oblasti krásy, kteří jsou tu pro vás.",
      members: [
        { role: "Majitelka & vrchní stylistka", specialty: "Barvení & střihy vlasů" },
        { role: "Nehtová technička",            specialty: "Nail art & gel"          },
        { role: "Nehtová technička",            specialty: "Nail art & gel"          },
        { role: "Holič / Barber",               specialty: "Pánské střihy & styling" },
        { role: "Holič / Barber",               specialty: "Pánské střihy & styling" },
      ],
    },
    // Gallery
    gallery: {
      sectionLabel: "Naše práce",
      heading: "Galerie",
      subheading: "Ukázka proměn, které každý den tvoříme.",
      followUs: "Sledujte nás na Facebooku",
    },
    // Reviews
    reviews: {
      sectionLabel: "Co říkají klienti",
      heading: "Recenze",
      items: [
        {
          name: "Minh Anh",
          text: "Naprosto miluju tento salon! Linda a její tým jsou tak talentovaní. Moje vlasy nikdy nevypadaly lépe — barva vyšla přesně tak, jak jsem si představovala.",
          service: "Barvení vlasů",
        },
        {
          name: "Thu Hương",
          text: "Nejlepší salon na nehty, ve kterém jsem byla. Gel manikúra vydržela přes tři týdny bez lupání. Prostředí je čisté a personál je velmi přívětivý.",
          service: "Gel manikúra",
        },
        {
          name: "Bảo Châu",
          text: "Přišla jsem na prodloužení řas a odešla jsem úplně proměněná. Velmi profesionální, jemný přístup a výsledek je úžasný. Určitě se vrátím!",
          service: "Prodloužení řas",
        },
      ],
    },
    // Contact
    contact: {
      sectionLabel: "Navštivte nás",
      heading: "Rezervujte si termín",
      subheading:
        "Připraveni na proměnu? Zavolejte nám nebo pošlete zprávu na Facebooku. Příjem bez rezervace závisí na dostupnosti.",
      phone: "Telefon",
      address: "Adresa",
      hours: "Otevírací doba",
      hoursData: [
        { day: "Po – Pá", time: "8:00 – 19:00" },
        { day: "Sobota", time: "8:30 – 19:00" },
        { day: "Neděle", time: "Objednávání" },
      ],
      messageBtn: "Napište nám přes WhatsApp",
      formHeading: "Napište nám",
      formSub: "Odpovíme do 24 hodin.",
      findUs: "Kde nás najdete",
      mapNote: "Vložte zde Google Maps iframe.",
    },
    // Form
    form: {
      name: "Jméno",
      namePlaceholder: "Vaše celé jméno",
      nameRequired: "Jméno je povinné (max 100 znaků).",
      email: "E-mail",
      emailPlaceholder: "vas@email.cz",
      emailRequired: "Zadejte platnou e-mailovou adresu.",
      phone: "Telefon",
      phonePlaceholder: "xxx xxx xxx",
      service: "Služba",
      servicePlaceholder: "Vyberte službu",
      message: "Zpráva",
      messagePlaceholder:
        "Preferovaný termín, datum a podrobnosti o požadované službě…",
      messageRequired: "Zpráva musí mít alespoň 10 znaků.",
      submit: "Rezervovat přes WhatsApp",
      errorGeneric: "Něco se pokazilo. Zkuste to znovu nebo nás kontaktujte telefonicky.",
      successHeading: "Téměř hotovo!",
      successBody:
        "WhatsApp se otevřel s vaší rezervací. Stačí kliknout na Odeslat a Linda vám potvrdí termín.",
      messengerHint: "Pokud se WhatsApp otevřel bez textu, zkopírujte zprávu a vložte ji:",
      copyText: "Zkopírovat",
      copied: "Zkopírováno!",
      openAgain: "Otevřít WhatsApp znovu",
      newBooking: "Nová rezervace",
      services: ["Vlasy – dámský", "Vlasy – pánský", "Nehty", "Pedikúra", "Make-up & Řasy", "Ostatní"],
    },
    // Cookie banner
    cookie: {
      notice: "Tento web používá pouze nezbytné soubory cookie pro správné fungování stránky. Nepoužíváme sledovací ani marketingové cookies.",
      accept: "Rozumím",
      learnMore: "Zásady ochrany soukromí",
    },
    // NFC Review Plates
    nfcReviews: {
      sectionLabel: "Ohodnoťte nás",
      heading: "Zanechte recenzi",
      subheading:
        "V salonu najdete naše NFC destičky — stačí přiložit telefon nebo naskenovat QR kód a ohodnotit nás na Google. Každá recenze nám velmi pomáhá.",
      note: "Destičky jsou umístěny na recepci a u každého pracovního místa.",
    },
    // Footer
    footer: {
      tagline:
        "Profesionální péče o vlasy, nehty, make-up a pleť pro ženy i muže.",
      quickLinks: "Rychlé odkazy",
      followUs: "Sledujte nás",
    },
  },

  en: {
    nav: {
      services: "Services",
      team: "Team",
      gallery: "Gallery",
      reviews: "Reviews",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      welcome: "Welcome to",
      tagline:
        "Where beauty meets artistry. Expert hair, nails, makeup, and skin care in a warm, welcoming space — for women and men.",
      cta: "Book an Appointment",
      viewServices: "View Services",
      stats: [
        { value: "5+", label: "Years Experience" },
        { value: "500+", label: "Happy Clients" },
        { value: "4", label: "Expert Stylists" },
      ],
    },
    services: {
      sectionLabel: "What We Offer",
      heading: "Our Services",
      subheading:
        "From a quick cut to a full transformation — everything you need to look and feel your best.",
      pricePlaceholder: "Call us",
      priceNote: "Book in advance (by phone or online) and get 100 CZK off. Prices are indicative.",
      items: [
        {
          title: "Hair",
          description:
            "Cuts, color, and styling for women and men. Tailored to every hair type.",
          groups: [
            {
              label: "Cuts",
              items: [
                { name: "Men's Haircut", price: "300 CZK" },
                { name: "Women's Haircut", price: "from 300 CZK" },
                { name: "Children's Haircut (1–6 yrs)", price: "250 CZK" },
              ],
            },
            {
              label: "Beard",
              items: [
                { name: "Beard Trim", price: "200 CZK" },
                { name: "Haircut + Beard Combo", price: "450 CZK" },
              ],
            },
            {
              label: "Color & Chemical",
              items: [
                { name: "Highlights – Short Hair", price: "1,200 CZK" },
                { name: "Highlights – Shoulder Length", price: "1,700 CZK" },
                { name: "Highlights – Long Hair", price: "2,000 CZK" },
                { name: "Perm", price: "from 700 CZK" },
              ],
            },
            {
              label: "Washing",
              items: [
                { name: "Short Hair", price: "250 CZK" },
                { name: "Long Hair", price: "350 CZK" },
              ],
            },
          ],
        },
        {
          title: "Nails",
          description:
            "Acrylic nails, French, ombré, and nail art. Extensions and designs tailored to each client.",
          groups: [
            {
              label: "Acrylics",
              items: [
                { name: "New Acrylics", price: "from 450 CZK" },
                { name: "Acrylic Infill", price: "from 400 CZK" },
              ],
            },
            {
              label: "Design",
              items: [
                { name: "French", price: "from 450 CZK" },
                { name: "Ombré", price: "from 450 CZK" },
                { name: "Nail Extensions", price: "100–300 CZK" },
                { name: "Any Design", price: "100–300 CZK" },
              ],
            },
          ],
        },
        {
          title: "Pedicure",
          description:
            "Professional foot care for women and men. Relaxing and aesthetic pedicures with a choice of colours.",
          groups: [
            {
              label: "Basic",
              items: [
                { name: "Men's Pedicure", price: "400 CZK" },
                { name: "Women's Pedicure", price: "from 350 CZK" },
              ],
            },
            {
              label: "With Polish",
              items: [
                { name: "Single Colour", price: "450 CZK" },
                { name: "Two Colour", price: "500 CZK" },
                { name: "French", price: "480 CZK" },
              ],
            },
          ],
        },
        {
          title: "Makeup & Lashes",
          description:
            "Professional makeup, lash extensions, and brow shaping.",
          groups: [
            {
              label: "",
              items: [
                { name: "Full Makeup", price: "—" },
                { name: "Lash Extensions", price: "—" },
                { name: "Brow Shaping & Tint", price: "—" },
                { name: "Lash Lift", price: "—" },
              ],
            },
          ],
        },
      ],
    },
    team: {
      sectionLabel: "Meet the Team",
      heading: "Our Specialists",
      subheading:
        "A passionate team of skilled beauty professionals dedicated to bringing out your best.",
      members: [
        { role: "Owner & Senior Stylist", specialty: "Hair Color & Cuts"    },
        { role: "Nail Technician",        specialty: "Nail Art & Gel"       },
        { role: "Nail Technician",        specialty: "Nail Art & Gel"       },
        { role: "Barber",                 specialty: "Men's Cuts & Styling" },
        { role: "Barber",                 specialty: "Men's Cuts & Styling" },
      ],
    },
    gallery: {
      sectionLabel: "Our Work",
      heading: "Gallery",
      subheading: "A glimpse of the transformations we create every day.",
      followUs: "Follow us on Facebook",
    },
    reviews: {
      sectionLabel: "Client Love",
      heading: "Reviews",
      items: [
        {
          name: "Minh Anh",
          text: "Absolutely love this salon! Linda and her team are so talented. My hair has never looked better — the color came out exactly as I envisioned.",
          service: "Hair Color",
        },
        {
          name: "Thu Hương",
          text: "Best nail salon I've been to. The gel manicure lasted over three weeks without chipping. The space is clean and the staff are so welcoming.",
          service: "Gel Manicure",
        },
        {
          name: "Bảo Châu",
          text: "I came in for lash extensions and left feeling completely transformed. Very professional, gentle, and the result is stunning. Will definitely come back!",
          service: "Lash Extensions",
        },
      ],
    },
    contact: {
      sectionLabel: "Visit Us",
      heading: "Book Your Appointment",
      subheading:
        "Ready for a transformation? Call us or send a message on Facebook. Walk-ins welcome subject to availability.",
      phone: "Phone",
      address: "Address",
      hours: "Opening Hours",
      hoursData: [
        { day: "Mon – Fri", time: "8:00 AM – 7:00 PM" },
        { day: "Saturday", time: "8:30 AM – 7:00 PM" },
        { day: "Sunday", time: "By appointment" },
      ],
      messageBtn: "Message us on WhatsApp",
      formHeading: "Send a Message",
      formSub: "We'll reply within 24 hours.",
      findUs: "Find Us",
      mapNote: "Paste your Google Maps iframe here.",
    },
    form: {
      name: "Name",
      namePlaceholder: "Your full name",
      nameRequired: "Name is required (max 100 characters).",
      email: "Email",
      emailPlaceholder: "you@example.com",
      emailRequired: "A valid email address is required.",
      phone: "Phone",
      phonePlaceholder: "xxx xxx xxx",
      service: "Service",
      servicePlaceholder: "Select a service",
      message: "Message",
      messagePlaceholder: "Preferred date, time, and details about the service you'd like…",
      messageRequired: "Message must be at least 10 characters.",
      submit: "Book via WhatsApp",
      errorGeneric: "Something went wrong. Please try again or call us directly.",
      successHeading: "Almost there!",
      successBody:
        "WhatsApp opened with your booking details. Just tap Send to confirm your appointment.",
      messengerHint: "If WhatsApp opened empty, copy the message below and paste it:",
      copyText: "Copy",
      copied: "Copied!",
      openAgain: "Open WhatsApp Again",
      newBooking: "New booking",
      services: ["Hair – Women's", "Hair – Men's", "Nails", "Pedicure", "Makeup & Lashes", "Other"],
    },
    // Cookie banner
    cookie: {
      notice: "This site uses only essential cookies necessary for basic functionality. No tracking or marketing cookies are used.",
      accept: "Got it",
      learnMore: "Privacy Policy",
    },
    // NFC Review Plates
    nfcReviews: {
      sectionLabel: "Rate Us",
      heading: "Leave a Review",
      subheading:
        "Find our NFC review plates in the salon — tap your phone or scan the QR code to rate us on Google. Every review means the world to us.",
      note: "Plates are placed at the reception and at each workstation.",
    },
    footer: {
      tagline:
        "Professional hair, nails, makeup, and skin care for women and men.",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
    },
  },
} as const;
