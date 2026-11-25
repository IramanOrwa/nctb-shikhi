// ============================================================
//  data.js  -  NCTB Curriculum Data (Class 1-5 Sample)
// ============================================================

const CLASSES = {
  1: { name: "১ম শ্রেণি", nameEn: "Class 1", emoji: "🌱", subjects: ["bangla","math","english","environment"] },
  2: { name: "২য় শ্রেণি", nameEn: "Class 2", emoji: "🌿", subjects: ["bangla","math","english","environment"] },
  3: { name: "৩য় শ্রেণি", nameEn: "Class 3", emoji: "🌳", subjects: ["bangla","math","english","environment","religion"] },
  4: { name: "৪র্থ শ্রেণি", nameEn: "Class 4", emoji: "⭐", subjects: ["bangla","math","english","science","social"] },
  5: { name: "৫ম শ্রেণি", nameEn: "Class 5", emoji: "🏅", subjects: ["bangla","math","english","science","social","religion"] },
  6: { name: "৬ষ্ঠ শ্রেণি", nameEn: "Class 6", emoji: "🚀", subjects: ["bangla","math","english","science","social","history","geo","religion"] },
  7: { name: "৭ম শ্রেণি", nameEn: "Class 7", emoji: "💡", subjects: ["bangla","math","english","science","social","history","geo"] },
  8: { name: "৮ম শ্রেণি", nameEn: "Class 8", emoji: "🔬", subjects: ["bangla","math","english","science","social","history","geo"] },
  9: { name: "৯ম শ্রেণি", nameEn: "Class 9", emoji: "🎓", subjects: ["bangla","math","english","physics","chemistry","biology","history","geo"] },
  10: { name: "১০ম শ্রেণি", nameEn: "Class 10", emoji: "🏆", subjects: ["bangla","math","english","physics","chemistry","biology","history","geo"] }
};

const SUBJECTS = {
  bangla:      { name: "বাংলা",           nameEn: "Bangla",        emoji: "অ",  color: "#D97706" },
  math:        { name: "গণিত",            nameEn: "Mathematics",   emoji: "🔢", color: "#2563EB" },
  english:     { name: "English",          nameEn: "English",       emoji: "🔤", color: "#DC2626" },
  science:     { name: "বিজ্ঞান",          nameEn: "Science",       emoji: "🔬", color: "#059669" },
  environment: { name: "পরিবেশ পরিচিতি",  nameEn: "Environment",   emoji: "🌿", color: "#16A34A" },
  social:      { name: "সমাজবিজ্ঞান",     nameEn: "Social Science",emoji: "🏘️", color: "#0891B2" },
  history:     { name: "ইতিহাস",          nameEn: "History",       emoji: "🏛️", color: "#8B5CF6" },
  geo:         { name: "ভূগোল",           nameEn: "Geography",     emoji: "🌍", color: "#0284C7" },
  religion:    { name: "ধর্ম",            nameEn: "Religion",      emoji: "☪️", color: "#D97706" },
  physics:     { name: "পদার্থবিজ্ঞান",   nameEn: "Physics",       emoji: "⚡", color: "#7C3AED" },
  chemistry:   { name: "রসায়ন",          nameEn: "Chemistry",     emoji: "🧪", color: "#B91C1C" },
  biology:     { name: "জীববিজ্ঞান",     nameEn: "Biology",       emoji: "🧬", color: "#059669" }
};

// ---- Topic Data ----
// Each topic has: id, name, desc, content (HTML), keyPoints[], animSteps[], quiz[]

const TOPICS = {
  // ================================================================
  //  MATH - Class 1
  // ================================================================
  "math-c1-t1": {
    id: "math-c1-t1", class: 1, subject: "math",
    name: "সংখ্যা পরিচয় (১-১০)", nameEn: "Numbers 1-10",
    desc: "১ থেকে ১০ পর্যন্ত সংখ্যা চেনা ও গোনা শেখো",
    content: `
      <h4>সংখ্যা কী?</h4>
      <p>সংখ্যা হল যা দিয়ে আমরা জিনিস গুনতে পারি। যেমন — তোমার হাতে ৫টি আঙ্গুল আছে।</p>
      <div class="explain-block">
        🖐️ হাতের আঙুল গুনে দেখো — ১, ২, ৩, ৪, ৫... এভাবেই সংখ্যা শেখা যায়!
      </div>
      <h4>১ থেকে ১০</h4>
      <p>এই সংখ্যাগুলো মনে রাখো:</p>
      <div class="example-block">
        <strong>উদাহরণ:</strong> ১টি আম 🥭 &nbsp; ২টি বল ⚽⚽ &nbsp; ৩টি তারা ⭐⭐⭐
      </div>
      <h4>ছন্দে মনে রাখো</h4>
      <p>এক দুই তিন চার পাঁচ — আমের বাগানে নাচো নাচ! 🎵<br/>
      ছয় সাত আট নয় দশ — পড়াশোনায় করো বশ! 📚</p>
    `,
    keyPoints: ["১ থেকে ১০ পর্যন্ত গোনা", "প্রতিটি সংখ্যার চিহ্ন", "জিনিস গণনা করা"],
    animSteps: [
      { scene: "emoji", emoji: "1️⃣", label: "এক (১) — একটি আম 🥭" },
      { scene: "diagram", items: ["১","২","৩"], label: "এক থেকে তিন গণনা করো" },
      { scene: "emoji", emoji: "🖐️", label: "হাতের ৫টি আঙুল = পাঁচ (৫)" },
      { scene: "diagram", items: ["৬","৭","৮","৯","১০"], label: "ছয় থেকে দশ!" },
      { scene: "emoji", emoji: "🎉", label: "শাবাশ! তুমি ১-১০ সংখ্যা শিখে ফেলেছো!" }
    ],
    quiz: [
      { q: "১ + ১ = কত?", opts: ["১","২","৩","৪"], ans: 1, exp: "১ আম + ১ আম = ২টি আম 🥭🥭" },
      { q: "পাঁচকে সংখ্যায় লিখলে কত হয়?", opts: ["৩","৪","৫","৬"], ans: 2, exp: "পাঁচ = ৫" },
      { q: "১০-এর আগের সংখ্যা কোনটি?", opts: ["৭","৮","৯","১১"], ans: 2, exp: "৯-এর পরে ১০ আসে, তাই ১০-এর আগে ৯" },
      { q: "২ + ৩ = কত?", opts: ["৪","৫","৬","৭"], ans: 1, exp: "২ + ৩ = ৫" }
    ]
  },

  // ================================================================
  //  MATH - Class 2
  // ================================================================
  "math-c2-t1": {
    id: "math-c2-t1", class: 2, subject: "math",
    name: "যোগ ও বিয়োগ", nameEn: "Addition & Subtraction",
    desc: "সহজ যোগ এবং বিয়োগ অঙ্ক শেখো",
    content: `
      <h4>যোগ কী?</h4>
      <p>দুটো বা তার বেশি সংখ্যা একসাথে মেলানোকে যোগ বলে। চিহ্ন হলো <strong>+</strong></p>
      <div class="explain-block">
        🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎 &nbsp;→&nbsp; ২ + ৩ = ৫
      </div>
      <h4>বিয়োগ কী?</h4>
      <p>একটি সংখ্যা থেকে আরেকটি সংখ্যা বাদ দেওয়াকে বিয়োগ বলে। চিহ্ন হলো <strong>−</strong></p>
      <div class="example-block">
        <strong>উদাহরণ:</strong> তোমার কাছে ৮টি চকলেট ছিল। তুমি ৩টি খেয়ে ফেললে। বাকি = ৮ − ৩ = ৫টি 🍫
      </div>
    `,
    keyPoints: ["যোগ চিহ্ন (+)", "বিয়োগ চিহ্ন (−)", "সংখ্যারেখায় যোগ-বিয়োগ"],
    animSteps: [
      { scene: "emoji", emoji: "➕", label: "যোগ মানে একসাথে মেলানো" },
      { scene: "diagram", items: ["৩","➕","৪","=","৭"], label: "৩ + ৪ = ৭ — তিনটি আঙুল আর চারটি আঙুল মিলিয়ে সাতটি!" },
      { scene: "emoji", emoji: "➖", label: "বিয়োগ মানে কমানো বা বাদ দেওয়া" },
      { scene: "diagram", items: ["১০","➖","৪","=","৬"], label: "১০ − ৪ = ৬ — দশটা থেকে চারটা বাদ গেলে ছয়টা থাকে" },
      { scene: "emoji", emoji: "🎯", label: "যোগ ও বিয়োগ শেখা হয়ে গেল! এখন Quiz দাও 🎮" }
    ],
    quiz: [
      { q: "৫ + ৪ = ?", opts: ["৭","৮","৯","১০"], ans: 2, exp: "৫ + ৪ = ৯" },
      { q: "১০ − ৩ = ?", opts: ["৫","৬","৭","৮"], ans: 2, exp: "১০ − ৩ = ৭" },
      { q: "৬ + ৬ = ?", opts: ["১০","১১","১২","১৩"], ans: 2, exp: "৬ + ৬ = ১২" },
      { q: "৯ − ৫ = ?", opts: ["২","৩","৪","৫"], ans: 2, exp: "৯ − ৫ = ৪" }
    ]
  },

  // ================================================================
  //  SCIENCE - Class 3
  // ================================================================
  "science-c3-t1": {
    id: "science-c3-t1", class: 3, subject: "science",
    name: "উদ্ভিদের অংশ", nameEn: "Parts of a Plant",
    desc: "একটি গাছের বিভিন্ন অংশ ও তাদের কাজ",
    content: `
      <h4>গাছের অংশ কয়টি?</h4>
      <p>একটি পূর্ণাঙ্গ গাছের ৬টি প্রধান অংশ আছে।</p>
      <div class="explain-block">
        🌱 মূল → কান্ড → পাতা → ফুল → ফল → বীজ
      </div>
      <h4>প্রতিটি অংশের কাজ</h4>
      <div class="example-block">
        <strong>🌿 মূল:</strong> মাটির নিচে থেকে পানি ও খনিজ টেনে নেয়।<br/>
        <strong>🪵 কান্ড:</strong> গাছকে সোজা রাখে, পানি বহন করে।<br/>
        <strong>🍃 পাতা:</strong> সূর্যের আলোয় খাবার তৈরি করে (সালোকসংশ্লেষণ)।<br/>
        <strong>🌸 ফুল:</strong> পরাগায়নে সাহায্য করে, ফল তৈরি করে।
      </div>
    `,
    keyPoints: ["মূল — পানি শোষণ", "কান্ড — পরিবহন", "পাতা — খাবার তৈরি", "ফুল — প্রজনন"],
    animSteps: [
      { scene: "emoji", emoji: "🌱", label: "একটি ছোট গাছ মাটি থেকে জন্মায়" },
      { scene: "diagram", items: ["🌿 মূল","↑","🪵 কান্ড","↑","🍃 পাতা"], label: "মূল মাটির নিচে, কান্ড উপরে, পাতা আলো পায়" },
      { scene: "emoji", emoji: "☀️", label: "পাতা সূর্যের আলো দিয়ে খাবার তৈরি করে — সালোকসংশ্লেষণ!" },
      { scene: "diagram", items: ["🌸 ফুল","→","🍎 ফল","→","🌰 বীজ"], label: "ফুল থেকে ফল, ফল থেকে বীজ — আবার নতুন গাছ!" },
      { scene: "emoji", emoji: "🌳", label: "শাবাশ! গাছের সব অংশ শেখা হয়ে গেল!" }
    ],
    quiz: [
      { q: "গাছের কোন অংশ মাটির নিচে থাকে?", opts: ["কান্ড","পাতা","মূল","ফুল"], ans: 2, exp: "মূল মাটির নিচে থেকে পানি ও খনিজ শোষণ করে।" },
      { q: "পাতার প্রধান কাজ কী?", opts: ["পানি শোষণ","খাবার তৈরি","ফুল ধরা","বীজ রাখা"], ans: 1, exp: "পাতা সূর্যের আলো দিয়ে সালোকসংশ্লেষণের মাধ্যমে খাবার তৈরি করে।" },
      { q: "ফুল থেকে কী তৈরি হয়?", opts: ["বীজ","পাতা","মূল","কান্ড"], ans: 0, exp: "ফুল পরাগায়নের পর ফলে পরিণত হয় এবং ফলের ভেতরে বীজ থাকে।" },
      { q: "কান্ডের কাজ কী?", opts: ["খাবার তৈরি","পানি শোষণ","পানি ও খাবার বহন","পরাগায়ন"], ans: 2, exp: "কান্ড গাছের এক অংশ থেকে অন্য অংশে পানি ও খাবার বহন করে।" }
    ]
  },

  // ================================================================
  //  BANGLA - Class 1
  // ================================================================
  "bangla-c1-t1": {
    id: "bangla-c1-t1", class: 1, subject: "bangla",
    name: "স্বরবর্ণ পরিচয়", nameEn: "Vowels Introduction",
    desc: "বাংলা ভাষার ১১টি স্বরবর্ণ শেখো",
    content: `
      <h4>স্বরবর্ণ কী?</h4>
      <p>যে বর্ণ উচ্চারণ করতে অন্য বর্ণের সাহায্য লাগে না, তাকে স্বরবর্ণ বলে।</p>
      <div class="explain-block">
        বাংলায় মোট <strong>১১টি</strong> স্বরবর্ণ আছে:<br/>
        অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ
      </div>
      <div class="example-block">
        <strong>মনে রাখার কৌশল:</strong><br/>
        অ — অজগর 🐍<br/>
        আ — আম 🥭<br/>
        ই — ইলিশ 🐟<br/>
        ঈ — ঈগল 🦅<br/>
        উ — উট 🐪
      </div>
    `,
    keyPoints: ["১১টি স্বরবর্ণ", "উচ্চারণ নিয়ম", "প্রতিটি বর্ণের উদাহরণ"],
    animSteps: [
      { scene: "emoji", emoji: "অ", label: "অ — সবার আগে 'অ'। অজগর দিয়ে মনে রাখো! 🐍" },
      { scene: "diagram", items: ["অ","আ","ই","ঈ","উ"], label: "প্রথম পাঁচটি স্বরবর্ণ — উচ্চারণ করো!" },
      { scene: "emoji", emoji: "🥭", label: "আ — আমের মতো মিষ্টি! 'আ' বলার সময় মুখ খোলো।" },
      { scene: "diagram", items: ["ঊ","ঋ","এ","ঐ","ও","ঔ"], label: "বাকি ছয়টি স্বরবর্ণ" },
      { scene: "emoji", emoji: "🎊", label: "বাহ! তুমি সব ১১টি স্বরবর্ণ শিখে ফেলেছো!" }
    ],
    quiz: [
      { q: "বাংলায় মোট স্বরবর্ণ কয়টি?", opts: ["৯টি","১০টি","১১টি","১২টি"], ans: 2, exp: "বাংলায় মোট ১১টি স্বরবর্ণ: অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ" },
      { q: "'আম' শব্দের প্রথম বর্ণ কোনটি?", opts: ["অ","আ","ই","এ"], ans: 1, exp: "'আম' শব্দের প্রথম বর্ণ 'আ'" },
      { q: "স্বরবর্ণ কোনটি?", opts: ["ক","খ","অ","গ"], ans: 2, exp: "'অ' একটি স্বরবর্ণ। ক, খ, গ ব্যঞ্জনবর্ণ।" },
      { q: "'ই' দিয়ে কোন প্রাণীর নাম শুরু?", opts: ["উট","ইলিশ","আম","এলাচ"], ans: 1, exp: "'ই' দিয়ে ইলিশ 🐟" }
    ]
  },

  // ================================================================
  //  SCIENCE - Class 5
  // ================================================================
  "science-c5-t1": {
    id: "science-c5-t1", class: 5, subject: "science",
    name: "সৌরজগৎ", nameEn: "Solar System",
    desc: "আমাদের সৌরজগতের গ্রহ ও নক্ষত্র সম্পর্কে জানো",
    content: `
      <h4>সৌরজগৎ কী?</h4>
      <p>সূর্য এবং তাকে ঘিরে ঘূর্ণমান গ্রহ, উপগ্রহ, গ্রহাণু ও ধূমকেতু নিয়ে সৌরজগৎ গঠিত।</p>
      <div class="explain-block">
        ☀️ সূর্য → ☿ বুধ → ♀️ শুক্র → 🌍 পৃথিবী → ♂️ মঙ্গল → ♃ বৃহস্পতি → ♄ শনি → ♅ ইউরেনাস → ♆ নেপচুন
      </div>
      <div class="example-block">
        <strong>মনে রাখার কৌশল:</strong><br/>
        <em>"বুশুপৃমা বৃশইনে"</em> — বু(ধ) শু(ক্র) পৃ(থিবী) মা(ঙ্গল) বৃ(হস্পতি) শ(নি) ই(উরেনাস) নে(পচুন)
      </div>
      <h4>মজার তথ্য</h4>
      <p>🌍 পৃথিবী সূর্য থেকে তৃতীয় গ্রহ<br/>
      ☀️ সূর্য একটি নক্ষত্র — তার নিজস্ব আলো আছে<br/>
      🌙 চাঁদ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ</p>
    `,
    keyPoints: ["৮টি গ্রহ", "সূর্য একটি নক্ষত্র", "পৃথিবী ৩য় গ্রহ", "চাঁদ পৃথিবীর উপগ্রহ"],
    animSteps: [
      { scene: "emoji", emoji: "☀️", label: "সৌরজগতের কেন্দ্রে আছে সূর্য — একটি বিশাল নক্ষত্র!" },
      { scene: "diagram", items: ["☿","♀️","🌍","♂️"], label: "ভেতরের ৪টি গ্রহ — বুধ, শুক্র, পৃথিবী, মঙ্গল" },
      { scene: "diagram", items: ["♃","♄","♅","♆"], label: "বাইরের ৪টি গ্রহ — বৃহস্পতি, শনি, ইউরেনাস, নেপচুন" },
      { scene: "emoji", emoji: "🌍🌙", label: "পৃথিবীকে ঘিরে চাঁদ ঘোরে — চাঁদ পৃথিবীর উপগ্রহ" },
      { scene: "emoji", emoji: "🚀", label: "মহাকাশ সম্পর্কে আরও জানতে চাইলে Quiz দাও!" }
    ],
    quiz: [
      { q: "সৌরজগতে মোট কয়টি গ্রহ আছে?", opts: ["৭টি","৮টি","৯টি","১০টি"], ans: 1, exp: "সৌরজগতে ৮টি গ্রহ — বুধ, শুক্র, পৃথিবী, মঙ্গল, বৃহস্পতি, শনি, ইউরেনাস, নেপচুন।" },
      { q: "সৌরজগতের কেন্দ্রে কী আছে?", opts: ["পৃথিবী","চাঁদ","সূর্য","মঙ্গল"], ans: 2, exp: "সূর্য সৌরজগতের কেন্দ্রে এবং সব গ্রহ সূর্যকে ঘিরে ঘোরে।" },
      { q: "পৃথিবী সূর্য থেকে কততম গ্রহ?", opts: ["১ম","২য়","৩য়","৪র্থ"], ans: 2, exp: "পৃথিবী সূর্য থেকে ৩য় গ্রহ।" },
      { q: "চাঁদ কীসের উপগ্রহ?", opts: ["সূর্যের","মঙ্গলের","পৃথিবীর","শনির"], ans: 2, exp: "চাঁদ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ।" }
    ]
  },

  // ================================================================
  //  MATH - Class 4
  // ================================================================
  "math-c4-t1": {
    id: "math-c4-t1", class: 4, subject: "math",
    name: "ভগ্নাংশ পরিচয়", nameEn: "Introduction to Fractions",
    desc: "ভগ্নাংশ কী এবং এটি কীভাবে লেখা হয়",
    content: `
      <h4>ভগ্নাংশ কী?</h4>
      <p>কোনো পূর্ণ জিনিসের অংশকে ভগ্নাংশ বলে।</p>
      <div class="explain-block">
        🍕 একটি পিৎজাকে ৪ ভাগ করলে প্রতিটি অংশ = ১/৪ (এক-চতুর্থাংশ)
      </div>
      <h4>ভগ্নাংশের অংশ</h4>
      <div class="example-block">
        <strong>লব</strong> (Numerator) — উপরের সংখ্যা (কতটি অংশ)<br/>
        <strong>হর</strong> (Denominator) — নিচের সংখ্যা (মোট কতটি অংশ)<br/><br/>
        উদাহরণ: ৩/৪ → লব = ৩, হর = ৪
      </div>
    `,
    keyPoints: ["লব ও হর", "পিৎজা উদাহরণ", "সমতুল ভগ্নাংশ"],
    animSteps: [
      { scene: "emoji", emoji: "🍕", label: "একটি পিৎজা নাও — এটি একটি পূর্ণ সংখ্যা (১)" },
      { scene: "diagram", items: ["½","→","এক","ভাগের","দুই"], label: "পিৎজা দুই ভাগ করলে প্রতি ভাগ = ১/২" },
      { scene: "diagram", items: ["লব","─────","হর"], label: "ভগ্নাংশের গঠন: লব / হর" },
      { scene: "diagram", items: ["¼","½","¾","৩/৩=১"], label: "বিভিন্ন ভগ্নাংশ চেনো" },
      { scene: "emoji", emoji: "🎯", label: "ভগ্নাংশ শেখা হয়ে গেল! Quiz দিয়ে দেখো কতটুকু শিখেছো!" }
    ],
    quiz: [
      { q: "১/২ মানে কী?", opts: ["এক ভাগের দুই","দুই ভাগের এক","দুই","এক"], ans: 0, exp: "১/২ মানে একটি জিনিসকে দুই ভাগ করে এক ভাগ নেওয়া।" },
      { q: "৩/৪ ভগ্নাংশের হর কোনটি?", opts: ["৩","৪","৭","১"], ans: 1, exp: "হর হলো নিচের সংখ্যা। ৩/৪-এ নিচের সংখ্যা ৪।" },
      { q: "একটি পিৎজা ৪ ভাগ করলে প্রতি ভাগ কত?", opts: ["১/২","১/৩","১/৪","১/৫"], ans: 2, exp: "৪ ভাগ করলে প্রতি ভাগ = ১/৪" },
      { q: "২/২ = কত?", opts: ["০","½","১","২"], ans: 2, exp: "২/২ = ১ কারণ লব ও হর সমান হলে ভগ্নাংশের মান ১" }
    ]
  }
};

// ---- Curriculum Map: class → subject → [topicIds] ----
const CURRICULUM = {
  1: {
    bangla: ["bangla-c1-t1"],
    math:   ["math-c1-t1"]
  },
  2: {
    math:   ["math-c2-t1"]
  },
  3: {
    science: ["science-c3-t1"]
  },
  4: {
    math:   ["math-c4-t1"]
  },
  5: {
    science: ["science-c5-t1"]
  }
};

// Progress stored in localStorage
function getProgress() {
  return JSON.parse(localStorage.getItem("shikhi_progress") || "{}");
}
function saveProgress(topicId, score) {
  const p = getProgress();
  p[topicId] = { done: true, score, date: Date.now() };
  localStorage.setItem("shikhi_progress", JSON.stringify(p));
}
