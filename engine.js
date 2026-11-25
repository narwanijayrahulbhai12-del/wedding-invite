/* ===== ENGINE - do not edit. (Reads window.WEDDING_CONFIG from config.js) ===== */
(function () {
  function C() { return window.WEDDING_CONFIG || {}; }
  var DEFAULT_SECTIONS = ["hero","invitation","scratch","couple","story","family","events","gallery","venue","rsvp","wishes","contacts","finale","tree"];

  window.__wmerge = function (base) {
    var c = C();
    function merge(a, b) {
      if (Array.isArray(b)) return b.map(function (x, i) { return (a && a[i] && typeof x === "object") ? merge(a[i], x) : x; });
      if (b && typeof b === "object") { var o = Object.assign({}, a); for (var k in b) o[k] = merge(a ? a[k] : undefined, b[k]); return o; }
      return b;
    }
    var out = merge(base, c);
    ["rsvpWhatsApp","rsvpWebhook","webAppUrl","autoApprove","demoWishes","footerCredit","footerLink","sections","settings","images","familyStyle","venue"].forEach(function (k) { delete out[k]; });
    // one venue for every event (unless an event has ownVenue: true)
    if (c.venue && Array.isArray(out.events)) {
      out.events = out.events.map(function (e) { return e && e.ownVenue ? e : Object.assign({}, e, c.venue); });
    }
    ["events","story","gallery","familyMembers","contacts"].forEach(function (k) {
      if (Array.isArray(out[k])) out[k] = out[k].filter(function (x) { return !(x && x.show === false); });
    });
    return out;
  };

  function sectionList() { var c = C(); return Array.isArray(c.sections) ? c.sections : DEFAULT_SECTIONS; }
  window.__has = function (k) { return sectionList().indexOf(k) !== -1; };
  window.__order = function (list) {
    var map = {}; list.forEach(function (el) { if (el && el.key != null) map[el.key] = el; });
    var out = [];
    sectionList().forEach(function (k) { if (k === "tree") k = "bench"; if (map[k]) out.push(map[k]); });
    return out;
  };
  window.__namesOnly = function () { return C().familyStyle === "names"; };

  /* ----- sending data to your Google Sheet / email (Apps Script web app) ----- */
  function post(payload) {
    var u = C().webAppUrl || C().rsvpWebhook;
    if (!u) return;
    try { fetch(u, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) }); } catch (e) {}
  }
  window.__rsvp = function (r) {
    var c = C();
    post({ type: "rsvp", name: r.guestName, attending: r.attending, guests: r.guestCount, message: r.message || "", couple: (c.groom && c.bride) ? c.groom.firstName + " & " + c.bride.firstName : "" });
    if (c.rsvpWhatsApp) {
      var txt = "RSVP: " + r.guestName + " — " + (r.attending === "yes" ? "Attending (" + r.guestCount + " guest" + (r.guestCount > 1 ? "s" : "") + ")" : "Unable to attend") + (r.message ? "\n" + r.message : "");
      window.open("https://wa.me/" + c.rsvpWhatsApp + "?text=" + encodeURIComponent(txt), "_blank");
    }
  };

  /* ----- wishes wall ----- */
  window.__demoWishes = function (demo) {
    var c = C();
    if (c.webAppUrl) return [];            // real wall: hide the template's sample wishes
    return c.demoWishes === false ? [] : demo;
  };
  window.__loadWishes = function () {
    var u = C().webAppUrl;
    if (!u) return Promise.resolve(null);
    return fetch(u + (u.indexOf("?") > -1 ? "&" : "?") + "action=wishes&t=" + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.wishes) ? d.wishes : []; })
      .catch(function () { return null; });
  };
  window.__sendWish = function (w) {
    post({ type: "wish", name: w.name, message: w.message });
    return !!C().autoApprove;               // true = show it on the wall immediately
  };

  /* ----- browser tab title ----- */
  (function () {
    var c = C();
    var a = (c.groom && c.bride) ? (c.nameOrder === "bride" ? [c.bride.firstName, c.groom.firstName] : [c.groom.firstName, c.bride.firstName]) : null;
    var t = a ? a[0] + " & " + a[1] + " | Wedding Invitation" : "Wedding Invitation";
    function s() { document.title = t; }
    window.addEventListener("load", function () { s(); setTimeout(s, 800); setTimeout(s, 2500); });
  })();

  /* ----- background music: starts when the gate is tapped, loops, spinning CD button ----- */
  (function () {
    var audio = null, btn = null, userPaused = false, timer = null;
    function cfg() { var m = C().music || {}; return {
      on: m.enabled !== false && !!m.file, file: m.file, start: +m.startAt || 0,
      vol: m.volume == null ? 0.6 : +m.volume, loop: m.loop !== false, button: m.button !== false }; }
    function spin(on) { if (btn) btn.firstChild.style.animationPlayState = on ? "running" : "paused"; if (btn) btn.style.opacity = on ? "1" : "0.65"; }
    function level() {                       /* smooth fade in at start and around the loop point */
      var m = cfg(), d = audio.duration, t = audio.currentTime, f = 1.2, v = m.vol;
      if (isFinite(d) && d > 4) v = m.vol * Math.max(0, Math.min(1, (t - m.start) / f + 0.001, (d - t) / f));
      try { audio.volume = Math.max(0, Math.min(1, v)); } catch (e) {}
    }
    function makeButton() {
      if (btn || !cfg().button) return;
      var css = document.createElement("style");
      css.textContent = "@keyframes wmcd{to{transform:rotate(360deg)}}";
      document.head.appendChild(css);
      btn = document.createElement("button");
      btn.type = "button"; btn.setAttribute("aria-label", "Play or pause music");
      btn.style.cssText = "position:fixed;left:16px;bottom:20px;z-index:60;width:46px;height:46px;border-radius:50%;border:2px solid #f3d98a;padding:0;cursor:pointer;background:linear-gradient(135deg,#d9a441,#a86a14);box-shadow:0 6px 18px rgba(80,20,20,.35);display:flex;align-items:center;justify-content:center;transition:opacity .3s";
      btn.innerHTML = '<svg viewBox="0 0 48 48" width="34" height="34" style="animation:wmcd 3.5s linear infinite;display:block"><circle cx="24" cy="24" r="22" fill="#fff6dc" opacity=".95"/><circle cx="24" cy="24" r="17" fill="none" stroke="#c9922f" stroke-width="1.2"/><circle cx="24" cy="24" r="12" fill="none" stroke="#e7c36b" stroke-width="1"/><path d="M24 2a22 22 0 0 1 20 13" stroke="#8e1d2c" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="24" cy="24" r="6" fill="#8e1d2c"/><circle cx="24" cy="24" r="2.4" fill="#fff6dc"/></svg>';
      btn.addEventListener("click", function () {
        if (!audio) return;
        if (audio.paused) { userPaused = false; audio.play().then(function () { spin(true); }).catch(function () {}); }
        else { userPaused = true; audio.pause(); spin(false); }
      });
      document.body.appendChild(btn);
    }
    window.__playMusic = function () {
      var m = cfg(); if (!m.on || audio) return;
      try {
        audio = new Audio(m.file); audio.loop = m.loop; audio.preload = "auto"; audio.volume = 0;
        if (m.start) audio.currentTime = m.start;
        var pr = audio.play();
        if (pr && pr.then) pr.then(function () { makeButton(); spin(true); }).catch(function () { makeButton(); spin(false); userPaused = true; });
        else { makeButton(); spin(true); }
        timer = setInterval(function () { if (!audio.paused) level(); }, 100);
        document.addEventListener("visibilitychange", function () {
          if (!audio) return;
          if (document.hidden) { if (!audio.paused) { audio.pause(); audio.__auto = true; spin(false); } }
          else if (audio.__auto && !userPaused) { audio.__auto = false; audio.play().then(function () { spin(true); }).catch(function () {}); }
        });
      } catch (e) {}
    };
  })();
})();
