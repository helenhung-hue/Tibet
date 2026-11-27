const photos = {
  namcha: { label: '南迦巴瓦山脈', alt: '金色陽光下的南迦巴瓦山脈', file: 'Namcha_Barwa,_%E5%8D%97%E8%BF%A6%E5%B7%B4%E7%93%A6.jpg', author: '梁逸晨', license: '3.0', position: '57% 50%' },
  basum: { label: '巴松措', alt: '巴松措湖水，遠處是森林與雪山', file: 'BasumTso.jpg', author: 'Kosi Gramatikoff', license: 'CC0' },
  yamdrok: { label: '羊卓雍措', alt: '山坡間的藍綠色羊卓雍措', file: 'Yamdrok_Lake,_Tibet.jpg', author: '钉钉', license: '4.0', position: '50% 62%' },
  namtso: { label: '納木措', alt: '納木措、湖岸經幡與遠方的雪山', file: 'Namtso_lake_and_snow-capped_mountain.jpg', author: 'yuen yan', license: '2.0', position: '50% 62%' },
  potala: { label: '布達拉宮', alt: '山坡上的布達拉宮紅宮與白宮', file: 'Potala_Palace_in_Lhasa,_Tibet.jpg', author: 'Jan Kranendonk', license: '4.0', position: '50% 42%' },
  monastery: { label: '扎什倫布寺', alt: '日喀則扎什倫布寺的院落和寺殿', file: 'Tashilhunpo_Monastery.jpg', author: 'Dennis G. Jarvis', license: '2.0' },
  jokhang: { label: '大昭寺', alt: '拉薩大昭寺前方和金色屋頂', file: 'Jokhang_Temple.jpg', author: 'Mountain Wave Project', license: '3.0' }
};
const photoByScene = new Map([
  [S.namcha_dusk, 'namcha'], [S.namcha_dawn, 'namcha'], [S.pass, 'namcha'],
  [S.basum, 'basum'], [S.yamdrok, 'yamdrok'], [S.namtso, 'namtso'], [S.potala, 'potala'],
  [S.monastery, 'monastery'], [S.jokhang, 'jokhang']
]);
const destinations = [
  [1, 'namcha', '林芝 · 索松村'], [5, 'yamdrok', '拉薩往日喀則'],
  [7, 'namtso', '當雄 · 扎西半島'], [8, 'potala', '拉薩市區']
];
const support = {
  1: { map: [['佛掌沙丘', '佛掌沙丘', '林芝'], ['索松村', '索松村', '林芝']] },
  2: { map: [['雅尼濕地', '雅尼国家湿地公园', '林芝'], ['色季拉山口', '色季拉山口', '林芝']], backup: '如有高原不適，或司機確認山口結冰、路況欠佳，取消色季拉山口，改留林芝市區休息。' },
  3: { map: [['新措', '新措', '林芝'], ['結巴村', '结巴村', '林芝']], backup: '如步道結冰或封閉，取消新措徒步。若結巴村通行安全，可改在村內短走，避開湖冰。' },
  4: { map: [['巴松措', '巴松措', '林芝']] },
  5: { map: [['羊卓雍措', '羊卓雍措', '山南'], ['卡若拉冰川', '卡若拉冰川', '山南']], backup: '如山口封閉、道路結冰或有人不適，請司機重新確認前往日喀則的路線，按情況取消羊湖及冰川停留。' },
  6: { map: [['扎什倫布寺', '扎什伦布寺', '日喀则'], ['羅布林卡', '罗布林卡', '拉萨']] },
  7: { map: [['那根拉山口', '那根拉山口', '拉萨'], ['納木措扎西半島', '纳木措扎西半岛', '拉萨']], backup: '如那根拉封路、強風、能見度低或有人不適，取消納木措。留在拉薩休息，按情況選甜茶館或八廓街短走。' },
  8: { map: [['布達拉宮', '布达拉宫', '拉萨'], ['大昭寺', '大昭寺', '拉萨'], ['八廓街', '八廓街', '拉萨']], backup: '如布達拉宮預約時間有變，按預約時段調整順序。買不到票時，可改到布宮廣場和八廓街，開放以當日公告為準。' }
};

const byId = id => document.getElementById(id);
const format = value => value.toLocaleString('en-US');
const dayCode = day => day.travel ? '交通日' : `D${day.n}`;
const altitude = value => value ? `${format(value)} m` : '—';
const dayDate = day => `${day.date}（${day.wd}）`;

function photoMarkup(key, eager = false, decorative = false) {
  const photo = photos[key];
  return `<img class="media-img" src="assets/photos/${key}.webp" style="--photo-position:${photo.position || 'center'}" alt="${decorative ? '' : photo.alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function sceneMarkup(preset, eager = false, decorative = false) {
  const key = photoByScene.get(preset);
  return key ? photoMarkup(key, eager, decorative) : scene(preset);
}

function photoCredit(key) {
  const photo = photos[key];
  const cc0 = photo.license === 'CC0';
  const terms = cc0 ? 'publicdomain/zero/1.0' : `licenses/by-sa/${photo.license}`;
  return `<a href="https://commons.wikimedia.org/wiki/File:${photo.file}" target="_blank" rel="noopener">${photo.label}</a> · ${photo.author} · <a href="https://creativecommons.org/${terms}/" target="_blank" rel="noopener">${cc0 ? 'CC0 1.0' : `CC BY-SA ${photo.license}`}</a>`;
}

byId('photo-credits').innerHTML = `<p>實景相片來自 Wikimedia Commons，經縮放及版面裁切。所示光線、積雪及湖面狀況會隨日期變化。</p><ul class="credit-list">${Object.keys(photos).map(key => `<li>${photoCredit(key)}</li>`).join('')}</ul>`;
byId('destinations').innerHTML = destinations.map(([day, key, area]) => `
  <a class="destination" href="#day-${day}">
    <span class="destination-media">${photoMarkup(key, false, true)}</span>
    <span class="destination-copy"><small>D${day} · ${DAYS[day].date}</small><strong>${photos[key].label}</strong><span>${area}</span></span>
  </a>`).join('');
byId('weather-plans').innerHTML = `<section class="panel winter-card" id="winter" aria-labelledby="winter-title">
  <h3 id="winter-title" tabindex="-1">冬季備案</h3>
  <ul class="backup-list">${DAYS.filter(day => support[day.n]?.backup).map(day => `<li><a href="#day-${day.n}">D${day.n} · ${day.date}</a>　${support[day.n].backup}</li>`).join('')}</ul>
</section>`;

const yearFor = day => day.date.startsWith('12/') ? '2026' : '2027';
const isoDate = day => `${yearFor(day)}-${day.date.split('/').map(part => part.padStart(2, '0')).join('-')}`;
const dateFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' });
const arrive = new Date('2026-12-25T11:15:00+08:00');
const start = new Date('2026-12-24T00:00:00+08:00');
const end = new Date('2027-01-04T00:00:00+08:00');
let displayedDay;

function tick() {
  const now = new Date();
  const parts = Object.fromEntries(dateFormat.formatToParts(now).map(({ type, value }) => [type, value]));
  const today = DAYS.find(day => isoDate(day) === `${parts.year}-${parts.month}-${parts.day}`);
  const box = byId('count');
  const note = byId('count-note');
  if (today !== displayedDay) {
    document.querySelector('.dayrow.today')?.classList.remove('today');
    byId(`today-${displayedDay?.n}`)?.setAttribute('hidden', '');
    if (today) {
      byId(`row-${today.n}`).classList.add('today');
      byId(`today-${today.n}`).hidden = false;
    }
    displayedDay = today;
  }
  box.hidden = now >= arrive;
  if (now < arrive) {
    const remaining = Math.max(0, Math.floor((arrive - now) / 60000));
    byId('cd-d').textContent = Math.floor(remaining / 1440);
    byId('cd-h').textContent = String(Math.floor(remaining / 60) % 24).padStart(2, '0');
    byId('cd-m').textContent = String(remaining % 60).padStart(2, '0');
    note.textContent = now < start ? '距離降落林芝 · 12/25 11:15' : '旅程已開始 · 12/25 11:15 抵達林芝';
  } else if (now < end && today) {
    note.innerHTML = `<a class="text-link" href="#day-${today.n}">今日行程 · ${today.title}</a>`;
  } else {
    note.textContent = '旅程已完成';
  }
}

byId('daylist').innerHTML = DAYS.map(day => `
  <a href="#day-${day.n}" id="row-${day.n}" class="dayrow${day.travel ? ' travel' : ''}">
    <span class="thumb" aria-hidden="true">${sceneMarkup(day.hero, false, true)}</span>
    <span class="drow-t"><span class="dn">${dayCode(day)} · ${dayDate(day)}</span><b>${day.title}<span class="today-tag" id="today-${day.n}" hidden>今天</span></b><span>${day.area}</span></span>
    ${day.peak ? `<span class="altpill${day.peak >= 4500 ? ' hi' : ''}"><span class="visually-hidden">最高海拔 </span>${altitude(day.peak)}</span>` : '<span class="chev" aria-hidden="true">›</span>'}
  </a>`).join('');
byId('day-picker').innerHTML = DAYS.map(day => `<option value="${day.n}">${day.date} · ${day.title}</option>`).join('');
byId('day-picker').addEventListener('change', event => { location.hash = `day-${event.target.value}`; });
tick();
setInterval(tick, 30000);

function renderAltitude() {
  const days = DAYS.filter(day => day.n >= 1 && day.n <= 9);
  const x = i => 43 + i * 37.5;
  const y = metres => 149 - (metres - 2500) * 0.044;
  const grid = [3000, 4000, 5000].map(metres => `<line class="grid" x1="43" x2="344" y1="${y(metres)}" y2="${y(metres)}"/><text class="lab" x="3" y="${y(metres) + 4}">${metres / 1000}k</text>`).join('');
  const terrain = days.map((day, i) => {
    const label = `<text class="lab" x="${x(i)}" y="169" text-anchor="middle">D${day.n}</text>`;
    const stem = day.sleep && day.peak > day.sleep ? `<line class="stem" x1="${x(i)}" x2="${x(i)}" y1="${y(day.peak)}" y2="${y(day.sleep)}"/>` : '';
    const peak = day.peak ? `<circle class="peak" cx="${x(i)}" cy="${y(day.peak)}" r="3.5"/>` : '';
    const peakLabel = day.peak >= 5000 ? `<text class="plab" x="${x(i)}" y="${y(day.peak) - 10}" text-anchor="middle">${format(day.peak)}</text>` : '';
    return label + stem + peak + peakLabel;
  }).join('');
  const sleeping = days.flatMap((day, i) => day.sleep ? [[x(i), y(day.sleep)]] : []);
  byId('altchart').innerHTML = grid + terrain + `<polyline class="sleep" points="${sleeping.map(point => point.join(',')).join(' ')}"/>` + sleeping.map(([cx, cy]) => `<circle class="sleepdot" cx="${cx}" cy="${cy}" r="3"/>`).join('');
  byId('alt-table').innerHTML = `<table><thead><tr><th scope="col">日子</th><th scope="col">住宿海拔</th><th scope="col">最高點</th></tr></thead><tbody>${days.map(day => `<tr><th scope="row"><a href="#day-${day.n}">D${day.n} · ${day.date}</a></th><td>${altitude(day.sleep)}</td><td>${altitude(day.peak)}</td></tr>`).join('')}</tbody></table><p class="small muted">D9 住宿成都，圖表只列原行程的高原住宿海拔。</p>`;
}
renderAltitude();

function renderDay(day) {
  const { n, hotel } = day;
  const before = DAYS[n - 1];
  const after = DAYS[n + 1];
  const extra = support[n];
  const heroPhoto = photoByScene.get(day.hero);
  const next = byId('db-next');
  next.href = after ? `#day-${after.n}` : '#itinerary';
  next.textContent = after ? '下一天 ›' : '回到總覽';
  byId('day-picker').value = n;

  const facts = [['日期', dayDate(day)]];
  if (day.sleep) facts.push(['住宿海拔', `約 ${altitude(day.sleep)}`]);
  if (day.peak) facts.push(['當日最高點', `約 ${altitude(day.peak)}`, day.peak >= 4500 ? 'robe' : '']);
  if (day.sun) facts.push(['日出 / 日落（約）', day.sun.join(' / ')]);

  const timeline = day.plan.map(stop => {
    const key = photoByScene.get(stop.img);
    const picture = stop.img && stop.img !== day.hero ? `<figure class="pic">${sceneMarkup(stop.img)}${key ? `<figcaption>${photos[key].label} · <a href="#credits">相片來源</a></figcaption>` : ''}</figure>` : '';
    return `<div class="ti${stop.key ? ' key' : ''}"><div class="tm">${stop.t}</div><div class="rail" aria-hidden="true"></div>
      <div class="body"><b>${stop.b}${stop.alt ? `<span class="altchip">${altitude(stop.alt)}</span>` : ''}</b>${stop.p ? `<p>${stop.p}</p>` : ''}${picture}</div></div>`;
  }).join('');
  const hotelTel = hotel?.tel?.replace(/\s/g, '');
  const hotelCard = hotel ? `<section class="panel hotelcard"><h3>今晚住宿</h3><p><strong>${hotel.name}</strong>${hotel.en ? `<br><span class="muted">${hotel.en}</span>` : ''}</p><p>${hotel.note}</p>
    ${hotel.addr ? `<p class="small muted">${hotel.addr}</p>` : ''}${hotelTel ? `<p class="small"><a class="mono" id="htel" href="tel:${hotelTel}">${hotel.tel}</a> <button class="copy" data-copy="${hotelTel}" data-sel="htel">複製</button></p>` : ''}</section>` : '';
  const mapLinks = extra?.map ? `<section class="panel"><h3>景點地圖</h3><ul class="place-links">${extra.map.map(([label, keyword, city]) => {
    const query = new URLSearchParams({ keyword, city, src: 'tibet-trip', callnative: '0' });
    return `<li><a href="https://uri.amap.com/search?${query}" target="_blank" rel="noopener">${label} · 高德地圖</a></li>`;
  }).join('')}</ul></section>` : '';
  byId('daybody').innerHTML = `
    <header class="dayhero">${sceneMarkup(day.hero, true)}<div class="cap"><div class="dn">${dayCode(day)} · ${dayDate(day)} · ${day.area}</div><h1 id="day-title" tabindex="-1">${day.title}</h1></div></header>
    ${heroPhoto ? `<p class="day-credit">${photoCredit(heroPhoto)}</p>` : ''}
    <div class="facts">${facts.map(([label, value, cls]) => `<div class="fact"><span>${label}</span><b class="${cls || ''}">${value}</b></div>`).join('')}</div>
    <div class="day-layout">
      <section class="panel timeline-panel"><h3>時間表</h3><div class="timeline">${timeline}</div><p class="small muted">時間以當地時間（UTC+8）顯示，實際安排視乎路況及景區開放。插圖為場景示意。</p></section>
      <aside class="day-side" aria-label="當天資料">
        ${extra?.backup ? `<section class="panel winter-card"><h3>今日備案</h3><p>${extra.backup}</p></section>` : ''}
        ${hotelCard}
        ${day.tips.length ? `<section class="panel regular-tips"><h3>當天提醒</h3><ul class="tiplist">${day.tips.map(tip => `<li>${tip}</li>`).join('')}</ul></section>` : ''}
        ${mapLinks}
      </aside>
    </div>
    <nav class="pager" aria-label="上下一天">${before ? `<a class="text-link" href="#day-${before.n}">‹ ${before.title}</a>` : ''}${after ? `<a class="text-link" href="#day-${after.n}">${after.title} ›</a>` : ''}</nav>`;
}

const views = ['plan', 'prep', 'expect', 'info', 'dayview'];
const anchors = { itinerary: ['plan', 'itinerary-title'], altitude: ['plan', 'altitude-title'], winter: ['expect', 'winter-title'], offline: [null, 'offline-title'], credits: [null, 'credits'] };
const headings = { plan: 'trip-title', prep: 'prep-title', expect: 'expect-title', info: 'info-title', dayview: 'day-title' };
let currentView = 'plan';

function route(focus = true) {
  const hash = location.hash.slice(1);
  if (hash === 'main-content') {
    byId('main-content').focus();
    return;
  }
  const match = /^day-(\d+)$/.exec(hash);
  const day = match ? DAYS.find(entry => entry.n === Number(match[1])) : null;
  const anchor = anchors[hash];
  const view = day ? 'dayview' : anchor ? anchor[0] || currentView : ['prep', 'expect', 'info'].includes(hash) ? hash : 'plan';
  currentView = view;
  if (day) renderDay(day);
  views.forEach(id => { byId(id).hidden = id !== view; });
  document.querySelectorAll('[data-view]').forEach(link => {
    if (link.dataset.view === (view === 'dayview' ? 'plan' : view)) link.setAttribute('aria-current', view === 'dayview' ? 'location' : 'page');
    else link.removeAttribute('aria-current');
  });
  document.title = day ? `${day.title} · 冬遊西藏 2026` : '冬遊西藏 2026 · 行程手冊';

  if (hash === 'credits') byId('credits').open = true;
  const target = byId(anchor?.[1] || headings[view]);
  if (focus && target) {
    const focusTarget = hash === 'credits' ? target.querySelector('summary') : target;
    if (!focusTarget.hasAttribute('tabindex') && focusTarget.tagName !== 'SUMMARY') focusTarget.tabIndex = -1;
    focusTarget.focus({ preventScroll: true });
  }
  if (anchor) target.scrollIntoView();
  else window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => route());
route(false);

const checklistKey = 'tibet26-checks';
let checked = {};
try { checked = JSON.parse(localStorage.getItem(checklistKey)) || {}; } catch { /* Storage can be unavailable in private browsing. */ }
const checkList = byId('checklist');
const unfinished = byId('unfinished');
checkList.innerHTML = LIST.map(group => `<section class="panel group"><h3>${group.g}</h3>${group.items.map(([id, text, due]) => `
  <div class="check${checked[id] ? ' done' : ''}"><input type="checkbox" id="${id}" ${checked[id] ? 'checked' : ''}><label for="${id}">${text}</label>${due ? `<span class="due">${due}</span>` : ''}</div>`).join('')}</section>`).join('');

function updateChecklist() {
  const items = [...checkList.querySelectorAll('input')];
  const done = items.filter(item => item.checked).length;
  const filter = unfinished.getAttribute('aria-pressed') === 'true';
  byId('prog-txt').textContent = `${done} / ${items.length}`;
  byId('prog-bar').style.width = `${100 * done / items.length}%`;
  checkList.querySelectorAll('.group').forEach(group => {
    const rows = [...group.querySelectorAll('.check')];
    rows.forEach(row => { row.hidden = filter && row.classList.contains('done'); });
    group.hidden = filter && rows.every(row => row.hidden);
  });
  byId('checklist-empty').hidden = !(filter && done === items.length);
}
checkList.addEventListener('change', ({ target }) => {
  if (target.type !== 'checkbox') return;
  checked[target.id] = target.checked;
  target.closest('.check').classList.toggle('done', target.checked);
  try { localStorage.setItem(checklistKey, JSON.stringify(checked)); } catch { /* The checklist still works in this tab. */ }
  if (target.checked && unfinished.getAttribute('aria-pressed') === 'true') unfinished.focus();
  updateChecklist();
});
unfinished.addEventListener('click', () => {
  const next = unfinished.getAttribute('aria-pressed') !== 'true';
  unfinished.setAttribute('aria-pressed', next);
  updateChecklist();
});
updateChecklist();

document.addEventListener('click', async event => {
  const button = event.target.closest('.copy');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = '已複製';
    setTimeout(() => { button.textContent = '複製'; }, 1500);
  } catch {
    const source = byId(button.dataset.sel);
    if (!source) return;
    const range = document.createRange();
    range.selectNodeContents(source);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

async function prepareOffline() {
  const status = byId('offline-status');
  if (!('serviceWorker' in navigator)) {
    status.textContent = '此瀏覽器無法儲存離線行程。';
    return;
  }
  try {
    const registration = await navigator.serviceWorker.register('sw.js');
    const worker = registration.installing;
    if (worker && !registration.active) {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'redundant') status.textContent = '暫時未能儲存。連線後重新載入本頁再試。';
      });
    }
    await navigator.serviceWorker.ready;
    status.textContent = '行程已儲存。這部裝置可用同一瀏覽器和網址離線開啟。';
  } catch {
    status.textContent = '暫時未能儲存。連線後重新載入本頁再試。';
  }
}
window.addEventListener('load', prepareOffline, { once: true });
