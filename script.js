    /**
     * GOOGLE SHEETS SETUP INSTRUCTIONS
     * ─────────────────────────────────────────────────────────
     * 1. Create a Google Sheet with these column headers in row 1:
     *    Timestamp | First Name | Last Name | Email | Organisation |
     *    Job Title | Seniority | Sector | Decision Context
     *
     * 2. In the Sheet, go to Extensions → Apps Script and paste:
     *
     *    function doPost(e) {
     *      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     *      const data = JSON.parse(e.postData.contents);
     *      sheet.appendRow([
     *        new Date(),
     *        data.first_name, data.last_name, data.email,
     *        data.company, data.job_title, data.seniority,
     *        data.sector, data.decision_context
     *      ]);
     *      return ContentService
     *        .createTextOutput(JSON.stringify({ result: 'success' }))
     *        .setMimeType(ContentService.MimeType.JSON);
     *    }
     *
     * 3. Deploy → New Deployment → Web App
     *    Execute as: Me | Who has access: Anyone
     *    Copy the deployed URL and replace SHEETS_URL below.
     * 
     * Deployment ID
     * AKfycbx-QvwGTBljZ-Uay6q9ZeoJpAl9Ch7jcGEGX3IfJnNSysDeDv_rV0fM1TyvZTwdYSKWoA
     * 
     * web app Url = https://script.google.com/macros/s/AKfycbx-QvwGTBljZ-Uay6q9ZeoJpAl9Ch7jcGEGX3IfJnNSysDeDv_rV0fM1TyvZTwdYSKWoA/exec
     * ─────────────────────────────────────────────────────────
     */

   const SHEETS_URL = "https://script.google.com/macros/s/AKfycbwNT6DhVPqLwQw_onmKYc2cFOMlN1ZbEht4FDOTFSgllgobjyo2wkAXIQZmremMePv7xw/exec";

const form      = document.getElementById('wlform');
const btn       = document.getElementById('sbtn');
const btnTxt    = document.getElementById('sbtn-txt');
const successEl = document.getElementById('success');
const formView  = document.getElementById('form-view');
const errorEl   = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.style.display = 'none';

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const fd = new FormData(form);
  const payload = Object.fromEntries(fd.entries());

  btn.disabled = true;
  btnTxt.textContent = 'Submitting…';

  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      // ✅ No Content-Type header — let the browser set it automatically
      // ✅ URLSearchParams avoids the CORS preflight that triggers the 302
      body: new URLSearchParams(payload)
    });

    formView.style.display = 'none';
    successEl.style.display = 'block';

  } catch (err) {
    btn.disabled = false;
    btnTxt.textContent = 'Secure My Priority Access';
    errorEl.style.display = 'block';
    console.error('Submission error:', err);
  }
});