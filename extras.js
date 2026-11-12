// Fotokoutek – rychlé volby (výraz, účes, vousy, rekvizity)
// Klepnutím se text přidá/odebere v poli "Vlastní přání", které aplikace už posílá do promptu.
(function () {
  const w = document.getElementById('wishes');
  if (!w) return;

  const GROUPS = [
    { name: 'Výraz tváře', prefix: 'výraz tváře: ', items: ['široký úsměv', 'hlasitý smích', 'překvapený výraz', 'vážný výraz', 'dojetí se slzami', 'spiklenecké mrknutí'] },
    { name: 'Účes', prefix: 'účes: ', items: ['krátký sestřih', 'dlouhé vlny', 'drdol', 'copy', 'kudrnaté vlasy', 'zrzavé vlasy', 'stříbrné vlasy', 'blond vlasy'] },
    { name: 'Vousy', prefix: 'vousy: ', items: ['plnovous', 'knír', 'strniště', 'kozí bradka', 'bez vousů'] },
    { name: 'Rekvizity', prefix: 'rekvizita: ', items: ['brýle', 'klobouk', 'květinová čelenka', 'šátek', 'korunka', 'dalekohled', 'květina v ruce'] }
  ];

  const style = document.createElement('style');
  style.textContent =
    '.chips{margin:10px 0 0}' +
    '.chips h3{margin:12px 0 6px;font-size:14px;font-weight:600;color:var(--mute)}' +
    '.chips .row{gap:8px}' +
    '.chip{padding:8px 12px;font-size:14px;font-weight:500}' +
    '.chip[aria-pressed=true]{background:var(--red);border-color:var(--flash);color:#fff}' +
    '.chips .note{font-size:12px;color:var(--mute);margin:10px 0 0}';
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.className = 'chips';
  w.insertAdjacentElement('afterend', box);

  const parts = () => w.value.split(',').map(s => s.trim()).filter(Boolean);
  const buttons = [];

  function refresh() {
    const cur = parts();
    buttons.forEach(b => b.setAttribute('aria-pressed', cur.includes(b.dataset.val) ? 'true' : 'false'));
  }

  GROUPS.forEach(g => {
    const h = document.createElement('h3');
    h.textContent = g.name;
    box.appendChild(h);
    const row = document.createElement('div');
    row.className = 'row';
    g.items.forEach(label => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ghost chip';
      b.textContent = label;
      b.dataset.val = g.prefix + label;
      b.setAttribute('aria-pressed', 'false');
      b.onclick = () => {
        const val = b.dataset.val;
        const cur = parts();
        const next = cur.includes(val) ? cur.filter(x => x !== val) : cur.concat(val);
        w.value = next.join(', ');
        refresh();
      };
      buttons.push(b);
      row.appendChild(b);
    });
    box.appendChild(row);
  });

  const clr = document.createElement('button');
  clr.type = 'button';
  clr.className = 'ghost chip';
  clr.style.marginTop = '12px';
  clr.textContent = 'Smazat přání';
  clr.onclick = () => { w.value = ''; refresh(); };
  box.appendChild(clr);

  const note = document.createElement('p');
  note.className = 'note';
  note.textContent = 'Volby se použijí u všech vybraných šablon. Čím méně změn najednou, tím lépe zůstane podoba.';
  box.appendChild(note);

  w.addEventListener('input', refresh);
})();
