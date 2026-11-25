// ============================================================
//  app.js v2  -  NCTB Shikhi Platform — Full Application
// ============================================================

// ---- State ----
let currentPage = 'home';
let pageHistory = [];
let currentClass = null;
let currentSubject = null;
let currentTopicId = null;
let animCurrentStep = 0;
let quizIndex = 0;
let quizScore = 0;
let quizQuestions = [];
let isEnglish = false;
let currentTopicList = [];   // for next/prev navigation

// ---- ALL TOPICS (merged from data files) ----
function getAllTopics() {
  const base = typeof TOPICS !== 'undefined' ? TOPICS : {};
  const pri  = typeof PRIMARY_TOPICS !== 'undefined' ? PRIMARY_TOPICS : {};
  const sec  = typeof SECONDARY_TOPICS !== 'undefined' ? SECONDARY_TOPICS : {};
  return Object.assign({}, base, pri, sec);
}

function getAllCurriculum() {
  const base = typeof CURRICULUM !== 'undefined' ? CURRICULUM : {};
  const pri  = typeof PRIMARY_CURRICULUM !== 'undefined' ? PRIMARY_CURRICULUM : {};
  const sec  = typeof SECONDARY_CURRICULUM !== 'undefined' ? SECONDARY_CURRICULUM : {};
  // Merge per class
  const merged = {};
  [base, pri, sec].forEach(src => {
    Object.keys(src).forEach(cls => {
      if (!merged[cls]) merged[cls] = {};
      Object.assign(merged[cls], src[cls]);
    });
  });
  return merged;
}

// ---- Bengali number helper ----
const BN = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
function bn(n) { return String(n).split('').map(d => BN[d] ?? d).join(''); }

const BANGLA_NUMS = ['','১ম','২য়','৩য়','৪র্থ','৫ম','৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম'];
const CLASS_EMOJI = {1:'🌱',2:'🌿',3:'🌳',4:'⭐',5:'🏅',6:'🚀',7:'💡',8:'🔬',9:'🎓',10:'🏆'};

// ============================================================
//  BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildClassGrids();
  updateProgressPage();
  animateOnScroll();
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) closeSearch();
  });
});

// ============================================================
//  LANGUAGE
// ============================================================
function toggleLang() {
  isEnglish = !isEnglish;
  document.getElementById('langBtn').textContent = isEnglish ? 'বাং' : 'EN';
  showToast(isEnglish ? '🌐 Switched to English labels' : '🇧🇩 বাংলায় ফিরে আসো!');
}

// ============================================================
//  PAGE NAVIGATION
// ============================================================
function showPage(id) {
  if (currentPage !== id) pageHistory.push(currentPage);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  currentPage = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Update nav active
  ['home','classes','progress'].forEach(n => {
    const el = document.getElementById('nav' + n.charAt(0).toUpperCase() + n.slice(1));
    if (el) el.classList.toggle('nav-active', n === id);
  });
}

function goBack() {
  const prev = pageHistory.pop();
  if (prev) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + prev).classList.add('active');
    currentPage = prev;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else showPage('home');
}

// ============================================================
//  SEARCH
// ============================================================
function liveSearch(val) {
  const dd = document.getElementById('searchDropdown');
  const all = getAllTopics();
  if (!val.trim()) { dd.classList.remove('open'); return; }
  const q = val.toLowerCase();
  const results = Object.values(all).filter(t =>
    t.name.includes(val) || t.nameEn.toLowerCase().includes(q) ||
    t.desc.includes(val) || (t.subject && t.subject.includes(q))
  ).slice(0, 10);

  if (!results.length) {
    dd.innerHTML = `<div class="search-item"><span class="si-label">কোনো ফলাফল পাওয়া যায়নি 😔</span></div>`;
  } else {
    dd.innerHTML = results.map(t => {
      const sub = SUBJECTS[t.subject] || {};
      return `<div class="search-item" onclick="openTopic('${t.id}')">
        <span style="font-size:1.5rem">${sub.emoji||'📖'}</span>
        <div>
          <div class="si-label">${t.name}</div>
          <div class="si-meta">${BANGLA_NUMS[t.class]||''} শ্রেণি • ${sub.name||t.subject}</div>
        </div>
      </div>`;
    }).join('');
  }
  dd.classList.add('open');
  document.getElementById('searchOverlay').classList.add('open');
}

function showSearchDropdown() {
  const val = document.getElementById('searchInput').value;
  if (val.trim()) liveSearch(val);
}

function closeSearch() {
  document.getElementById('searchDropdown').classList.remove('open');
  document.getElementById('searchOverlay').classList.remove('open');
}

// ============================================================
//  CLASS GRIDS
// ============================================================
function buildClassGrids() {
  const primary   = document.getElementById('primaryGrid');
  const secondary = document.getElementById('secondaryGrid');
  const cur = getAllCurriculum();

  for (let c = 1; c <= 10; c++) {
    const cl = CLASSES[c] || { name: BANGLA_NUMS[c]+' শ্রেণি', subjects: [] };
    const subCount = (cur[c] ? Object.keys(cur[c]).length : 0) || cl.subjects.length;
    const card = document.createElement('div');
    card.className = 'class-card';
    card.onclick = () => openClassDetail(c);
    card.innerHTML = `
      <div class="cc-emoji">${CLASS_EMOJI[c]}</div>
      <div class="cc-num">${BANGLA_NUMS[c]}</div>
      <div class="cc-name">${BANGLA_NUMS[c]} শ্রেণি</div>
      <div class="cc-sub">${bn(subCount)}টি বিষয়</div>
    `;
    if (c <= 5) primary.appendChild(card);
    else secondary.appendChild(card);
  }
}

function quickJump(c) {
  currentClass = c;
  openClassDetail(c);
}

// ============================================================
//  CLASS DETAIL PAGE
// ============================================================
function openClassDetail(classNum) {
  currentClass = classNum;
  document.getElementById('classDetailTitle').textContent =
    `${CLASS_EMOJI[classNum]} ${BANGLA_NUMS[classNum]} শ্রেণি`;
  document.getElementById('classDetailSub').textContent = 'বিষয় বেছে নাও:';

  const cur = getAllCurriculum();
  const classCur = cur[classNum] || {};
  const cl = CLASSES[classNum] || {};
  const subjectKeys = Object.keys(classCur).length
    ? Object.keys(classCur)
    : (cl.subjects || []);

  // Build subject filter buttons
  const filterWrap = document.getElementById('subjectFilterWrap');
  filterWrap.innerHTML = '';
  if (!subjectKeys.length) {
    filterWrap.innerHTML = '<p style="color:var(--muted);padding:.5rem">এই শ্রেণির বিষয় শীঘ্রই আসছে!</p>';
  } else {
    subjectKeys.forEach((key, i) => {
      const sub = SUBJECTS[key] || { name: key, emoji: '📖' };
      const btn = document.createElement('button');
      btn.className = 'sf-btn' + (i === 0 ? ' active' : '');
      btn.textContent = `${sub.emoji} ${isEnglish ? sub.nameEn||sub.name : sub.name}`;
      btn.onclick = () => {
        document.querySelectorAll('.sf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderClassTopics(classNum, key);
      };
      filterWrap.appendChild(btn);
    });
  }

  // Show first subject
  const firstKey = subjectKeys[0];
  renderClassTopics(classNum, firstKey);
  showPage('classdetail');
}

function renderClassTopics(classNum, subjectKey) {
  const container = document.getElementById('classTopicsContainer');
  container.innerHTML = '';

  const all = getAllTopics();
  const cur = getAllCurriculum();
  const topicIds = (cur[classNum] && cur[classNum][subjectKey]) || [];

  if (!subjectKey) return;
  const sub = SUBJECTS[subjectKey] || { name: subjectKey, emoji: '📖', nameEn: subjectKey };

  const hdr = document.createElement('div');
  hdr.className = 'topic-subj-hdr';
  hdr.innerHTML = `
    <span class="tsj-icon">${sub.emoji}</span>
    <div class="tsj-info">
      <h3>${isEnglish ? sub.nameEn||sub.name : sub.name}</h3>
      <p>${bn(classNum)} শ্রেণি • ${bn(topicIds.length)}টি অধ্যায়</p>
    </div>
  `;
  container.appendChild(hdr);

  const list = document.createElement('div');
  list.className = 'topics-list';
  const prog = getProgress();

  if (!topicIds.length) {
    list.innerHTML = `<div style="text-align:center;padding:2.5rem;color:var(--muted)"><div style="font-size:3rem">🚧</div><p style="margin-top:.75rem;font-weight:600">এই বিষয়ের টপিক শীঘ্রই আসছে!</p></div>`;
  } else {
    topicIds.forEach((tid, i) => {
      const t = all[tid];
      if (!t) return;
      const isDone = prog[tid]?.done;
      const item = document.createElement('div');
      item.className = 'topic-item' + (isDone ? ' done-item' : '');
      item.onclick = () => openTopic(tid);
      item.innerHTML = `
        <div class="t-num">${bn(i+1)}</div>
        <div class="t-info">
          <div class="t-name">${isEnglish ? t.nameEn||t.name : t.name}</div>
          <div class="t-desc">${t.desc}</div>
          <div class="t-badges">
            <span class="tbadge tbadge-anim">🎬 Animation</span>
            <span class="tbadge tbadge-quiz">🎮 Quiz</span>
            ${isDone ? `<span class="tbadge tbadge-done">✅ সম্পন্ন • ${bn(prog[tid].score||0)}%</span>` : ''}
          </div>
        </div>
        <div class="t-arrow">›</div>
      `;
      list.appendChild(item);
    });
  }
  container.appendChild(list);
  currentTopicList = topicIds;
}

// ============================================================
//  SUBJECT PAGE (all classes combined)
// ============================================================
function openSubject(subjectKey) {
  currentSubject = subjectKey;
  const sub = SUBJECTS[subjectKey] || { name: subjectKey, emoji: '📖', nameEn: subjectKey };
  document.getElementById('subjectTitle').textContent = `${sub.emoji} ${isEnglish ? sub.nameEn||sub.name : sub.name}`;

  const container = document.getElementById('topicsContainer');
  container.innerHTML = '';
  const all = getAllTopics();
  const prog = getProgress();

  const list = document.createElement('div');
  list.className = 'topics-list';
  let count = 0;

  // Group by class
  for (let c = 1; c <= 10; c++) {
    const classTopics = Object.values(all).filter(t => t.subject === subjectKey && t.class === c);
    if (!classTopics.length) continue;

    const sep = document.createElement('div');
    sep.style.cssText = 'font-weight:800;font-size:.9rem;color:var(--muted);margin:1.25rem 0 .6rem;padding-left:.5rem;border-left:3px solid var(--p)';
    sep.textContent = `${CLASS_EMOJI[c]} ${BANGLA_NUMS[c]} শ্রেণি`;
    list.appendChild(sep);

    classTopics.forEach(t => {
      count++;
      const isDone = prog[t.id]?.done;
      const item = document.createElement('div');
      item.className = 'topic-item' + (isDone ? ' done-item' : '');
      item.onclick = () => openTopic(t.id);
      item.innerHTML = `
        <div class="t-num">${bn(count)}</div>
        <div class="t-info">
          <div class="t-name">${isEnglish ? t.nameEn||t.name : t.name}</div>
          <div class="t-desc">${t.desc}</div>
          <div class="t-badges">
            <span class="tbadge tbadge-anim">🎬 Animation</span>
            <span class="tbadge tbadge-quiz">🎮 Quiz</span>
            <span class="tbadge tbadge-class">${BANGLA_NUMS[t.class]} শ্রেণি</span>
            ${isDone ? `<span class="tbadge tbadge-done">✅ ${bn(prog[t.id].score||0)}%</span>` : ''}
          </div>
        </div>
        <div class="t-arrow">›</div>
      `;
      list.appendChild(item);
    });
  }

  if (!count) {
    list.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--muted)"><div style="font-size:3rem">🚧</div><p style="margin-top:.75rem;font-weight:600">এই বিষয়ের টপিক শীঘ্রই আসছে!</p></div>`;
  }
  container.appendChild(list);
  showPage('subject');
}

// ============================================================
//  TOPIC VIEWER
// ============================================================
function openTopic(topicId) {
  const all = getAllTopics();
  const topic = all[topicId];
  if (!topic) return;
  currentTopicId = topicId;

  // Learn tab
  document.getElementById('topicTitle').textContent = isEnglish ? topic.nameEn||topic.name : topic.name;
  document.getElementById('topicBody').innerHTML = topic.content || '<p>Content লোড হচ্ছে...</p>';

  // Key points
  const kp = document.getElementById('keyPoints');
  kp.innerHTML = (topic.keyPoints || []).map(p => `<li>${p}</li>`).join('');

  // Difficulty
  const diff = topic.difficulty || 2;
  document.getElementById('difficultyWrap').innerHTML = `
    <div class="diff-label">কঠিনতার মাত্রা</div>
    <div class="diff-stars">${'⭐'.repeat(diff)}${'☆'.repeat(5-diff)}</div>
  `;

  // Next topic
  buildNextTopicLink(topicId);

  // Reset anim
  animCurrentStep = 0;
  renderAnimStep(topic);

  // Reset quiz
  quizIndex = 0; quizScore = 0;
  quizQuestions = [...(topic.quiz || [])];
  document.getElementById('quizScoreDisplay').textContent = 'স্কোর: ০';
  document.getElementById('quizProgFill').style.width = '0%';

  switchTab('learn');
  showPage('topic');
}

function buildNextTopicLink(topicId) {
  const all = getAllTopics();
  const cur = getAllCurriculum();
  const t = all[topicId];
  if (!t) return;

  const classCur = cur[t.class] || {};
  const subTopics = classCur[t.subject] || [];
  const idx = subTopics.indexOf(topicId);
  const nextId = subTopics[idx + 1];
  const row = document.getElementById('nextTopicRow');

  if (nextId && all[nextId]) {
    const next = all[nextId];
    row.style.display = 'flex';
    row.innerHTML = `
      <div><div class="nt-label">পরবর্তী টপিক</div><div class="nt-name">${next.name}</div></div>
      <span style="font-size:1.5rem;color:var(--p)">→</span>
    `;
    row.onclick = () => openTopic(nextId);
  } else {
    row.style.display = 'none';
  }
}

// ============================================================
//  TAB SWITCHING
// ============================================================
function switchTab(name) {
  ['learn','animate','quiz'].forEach(t => {
    document.getElementById('tab-' + t).classList.toggle('active', t === name);
    document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1)).classList.toggle('active', t === name);
  });
  if (name === 'animate') {
    const all = getAllTopics();
    if (currentTopicId) renderAnimStep(all[currentTopicId]);
  }
  if (name === 'quiz') {
    quizIndex = 0; quizScore = 0;
    const all = getAllTopics();
    if (currentTopicId) {
      quizQuestions = [...(all[currentTopicId]?.quiz || [])];
    }
    document.getElementById('quizScoreDisplay').textContent = 'স্কোর: ০';
    renderQuiz();
  }
}

// ============================================================
//  ANIMATION ENGINE
// ============================================================
function renderAnimStep(topic) {
  if (!topic || !topic.animSteps) return;
  const steps = topic.animSteps;
  const step  = steps[animCurrentStep];
  if (!step) return;

  document.getElementById('stepCounter').textContent =
    `ধাপ ${bn(animCurrentStep+1)} / ${bn(steps.length)}`;
  document.getElementById('prevStep').disabled = animCurrentStep === 0;
  document.getElementById('nextStep').disabled = animCurrentStep === steps.length - 1;

  // Step dots
  const dots = document.getElementById('stepDots');
  dots.innerHTML = steps.map((_,i) =>
    `<div class="sdot${i===animCurrentStep?' active':''}" onclick="goToStep(${i})"></div>`
  ).join('');

  const scene   = document.getElementById('animScene');
  const caption = document.getElementById('animCaption');
  caption.textContent = step.label;
  scene.innerHTML = '';

  if (step.scene === 'emoji') {
    const el = document.createElement('div');
    el.className = 'scene-visual';
    el.innerHTML = `<span class="sc-emoji">${step.emoji}</span>${step.title ? `<div class="sc-title">${step.title}</div>` : ''}`;
    scene.appendChild(el);

  } else if (step.scene === 'diagram') {
    const diag = document.createElement('div');
    diag.className = 'scene-diagram';
    (step.items || []).forEach((item, i) => {
      const isArrow = ['→','←','↑','↓','=','+','-','×','÷','→\n'].includes(item.trim());
      if (isArrow) {
        const a = document.createElement('div');
        a.className = 'sc-arrow';
        a.textContent = item;
        diag.appendChild(a);
      } else {
        const box = document.createElement('div');
        box.className = 'sc-box' + (step.green ? ' green' : '') + (step.yellow ? ' yellow' : '');
        box.textContent = item;
        box.style.animationDelay = (i * 0.08) + 's';
        diag.appendChild(box);
      }
    });
    scene.appendChild(diag);

  } else if (step.scene === 'numbers') {
    const wrap = document.createElement('div');
    wrap.className = 'scene-visual';
    const nums = document.createElement('div');
    nums.className = 'sc-numbers';
    (step.numbers || []).forEach((n, i) => {
      const box = document.createElement('div');
      box.className = 'sc-num';
      box.textContent = n;
      box.style.animationDelay = (i * 0.07) + 's';
      nums.appendChild(box);
    });
    wrap.appendChild(nums);
    scene.appendChild(wrap);

  } else if (step.scene === 'table') {
    const wrap = document.createElement('div');
    wrap.className = 'scene-visual';
    const tbl = document.createElement('table');
    tbl.className = 'sc-table';
    if (step.headers) {
      const tr = document.createElement('tr');
      step.headers.forEach(h => { const th = document.createElement('th'); th.textContent = h; tr.appendChild(th); });
      tbl.appendChild(tr);
    }
    (step.rows || []).forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => { const td = document.createElement('td'); td.textContent = cell; tr.appendChild(td); });
      tbl.appendChild(tr);
    });
    wrap.appendChild(tbl);
    scene.appendChild(wrap);
  }
}

function animStep(dir) {
  const all = getAllTopics();
  const topic = all[currentTopicId];
  if (!topic) return;
  animCurrentStep = Math.max(0, Math.min(topic.animSteps.length - 1, animCurrentStep + dir));
  renderAnimStep(topic);
}

function goToStep(i) {
  animCurrentStep = i;
  const all = getAllTopics();
  renderAnimStep(all[currentTopicId]);
}

// ============================================================
//  QUIZ ENGINE
// ============================================================
function renderQuiz() {
  const container = document.getElementById('quizContent');
  container.innerHTML = '';
  updateQuizProgress();

  if (!quizQuestions.length) {
    container.innerHTML = `<div class="qcard"><p style="text-align:center;color:var(--muted)">এই টপিকে এখনো Quiz যোগ করা হয়নি। শীঘ্রই আসছে! 🚧</p></div>`;
    return;
  }

  if (quizIndex >= quizQuestions.length) { showQuizResult(); return; }

  const q = quizQuestions[quizIndex];
  const letters = ['ক','খ','গ','ঘ'];
  const card = document.createElement('div');
  card.className = 'qcard';
  card.innerHTML = `
    <div class="qnum">প্রশ্ন ${bn(quizIndex+1)} / ${bn(quizQuestions.length)}</div>
    <div class="qtext">${q.q}</div>
    <div class="opts" id="optGrid"></div>
  `;
  container.appendChild(card);

  const grid = card.querySelector('#optGrid');
  (q.opts || []).forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => checkAnswer(i, q, card);
    grid.appendChild(btn);
  });
}

function checkAnswer(selected, q, card) {
  const btns = card.querySelectorAll('.opt-btn');
  btns.forEach(b => b.disabled = true);
  const isOk = selected === q.ans;
  if (isOk) quizScore++;

  btns[selected].classList.add(isOk ? 'correct' : 'wrong');
  if (!isOk && q.ans < btns.length) btns[q.ans].classList.add('correct');

  document.getElementById('quizScoreDisplay').textContent = `স্কোর: ${bn(quizScore)}`;

  const fb = document.createElement('div');
  fb.className = `feedback ${isOk ? 'ok' : 'bad'}`;
  fb.innerHTML = `${isOk ? '✅ সঠিক উত্তর!' : '❌ ভুল হয়েছে!'}<div class="feedback-exp">${q.exp || ''}</div>`;
  card.appendChild(fb);

  const nxt = document.createElement('button');
  nxt.className = 'next-q-btn';
  nxt.textContent = quizIndex + 1 < quizQuestions.length ? 'পরের প্রশ্ন →' : '🏆 ফলাফল দেখো';
  nxt.onclick = () => { quizIndex++; renderQuiz(); };
  card.appendChild(nxt);
  updateQuizProgress();
}

function updateQuizProgress() {
  const pct = quizQuestions.length > 0 ? (quizIndex / quizQuestions.length) * 100 : 0;
  document.getElementById('quizProgFill').style.width = pct + '%';
}

function showQuizResult() {
  const total = quizQuestions.length;
  const pct   = total > 0 ? Math.round((quizScore / total) * 100) : 0;
  const stars  = pct >= 90 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : pct >= 30 ? 2 : 1;
  const emoji  = pct >= 80 ? '🏆' : pct >= 60 ? '😊' : pct >= 40 ? '📚' : '💪';
  const msg    = pct >= 80 ? 'অসাধারণ! তুমি এই টপিক খুব ভালো বুঝেছো!'
               : pct >= 60 ? 'ভালো করেছো! আরেকটু চেষ্টা করলে পারফেক্ট হবে!'
               : pct >= 40 ? 'চলতে থাকো! আবার পড়ে Quiz দাও।'
               : 'হাল ছেড়ো না! Animation দেখো তারপর আবার চেষ্টা করো। 💪';

  saveProgress(currentTopicId, pct);
  updateProgressPage();

  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-result">
      <div class="res-emoji">${emoji}</div>
      <div class="res-score">${bn(quizScore)}/${bn(total)}</div>
      <div class="res-pct">${pct}%</div>
      <div class="star-row">${Array(5).fill(0).map((_,i)=>`<span class="star" style="animation-delay:${i*.15}s">${i<stars?'⭐':'☆'}</span>`).join('')}</div>
      <div class="res-msg">${msg}</div>
      <div class="res-actions">
        <button class="btn-primary" onclick="retryQuiz()">🔄 আবার দাও</button>
        <button class="btn-outline" onclick="switchTab('learn')">📖 আবার পড়ো</button>
        <button class="btn-outline" onclick="switchTab('animate')">🎬 Animation</button>
      </div>
    </div>
  `;
  document.getElementById('quizProgFill').style.width = '100%';
  showToast(pct >= 70 ? '🏆 দারুণ স্কোর!' : '📚 আরো ভালো করো!');
}

function retryQuiz() {
  quizIndex = 0; quizScore = 0;
  const all = getAllTopics();
  quizQuestions = [...(all[currentTopicId]?.quiz || [])];
  document.getElementById('quizScoreDisplay').textContent = 'স্কোর: ০';
  renderQuiz();
}

// ============================================================
//  PROGRESS PAGE
// ============================================================
function updateProgressPage() {
  const prog = getProgress();
  const done = Object.values(prog).filter(p => p.done).length;
  const scores = Object.values(prog).filter(p => p.score != null).map(p => p.score);
  const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;

  // Summary cards
  document.getElementById('progSummary').innerHTML = `
    <div class="prog-card"><div class="prog-num">${bn(done)}</div><div class="prog-lbl">টপিক সম্পন্ন</div></div>
    <div class="prog-card"><div class="prog-num">${bn(avg)}%</div><div class="prog-lbl">গড় Quiz স্কোর</div></div>
    <div class="prog-card"><div class="prog-num">🔥${bn(1)}</div><div class="prog-lbl">দিনের Streak</div></div>
  `;

  // Per-subject progress
  const subjectsProg = document.getElementById('subjectsProg');
  subjectsProg.innerHTML = '';
  const all = getAllTopics();
  ['bangla','math','science','english','physics','chemistry','biology','history','geo','social'].forEach(key => {
    const sub = SUBJECTS[key];
    if (!sub) return;
    const topicsInSub = Object.values(all).filter(t => t.subject === key);
    if (!topicsInSub.length) return;
    const doneCount = topicsInSub.filter(t => prog[t.id]?.done).length;
    const pct = Math.round((doneCount / topicsInSub.length) * 100);
    subjectsProg.innerHTML += `
      <div class="sp-item">
        <div class="sp-top"><span class="sp-name">${sub.emoji} ${sub.name}</span><span class="sp-pct">${pct}%</span></div>
        <div class="sp-bar"><div class="sp-fill" style="width:${pct}%;background:linear-gradient(90deg,${sub.color},${sub.color}bb)"></div></div>
        <div class="sp-meta">${bn(doneCount)}/${bn(topicsInSub.length)} টপিক সম্পন্ন</div>
      </div>
    `;
  });

  // Recent activity
  const recent = document.getElementById('recentActivity');
  const recentItems = Object.entries(prog)
    .filter(([,v]) => v.done)
    .sort(([,a],[,b]) => (b.date||0) - (a.date||0))
    .slice(0, 5);

  if (!recentItems.length) {
    recent.innerHTML = `<p style="color:var(--muted);font-size:.9rem;padding:.5rem">এখনো কোনো টপিক শেষ করোনি। শুরু করো! 🚀</p>`;
  } else {
    recent.innerHTML = recentItems.map(([tid, v]) => {
      const t = all[tid];
      const sub = t ? SUBJECTS[t.subject] : null;
      return `<div class="recent-item">
        <span class="ri-emoji">${sub?.emoji||'📖'}</span>
        <div class="ri-info">
          <div class="ri-name">${t?.name||tid}</div>
          <div class="ri-meta">${sub?.name||''} • ${BANGLA_NUMS[t?.class||1]||''} শ্রেণি</div>
        </div>
        <div class="ri-score">${bn(v.score||0)}%</div>
      </div>`;
    }).join('');
  }
}

// ============================================================
//  CLASS ROW FILTER (HOME)
// ============================================================
function filterClassRow(type, btn) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.cpill.primary').forEach(p => p.classList.toggle('hidden', type !== 'primary'));
  document.querySelectorAll('.cpill.secondary').forEach(p => p.classList.toggle('hidden', type !== 'secondary'));
}

// ============================================================
//  HELPERS
// ============================================================
function animateOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, parseInt(e.target.dataset.delay || 0));
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feat-card').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(28px)';
    c.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(c);
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
