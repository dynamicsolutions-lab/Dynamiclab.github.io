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
// No seu script.js, procure o evento DOMContentLoaded existente e adicione a nova função dentro dele

document.addEventListener('DOMContentLoaded', () => {
    // Código existente de inicialização
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animações de Revelação
    initRevealAnimations();
    
    // Inicializar Métricas
    initMetricsAnimation();

    // Inicializar Efeitos de Hover
    initHoverEffects();

    // ADICIONE AQUI a nova função de constelação
    createResponsiveConstellationLines();
});

// ADICIONE ESTES eventos fora do DOMContentLoaded
window.addEventListener('resize', createResponsiveConstellationLines);
window.addEventListener('orientationchange', createResponsiveConstellationLines);

// ADICIONE a função de criar linhas depois de todo o código existente
function createResponsiveConstellationLines() {
    const container = document.querySelector('.constellation-lines');
    if (!container) return; // Verifica se o container existe
    
    const isMobile = window.innerWidth <= 768;
    
    // Limpa linhas existentes
    container.innerHTML = '';
    
    // Ajusta número de linhas baseado no dispositivo
    const numberOfLines = isMobile ? 8 : 15;
    
    for(let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        
        // Ajustes responsivos
        const width = isMobile ? 
            Math.random() * 100 + 30 : // Mobile
            Math.random() * 150 + 50;  // Desktop
            
        line.style.width = width + 'px';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Atraso na animação
        line.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(line);
    }
}


// Função para Animações de Revelação
function initRevealAnimations() {
    gsap.utils.toArray('.reveal-section').forEach((section, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'bottom 20%',
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
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
}

// Função para Animação de Métricas
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
        }, { threshold: 0.5 });

        observer.observe(metric);
    });
}

// Função para Animar Métrica Individual
function animateMetric(metric) {
    const number = metric.querySelector('.metric-number');
    const label = metric.querySelector('.metric-label');
    const target = parseInt(number.getAttribute('data-value'));

    // Efeito de Confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FDB931', '#ffffff']
    });

    // Animação do Número
    countUp(number, target);

    // Animações GSAP
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

    // Criar Efeito de Energia
    createEnergyEffect(metric);
}

// Função para Contador
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

// Função para Criar Efeito de Energia
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

// Inicialização de Efeitos de Hover
function initHoverEffects() {
    // Efeito nos Cards
    document.querySelectorAll('.solution-card').forEach(card =>