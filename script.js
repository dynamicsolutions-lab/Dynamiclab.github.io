/* =====================================================
   DYNAMIC SOLUTIONS - SCRIPT.JS FOCADO
   Sistema JavaScript com Partículas + Elementos Essenciais
   ===================================================== */

/* =====================================================
   1. CONFIGURAÇÕES GLOBAIS
   ===================================================== */

const DynamicApp = {
    state: {
        isAnimating: false,
        isMobile: false,
        particlesInitialized: false,
        soundsEnabled: true
    },
    
    config: {
        animationDuration: 1000,
        easeType: 'power3.out',
        mobileBreakpoint: 768
    }
};

/* =====================================================
   2. SISTEMA DE SOM (OPCIONAL)
   ===================================================== */

const SoundSystem = {
    sounds: {
        hover: null,
        click: null,
        cyber: null
    },
    
    init() {
        try {
            if (typeof Howl !== 'undefined') {
                this.sounds.hover = new Howl({ 
                    src: ['assets/sounds/hover.mp3'], 
                    volume: 0.3,
                    onloaderror: () => console.log('Som hover não carregado - modo silencioso ativo')
                });
                
                this.sounds.click = new Howl({ 
                    src: ['assets/sounds/click.mp3'], 
                    volume: 0.4,
                    onloaderror: () => console.log('Som click não carregado - modo silencioso ativo')
                });
                
                this.sounds.cyber = new Howl({ 
                    src: ['assets/sounds/cyber.mp3'], 
                    volume: 0.2,
                    onloaderror: () => console.log('Som cyber não carregado - modo silencioso ativo')
                });
            }
        } catch (error) {
            console.log('Sistema de som em modo silencioso:', error.message);
        }
    },
    
    play(soundName) {
        if (DynamicApp.state.soundsEnabled && this.sounds[soundName]) {
            try {
                this.sounds[soundName].play();
            } catch (error) {
                console.log(`Erro ao tocar som ${soundName}:`, error.message);
            }
        }
    }
};

/* =====================================================
   3. SISTEMA DE PARTÍCULAS IMERSIVO - FOCO PRINCIPAL
   ===================================================== */

const ParticleSystem = {
    init() {
        this.initializeParticlesJS();
        
        // Re-inicializa quando página ganha foco
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => {
                    this.initializeParticlesJS();
                }, 200);
            }
        });
    },
    
    initializeParticlesJS() {
        const attemptInitialization = (retryCount = 0) => {
            const maxRetries = 5;
            const particlesContainer = document.getElementById('particles-js');
            
            if (!particlesContainer) {
                if (retryCount < maxRetries) {
                    setTimeout(() => attemptInitialization(retryCount + 1), 200);
                }
                return;
            }
            
            // Limpa qualquer instância anterior
            if (window.pJSDom && window.pJSDom.length > 0) {
                window.pJSDom.forEach(item => {
                    if (item.pJS && item.pJS.fn && item.pJS.fn.vendors && item.pJS.fn.vendors.destroypJS) {
                        item.pJS.fn.vendors.destroypJS();
                    }
                });
                window.pJSDom = [];
            }
            
            particlesContainer.innerHTML = '';
            
            if (typeof particlesJS !== 'undefined') {
                const config = DynamicApp.state.isMobile ? 
                    this.getMobileParticlesConfig() : 
                    this.getDesktopParticlesConfig();
                    
                try {
                    particlesJS("particles-js", config);
                    DynamicApp.state.particlesInitialized = true;
                    console.log('✅ Partículas inicializadas com sucesso');
                } catch (error) {
                    console.log('⚠️ Erro ao inicializar partículas:', error);
                    if (retryCount < maxRetries) {
                        setTimeout(() => attemptInitialization(retryCount + 1), 500);
                    }
                }
            } else {
                if (retryCount < maxRetries) {
                    setTimeout(() => attemptInitialization(retryCount + 1), 300);
                }
            }
        };
        
        attemptInitialization();
    },
    
    getDesktopParticlesConfig() {
        return {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#FFE55C" },
                shape: { type: "circle" },
                opacity: { 
                    value: 0.6, 
                    random: true, 
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } 
                },
                size: { 
                    value: 3, 
                    random: true, 
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false } 
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
                    attract: { enable: true, rotateX: 600, rotateY: 1200 } 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: { 
                    onhover: { enable: true, mode: "grab" }, 
                    onclick: { enable: true, mode: "push" }, 
                    resize: true 
                },
                modes: { 
                    grab: { distance: 180, line_linked: { opacity: 0.8 } }, 
                    push: { particles_nb: 6 } 
                }
            },
            retina_detect: true
        };
    },
    
    getMobileParticlesConfig() {
        return {
            particles: {
                number: { value: 30 },
                color: { value: "#FFE55C" },
                shape: { type: "circle" },
                size: { value: 1 },
                line_linked: { 
                    distance: 80,
                    color: "#FFE55C"
                },
                move: {
                    enable: true,
                    speed: 2
                }
            },
            interactivity: {
                events: { 
                    onhover: { enable: false }, 
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    } 
                }
            }
        };
    }
};

/* =====================================================
   4. SISTEMA DE ANIMAÇÕES PARA ELEMENTOS ATUAIS
   ===================================================== */

const PremiumAnimations = {
    init() {
        this.initHoverEffects();
        this.initInteractiveEffects();
    },
    
    initHoverEffects() {
        // Efeitos para botões CTA
        document.querySelectorAll('.neural-cta').forEach(button => {
            button.addEventListener('mouseenter', () => SoundSystem.play('hover'));
            button.addEventListener('click', () => SoundSystem.play('click'));
        });
        
        // Efeitos para logo
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                SoundSystem.play('hover');
                if (typeof gsap !== 'undefined') {
                    gsap.to(logo, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            logo.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(logo, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            logo.addEventListener('click', () => {
                this.createLogoClickEffect();
            });
        }
    },
    
    createLogoClickEffect() {
        // Efeito de confetti se disponível
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.3 },
                colors: ['#FFD700', '#FF6B35', '#00d4ff', '#39ff14']
            });
        }
        
        SoundSystem.play('cyber');
        
        // Adiciona partículas extras temporariamente
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const pJS = window.pJSDom[0].pJS;
            const originalCount = pJS.particles.number.value;
            
            // Dobra temporariamente o número de partículas
            pJS.particles.number.value = originalCount * 2;
            
            // Volta ao normal após 3 segundos
            setTimeout(() => {
                pJS.particles.number.value = originalCount;
            }, 3000);
        }
    },
    
    initInteractiveEffects() {
        // Efeito parallax com movimento do mouse (apenas desktop)
        if (!DynamicApp.state.isMobile) {
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                // Efeito sutil no logo
                const logo = document.querySelector('.logo img');
                if (logo) {
                    const moveX = (mouseX - 0.5) * 10;
                    const moveY = (mouseY - 0.5) * 10;
                    
                    if (typeof gsap !== 'undefined') {
                        gsap.to(logo, {
                            x: moveX,
                            y: moveY,
                            duration: 0.5,
                            ease: 'power2.out'
                        });
                    }
                }
            });
        }
    }
};

/* =====================================================
   5. SISTEMA DE RESPONSIVIDADE ESSENCIAL
   ===================================================== */

const ResponsiveSystem = {
    init() {
        this.detectDevice();
        this.setupResizeListener();
        this.optimizeForDevice();
    },
    
    detectDevice() {
        DynamicApp.state.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (window.innerWidth <= DynamicApp.config.mobileBreakpoint) {
            DynamicApp.state.isMobile = true;
        }
    },
    
    setupResizeListener() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.detectDevice();
                this.handleResize();
            }, 250);
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.detectDevice();
                this.handleResize();
            }, 500);
        });
    },
    
    handleResize() {
        // Refresh das animações AOS se necessário
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Reinicializa partículas se necessário
        ParticleSystem.initializeParticlesJS();
    },
    
    optimizeForDevice() {
        if (DynamicApp.state.isMobile) {
            // Reduz animações em mobile
            document.documentElement.style.setProperty('--reduce-motion', '1');
            
            // Previne zoom em double tap
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
    }
};

/* =====================================================
   6. INICIALIZAÇÃO PRINCIPAL
   ===================================================== */

const MainInitializer = {
    init() {
        console.log('🚀 Inicializando Dynamic Solutions...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startInitialization());
        } else {
            this.startInitialization();
        }
    },
    
    startInitialization() {
        try {
            // 1. Sistemas básicos
            ResponsiveSystem.init();
            SoundSystem.init();
            
            // 2. Sistema de partículas (principal foco)
            setTimeout(() => {
                ParticleSystem.init();
            }, 100);
            
            // 3. Inicializa AOS se disponível
            this.initializeAOS();
            
            // 4. Animações dos elementos atuais
            setTimeout(() => {
                PremiumAnimations.init();
            }, 400);
            
            // 5. Event listeners essenciais
            this.setupGlobalEventListeners();
            
            // 6. Finalização
            setTimeout(() => {
                this.finalizeInitialization();
            }, 600);
            
            console.log('✅ Dynamic Solutions inicializado!');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.handleInitializationError(error);
        }
    },
    
    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({ 
                duration: DynamicApp.config.animationDuration, 
                once: true, 
                offset: 100 
            });
        }
    },
    
    setupGlobalEventListeners() {
        // Scroll suave para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Re-inicializa sistemas quando página ganha foco
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => {
                    ParticleSystem.initializeParticlesJS();
                }, 200);
            }
        });
    },
    
    finalizeInitialization() {
        // Marca aplicação como inicializada
        document.body.classList.add('app-initialized');
        
        // Dispatch evento customizado
        window.dispatchEvent(new CustomEvent('dynamicSolutionsReady', {
            detail: { timestamp: Date.now() }
        }));
    },
    
    handleInitializationError(error) {
        console.error('Detalhes do erro:', error.stack);
        this.initBasicFallback();
    },
    
    initBasicFallback() {
        console.log('🔄 Iniciando modo de fallback...');
        
        // Funcionalidade mínima
        document.querySelectorAll('.neural-cta').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
};

/* =====================================================
   7. CSS ADICIONAL E INICIALIZAÇÃO
   ===================================================== */

// Função para adicionar CSS para animações
const addCSSAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .energy-ring {
            animation: energyPulse 1.5s ease-out;
        }
        
        @keyframes energyPulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
};

// Adiciona CSS animations
addCSSAnimations();

// Inicia automaticamente quando script é carregado
MainInitializer.init();

/* =====================================================
   FINAL - FOCO TOTAL NAS PARTÍCULAS E ELEMENTOS ATUAIS
   
   Este sistema oferece exatamente:
   
   ✅ Sistema de Partículas Imersivo e Clicável
   ✅ Interatividade (grab, push, hover)
   ✅ Efeitos no Logo e CTA
   ✅ Som opcional
   ✅ Responsividade
   ✅ AOS para hook e subtítulo
   ✅ Código limpo e focado
   
   SEM código desnecessário!
   ===================================================== */