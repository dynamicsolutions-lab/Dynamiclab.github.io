// Inicialização do Particles.js
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#FFE55C"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#FFE55C",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 180,
                line_linked: {
                    opacity: 0.8
                }
            },
            push: {
                particles_nb: 6
            }
        }
    },
    retina_detect: true
});

// Sistema de Som
const sounds = {
    hover: new Howl({
        src: ['path/to/hover.mp3'],
        volume: 0.3
    }),
    click: new Howl({
        src: ['path/to/click.mp3'],
        volume: 0.4
    }),
    reveal: new Howl({
        src: ['path/to/reveal.mp3'],
        volume: 0.3
    })
};

// Inicialização das Animações
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    gsap.registerPlugin(ScrollTrigger);

    initRevealAnimations();
    initMetricsAnimation();
    initHoverEffects();
    createResponsiveConstellationLines();
    initTestimonialParticles();
    setupSmoothScroll();
});

window.addEventListener('resize', createResponsiveConstellationLines);
window.addEventListener('orientationchange', createResponsiveConstellationLines);


function createResponsiveConstellationLines() {
    const container = document.querySelector('.constellation-lines');
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    container.innerHTML = '';

    const numberOfLines = isMobile ? 8 : 15;

    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';

        const width = isMobile ?
            Math.random() * 80 + 20 :
            Math.random() * 120 + 40;

        line.style.width = width + 'px';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = `${Math.random() * 2}s`;

        container.appendChild(line);
    }
}

function initRevealAnimations() {
    gsap.utils.toArray('.reveal-section').forEach((section, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                 start: 'top top',   // Start when the top of section hits the top of the viewport
                end: 'bottom top',  // End when the bottom of the section hits the top of the viewport
                scrub: true,        // Smoothly scrub the animation based on scroll
                toggleActions: 'play none none reverse'
            }
        });

        tl.set(section, {
                opacity: 1,
                visibility: 'visible'
            })
            .from(section.children, {
                y: 50,
                opacity: 0,
                 duration: 1,      // Reduced duration for smoother transition
                stagger: 0.1,    // Reduced stagger for a tighter animation
                ease: 'power2.out' // Changed ease function
            });
    });
}

function initMetricsAnimation() {
    const metrics = document.querySelectorAll('.metric-card');

    metrics.forEach(metric => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMetric(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(metric);
    });
}

function animateMetric(metric) {
    const number = metric.querySelector('.metric-number');
    const label = metric.querySelector('.metric-label');
    const target = parseInt(number.getAttribute('data-value'));

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            y: 0.6
        },
        colors: ['#FFD700', '#FDB931', '#ffffff']
    });

    countUp(number, target);

    gsap.timeline()
        .to(metric, {
            rotationY: 360,
            duration: 1.5,
            ease: 'power2.out'
        })
        .to([number, label], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2
        }, '-=1');

    createEnergyEffect(metric);
}

function countUp(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        current = Math.min(current + increment, target);

        element.textContent = Math.floor(current).toLocaleString();

        if (current < target) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function createEnergyEffect(element) {
    const energy = document.createElement('div');
    energy.className = 'energy-ring';
    element.appendChild(energy);

    gsap.to(energy, {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        repeat: -1
    });
}

function initHoverEffects() {
    document.querySelectorAll('.solution-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            sounds.hover.play();
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            sounds.hover.play();
        });

        button.addEventListener('click', () => {
            sounds.click.play();
        });
    });
}
 function setupSmoothScroll() {
    const sections = document.querySelectorAll('.reveal-section');
    let isTransitioning = false;

    function scrollToSection(index, isForward) {
      if (isTransitioning) return;
      isTransitioning = true;

        const targetSection = sections[index];
        if(targetSection){
            targetSection.scrollIntoView({
            behavior: 'smooth',
           block: 'start', // Start of the target section at top of viewport
         });
        }


    }

    let currentSectionIndex = 0;

    // Function to handle scroll event
    function handleScroll(event) {
        if (isTransitioning) return;

        const delta = event.deltaY;
        if (delta > 50 && currentSectionIndex < sections.length - 1) {
            //scroll down
            scrollToSection(currentSectionIndex+1,true);
            currentSectionIndex++;

        } else if (delta < -50 && currentSectionIndex > 0) {
             //scroll up
              scrollToSection(currentSectionIndex-1,false);
              currentSectionIndex--;
        }

       setTimeout(() => {
             isTransitioning = false;
           },1000); // Set timeout to allow for animations
     }

     // Add event listener to the window
      window.addEventListener('wheel', handleScroll,{passive:false});// Added passive: false
     // Touch event handling
     let touchstartY = 0;

     function handleTouchStart(event) {
         touchstartY = event.touches[0].clientY;
     }

     function handleTouchMove(event) {
         if(isTransitioning) return;

        const touchmoveY = event.touches[0].clientY;
        const deltaY = touchstartY - touchmoveY;

        if (deltaY > 50 && currentSectionIndex < sections.length -1) {
           // Swipe down
            scrollToSection(currentSectionIndex+1,true);
            currentSectionIndex++;
            touchstartY = touchmoveY;

        } else if (deltaY < -50 && currentSectionIndex > 0 ) {
             // Swipe up
             scrollToSection(currentSectionIndex-1,false);
             currentSectionIndex--;
              touchstartY = touchmoveY;
        }
         setTimeout(() => {
              isTransitioning = false;
           },1000); // Set timeout to allow for animations
     }

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

   window.addEventListener('scroll', function(event){
      event.preventDefault();
      event.stopPropagation();

        if(isTransitioning)return;
    })
}


function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40 // Reduzir o número de partículas
            },
            line_linked: {
              enable: false
            },
        }
    });
}

function initTestimonialParticles() {
    const isMobileDevice = isMobile();
    const particleConfig = {
        particles: {
            number: {
                value: isMobileDevice ? 30 : 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#FFE55C"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FFE55C",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 6
                }
            }
        },
        retina_detect: true
    };

    particlesJS("testimonial-particles", particleConfig);
}