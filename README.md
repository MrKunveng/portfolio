# Portfolio Website

A modern, responsive portfolio website for Lukman Kunveng - Data Scientist & AI/ML Enthusiast.

🌐 **Live Site**: [https://lukmankunveng.netlify.app](https://lukmankunveng.netlify.app)

## Features

- ✨ Modern and professional design with glassmorphism effects
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Smooth animations and transitions
- 🚀 Fast and lightweight with optimized performance
- ♿ Accessible design with ARIA labels and skip links
- 📧 Working contact form with EmailJS integration
- 🎯 SEO optimized with meta tags and structured data
- 📊 Scroll progress indicator
- 🔝 Back to top button
- 🖨️ Print-friendly styles

## Sections

1. **Hero Section** - Introduction with call-to-action buttons
2. **About** - Personal information and statistics
3. **Experience** - Work history timeline
4. **Skills** - Technical skills with progress bars
5. **Projects** - Featured project showcase
6. **Education** - Educational background
7. **Contact** - Contact information and form

## Customization Guide

### 1. Update Personal Information

Edit `index.html` to update:

- **Name**: Replace "Lukman" throughout the file
- **Title/Subtitle**: Update in the hero section
- **Description**: Modify the about section text
- **Social Links**: Add your actual LinkedIn, GitHub, and email URLs

### 2. Update Experience Section

In the Experience section (`#experience`), replace the timeline items with your actual work history:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <span class="timeline-date">2023 - Present</span>
        <h3 class="timeline-title">Your Job Title</h3>
        <h4 class="timeline-company">Company Name</h4>
        <ul class="timeline-description">
            <li>Your achievement or responsibility</li>
            <li>Another achievement or responsibility</li>
        </ul>
    </div>
</div>
```

### 3. Update Skills

Modify the skills section to reflect your actual skills. Adjust the progress bar widths (percentage values):

```html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 90%"></div>
    </div>
</div>
```

### 4. Update Projects

Replace the project cards with your actual projects:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add project screenshot or image -->
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Project description</p>
        <div class="project-tags">
            <span class="tag">Technology</span>
        </div>
    </div>
</div>
```

### 5. Update Education

Replace education cards with your actual educational background:

```html
<div class="education-card">
    <h3 class="education-degree">Your Degree</h3>
    <h4 class="education-field">Field of Study</h4>
    <p class="education-university">University Name</p>
    <span class="education-year">Year Range</span>
</div>
```

### 6. Update Contact Information

Update contact details in the contact section:

- Location
- Email address
- Social media links

### 7. Update Colors (Optional)

To change the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary color */
    /* ... other variables */
}
```

### 8. Add Your Photo

Replace the placeholder in the hero section with your actual photo:

```html
<div class="hero-image">
    <img src="path/to/your/photo.jpg" alt="Your Name" />
</div>
```

## File Structure

```
Portfolio/
├── index.html           # Main HTML file
├── styles.css           # CSS styles with animations
├── script.js            # JavaScript functionality
├── README.md            # Documentation
├── Lukman_s_CV1.pdf    # CV/Resume
├── robots.txt           # SEO - Search engine instructions
├── sitemap.xml          # SEO - Site structure
├── .gitignore           # Git ignore rules
└── .gitattributes       # Git attributes
```

## Performance Optimizations

- Preconnect to external resources (fonts, CDNs)
- Optimized images with lazy loading
- Minified and efficient CSS/JS
- Structured data for better SEO
- Sitemap and robots.txt included
- Print-friendly styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Open `index.html` in your browser
2. Customize the content with your information
3. Test on different devices
4. Deploy to your hosting service

## Deployment

### Netlify (Recommended - Current Deployment)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy settings:
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root)
4. Your site will be live at `https://your-site-name.netlify.app`

### GitHub Pages

1. Go to repository Settings > Pages
2. Select branch: `main`
3. Select folder: `/ (root)`
4. Save and wait for deployment
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Vercel

1. Import your GitHub repository
2. Framework Preset: Other
3. Build Command: (leave empty)
4. Output Directory: `./`
5. Deploy

### Custom Domain

To use a custom domain:
1. Purchase a domain from a registrar
2. In your hosting platform (Netlify/Vercel), add custom domain
3. Update DNS records as instructed
4. Update all URLs in the code to use your custom domain

## Tips

- Keep images optimized for web (use WebP format when possible)
- Test the contact form with a backend service (Formspree, EmailJS, etc.)
- Update the meta tags in the `<head>` for better SEO
- Add your Google Analytics tracking code if needed
- Regularly update your projects and skills

## Support

If you need help customizing the portfolio, feel free to:
- Review the code comments
- Check the HTML structure
- Modify the CSS to match your preferences
- Adjust JavaScript functionality as needed

## License

Feel free to use this portfolio template for your personal use.

---

**Note**: Remember to replace all placeholder content with your actual information from your CV!
