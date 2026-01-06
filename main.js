/* ========================================
   MND PERMIS - MAIN JAVASCRIPT
   ======================================== */

// Strict mode
'use strict';

// ========================================
// NAVIGATION
// ========================================

const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__link[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav__link[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or "#/"
        if (href === '#' || href === '#/') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// HERO SCROLL BUTTON
// ========================================

const heroScroll = document.querySelector('.hero__scroll');

if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const nextSection = document.querySelector('.hero').nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// STATISTICS COUNTER ANIMATION
// ========================================

const stats = document.querySelectorAll('.stat__number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector('.stat__number');
            if (stat && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
            }
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// REVIEWS SLIDER
// ========================================

const reviewsTrack = document.getElementById('reviews-track');
const prevBtn = document.getElementById('reviews-prev');
const nextBtn = document.getElementById('reviews-next');

if (reviewsTrack && prevBtn && nextBtn) {
    const scrollAmount = 370; // card width + gap
    
    prevBtn.addEventListener('click', () => {
        reviewsTrack.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        reviewsTrack.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Auto scroll reviews (optional)
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const maxScroll = reviewsTrack.scrollWidth - reviewsTrack.clientWidth;
            
            if (reviewsTrack.scrollLeft >= maxScroll) {
                reviewsTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                reviewsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 5000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Start auto scroll
    startAutoScroll();
    
    // Pause on hover
    reviewsTrack.addEventListener('mouseenter', stopAutoScroll);
    reviewsTrack.addEventListener('mouseleave', startAutoScroll);
    
    // Pause on button interaction
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        setTimeout(startAutoScroll, 10000);
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        setTimeout(startAutoScroll, 10000);
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(`
    .promo__card,
    .advantage__card,
    .hours__card,
    .review__card,
    .about__content,
    .about__image
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;
scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(scrollTopBtn);

// Add CSS for scroll top button
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3B82F6 0%, #0D7BC5 100%);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        z-index: 999;
    }
    
    .scroll-top.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
    }
    
    .scroll-top svg {
        color: white;
    }
    
    @media (max-width: 768px) {
        .scroll-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========================================
// FORM VALIDATION (for future use)
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+212|0)[5-7]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Export for use in other pages
window.MNDPermis = {
    validateEmail,
    validatePhone
};

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#accueil';
skipLink.className = 'skip-link';
skipLink.textContent = 'Passer au contenu principal';
document.body.insertBefore(skipLink, document.body.firstChild);

const skipLinkStyle = document.createElement('style');
skipLinkStyle.textContent = `
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #3B82F6;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    }
    
    .skip-link:focus {
        top: 0;
    }
`;
document.head.appendChild(skipLinkStyle);

// Keyboard navigation for cards
const cards = document.querySelectorAll('.promo__card, .advantage__card, .review__card');
cards.forEach(card => {
    card.setAttribute('tabindex', '0');
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c MND PERMIS ', 'background: #3B82F6; color: white; font-size: 20px; padding: 10px;');
console.log('%c Développé avec ❤️ ', 'background: #F5C400; color: black; font-size: 14px; padding: 5px;');

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Log page load time
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`Page chargée en ${loadTime}ms`);
});

// ========================================
// SERVICE WORKER (for PWA - optional)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}