// Generátor 31denního journalu A4 pro oboustranný tisk a hřebenovou vazbu.
// Spuštění: NODE_PATH=/opt/node-tools/node_modules node journal/build.js
//
// Pořadí stran (tisk oboustranně, převracet podél dlouhé strany):
//   s. 1 (líc, vpravo)  měsíční přehled
//   s. 2 (rub, vlevo)   den 1 - ráno     | s. 3 (líc, vpravo) den 1 - večer
//   ... po každých 7 dnech dvojstrana týdenní reflexe (rub vlevo + líc vpravo)
//   poslední strana (rub) poznámky
// Líc (recto) má hřbet vlevo, rub (verso) vpravo, proto se vnitřní okraj střídá.

const fs = require('fs');
const path = require('path');

const DAYS = 31;
const REFLECT_AFTER = [7, 14, 21, 28, 31];
const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf8'));

// ---------- stavební prvky ----------
const rows = (n, cls = '') => Array.from({ length: n }, () => `<div class="row ${cls}"></div>`).join('');
const checkRows = (n) => Array.from({ length: n }, () => `<div class="row"><span class="box"></span></div>`).join('');
const numRows = (n) => Array.from({ length: n }, (_, i) => `<div class="row"><span class="num">${i + 1}.</span></div>`).join('');
const top3 = () => Array.from({ length: 3 }, (_, i) => `<div class="row"><span class="num">${i + 1}.</span><span class="box"></span></div>`).join('');
const dateField = () => `<div class="date"><i></i>/<i></i>/ 20<i class="y"></i></div>`;

const SUN = `<svg class="icon" viewBox="0 0 40 40"><g fill="#2a2a2a"><circle cx="20" cy="20" r="8.2"/><circle cx="20" cy="20" r="6.4" fill="#fff"/>${
  [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M20 2.5 L22.6 9.2 L17.4 9.2 Z" transform="rotate(${a} 20 20)"/>`).join('')}</g></svg>`;
const MOON = `<svg class="icon" viewBox="0 0 40 40"><path d="M24 4.5 A15.5 15.5 0 1 0 35.5 27 A13 13 0 1 1 24 4.5 Z" fill="#2a2a2a"/></svg>`;
const STAR = `<svg class="star" viewBox="0 0 20 20"><path d="M10 1.5 L12.4 7.6 L18.8 7.9 L13.8 12 L15.5 18.3 L10 14.7 L4.5 18.3 L6.2 12 L1.2 7.9 L7.6 7.6 Z" fill="none" stroke="#2a2a2a" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

const page = (side, inner) => `<div class="page ${side}">${inner}</div>`;
const gap = () => `<div class="gap"></div>`;

// ---------- mini tracker ----------
const DROP = `<svg class="drop" viewBox="0 0 12 16"><path d="M6 1 C6 1 1.2 7.2 1.2 10.3 A4.8 4.8 0 0 0 10.8 10.3 C10.8 7.2 6 1 6 1 Z" fill="none" stroke="#555" stroke-width="0.8" stroke-linejoin="round"/></svg>`;
const dots = (n) => DROP.repeat(n);
const scale = () => [1, 2, 3, 4, 5].map(i => `<span class="sc">${i}</span>`).join('');
const tracker = () => `
<div class="tracker">
  <div class="tr-row">
    <span class="tl">Spánek</span><span class="blank s"></span><span class="unit">h</span>
    <span class="tl">Voda</span>${dots(8)}
    <span class="tl">Pohyb</span><span class="blank s"></span><span class="unit">min</span>
  </div>
  <div class="tr-row">
    <span class="tl">Nálada</span>${scale()}
    <span class="tl">Energie</span>${scale()}
    <span class="box sm"></span><span class="blank m"></span>
    <span class="box sm"></span><span class="blank m"></span>
  </div>
</div>`;

// ---------- strany ----------
const morning = (q) => page('verso', `
  <header>${SUN}${dateField()}</header>
  <blockquote><p>${q.cs}</p><cite>${q.author}${q.year ? " &middot; " + q.year : ""}</cite></blockquote>
  ${gap()}
  <section><h2>Dnes jsem vděčná za…</h2>${numRows(3)}</section>
  ${gap()}
  <section><h2>Denní afirmace</h2>${rows(2)}</section>
  ${gap()}
  <section><h2>Co by mi dneska udělalo dobře?</h2>${rows(7)}</section>
  ${gap()}
  <section class="cols">
    <div><h2>Na co nesmím zapomenout</h2>${checkRows(10)}</div>
    <div><h2>Wish list</h2>${checkRows(10)}</div>
  </section>
  ${gap()}`);

const evening = () => page('recto', `
  <header>${MOON}${dateField()}</header>
  <section>
    <h2>Co bylo na dnešku nejlepší a co jsem se dnes naučila?</h2>
    <div class="sub">anebo brain dump</div>
    ${rows(19)}
  </section>
  <div class="keep">
    <div class="keep-label">${STAR}<span>Tohle si chci zapamatovat</span></div>
    ${rows(2, 'in')}
  </div>
  ${gap()}
  <section>
    <h2>Nějaké priority či přání pro zítřek?</h2>
    <div class="sub">top 3</div>
    ${top3()}
    ${rows(2)}
  </section>
  ${gap()}
  ${tracker()}`);

const weekHeader = (title) => `
  <header class="wk"><h1>${title}</h1>
    <div class="date">Týden <i class="s"></i> &nbsp; od <i></i>/<i></i> &nbsp; do <i></i>/<i></i></div>
  </header>`;
const label = (t) => `<div class="label"><span>${t}</span></div>`;
const q = (t, n, extra = '') => `<section class="wq"><h3>${t}</h3>${extra || rows(n)}</section>`;

const weekLeft = () => page('verso', `
  ${weekHeader('Týdenní ohlédnutí')}
  ${label('Osobně')}
  ${q('Co mi tento týden udělalo radost?', 5)}
  ${q('Co mi bralo energii a co mi ji dodávalo?', 4)}
  ${q('Co si z tohoto týdne odnáším?', 4)}
  ${gap()}
  ${label('Práce')}
  ${q('Co jsem dokončila nebo posunula?', 5)}
  ${q('Co zůstává otevřené?', 4)}
  ${q('Top 3 na příští týden', 0, top3())}
  ${gap()}`);

const dueRows = (n) => Array.from({ length: n }, () => `<div class="row due"><span class="box"></span><span class="dl">do</span></div>`).join('');
const weekRight = () => page('recto', `
  <header class="wk"><h1>&nbsp;</h1></header>
  ${label('Studium')}
  ${q('Co jsem se o víkendu naučila?', 8)}
  ${q('Úkoly a termíny do příštího víkendu', 0, dueRows(8))}
  ${q('Co mi není jasné, na co se zeptat?', 4)}
  ${gap()}
  ${label('Příští týden')}
  ${q('Na co se těším?', 4)}
  <div class="keep word">
    <div class="keep-label">${STAR}<span>Jedno slovo nebo záměr pro příští týden</span></div>
    ${rows(2, 'in')}
  </div>
  ${gap()}`);

const monthGrid = () => {
  const head = `<tr><th></th>${Array.from({ length: DAYS }, (_, i) => `<td class="h">${i + 1}</td>`).join('')}</tr>`;
  const lines = ['Nálada', 'Energie', 'Spánek', 'Voda', 'Pohyb', '', '', '']
    .map(l => `<tr><th>${l || '<span class="blank xs"></span>'}</th>${'<td></td>'.repeat(DAYS)}</tr>`).join('');
  return `<table class="grid">${head}${lines}</table>`;
};
const dateRows = (n) => Array.from({ length: n }, () => `<div class="row dated"><span class="dd"></span></div>`).join('');
const monthPage = () => page('recto', `
  <header class="wk"><h1>Měsíc</h1>
    <div class="date"><i class="l"></i> 20<i class="y"></i></div>
  </header>
  ${gap()}
  <section><h2>Na co se chci tento měsíc soustředit?</h2>${rows(6)}</section>
  ${gap()}
  <section><h2>Přehled měsíce</h2>
    <div class="sub">nálada a energie 1-5, spánek v hodinách, voda a pohyb odškrtnout</div>
    ${monthGrid()}
  </section>
  ${gap()}
  <section><h2>Důležité termíny</h2>${dateRows(14)}</section>
  ${gap()}`);

const notesPage = () => page('verso', `
  <header class="wk"><h1>Poznámky</h1></header>
  ${rows(32)}
  ${gap()}`);

// ---------- sestavení ----------
const pages = [monthPage()];
let weekNo = 0;
for (let d = 1; d <= DAYS; d++) {
  pages.push(morning(quotes[(d - 1) % quotes.length]), evening());
  if (REFLECT_AFTER.includes(d)) { pages.push(weekLeft(), weekRight()); weekNo++; }
}
pages.push(notesPage());
if (pages.length % 2) throw new Error('lichý počet stran: ' + pages.length);

const css = fs.readFileSync(path.join(__dirname, 'journal.css'), 'utf8');
const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>Denní journal - 31 dní</title>
<style>${css}</style></head><body>${pages.join('\n')}</body></html>`;
fs.writeFileSync(path.join(__dirname, 'journal.html'), html);

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const p = await browser.newPage();
  await p.goto('file://' + path.join(__dirname, 'journal.html'));
  await p.evaluate(() => document.fonts.ready);
  // kontrola: žádná strana nesmí přetéct
  const overflow = await p.evaluate(() => [...document.querySelectorAll('.page')]
    .map((el, i) => (el.scrollHeight > el.clientHeight + 1 ? i + 1 : 0)).filter(Boolean));
  if (overflow.length) console.warn('Přetékající strany:', overflow.join(', '));
  await p.pdf({
    path: path.join(__dirname, 'denni-journal-31-dni-A4.pdf'),
    format: 'A4', printBackground: true, preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log('Stran:', pages.length, '| listů:', pages.length / 2);
})();
