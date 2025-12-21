// ============================================
// EmailJS Configuration
// ============================================
// To set up EmailJS:
// 1. Sign up at https://www.emailjs.com/
// 2. Add an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Get your credentials from the EmailJS dashboard and update the values below:

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'D3IncRuni8U_wy4Tn',      // From: Dashboard > Account > General > Public Key
    SERVICE_ID: 'service_i22ud1o',      // From: Dashboard > Email Services > Copy Service ID
    TEMPLATE_ID: 'template_5qspqqo'     // From: Dashboard > Email Templates > Copy Template ID
};

// ============================================
// Navigation Toggle
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Indicator Click Handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Fade-in Animation Observer
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe fade-in sections
document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .skill-category');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.style.width;
            skillBar.style.width = '0';
            setTimeout(() => {
                skillBar.style.width = width;
            }, 100);
            skillObserver.unobserve(skillBar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// Contact Form Handling with EmailJS
// ============================================
const contactForm = document.getElementById('contactForm');

// Initialize EmailJS when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate EmailJS configuration
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
            EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            alert('EmailJS is not configured. Please update the EMAILJS_CONFIG in script.js with your credentials.');
            return;
        }
        
        // Get form values
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Get submit button to show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formData
        )
        .then(() => {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        })
        .catch((error) => {
            // Show error message
            alert('Sorry, there was an error sending your message. Please try again or contact me directly at lukmankunveng@gmail.com');
            console.error('EmailJS Error:', error);
            
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}

// Typing Effect for Hero Title (Optional Enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Typing effect is disabled - text is already visible in HTML
    // Uncomment below to enable typing effect:
    /*
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
    */
}

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                animateCounter(statNumber);
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// Parallax Effect for Hero Section (Optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add active class to nav links on scroll
document.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});
