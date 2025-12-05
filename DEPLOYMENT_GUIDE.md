# Portfolio Deployment Guide

This guide will help you deploy your portfolio website to make it live on the internet. Choose the method that works best for you.

## Option 1: Netlify (Easiest - Recommended for Beginners) ⭐

### Method A: Drag & Drop (No Git Required)

1. **Prepare your files:**
   - Make sure all your files are in one folder (index.html, styles.css, script.js, etc.)

2. **Go to Netlify:**
   - Visit: https://www.netlify.com/
   - Click "Sign up" (you can use your GitHub, Google, or Email account)

3. **Deploy:**
   - Once logged in, go to your dashboard
   - Drag and drop your entire portfolio folder onto the Netlify dashboard
   - Wait a few seconds - your site will be live!

4. **Get your URL:**
   - Netlify will give you a random URL like: `your-site-name-123.netlify.app`
   - You can customize it in Site settings > Change site name

### Method B: Git-Based Deployment (Recommended for updates)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub.com
   - Follow the instructions to push your code

3. **Connect to Netlify:**
   - Go to Netlify dashboard
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Click "Deploy site"

4. **Automatic updates:**
   - Every time you push to GitHub, Netlify will automatically update your site!

---

## Option 2: Vercel (Also Very Easy)

1. **Sign up:**
   - Visit: https://vercel.com/
   - Sign up with GitHub (recommended) or Email

2. **Deploy:**
   - Click "Add New Project"
   - Import your GitHub repository (or upload files)
   - Click "Deploy"

3. **Get your URL:**
   - Vercel gives you a URL like: `your-site-name.vercel.app`

---

## Option 3: GitHub Pages (Free with GitHub)

1. **Create GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be at: `YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## Option 4: Cloudflare Pages (Free)

1. **Sign up:**
   - Visit: https://pages.cloudflare.com/
   - Sign up with your email

2. **Deploy:**
   - Connect your GitHub account
   - Select your repository
   - Click "Begin setup" and "Save and Deploy"
   - Your site will be at: `YOUR-PROJECT.pages.dev`

---

## Quick Start: Deploy to Netlify in 2 Minutes

1. Go to: https://app.netlify.com/drop
2. Drag your entire portfolio folder onto the page
3. Done! You'll get a live URL instantly.

---

## Custom Domain (Optional - Later)

All platforms allow you to connect your own domain (like `lukmankunveng.com`):
- **Netlify**: Site settings > Domain management
- **Vercel**: Project settings > Domains
- **GitHub Pages**: Repository Settings > Pages > Custom domain

---

## Recommended: Netlify Drop

**The absolute fastest way:**
1. Visit: https://app.netlify.com/drop
2. Drag your portfolio folder
3. Get instant live URL!

No account needed for initial deployment (though signing up lets you keep the site).

---

## Before Deploying - Checklist

- [ ] Test your site locally (open index.html in browser)
- [ ] Check all links work
- [ ] Make sure images load correctly
- [ ] Test on mobile view
- [ ] Verify contact form (if applicable)

---

## Need Help?

If you run into issues:
1. Check browser console for errors (F12)
2. Ensure all file paths are correct
3. Make sure index.html is in the root folder
4. Verify image URLs are accessible

