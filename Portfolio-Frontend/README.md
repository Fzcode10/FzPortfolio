# Faij Ahamad — Portfolio Website

A premium, production-quality personal portfolio website built with **React.js + Vite**.

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 File Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css
│   ├── Hero.jsx / .css
│   ├── Stats.jsx / .css
│   ├── About.jsx / .css
│   ├── Skills.jsx / .css
│   ├── Experience.jsx / .css
│   ├── Projects.jsx / .css
│   ├── ProjectCard.jsx / .css
│   ├── Achievements.jsx / .css
│   ├── Education.jsx / .css
│   ├── Certifications.jsx / .css
│   ├── Contact.jsx / .css
│   ├── SocialLinks.jsx / .css
│   ├── Footer.jsx / .css
│   └── BackToTop.jsx / .css
│
├── data/
│   └── portfolioData.js   ← ALL LINKS & CONTENT HERE
│
└── index.css              ← Global design system

public/
└── assets/
    ├── profile.png            ← ADD YOUR PHOTO HERE
    ├── Faij-Ahamad-Resume.pdf ← ADD YOUR RESUME HERE
    └── projects/
        ├── fzad-event-manager.png  ← ADD PROJECT SCREENSHOT
        └── eduvantaaz.png           ← ADD PROJECT SCREENSHOT
```

---

## ✅ What to Replace

All placeholder links are in **`src/data/portfolioData.js`**.

### 1. Add your photo
Place your photo at:
```
public/assets/profile.png
```

### 2. Add your resume
Place your resume PDF at:
```
public/assets/Faij-Ahamad-Resume.pdf
```

### 3. Update social links
Edit `src/data/portfolioData.js`:
```js
links: {
  github:   "https://github.com/YOUR_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_USERNAME",
  leetcode: "https://leetcode.com/YOUR_USERNAME",
}
```

### 4. Update project links
```js
projects: [
  {
    liveDemo: "https://YOUR_ACTUAL_LIVE_DEMO_URL",
    github:   "https://github.com/YOUR_USERNAME/fzad-event-manager",
  },
  ...
]
```

### 5. Update certificate links
```js
certifications: [
  { link: "https://YOUR_ACTUAL_CERTIFICATE_URL" },
  ...
]
```

### 6. Add project screenshots (optional)
Place project screenshots at:
```
public/assets/projects/fzad-event-manager.png
public/assets/projects/eduvantaaz.png
```

---

## 🔧 Contact Form Backend

The contact form sends messages to the Express.js Nodemailer backend (`Portfolio-Backend/server.js`).

1. Make sure `Portfolio-Backend` is running (`npm run dev` or `npm start` in `Portfolio-Backend/`).
2. Configure your backend URL in `Portfolio-Frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api/contact
   ```
3. In production, change `VITE_API_URL` to your hosted backend URL.

---

## 📦 Build for Production

```bash
npm run build
```

Output: `dist/` folder — deploy to Vercel, Netlify, or any static host.
