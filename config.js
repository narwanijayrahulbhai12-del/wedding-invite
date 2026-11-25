/* =====================================================================
   OPAL ROMANCE WEDDING INVITATION  -  EDIT THIS FILE ONLY
   Change the text between the quotes. Keep the quotes, commas and brackets.
   Save, then refresh the preview. Anything you delete falls back to the demo value.
   Dates: "YYYY-MM-DDTHH:MM:SS+05:30"   e.g. "2027-02-14T19:00:00+05:30"
   ===================================================================== */
window.WEDDING_CONFIG = {

  /* ---------- COUPLE ---------- */
  groom: { firstName: "Darshan", lastName: "Kewalramani", fatherName: "Mr Sanjay Kewalramani", motherName: "Mrs Kajal Kewalramani",
           grandfatherName: "Late Shree Narayandas Kewalramani", grandmotherName: "Late Shreemati Jayshree Kewalramani",   /* grandparents - shown in a "Grand S/O ..." card. Leave "" to hide */
           photo: "",            /* e.g. "/photos/groom.jpg"  ("" = template artwork) */
           about: "Loves cricket, old Bollywood songs, and his mother's rajma chawal.", instagram: "Darshan.Kewalramani" },
  bride: { firstName: "Khyati", lastName: "Kapoor", fatherName: "Mr Gopal Kapoor", motherName: "Mrs Sunita Kapoor",
           grandfatherName: "Late Shree Ram Kapoor", grandmotherName: "Late Shreemati Sita Kapoor",   /* e.g. "Late Shri Ramesh Sharma" / "Smt. Kamla Sharma" */
           photo: "",            /* e.g. "/photos/bride.jpg" */
           about: "A classical dancer who never says no to a road trip.", instagram: "Khyati.sharma" },
  
  coupleQuote: "Do dil ek jaan, ab shuru hoga naya safar.",
  hashtag: "#KhyatiWedsDarshan",
  weddingDate: "2026-12-12T19:00:00+05:30",
  weddingTime: "7:00 PM onwards",

  /* ---------- ONE VENUE FOR EVERYTHING ----------
     If every function is at the same place, fill this in. It is applied to ALL events below, so you get a
     single venue card. To remove it, delete this block (or set venueName: ""). A single event can keep its own
     place by adding  ownVenue: true  inside it.  An event can also be left out of the venue cards with
     hideFromVenues: true. */
  nameOrder: "bride",
    finaleName: "Kapoor Family",
  venue: { venueName: "Shri Chhapru Hall", address: "Ghogha Circle, Bhavnagar", mapUrl: "https://www.google.com/maps?rlz=1C1RXQR_en-GBIN1195IN1195&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgoIAhAAGLEDGIAEMgcIAxAAGIAEMg0IBBAuGK8BGMcBGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTAxNGowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KT3qFLZlWl85Mfw2d0gHRR1y&daddr=Q575%2B8FR,+Ghogha+Cir,+Near+Bhavnagar+T.V.+Kendra,+Ambawadi,+Krishna+Nagar,+Bhavnagar,+Gujarat+364001" },

  /* ---------- EVENTS (one block per function) ----------
     REMOVE an event : delete its whole  { ... },  block   OR add  show: false  inside it.
     ADD an event    : copy a block and change it.
     The block named "Wedding" (matching weddingDate) is treated as the main venue. */
     heroVenue:false,
  events: [
    { name: "Sangeet", icon: "🎶", date: "2026-12-11T19:00:00+05:30", time: "7:00 PM", venueName: "Shri Chhapru Hall", address: "Ghogha Circle, Bhavnagar", mapUrl: "https://www.google.com/maps?rlz=1C1RXQR_en-GBIN1195IN1195&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgoIAhAAGLEDGIAEMgcIAxAAGIAEMg0IBBAuGK8BGMcBGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTAxNGowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KT3qFLZlWl85Mfw2d0gHRR1y&daddr=Q575%2B8FR,+Ghogha+Cir,+Near+Bhavnagar+T.V.+Kendra,+Ambawadi,+Krishna+Nagar,+Bhavnagar,+Gujarat+364001", dressCode: "Dance & Dinner", dressLabel: "Followed by", order: 2,note: " " , dressIcon: "/photos/dance.png" },
    { name: "Wedding", icon: "💍", date: "2026-12-12T19:00:00+05:30", time: "7:00 PM", venueName: "Shri Chhapru Hall", address: "Ghogha Circle, Bhavnagar", mapUrl: "https://maps.google.com/?q=MG+Road+Gurugram", lat: 28.4595, lng: 77.0266, dressCode: "Followed by Dinner", dressLabel: "With Blessings", order: 3, dressIcon: "/photos/glimpse.png" },
  ],
  music: { enabled: true, file: "/music/song.mp3", startAt: 0, volume: 0.6, loop: true, button: true },

  /* ---------- OUR STORY (timeline) - delete blocks to remove ---------- */
  // story: [
  //   { title: "We First Met", date: "2019-03-14", description: "A mutual friend's birthday party in Delhi — Darshan spilled chai on Khyati's dupatta.", order: 0 },
  //   { title: "First Trip Together", date: "2021-06-02", description: "A weekend in Manali that turned into a week — neither of us wanted to come back.", order: 1 },
  //   { title: "The Proposal", date: "2025-12-25", description: "On a rooftop in Udaipur, under fairy lights, with both families secretly watching.", order: 2 }
  // ],

  /* ---------- GALLERY ----------
     Leave this list empty ( gallery: [] ) to keep the template's demo photos.
     To use your own: put files in the "photos" folder and list them, e.g.
       { url: "/photos/g1.jpg", caption: "Engagement day", order: 0 },                                  */
  // gallery: [],

  /* ---------- FAMILY STYLE ----------
     "photos" = golden-arch photos (template look)      "names" = names only, no photos, clean gold name cards */
  familyStyle: "names",

  /* ---------- FAMILY (golden arches / name cards) ----------
     Each person can have  photo: "/photos/dad.jpg"  (only used when familyStyle is "photos").
     GRANDPARENTS: either use grandfatherName / grandmotherName above, or add people here, e.g.
       { name: "Shri Ramesh Kewalramani", relation: "Grandfather of the Groom", side: "groom" },            */
  familyMembers: [
    // { name: "Late Shri Ram Kapoor", relation: "Grandfather of the Bride", side: "bride", photo: "" },
    // { name: "Late Smt. Sita Kapoor", relation: "Grandmother of the Bride", side: "bride", photo: "" },
    { name: "Mr Sanjay Kewalramani", relation: "Father of the Groom", side: "groom", photo: "" },
    { name: "Mrs Kajal Kewalramani", relation: "Mother of the Groom", side: "groom", photo: "" },
    { name: "Sunil Kewalramani", relation: "Brother of the Groom", side: "groom", photo: "" },
    { name: "Mr Gopal Kapoor", relation: "Father of the Bride", side: "bride", photo: "" },
    { name: "Mrs Sunita Kapoor", relation: "Mother of the Bride", side: "bride", photo: "" },
    { name: "Ayush Kapoor", relation: "Brother of the Bride", side: "bride", photo: "" }
  ],

  /* ---------- CONTACTS ---------- */
  contacts: [
    { name: "Mr Gopal Kapoor", phone: "+91 98242 33150", relation: "Bride's Father" },
    { name: "Ayush Kapoor", phone: "+91 73837 81791", relation: "Bride's Brother" }
  ],

  scratchSection: { enabled: true, revealText: "We're Getting Married!", subText: "Save the date and join us in celebration" },

  /* ---------- SECTIONS: what shows on the page, top to bottom ----------
     REMOVE a section : delete its line (or put // in front of it).
     MOVE a section   : cut its line and paste it elsewhere in the list.
     Neighbours simply join up (e.g. remove "rsvp" and "wishes" follows "venue").

       hero        first screen after the gates (couple picture + names)
       invitation  "Together with their families..." + countdown
       scratch     scratch-card to reveal the date
       couple      couple frames holding hands
       story       our story timeline
       family      golden arches with parents & siblings
       events      red arched cards (Haldi, Mehndi, Sangeet, Wedding...)
       gallery     photo collage
       venue       venue map + address + schedule
       rsvp        RSVP form
       wishes      wishes wall
       contacts    contacts for the day
       finale      "We await your gracious presence" + names + hashtag
       tree        blossom-tree picture at the very end                              */
  sections: [
    "hero",
    "invitation",
    "scratch",
    "couple",
    // "story",
    "family",
    "events",
    // "gallery",
    "venue",
    // "rsvp",
    "wishes",
    "contacts",
    "finale",
    "tree"
  ],

  /* ---------- SETTINGS ----------
     languages: shows a language switcher. Available: en, hi, gu, mr, ta, te, ur
     e.g.  languages: ["en","hi","gu"], defaultLanguage: "en"                           */
  settings: {
    showGuestCount: true,
    languages: ["en"],
    defaultLanguage: "en"
  },

  /* ---------- TEMPLATE PICTURES (optional) ----------
     Replace any built-in picture with your own. Left side = template picture, right side = your file.
     Most useful: the first screen after the gates (portrait = phones, landscape = laptops).
       "hero/portrait.webp":  "/photos/hero-portrait.jpg",
       "hero/landscape.webp": "/photos/hero-landscape.jpg"                              */
  images: {
  },

  /* ---------- FOOTER ---------- */
  footerCredit: "Made by Jay Narwani",
  footerLink: "",

  /* ---------- WISHES WALL + RSVP + EMAIL (Google Sheet) ----------
     Paste the "Web app URL" you get from apps-script.gs here (steps are in SETUP-WISHES-EMAIL.txt).
     Then: every RSVP and wish goes into your Google Sheet and is emailed to you,
           and APPROVED wishes show on the wishes wall for everyone.
     Leave "" to keep the template's sample wishes.                                                       */
  webAppUrl: "https://script.google.com/macros/s/AKfycby7dZr-5962upnfi6Ltxg9xYOyrpMP2gBnkU3S8soSnQRQgZZucPzt8aQgv8LZgwqtAdQ/exec",
  autoApprove: false,      /* true = a wish appears on the wall immediately (no approval). false = you tick "Approved" in the sheet */
  demoWishes: true,        /* false = hide the sample wishes even if webAppUrl is empty */

  /* ---------- RSVP by WhatsApp (optional, works without the sheet) ----------
       rsvpWhatsApp: "919876543210"  -> opens WhatsApp with the guest's reply pre-filled                  */
  rsvpWhatsApp: ""
};
