// booking.js — Google Apps Script-backed booking wizard (reusable, id-prefixed)
const API = 'https://script.google.com/macros/s/AKfycbzg3YyUhQGz-DSj966ma53mP79g5-u00OIjv8WUtW4cJOTcHu387uMbKpPNpS_kMoE/exec';

function fmtDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function fmtTime(t) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return ((h % 12) || 12) + ':' + String(m).padStart(2, '0') + ' ' + ampm;
}

async function fetchJson(url, opts) {
  const res = await fetch(url, opts);
  const text = await res.text();
  try { return JSON.parse(text); }
  catch (_) {
    const match = text.match(/href="([^"]+)"/);
    if (match) { const r2 = await fetch(match[1]); return r2.json(); }
    throw new Error('Parse error');
  }
}

export function mountBooking(prefix = '') {
  const id = (s) => prefix + s;
  const $ = (s) => document.getElementById(id(s));

  const state = { slots: {}, date: '', time: '', interest: '' };

  function showStep(n) {
    // Find booking-step elements within the scope of the booking card
    const card = $('booking-card') || document.querySelector(`[data-booking-root="${prefix || 'root'}"]`) || document.body;
    card.querySelectorAll('.booking-step').forEach(s => { s.style.display = 'none'; });
    const target = n === 'success' ? $('step-success') : $('step-' + n);
    if (target) target.style.display = 'block';

    const stepNum = n === 'success' ? 4 : n;
    card.querySelectorAll('.step-item').forEach(item => {
      const s = parseInt(item.dataset.step, 10);
      item.classList.toggle('active', s <= stepNum);
      item.querySelector('.step-dot')?.classList.toggle('active', s <= stepNum);
    });
    $('conn-1-2')?.classList.toggle('filled', stepNum >= 2);
    $('conn-2-3')?.classList.toggle('filled', stepNum >= 3);
  }

  function renderDates(grid) {
    const dates = Object.keys(state.slots);
    if (!dates.length) {
      grid.innerHTML = `<div class="booking-empty">No available slots in the next 2 weeks. Please <a href="mailto:imtiaz@mouliqe.com" style="color:var(--color-accent)">email me</a> directly.</div>`;
      return;
    }
    grid.innerHTML = dates.map(d => {
      const dt = new Date(d + 'T12:00:00');
      const today = new Date();
      const isToday = dt.toDateString() === today.toDateString();
      const dow = dt.toLocaleDateString('en-US', { weekday: 'short' });
      const num = dt.getDate();
      const mon = dt.toLocaleDateString('en-US', { month: 'short' });
      const count = state.slots[d].length;
      return `<button class="slot-btn date-btn" data-date="${d}">
        ${isToday ? '<span class="today-badge">Today</span>' : `<span class="date-btn__dow">${dow}</span>`}
        <span class="date-btn__num">${num}</span>
        <span class="date-btn__mon">${mon}</span>
        <span class="date-btn__count">${count} slot${count !== 1 ? 's' : ''}</span>
      </button>`;
    }).join('');

    grid.querySelectorAll('.date-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.date = btn.dataset.date;
        $('selected-date-label').textContent = fmtDate(state.date);
        const tg = $('time-grid');
        tg.innerHTML = state.slots[state.date].map(t =>
          `<button class="slot-btn time-btn" data-time="${t}">${fmtTime(t)}</button>`
        ).join('');
        tg.querySelectorAll('.time-btn').forEach(tb => {
          tb.addEventListener('click', () => {
            state.time = tb.dataset.time;
            $('slot-summary-text').textContent = `${fmtDate(state.date)} at ${fmtTime(state.time)} ET — 30 min`;
            showStep(3);
          });
        });
        showStep(2);
      });
    });
  }

  async function loadAvailability() {
    const grid = $('date-grid');
    if (!grid) return;
    try {
      const data = await fetchJson(API, { redirect: 'follow' });
      if (!data.success) throw new Error('api error');
      state.slots = data.slots;
      renderDates(grid);
    } catch (_) {
      grid.innerHTML = `<div class="booking-empty">Could not load availability. Please <a href="mailto:imtiaz@mouliqe.com" style="color:var(--color-accent)">email me</a> directly.</div>`;
    }
  }

  function wireInterestSelect() {
    const sel = $('interest-select');
    const trigger = $('interest-trigger');
    if (!sel || !trigger) return;

    trigger.addEventListener('click', e => { e.stopPropagation(); sel.classList.toggle('open'); });
    sel.querySelectorAll('.custom-select__option').forEach(opt => {
      opt.addEventListener('click', e => {
        e.stopPropagation();
        state.interest = opt.dataset.value;
        trigger.textContent = opt.textContent;
        trigger.classList.add('has-value');
        sel.querySelectorAll('.custom-select__option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        sel.classList.remove('open');
      });
    });
    document.addEventListener('click', () => sel.classList.remove('open'));
  }

  function wireSubmit() {
    const form = $('booking-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = $('submit-btn');
      btn.textContent = 'Booking...';
      btn.disabled = true;

      const payload = {
        date: state.date,
        time: state.time,
        name: $('name').value,
        email: $('email').value,
        company: $('company').value,
        interest: state.interest,
        message: $('message').value,
      };

      try {
        const data = await fetchJson(API, { method: 'POST', redirect: 'follow', body: JSON.stringify(payload) });
        if (data.success) {
          $('success-detail').textContent = `${fmtDate(state.date)} at ${fmtTime(state.time)} ET with Imtiaz Ahmed`;
          showStep('success');
        } else {
          throw new Error(data.error || 'server error');
        }
      } catch (err) {
        alert('Connection error. Please try again.');
        btn.textContent = 'Confirm Booking';
        btn.disabled = false;
      }
    });
  }

  // Programmatic setter for pre-filled interest (used by explore page)
  function setInterest(value) {
    const trigger = $('interest-trigger');
    const sel = $('interest-select');
    if (!trigger || !sel || trigger.classList.contains('has-value')) return;
    trigger.textContent = value;
    trigger.classList.add('has-value');
    state.interest = value;
    sel.querySelectorAll('.custom-select__option').forEach(o => {
      o.classList.toggle('selected', o.dataset.value === value);
    });
  }

  $('back-to-dates')?.addEventListener('click', () => showStep(1));
  $('back-to-times')?.addEventListener('click', () => showStep(2));
  wireInterestSelect();
  wireSubmit();
  loadAvailability();

  return { setInterest };
}
