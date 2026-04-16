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

    const SHEETS_URL = "https://script.google.com/macros/s/AKfycbx-QvwGTBljZ-Uay6q9ZeoJpAl9Ch7jcGEGX3IfJnNSysDeDv_rV0fM1TyvZTwdYSKWoA/exec";

    const form   = document.getElementById('wlform');
    const btn    = document.getElementById('sbtn');
    const btnTxt = document.getElementById('sbtn-txt');
    const successEl = document.getElementById('success');
    const formView  = document.getElementById('form-view');
    const errorEl   = document.getElementById('form-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.style.display = 'none';

      // Basic validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Collect data
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());

      // Loading state
      btn.disabled = true;
      btnTxt.textContent = 'Submitting…';

      try {
        // ── Option A: Google Apps Script (production) ──────
        if (SHEETS_URL && SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
          await fetch(SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',          // Apps Script requires no-cors
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        // ── Show success (always, because no-cors hides errors) ──
        formView.style.display = 'none';
        successEl.style.display = 'block';

      } catch (err) {
        btn.disabled = false;
        btnTxt.textContent = 'Secure My Priority Access';
        errorEl.style.display = 'block';
        console.error('Submission error:', err);
      }
    });
