/**
 * EXCLUSIVE INTELLIGENCE ARCHITECTURE
 * Interactive Experience Controller
 * Professional JavaScript Module
 */

class ExclusiveExperience {
    constructor() {
        this.init();
    }

    /**
     * Initialize all interactive components
     */
    init() {
        this.setupProgressTracking();
        this.setupAnimationOrchestration();
        this.setupSmoothScrolling();
        this.setupInteractionEnhancements();
        this.setupMetricAnimations();
        this.setupParallaxEffects();
        
        // Trigger initial animations
        this.orchestrateReveal();
    }

    /**
     * Progress Indicator Management
     */
    setupProgressTracking() {
        const progressIndicator = document.getElementById('progressIndicator');
        
        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (progressIndicator) {
                progressIndicator.style.width = `${scrollPercent}%`;
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call
    }

    /**
     * Sophisticated Animation Orchestration
     */
    setupAnimationOrchestration() {
        // Create intersection observer for reveal animations
        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.emerge, .ascend, .manifest-left, .manifest-right');
        animatableElements.forEach(element => {
            this.revealObserver.observe(element);
        });
    }

    /**
     * Trigger initial reveal animations
     */
    orchestrateReveal() {
        const elements = document.querySelectorAll('.emerge, .ascend, .manifest-left, .manifest-right');
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 150) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    }

    /**
     * Smooth Scrolling for Internal Links
     */
    setupSmoothScrolling() {
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
     * Enhanced Interaction Effects
     */
    setupInteractionEnhancements() {
        // Strategic path hover effects
        const strategicPaths = document.querySelectorAll('.strategic-path');
        strategicPaths.forEach(path => {
            path.addEventListener('mouseenter', () => {
                path.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            path.addEventListener('mouseleave', () => {
                path.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Distinction metric hover effects
        const metrics = document.querySelectorAll('.distinction-metric');
        metrics.forEach(metric => {
            metric.addEventListener('mouseenter', () => {
                metric.style.background = 'rgba(212, 175, 55, 0.03)';
                metric.style.marginLeft = '-1rem';
                metric.style.marginRight = '-1rem';
                metric.style.paddingLeft = '1rem';
                metric.style.paddingRight = '1rem';
            });
            
            metric.addEventListener('mouseleave', () => {
                metric.style.background = '';
                metric.style.margin = '';
                metric.style.padding = '';
            });
        });
    }

    /**
     * Animated Metric Counters
     */
    setupMetricAnimations() {
        const exclusivityPanel = document.querySelector('.exclusivity-panel');
        
        if (exclusivityPanel) {
            const metricsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => this.animateMetrics(), 800);
                        metricsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            metricsObserver.observe(exclusivityPanel);
        }
    }

    /**
     * Animate metric values with counting effect
     */
    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-achievement');
        
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                const finalValue = metric.textContent;
                const isPercentage = finalValue.includes('%');
                const isMultiplier = finalValue.includes('x');
                const isCurrency = finalValue.includes('€');
                const isNegative = finalValue.includes('-');
                const isPositive = finalValue.includes('+');
                
                // Skip complex values that can't be animated
                if (isCurrency || isMultiplier) return;
                
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                if (isNaN(numericValue)) return;
                
                let current = 0;
                const increment = numericValue / 60;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (isNegative) displayValue = '-' + displayValue;
                    if (isPositive && current > 0) displayValue = '+' + displayValue;
                    if (isPercentage) displayValue += '%';
                    
                    metric.textContent = displayValue;
                }, 30);
            }, index * 200);
        });
    }

    /**
     * Subtle Parallax Effects
     */
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const excellenceAura = document.querySelector('.excellence-aura');
            
            if (excellenceAura) {
                excellenceAura.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
            }
        });
    }

    /**
     * Executive Concierge Section Animations
     */
    setupConciergeAnimations() {
        const conciergeSection = document.querySelector('.executive-concierge');
        
        if (conciergeSection) {
            const conciergeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            const matrices = document.querySelectorAll('.matrix-cell');
                            matrices.forEach((cell, index) => {
                                setTimeout(() => {
                                    cell.style.transform = 'translateY(0)';
                                    cell.style.opacity = '1';
                                }, index * 400);
                            });
                        }, 300);
                        conciergeObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            conciergeObserver.observe(conciergeSection);

            // Initialize matrix cells as hidden
            document.querySelectorAll('.matrix-cell').forEach(cell => {
                cell.style.transform = 'translateY(25px)';
                cell.style.opacity = '0';
                cell.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        }
    }

    /**
     * Performance Monitoring
     */
    monitorPerformance() {
        // Monitor scroll performance
        let ticking = false;
        
        const updateAnimations = () => {
            this.orchestrateReveal();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        });
    }

    /**
     * Debug utilities for development
     */
    debug() {
        console.log('🎯 Exclusive Intelligence Architecture - Debug Mode');
        console.log('📊 Animated elements:', document.querySelectorAll('.emerge, .ascend').length);
        console.log('⚡ Strategic paths:', document.querySelectorAll('.strategic-path').length);
        console.log('💎 Metric counters:', document.querySelectorAll('.metric-achievement').length);
        console.log('🏛️ System initialized successfully');
    }

    /**
     * Cleanup method for memory management
     */
    destroy() {
        if (this.revealObserver) {
            this.revealObserver.disconnect();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.updateProgress);
        window.removeEventListener('scroll', this.parallaxUpdate);
        
        console.log('🧹 Exclusive Experience cleaned up');
    }
}

/**
 * Initialize the experience when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main experience controller
    window.exclusiveExperience = new ExclusiveExperience();
    
    // Setup additional enhancements
    setupAdvancedInteractions();
    setupAccessibilityEnhancements();
    
    // Development mode check
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.exclusiveExperience.debug();
    }
});

/**
 * Advanced Interaction Handlers
 */
function setupAdvancedInteractions() {
    // Enhanced button interactions
    const actionButtons = document.querySelectorAll('.action-button, .gateway-access');
    
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Accessibility Enhancements
 */
function setupAccessibilityEnhancements() {
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
            this.style.outline = '2px solid rgba(212, 175, 55, 0.5)';
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
     * Throttle function for performance optimization
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
     * Debounce function for performance optimization
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -threshold &&
            rect.left >= -threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    },

    /**
     * Smooth number animation
     */
    animateNumber(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const change = end - start;
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (change * easeOut);
            
            element.textContent = Math.floor(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
};

/**
 * Performance Monitoring
 */
const performanceMonitor = {
    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (loadTime > 3000) {
                        console.warn('⚠️ Page load time exceeded 3 seconds:', loadTime + 'ms');
                    }
                    
                    // Monitor frame rate
                    this.monitorFPS();
                }, 0);
            });
        }
    },

    monitorFPS() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function countFrames(currentTime) {
            frameCount++;
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30) {
                    console.warn('⚠️ Low FPS detected:', fps);
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFrames);
        }
        
        requestAnimationFrame(countFrames);
    }
};

/**
 * Error Handling
 */
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
});

/**
 * Initialize performance monitoring
 */
performanceMonitor.init();

/**
 * Export for module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ExclusiveExperience, utils, performanceMonitor };
}