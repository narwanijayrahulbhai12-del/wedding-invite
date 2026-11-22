/*  Google Apps Script - paste ALL of this into a Google Sheet's Apps Script editor.
    It (1) saves every RSVP and wish in your sheet, (2) emails you, (3) serves approved wishes to the wishes wall. */

const OWNER_EMAIL  = "your-email@gmail.com";   // <-- CHANGE: where RSVP / wish emails are sent
const AUTO_APPROVE = false;                    // true = wishes go live immediately; false = you tick "Approved" first
const SEND_EMAILS  = true;                     // false = no emails, sheet only

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); }
  return sh;
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const clean = (v, n) => String(v == null ? "" : v).slice(0, n);
    const now = new Date();
    if (d.type === "wish") {
      const sh = sheet_("Wishes", ["Time", "Name", "Wish", "Approved"]);
      sh.appendRow([now, clean(d.name, 100), clean(d.message, 500), AUTO_APPROVE]);
      sh.getRange(sh.getLastRow(), 4).insertCheckboxes();
      sh.getRange(sh.getLastRow(), 4).setValue(AUTO_APPROVE);
      if (SEND_EMAILS) MailApp.sendEmail(OWNER_EMAIL, "New wish from " + clean(d.name, 100),
        clean(d.name, 100) + " wrote:\n\n" + clean(d.message, 500) +
        (AUTO_APPROVE ? "\n\n(Shown on your wall.)" : "\n\nOpen your Google Sheet > Wishes tab and tick 'Approved' to show it on the wall."));
    } else if (d.type === "rsvp") {
      const sh = sheet_("RSVP", ["Time", "Name", "Attending", "Guests", "Message"]);
      sh.appendRow([now, clean(d.name, 120), clean(d.attending, 5), d.guests || "", clean(d.message, 500)]);
      if (SEND_EMAILS) MailApp.sendEmail(OWNER_EMAIL, "RSVP: " + clean(d.name, 120) + " (" + clean(d.attending, 5) + ")",
        "Name: " + clean(d.name, 120) + "\nAttending: " + clean(d.attending, 5) + "\nGuests: " + (d.guests || "-") +
        "\nMessage: " + clean(d.message, 500));
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error");
  }
}

function doGet(e) {
  const out = [];
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Wishes");
  if (sh && sh.getLastRow() > 1) {
    const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues();
    rows.reverse().forEach(r => { if (r[3] === true && r[2]) out.push({ name: String(r[1]), message: String(r[2]) }); });
  }
  return ContentService.createTextOutput(JSON.stringify({ wishes: out.slice(0, 60) }))
    .setMimeType(ContentService.MimeType.JSON);
}
