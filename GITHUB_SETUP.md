# GitHub Repository Setup Guide

## Step 1: Create a GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign in (or create an account if you don't have one)

2. **Create a new repository:**
   - Click the "+" icon in the top right
   - Select "New repository"

3. **Repository settings:**
   - **Repository name:** `portfolio` (or `lukman-portfolio`, `my-portfolio`, etc.)
   - **Description:** "My professional portfolio website"
   - **Visibility:** Choose Public (recommended) or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

4. **Copy the repository URL:**
   - GitHub will show you a page with setup instructions
   - Copy the HTTPS URL (looks like: `https://github.com/YOUR-USERNAME/portfolio.git`)

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, run these commands in your terminal:

```bash
cd "/Users/lukman/Desktop/Work and projects/Portforlio"
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` and `REPO-NAME` with your actual GitHub username and repository name!**

## Step 3: Verify

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files there!

## Future Updates

Whenever you make changes to your portfolio:

```bash
cd "/Users/lukman/Desktop/Work and projects/Portforlio"
git add .
git commit -m "Description of your changes"
git push
```

## Need Help?

If you get authentication errors:
- GitHub now requires a Personal Access Token instead of password
- Go to: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate a new token with `repo` permissions
- Use the token as your password when pushing

