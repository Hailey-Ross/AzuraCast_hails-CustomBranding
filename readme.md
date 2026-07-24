# hails.AzuraCast-CustomBranding

Custom branding setup for AzuraCast public pages, created by **Hailey Ross**.

## Overview

A plug-and-play branding package for **AzuraCast Docker installations**, which expose only
**Custom CSS** and **Custom JS** fields under branding (no HTML header/footer). Everything is
injected automatically through those two fields. No HTML editing required.

It gives your AzuraCast public pages:

- A dynamic **Particles.js** animated background
- **Random background images** on each page reload
- A **custom animated cursor** with a sparkle trail (self-contained, nothing to host)
- An optional **served counter** (off by default), an animated per-character gradient label in the corner
- Clean layering so the AzuraCast UI stays fully interactive above the animation

This mirrors the behavior of the standalone homepage and adapts it to AzuraCast's branding system.

## Preview

[Preview](https://assets.hails.cc/i/azura-custombrand-preview2.gif)
![Preview](https://assets.hails.cc/i/azura-custombrand-preview2.gif)

## Repository contents

| File | Purpose |
|------|---------|
| `Custom_CSS.css` | Page background behavior, layering, transparent particle canvas, and styling for the custom cursor and served counter. |
| `Custom_JS.js` | Injects the particles container, loads particles.js and your config, randomizes the background, injects the animated cursor, and can inject an optional served counter (off by default) whose text loads from your hosted `served.js`. |

## Installation

### 1. Open the branding settings

Log in to AzuraCast as a **System Administrator** and go to:

```
Administration -> Branding
```

You'll have two relevant fields: **Custom CSS** and **Custom JS**. There are no HTML
header/footer fields, and none are needed.

### 2. Paste the Custom CSS

Copy the full contents of `Custom_CSS.css` into **Administration -> Branding -> Custom CSS**.

It handles:

- Full-screen background support on the body
- Fixing the particle layer behind the UI and keeping its canvas transparent
- Resolving z-index conflicts so all UI components sit above the animation
- Positioning and styling the custom cursor and served counter

### 3. Paste the Custom JS

Copy the full contents of `Custom_JS.js` into **Administration -> Branding -> Custom JS**.

It handles:

- Creating `<div id="particles-js">` and loading particles.js plus your config
- Randomizing the background image from your asset list
- Injecting the animated cursor and its sparkle trail
- Optionally injecting a served counter (off by default) whose text loads from your hosted `served.js`
- Guarding against duplicate script loads

## Asset requirements

Download and configure `particles.js` and `script.js` from Vincent Garreau's
[Particles.js](https://vincentgarreau.com/particles.js/) project, then host them yourself.

The JS expects these hosted assets:

```
https://yourdomain.com/path/bg1.jpg
https://yourdomain.com/path/bg-special.png
https://yourdomain.com/path/particles.js
https://yourdomain.com/path/script.js
```

The served counter also needs a hosted `served.js`, but only if you choose to enable it (see below).

The custom cursor needs nothing hosted. Its SVG is inline in `Custom_JS.js`.

The served counter is optional and off by default. To enable it, host a small `served.js`, set
its URL in `Custom_JS.js`, and remove the `/*` and `*/` that wrap the served counter block. That
file just sets the label text and reveals it:

```js
(function(){var w=document.getElementById("served");if(!w)return;w.textContent="Over 9000 requests served";w.className="on";})();
```

Change the string to whatever you want the counter to say.

In `Custom_JS.js`, update the following to match your own hosting:

- `coreScript.src = 'https://LINK_TO/particlejs/particles.js';`
- `configScript.src = 'https://LINK_TO/particlejs/script.js';`
- `s.src = 'https://LINK_TO/served.js';` (only if you enable the served counter)
- The `bgImages` array near the top:

```js
const bgImages = [
  'URL TO IMAGE',
  'URL TO IMAGE',
  'URL TO IMAGE'
];
```

## Updating

When you change background URLs, particle configuration, animation behavior, layering rules,
or hosting paths:

1. Edit the files in this repository.
2. Copy/paste the updated versions back into AzuraCast.

The repo acts as a backup and a version-controlled reference for future changes.

## Troubleshooting

**Particles not showing**
- Confirm the `particles.js` URL points to the correct location on your host.
- Check the URLs for typos.
- Confirm `#particles-js` is being injected (browser inspector).

**Background not changing**
- Double-check the URLs for typos.
- Make sure every background URL loads on its own in a browser.

**UI appearing behind particles**
- Check for typos first.
- Adjust the `z-index` values in `Custom_CSS.css` if needed.

**Custom cursor not appearing**
- It's disabled by design on touch / coarse-pointer devices and when the OS requests reduced motion.
- Confirm `#hailsCursor` is injected (browser inspector).

**Served counter not showing**
- Confirm your `served.js` URL loads and sets the text.
- Check the browser console for load errors on `served.js`.
