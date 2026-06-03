# e-Sarathi Home Automation — Deployment & Store Guide

## 📁 Files in this package

```
📦 upload this entire folder to your server
├── index.html          → your app (already has PWA code injected)
├── manifest.json       → PWA manifest (required for all stores)
├── sw.js               → service worker (offline support + TWA)
├── assetlinks.json     → Play Store domain verification
├── favicon.png         → copy your existing favicon here
└── icons/
    ├── icon-192.png    → generate from favicon (see Step 1)
    └── icon-512.png    → generate from favicon (see Step 1)
```

---

## STEP 1 — Generate icons (5 mins)

1. Go to https://realfavicongenerator.net
2. Upload your favicon.png
3. Download the package
4. Extract icon-192x192.png → rename to icon-192.png
5. Extract icon-512x512.png → rename to icon-512.png
6. Put both in the icons/ folder

---

## STEP 2 — Upload to your server (5 mins)

Upload ALL files to:
  https://anipshah.com.np/apps/home_automation/

Final structure on server:
  /apps/home_automation/index.html
  /apps/home_automation/manifest.json
  /apps/home_automation/sw.js
  /apps/home_automation/favicon.png
  /apps/home_automation/icons/icon-192.png
  /apps/home_automation/icons/icon-512.png

ALSO upload assetlinks.json to the ROOT .well-known folder:
  https://anipshah.com.np/.well-known/assetlinks.json

  (Create the .well-known/ folder in your site root if it doesn't exist)

---

## STEP 3 — Verify PWA is working (2 mins)

1. Open https://anipshah.com.np/apps/home_automation/ in Chrome on Android
2. You should see "Add to Home Screen" banner OR tap ⋮ → Add to Home Screen
3. It installs like an app ✅

To test on desktop: open Chrome → DevTools → Application tab → Manifest
Should show green checkmarks.

---

## STEP 4 — Build the APK with Bubblewrap

### Requirements:
- Node.js installed (https://nodejs.org)
- Java JDK 11+ (https://adoptium.net)

### Commands (run in terminal / command prompt):

```bash
# Install bubblewrap once
npm install -g @bubblewrap/cli

# Create a new folder for the TWA project
mkdir esarathi-twa
cd esarathi-twa

# Initialize — downloads Android SDK automatically
bubblewrap init --manifest https://anipshah.com.np/apps/home_automation/manifest.json

# Build the APK
bubblewrap build
```

### When bubblewrap init asks questions:

  Question                      → Your answer
  ─────────────────────────────────────────────
  Package ID                    → com.anipshah.homeautomation
  App name                      → e-Sarathi Home Automation
  Launcher name                 → e-Sarathi
  Display mode                  → standalone
  Status bar color              → #00d4ff
  Nav bar color                 → #020a0f
  Background color              → #020a0f
  Enable notifications          → No
  Location delegation           → No
  Signing key (new or existing) → new
  Key password                  → (choose a strong password, SAVE IT)

### Output:
  app-release-signed.apk  ← share this over WhatsApp/Drive ✅
  android.keystore        ← BACK THIS UP — needed for Play Store updates

---

## STEP 5 — Update assetlinks.json with your fingerprint

After bubblewrap build, run:
```bash
bubblewrap fingerprint add
```
Or check your keystore fingerprint:
```bash
keytool -list -v -keystore android.keystore
```
Copy the SHA-256 fingerprint and replace REPLACE_WITH_YOUR_SHA256_FINGERPRINT_FROM_BUBBLEWRAP
in assetlinks.json, then re-upload it to:
  https://anipshah.com.np/.well-known/assetlinks.json

---

## STEP 6 — Google Play Store submission

Fee: $25 one-time
URL: https://play.google.com/console

1. Create developer account
2. Create new app → type: App, free
3. Upload app-release-signed.apk (or .aab if bubblewrap build --bundle)
4. Fill in:
   - App name: e-Sarathi Home Automation
   - Short description: BLE + WiFi relay controller for ESP32 home automation
   - Category: Tools
   - Content rating: complete the questionnaire (select "Utilities/Productivity")
5. Add screenshots (take them from Chrome DevTools device mode)
6. Add privacy policy URL (generate at https://www.privacypolicygenerator.info)
7. Submit for review → 3–7 days

---

## STEP 7 — Samsung Galaxy Store

Fee: Free
URL: https://seller.samsungapps.com

1. Register as seller
2. Add new app → Web App (PWA)
3. Enter URL: https://anipshah.com.np/apps/home_automation/
4. Upload icon-512.png
5. Add screenshots and description
6. Submit → 3–5 days

---

## STEP 8 — Microsoft Store

Fee: Free (individual)
URL: https://partner.microsoft.com/dashboard

1. Register account
2. Create new app → PWA
3. Enter URL: https://anipshah.com.np/apps/home_automation/
4. Microsoft auto-packages it
5. Add screenshots and description
6. Submit → 1–3 days

---

## ⚠️ Apple App Store — NOT recommended yet

Web Bluetooth is blocked on all iOS browsers by Apple.
Your BLE relay control will NOT work on iPhone/iPad.
Skip this until you're ready to rebuild the BLE layer natively.

---

## 🔑 Important files to back up

  android.keystore    — without this you can NEVER update your Play Store app
  Key password        — store in a password manager
  assetlinks.json     — keep a copy

---

## Need screenshots for store listings?

1. Open https://anipshah.com.np/apps/home_automation/ in Chrome
2. DevTools (F12) → Toggle device toolbar → Select "Pixel 7"
3. Screenshot the app in different states (relay on, relay off, voice panel)
4. Recommended: at least 4 screenshots, 1080×1920px
