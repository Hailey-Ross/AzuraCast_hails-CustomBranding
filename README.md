# AzuraCast_hails-CustomBranding
Custom Branding Setup for AzuraCast Public Pages  
Created by **Hailey Ross**

---

## 🚀 Overview

This repository contains a plug‑and‑play branding package designed specifically for **AzuraCast Docker installations** that provide:

- ✅ Custom CSS  
- ✅ Custom JS   

These files let you fully modernize your AzuraCast public pages with:

- 🎆 A dynamic **Particles.js** animated background  
- 🌄 **Random background images** on each page reload  
- 🎨 Clean layering so AzuraCast’s UI remains fully interactive  
- 🧩 100% automatic injection — *no HTML editing required*  

This setup mirrors the behavior of your original standalone homepage and adapts it for AzuraCast’s branding system.

---

## 🖼️ Preview
![Preview](https://raw.githubusercontent.com/Hailey-Ross/AzuraCast_hails-CustomBranding/main/preview.gif)

---

## 📁 Repository Contents

| File | Purpose |
|------|---------|
| `Custom_CSS.css` | Controls page background behavior, ensures proper layering, enables transparent particle canvas, and keeps UI elements above the animation. |
| `Custom_JS.js` | Injects the particles container, loads particles.js + your config, and randomizes background images using your hosted assets. |

---

## 🛠 How to Use These Files

### 1. Log in to AzuraCast as **System Administrator**
Navigate to:

```
Administration → Branding
```

You should see:

- ✔ Custom CSS  
- ✔ Custom JS  
- ❌ No HTML header/footer options  

This setup works **perfectly** with only the two available fields.

---

## 2. Paste the Custom CSS

1. Open `Custom_CSS.css`
2. Copy all content
3. Paste into:

```
Administration → Branding → Custom CSS
```

What this CSS does:

- Sets the body to support full-screen backgrounds  
- Fixes particle layer behind UI  
- Ensures the particle canvas remains transparent  
- Resolves z-index conflicts by lifting all UI components above the animation  

---

## 3. Paste the Custom JS

1. Open `Custom_JS.js`
2. Copy all content
3. Paste into:

```
Administration → Branding → Custom JS
```

What this JS does:

- Dynamically creates `<div id="particles-js">`
- Loads `particles.js` from your hosting server
- Loads your configuration script
- Randomizes your background image from your asset list
- Ensures no duplicate scripts load

No HTML editing is required — the script injects everything automatically.

---

## 🖼 Asset Requirements

The JS file expects hosted assets such as:

```
https://yourdomain.com/path/bg1.jpg
https://yourdomain.com/path/particles.js
https://yourdomain.com/path/script.js
```

If your file paths change, update them in `Custom_JS.js`.

---

## 🔄 Updating These Files

Whenever you update:

- Background image URLs  
- Particle configuration  
- Animation behavior  
- Layering rules  
- Hosting paths  

Simply:

1. Edit the files in this repository  
2. Copy/paste the updated versions back into AzuraCast  

This repo acts as a **backup** and **version-controlled reference** for all future changes.

---

## 🧪 Troubleshooting

### Particles not showing?
- Ensure your `particles.js` URL is pointing to the correct location on your hosting provider  
- Check that `#particles-js` is being injected (browser inspector)

### Background not changing?
- Make sure all background URLs load properly in your browser

### UI appearing behind particles?
- Adjust `z-index` values in `Custom_CSS.css` if needed

---

## 📜 License

This project is licensed under the **MIT License**.  
 attribution is appreciated but not required.

---

## 💬 Contact / Credits

Built by **Hailey Ross**  
Enhancements and README prepared with AI assistance.

