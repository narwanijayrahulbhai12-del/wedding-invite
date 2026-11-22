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
    var t = (c.groom && c.bride) ? c.groom.firstName + " & " + c.bride.firstName + " | Wedding Invitation" : "Wedding Invitation";
    function s() { document.title = t; }
    window.addEventListener("load", function () { s(); setTimeout(s, 800); setTimeout(s, 2500); });
  })();
})();
