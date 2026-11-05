# Silver Oak Financial by TAZ · walkthrough (demo build)

Static demo for the Nov 5 2026 walkthrough. Everything runs on made-up sample data in the browser; nothing is sent from anywhere except "Request a change", which posts to an Activepieces webhook that emails the TAZ team.

- `index.html` start page, in call order
- `portal.html` the CRM and Prospect Finder, with a Guided demo (bottom left, or `?tour=1`, arrow keys to move)
- `app.html` Autopilot for iPhone (installable web app: Safari → Share → Add to Home Screen)
- `guide.pdf` one-page how-to

Pricing is hidden in this build (`window.TAZ_DEMO.pricing=false` in portal.html, `SHOWP=false` in app.html).

Built by TAZ · usetaz.com
