document.addEventListener('DOMContentLoaded', () => {
    
    const heroHeading = document.querySelector('.hero-text h1');
    if (heroHeading) {
        const fullText = heroHeading.textContent.trim();
        const textSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');

        heroHeading.textContent = '';
        cursorSpan.className = 'typing-cursor';

        heroHeading.appendChild(textSpan);
        heroHeading.appendChild(cursorSpan);

        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                textSpan.textContent += fullText[i];
                i++;
            } else {
                clearInterval(interval);
                cursorSpan.remove();
            }
        }, 30);
    }

    
    const customSmoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        const startPosition = window.scrollY;
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

    if (!prefersReducedMotion.matches) {
        const staggerChildren = (parentSelector, childSelector, staggerMs = 60) => {
            document.querySelectorAll(parentSelector).forEach(parent => {
                parent.querySelectorAll(childSelector).forEach((child, i) => {
                    child.classList.add('reveal');
                    child.style.transitionDelay = `${i * staggerMs}ms`;
                });
            });
        };

        const soloReveal = (selector) => {
            document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
        };

        soloReveal('.projects-heading, .collab-heading, .bio-heading, .creative-heading, .experience-heading, .writing-heading');
        soloReveal('.bio-avatar, .bio-content');
        soloReveal('.collabtext-btn, .socials');

        staggerChildren('.projects-grid', '.project-card, .project-card-vm', 100);
        staggerChildren('.experience-list', '.exp-item', 100);
        staggerChildren('.writing-grid', '.writing-card', 120);
        staggerChildren('.tools-list', '.tool-card', 80);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const cursorDot = document.querySelector(".cursor-dot");
    const offset = 10;
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    const speed = 0.3;

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
                cursorDot.style.transform = 'scale(1.3)';
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

