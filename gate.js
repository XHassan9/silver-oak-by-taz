/* Silver Oak Financial by TAZ: private access gate, welcome note with onboarding booking + agreement links. No auto-close. */
(function () {
  var HASH = '485622ab0d6db4d562f784a1845865bfce3925ef43a973cd3b3d7511d23ce1eb';
  var KEY = 'silveroak_access_ok';
  var BOOK = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ18mCDkEBQFG4RxnJ9TRyP6zUriKzbRVll5_IIetLTdkZVUoCnUuQobePhEg0luR7kIgT0X8rtg';
  var base = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/gate\.js.*$/, '') : '';
  var css = document.createElement('style');
  css.textContent =
    'html.so-lock body>*:not(#so-gate){display:none!important}' +
    '#so-gate{position:fixed;inset:0;z-index:99999;background:linear-gradient(135deg,#3b2412,#5c3d1e);display:flex;align-items:center;justify-content:center;font-family:Lato,-apple-system,"Segoe UI",Arial,sans-serif;padding:20px}' +
    '#so-gate .box{background:#fff;border-radius:16px;max-width:430px;width:100%;padding:30px 26px;text-align:center;border-bottom:6px solid #c9a24a}' +
    '#so-gate small{color:#8a6914;letter-spacing:2.5px;font-weight:700;font-size:11px}' +
    '#so-gate h2{font-family:"Playfair Display",Georgia,serif;color:#3b2412;margin:6px 0 8px;font-size:26px}' +
    '#so-gate p{color:#7a6a5a;margin:0 0 18px;line-height:1.55}' +
    '#so-gate input{width:100%;padding:12px 14px;border:1px solid #e8ddcf;border-radius:10px;font-size:16px;margin-bottom:10px;box-sizing:border-box}' +
    '#so-gate button{width:100%;padding:12px;border:0;border-radius:10px;background:#5c3d1e;color:#fff;font-weight:700;font-size:16px;cursor:pointer}' +
    '#so-gate .err{color:#d24343;font-size:14px;min-height:20px;margin:6px 0 0}' +
    '#so-note{position:fixed;left:12px;right:12px;bottom:12px;z-index:9998;background:#3b2412;color:#fff;border-radius:14px;padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:space-between;font-family:Lato,-apple-system,"Segoe UI",Arial,sans-serif;font-size:15px;box-shadow:0 8px 28px rgba(0,0,0,.25);border-left:6px solid #c9a24a}' +
    '#so-note a{color:#3b2412;background:#c9a24a;text-decoration:none;font-weight:700;padding:9px 14px;border-radius:9px;white-space:nowrap}' +
    '#so-note a.alt{background:#fff}' +
    '#so-note img.me{width:54px;height:54px;object-fit:cover;border-radius:50%;border:2px solid #c9a24a;flex:none}' +
    '#so-gate img.me{width:92px;height:92px;object-fit:cover;border-radius:50%;border:3px solid #c9a24a;display:block;margin:0 auto 10px}' +
    '#so-note .x{background:none;border:0;color:#fff;opacity:.7;font-size:20px;cursor:pointer;padding:0 4px}' +
    '@media(max-width:700px){#so-note{flex-direction:column;align-items:stretch;text-align:center}}' +
    '@media print{#so-note{display:none}}';
  document.documentElement.appendChild(css);
  document.documentElement.classList.add('so-lock');
  function gate(html) {
    var g = document.createElement('div'); g.id = 'so-gate'; g.innerHTML = '<div class="box">' + html + '</div>';
    (document.body || document.documentElement).appendChild(g); return g;
  }
  function unlock() {
    document.documentElement.classList.remove('so-lock');
    var g = document.getElementById('so-gate'); if (g) g.remove();
    try { if (sessionStorage.getItem('so_note_hidden')) return; } catch (e) {}
    var onAgreement = /agreement\.html/.test(location.pathname);
    var n = document.createElement('div'); n.id = 'so-note';
    n.innerHTML = '<span style="display:flex;gap:12px;align-items:center"><img class="me" src="' + base + 'xander.jpg" alt=""><span><b>Thank you, Aidan and Jesse. I&rsquo;m excited to get started with you.</b> Use the button to pick a time for your onboarding' +
      (onAgreement ? '.' : ', and when you&rsquo;re ready you can review and sign your agreement right here in the portal.') + '</span></span>' +
      '<span style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap"><a href="' + BOOK + '" target="_blank" rel="noopener">Book onboarding →</a>' +
      (onAgreement ? '' : '<a class="alt" href="' + base + 'agreement.html">Review &amp; sign</a>') +
      '<button class="x" aria-label="Hide">×</button></span>';
    n.querySelector('.x').onclick = function () { n.remove(); try { sessionStorage.setItem('so_note_hidden', '1'); } catch (e) {} };
    document.body.appendChild(n);
  }
  async function sha(s) {
    var b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
  }
  function start() {
    var ok = false; try { ok = sessionStorage.getItem(KEY) === HASH || localStorage.getItem(KEY) === HASH; } catch (e) {}
    if (ok) return unlock();
    var g = gate('<img class="me" src="' + base + 'xander.jpg" alt=""><small>SILVER OAK FINANCIAL BY TAZ</small><h2>Welcome, Aidan and Jesse</h2><p>This portal is private to Silver Oak. Enter the password from your TAZ email to open it.</p>' +
      '<form><input type="password" autocomplete="current-password" placeholder="Password" aria-label="Password"><button>Open portal</button><div class="err"></div></form>');
    var f = g.querySelector('form'), i = g.querySelector('input'), e = g.querySelector('.err');
    i.focus();
    f.onsubmit = async function (ev) {
      ev.preventDefault();
      if ((await sha(i.value.trim())) === HASH) { try { sessionStorage.setItem(KEY, HASH); localStorage.setItem(KEY, HASH); } catch (x) {} unlock(); }
      else { e.textContent = 'That password did not match. Reply to your TAZ email and I will resend it.'; i.select(); }
    };
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
