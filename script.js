document.addEventListener('DOMContentLoaded', () => {
    
    const customSmoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1200;
        let startTime = null;

        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };

        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed / duration);
            const newPosition = startPosition + (distance * run);
            
            window.scrollTo(0, newPosition);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && !linkHref.startsWith('#') && linkHref === currentPage) {
            link.classList.add('active-nav');
        }
    });

    const scrollElements = document.querySelectorAll('a');
    scrollElements.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                if (href === '#') return;
                e.preventDefault();
                customSmoothScroll(href);
            } 
            else if (href) {
                const currentPath = window.location.pathname;
                const linkPath = href.split('#')[0];
                
                if (currentPath.endsWith(linkPath) && linkPath !== '') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const loadImage = (image) => {
            const src = image.dataset.src;
            if (src) {
                image.src = src;
            }
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        lazyImages.forEach(image => imageObserver.observe(image));
    }
    
    const vmCard = document.querySelector('.vm-fr');
    if (vmCard) {
        vmCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('View more clicked');
            }
        });
    }

    const cursorDot = document.querySelector(".cursor-dot");
    const offset = 12;
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    const speed = 0.15;

    if (cursorDot) {
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX + offset;
            mouseY = e.clientY + offset;
        });

        const animateDot = () => {
            dotX += (mouseX - dotX) * speed;
            dotY += (mouseY - dotY) * speed;
            
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
            
            requestAnimationFrame(animateDot);
        };
        animateDot();

        const hoverElements = document.querySelectorAll('a, button, .project-card, .thumbnail, .writing-card, .sm-icon');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
            });
        });
    }

    if (window.matchMedia('(hover: none)').matches) {
        const touchTargets = document.querySelectorAll(
            '.project-card, .project-card-vm, .sm-icon, .writing-card, .bio-avatar, .email-link, .hero-btn, .collab-btn, .nav-links a'
        );

        touchTargets.forEach(el => {
            el.addEventListener('touchstart', () => {
                el.classList.add('is-pressed');
            }, { passive: true });

            el.addEventListener('touchend', () => {
                setTimeout(() => el.classList.remove('is-pressed'), 300);
            });

            el.addEventListener('touchcancel', () => {
                el.classList.remove('is-pressed');
            });
        });
    }

    console.log('%c Boluwatife Portfolio ', 'background: #4db5ff; color: #020B10; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
    console.log('%c Built with accessibility in mind ', 'color: #666;');
});

function getContrastRatio(color1, color2) {
    const getLuminance = (hex) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >>  8) & 0xff;
        const b = (rgb >>  0) & 0xff;
        
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };
    
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

function checkWCAG(fg, bg, level = 'AA', size = 'normal') {
    const ratio = getContrastRatio(fg, bg);
    const minimum = level === 'AAA' 
        ? (size === 'large' ? 4.5 : 7) 
        : (size === 'large' ? 3 : 4.5);
    
    return ratio >= minimum;
}

  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});


  Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});