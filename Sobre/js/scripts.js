/**
 * EXCLUSIVE INTELLIGENCE ARCHITECTURE
 * Ultra-Optimized Performance Experience
 * Lazy-loaded non-critical functionality
 */

class OptimizedExperience {
    constructor() {
        this.init();
    }

    /**
     * Initialize optimized components
     */
    init() {
        this.setupLazyAnimations();
        this.setupDeferredInteractions();
        this.setupOptimizedScrolling();
        this.setupMetricCounters();
        this.setupAdvancedEffects();
    }

    /**
     * Lazy animation setup - only when needed
     */
    setupLazyAnimations() {
        // Enhanced intersection observer with performance optimization
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 50);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '-20px'
        });

        // Observe elements that weren't instantly animated
        document.querySelectorAll('.strategic-navigation, .executive-concierge, .revelation').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Deferred interaction enhancements
     */
    setupDeferredInteractions() {
        // Strategic path enhanced interactions
        const paths = document.querySelectorAll('.strategic-path');
        paths.forEach(path => {
            // Optimized hover effects
            path.addEventListener('mouseenter', () => {
                requestAnimationFrame(() => {
                    path.style.transform = 'translateY(-10px) scale(1.015)';
                    path.style.willChange = 'transform';
                });
            }, { passive: true });
            
            path.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    path.style.transform = '';
                    path.style.willChange = 'auto';
                });
            }, { passive: true });

            // Enhanced click tracking
            path.addEventListener('click', (e) => {
                const pathType = path.classList.contains('data-path') ? 'data' : 'solutions';
                this.trackInteraction('strategic_path_click', pathType);
            });
        });

        // Distinction metric hover effects
        const metrics = document.querySelectorAll('.distinction-metric');
        metrics.forEach(metric => {
            metric.addEventListener('mouseenter', () => {
                requestAnimationFrame(() => {
                    metric.style.background = 'rgba(212, 175, 55, 0.02)';
                    metric.style.transform = 'translateX(4px)';
                });
            }, { passive: true });
            
            metric.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    metric.style.background = '';
                    metric.style.transform = '';
                });
            }, { passive: true });
        });
    }

    /**
     * Optimized scrolling with throttling
     */
    setupOptimizedScrolling() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / docHeight) * 100;
            
            // Update progress indicator
            const progressEl = document.getElementById('progressIndicator');
            if (progressEl) {
                progressEl.style.width = `${progress}%`;
            }

            // Subtle parallax for excellence aura
            const aura = document.querySelector('.excellence-aura');
            if (aura && scrolled < window.innerHeight * 2) {
                aura.style.transform = `translate3d(0, ${scrolled * 0.05}px, 0)`;
            }

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Smooth scrolling for anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Animated metric counters with performance optimization
     */
    setupMetricCounters() {
        const exclusivityPanel = document.querySelector('.exclusivity-panel');
        
        if (exclusivityPanel) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => this.animateMetrics(), 600);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.6 });
            
            observer.observe(exclusivityPanel);
        }

        // Matrix cell animations
        const matrixCells = document.querySelectorAll('.matrix-cell');
        if (matrixCells.length > 0) {
            const matrixObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cells = document.querySelectorAll('.matrix-cell');
                        cells.forEach((cell, index) => {
                            setTimeout(() => {
                                requestAnimationFrame(() => {
                                    cell.style.transform = 'translateY(0)';
                                    cell.style.opacity = '1';
                                });
                            }, index * 300);
                        });
                        matrixObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            
            matrixObserver.observe(document.querySelector('.executive-concierge'));

            // Initialize matrix cells as hidden
            matrixCells.forEach(cell => {
                cell.style.transform = 'translateY(20px)';
                cell.style.opacity = '0';
                cell.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        }
    }

    /**
     * Animate metric values with optimized counting
     */
    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-achievement');
        
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                // Skip animation for complex values
                if (metric.hasAttribute('data-no-animate')) {
                    return;
                }
                
                const finalValue = metric.textContent;
                const isPercentage = finalValue.includes('%');
                const isPositive = finalValue.includes('+');
                
                // Only animate simple numeric values
                const numericMatch = finalValue.match(/\d+/);
                if (!numericMatch) return;
                
                const numericValue = parseInt(numericMatch[0]);
                if (isNaN(numericValue) || numericValue > 1000) return;
                
                let current = 0;
                const increment = numericValue / 45; // Faster animation
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (isPositive && current > 0) displayValue = '+' + displayValue;
                    if (isPercentage) displayValue += '%';
                    
                    metric.textContent = displayValue;
                }, 25);
            }, index * 150);
        });
    }

    /**
     * Advanced effects with performance consideration
     */
    setupAdvancedEffects() {
        // Enhanced button interactions
        const actionButtons = document.querySelectorAll('.action-button, .gateway-access');
        
        actionButtons.forEach(button => {
            // Optimized hover effects
            button.addEventListener('mouseenter', function() {
                requestAnimationFrame(() => {
                    this.style.transform = 'translateY(-3px) scale(1.01)';
                    this.style.willChange = 'transform';
                });
            }, { passive: true });
            
            button.addEventListener('mouseleave', function() {
                requestAnimationFrame(() => {
                    this.style.transform = '';
                    this.style.willChange = 'auto';
                });
            }, { passive: true });
            
            // Optimized ripple effect
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 0.8;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.08);
                    transform: scale(0);
                    animation: ripple 0.4s ease-out;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 400);
            });
        });

        // CSS animation for ripple
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Track interactions for analytics
     */
    trackInteraction(event, data) {
        // Analytics tracking (replace with your preferred analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                'event_category': 'user_engagement',
                'event_label': data
            });
        }
        
        // Custom tracking logic can be added here
        console.log(`🎯 Interaction tracked: ${event} - ${data}`);
    }

    /**
     * Performance monitoring
     */
    monitorPerformance() {
        if ('performance' in window) {
            // Monitor FPS
            let frames = 0;
            let lastTime = performance.now();
            
            function countFrames(currentTime) {
                frames++;
                
                if (currentTime >= lastTime + 1000) {
                    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                    
                    if (fps < 30) {
                        console.warn('⚠️ Low FPS detected:', fps);
                        // Reduce animation complexity if needed
                        this.reducedMotionMode();
                    }
                    
                    frames = 0;
                    lastTime = currentTime;
                }
                
                requestAnimationFrame(countFrames);
            }
            
            requestAnimationFrame(countFrames);
        }
    }

    /**
     * Reduced motion mode for performance
     */
    reducedMotionMode() {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable complex animations
        const animatedElements = document.querySelectorAll('[class*="animation"], [class*="animate"]');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
    }

    /**
     * Cleanup for memory management
     */
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.updateScrollEffects);
        
        // Clear any running timers
        if (this.metricsTimer) {
            clearInterval(this.metricsTimer);
        }
        
        console.log('🧹 Optimized Experience cleaned up');
    }
}

/**
 * Accessibility Enhancements
 */
function setupAccessibility() {
    // Keyboard navigation for strategic paths
    const strategicPaths = document.querySelectorAll('.strategic-path');
    
    strategicPaths.forEach(path => {
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', path.querySelector('.path-title').textContent);
        
        path.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        path.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(212, 175, 55, 0.4)';
            this.style.outlineOffset = '4px';
        });
        
        path.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        
        // Disable complex animations
        const animatedElements = document.querySelectorAll('[class*="animation"], [class*="animate"]');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }
}

/**
 * Utility Functions
 */
const utils = {
    /**
     * Throttle function for performance
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top >= -threshold &&
            rect.bottom <= windowHeight + threshold
        );
    },

    /**
     * Preload critical resources
     */
    preloadResources(urls) {
        urls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }
};

/**
 * Error Handling with Performance Context
 */
window.addEventListener('error', (e) => {
    console.error('🚨 JS Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        timestamp: performance.now()
    });
});

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExperience);
} else {
    initializeExperience();
}

function initializeExperience() {
    // Initialize the main experience controller
    window.optimizedExperience = new OptimizedExperience();
    
    // Setup accessibility enhancements
    setupAccessibility();
    
    // Preload critical resources
    utils.preloadResources(['dashboard.html']);
    
    // Performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.optimizedExperience.monitorPerformance();
        console.log('🚀 Exclusive Intelligence Architecture - Optimized Mode');
    }
}

/**
 * Export for module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OptimizedExperience, utils };
}
