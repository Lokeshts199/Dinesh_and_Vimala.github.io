// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initCountdownTimer();
    initScrollAnimations();
    initSmoothScrolling();
    initFloatingHearts();
    initParallaxEffect();
    initDynamicBackgrounds();
    initMobileOptimizations();
    initTimeBasedTheme();
    initInteractiveElements();
    initAdvancedAnimations();
    initPerformanceOptimizations();
});

// Enhanced Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Add loading animation enhancement
    const loader = loadingScreen.querySelector('.loader');
    if (loader) {
        // Add sparkle effect to loading screen
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${0.8 + Math.random() * 0.5}rem;
                    animation: sparkleFloat 2s ease-out forwards;
                    pointer-events: none;
                `;
                loader.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 400);
        }
    }
    
    // Hide loading screen after 2.5 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1';
            
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 500);
    }, 2500);
}

// Enhanced Countdown Timer
function initCountdownTimer() {
    // Set wedding muhurtham date and time
    const weddingDate = new Date('2024-08-07T08:30:00').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            document.querySelector('.countdown-section h3').textContent = "🎉 The auspicious moment has arrived! 🎉";
            document.querySelector('.countdown-timer').innerHTML = '<div class="celebration">🕉️ सुभ विवाह 🕉️<br>Blessed Union</div>';
            
            // Trigger celebration effect
            triggerCelebration();
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Animate number changes
        updateCounterWithAnimation('days', days);
        updateCounterWithAnimation('hours', hours);
        updateCounterWithAnimation('minutes', minutes);
        updateCounterWithAnimation('seconds', seconds);
    }, 1000);
}

function updateCounterWithAnimation(id, newValue) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const currentValue = element.textContent;
    const newValueStr = String(newValue).padStart(2, '0');
    
    if (currentValue !== newValueStr) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ff6b9d';
        
        setTimeout(() => {
            element.textContent = newValueStr;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    }
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.event-card, .timeline-item, .contact-card, .section-title');
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
        
        // Stagger animation delays
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Parallax scroll effect for sections
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Animate floating elements
        const floatingElements = document.querySelectorAll('.floating-hearts .heart');
        floatingElements.forEach((heart, index) => {
            const speed = 0.5 + (index * 0.1);
            heart.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    // Scroll indicator click with enhanced animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Add click effect
            scrollIndicator.style.transform = 'translateX(-50%) scale(0.9)';
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
            
            document.querySelector('.wedding-details').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced Floating Hearts
function initFloatingHearts() {
    const hero = document.querySelector('.hero');
    
    // Create additional hearts dynamically with better timing
    const heartInterval = setInterval(() => {
        if (Math.random() > 0.6) { // 40% chance every interval
            createFloatingHeart(hero);
        }
    }, isMobileDevice() ? 4000 : 2000); // Less frequent on mobile
    
    // Stop creating hearts when not in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                clearInterval(heartInterval);
            }
        });
    });
    
    if (hero) {
        heroObserver.observe(hero);
    }
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart dynamic-heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💝', '🌹', '🌺'][Math.floor(Math.random() * 7)];
    
    const size = 1 + Math.random() * 1.5;
    const duration = 6 + Math.random() * 4;
    const startX = Math.random() * 100;
    
    heart.style.cssText = `
        position: absolute;
        left: ${startX}%;
        bottom: 0;
        font-size: ${size}rem;
        opacity: 0.7;
        pointer-events: none;
        animation: floatUp ${duration}s linear forwards;
        z-index: 1;
        filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.6));
    `;
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, duration * 1000);
}

// Enhanced Parallax Effect
function initParallaxEffect() {
    if (isMobileDevice()) return; // Skip parallax on mobile for performance
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax for hero elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const speed = 0.3;
            heroContent.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        // Parallax for timeline icons
        const timelineIcons = document.querySelectorAll('.timeline-icon');
        timelineIcons.forEach((icon, index) => {
            const speed = 0.2 + (index * 0.05);
            const rect = icon.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                icon.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
        
        // Dynamic opacity for hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroHeight = hero.offsetHeight;
            const opacity = Math.max(0, 1 - (scrolled / heroHeight));
            const parallaxOverlay = hero.querySelector('.gradient-overlay');
            if (parallaxOverlay) {
                parallaxOverlay.style.opacity = 0.6 + (0.3 * (1 - opacity));
            }
        }
    }, 16));
}

// Enhanced Dynamic Backgrounds
function initDynamicBackgrounds() {
    const backgrounds = [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Wedding couple
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Wedding flowers
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Wedding venue
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'  // Wedding rings
    ];
    
    let currentIndex = 0;
    const hero = document.querySelector('.hero');
    
    // Preload all background images
    backgrounds.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Create additional background layer for smooth transitions
    const backgroundLayer = document.createElement('div');
    backgroundLayer.className = 'dynamic-background-layer';
    backgroundLayer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        background-attachment: scroll;
        opacity: 0;
        transition: opacity 3s ease-in-out;
        z-index: 0;
    `;
    hero.appendChild(backgroundLayer);
    
    // Change background every 8 seconds (slower for better UX)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        backgroundLayer.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
        backgroundLayer.style.opacity = '0.3';
        
        setTimeout(() => {
            backgroundLayer.style.opacity = '0';
        }, 5000);
    }, 8000);
    
    // Mouse movement parallax effect (desktop only)
    if (!isMobileDevice()) {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });
        
        // Smooth mouse following animation
        function animateMouseParallax() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            if (hero) {
                hero.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
            
            requestAnimationFrame(animateMouseParallax);
        }
        animateMouseParallax();
    }
}

// Mobile Optimizations
function initMobileOptimizations() {
    if (isMobileDevice()) {
        // Add mobile-specific class
        document.body.classList.add('mobile-device');
        
        // Optimize animations for mobile
        const floatingHearts = document.querySelectorAll('.heart');
        floatingHearts.forEach(heart => {
            heart.style.animationDuration = '10s'; // Slower animations
        });
        
        // Add touch events for better mobile interaction
        const interactiveElements = document.querySelectorAll('.event-card, .timeline-content, .contact-card');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                setTimeout(() => {
                    this.style.transition = '';
                }, 100);
            });
        });
        
        // Optimize viewport height for mobile browsers
        const updateViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', updateViewportHeight);
        
        // Disable hover effects on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) and (pointer: coarse) {
                .event-card:hover,
                .timeline-content:hover,
                .contact-card:hover {
                    transform: none !important;
                    box-shadow: var(--shadow-elegant) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Time-based Theme Changer
function initTimeBasedTheme() {
    const hour = new Date().getHours();
    let themeClass = 'day-theme';
    
    if (hour >= 18 || hour <= 6) {
        themeClass = 'night-theme';
        // Update countdown colors for night theme
        updateCountdownTheme('dark');
    } else if (hour >= 6 && hour <= 10) {
        themeClass = 'morning-theme';
        updateCountdownTheme('light');
    } else if (hour >= 16 && hour <= 18) {
        themeClass = 'evening-theme';
        updateCountdownTheme('warm');
    }
    
    document.body.classList.add(themeClass);
}

function updateCountdownTheme(theme) {
    const countdownSection = document.querySelector('.countdown-section');
    if (!countdownSection) return;
    
    switch (theme) {
        case 'dark':
            countdownSection.style.background = 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)';
            break;
        case 'warm':
            countdownSection.style.background = 'linear-gradient(135deg, #a55eea 0%, #fd79a8 100%)';
            break;
        default:
            // Keep default elegant gradient
            break;
    }
}

// Interactive Elements Enhancement
function initInteractiveElements() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.event-card, .contact-card, .timeline-content');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!isMobileDevice()) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isMobileDevice()) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Enhanced click effects for buttons and interactive elements
    const buttons = document.querySelectorAll('.social-icon, .scroll-indicator');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
    
    // Add magnetic effect to social icons (desktop only)
    if (!isMobileDevice()) {
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// Advanced Animations
function initAdvancedAnimations() {
    // Add sparkle animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            if (!isMobileDevice()) {
                createSparkleEffect(this);
            }
        });
    });
    
    // Add floating animation to card icons
    const cardIcons = document.querySelectorAll('.card-icon');
    cardIcons.forEach((icon, index) => {
        icon.style.animation = `iconFloat 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Add the CSS for new animations
    const advancedStyles = `
        @keyframes iconFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes sparkleFloat {
            0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-30px) scale(1) rotate(180deg); opacity: 1; }
            100% { transform: translateY(-60px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        .sparkle-effect {
            position: absolute;
            pointer-events: none;
            z-index: 1000;
            font-size: 1rem;
            color: #ffd93d;
            animation: sparkleFloat 1.5s ease-out forwards;
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = advancedStyles;
    document.head.appendChild(styleSheet);
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load background images
    const backgroundElements = document.querySelectorAll('[style*="background-image"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    backgroundElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(element);
    });
    
    // Optimize scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollPosition();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Utility Functions
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createSparkleEffect(element) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            sparkle.textContent = '✨';
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
            sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 200);
    }
}

function triggerEntranceAnimations() {
    // Animate hero elements with stagger
    const heroElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `${element.classList.contains('animate-fade-in') ? 'fadeInUp' : 'slideUp'} 1s ease-out forwards`;
        }, index * 200);
    });
}

function triggerCelebration() {
    // Create celebration particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = ['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)];
            particle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: ${1 + Math.random() * 2}rem;
                pointer-events: none;
                z-index: 10000;
                animation: celebrationFloat 3s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, i * 100);
    }
    
    // Add celebration animation CSS
    const celebrationStyles = `
        @keyframes celebrationFloat {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = celebrationStyles;
    document.head.appendChild(styleSheet);
}

function updateScrollPosition() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
    
    // Update header background opacity based on scroll
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

// Enhanced Page Visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Add CSS for page visibility optimizations
const visibilityStyles = `
    .page-hidden .heart,
    .page-hidden .floating-hearts,
    .page-hidden .timeline-icon,
    .page-hidden .card-icon {
        animation-play-state: paused !important;
    }
    
    .scrolled .hero {
        pointer-events: none;
    }
`;

const visibilityStyleSheet = document.createElement('style');
visibilityStyleSheet.textContent = visibilityStyles;
document.head.appendChild(visibilityStyleSheet);

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // This would register a service worker if you create one
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Initialize touch gestures for mobile
if (isMobileDevice()) {
    let startY = 0;
    
    document.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', e => {
        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;
        
        // Add subtle parallax effect on mobile scroll
        if (Math.abs(deltaY) > 10) {
            const hero = document.querySelector('.hero');
            if (hero && window.scrollY < hero.offsetHeight) {
                const parallaxOffset = deltaY * 0.1;
                hero.style.transform = `translateY(${parallaxOffset}px)`;
            }
        }
    });
    
    document.addEventListener('touchend', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'translateY(0)';
        }
    });
} 