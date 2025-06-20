/* =====================================================
   DYNAMIC SOLUTIONS - SCRIPT.JS
   Sistema JavaScript Premium Completo
   
   Autor: Dynamic Solutions Team
   Versão: 2.0 Premium
   Descrição: Sistema completo de interatividade, animações
              e funcionalidades premium para o portfólio
   ===================================================== */

/* =====================================================
   1. CONFIGURAÇÕES GLOBAIS E INICIALIZAÇÃO
   ===================================================== */

/**
 * Objeto global para armazenar configurações e estado da aplicação
 * Centraliza todas as configurações importantes do sistema
 */
const DynamicApp = {
    // Estados da aplicação
    state: {
        currentSection: 'home',
        isAnimating: false,
        isMobile: false,
        particlesInitialized: false
    },
    
    // Configurações de animação
    config: {
        animationDuration: 1000,
        easeType: 'power3.out',
        staggerDelay: 0.2,
        mobileBreakpoint: 768
    },
    
    // Cache de elementos DOM para performance
    elements: {
        homeSection: null,
        curriculumSection: null,
        navItems: null,
        particlesContainer: null
    }
};

/* =====================================================
   2. SISTEMA DE PARTÍCULAS PREMIUM
   ===================================================== */

/**
 * Classe ParticleSystem - Gerencia o sistema de partículas do currículo
 * Cria um efeito visual impressionante com animações fluidas
 */
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.particles = [];
        this.isRunning = false;
        
        // Só inicializa se o canvas existir
        if (!this.canvas) {
            console.log('Canvas de partículas não encontrado');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createParticles();
        this.startAnimation();
        
        // Listener para redimensionamento responsivo
        window.addEventListener('resize', () => this.handleResize());
    }
    
    /**
     * Configura as dimensões do canvas
     * Garante que o canvas ocupe toda a tela
     */
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    /**
     * Cria as partículas com propriedades aleatórias
     * Cada partícula tem posição, velocidade e aparência únicos
     */
    createParticles() {
        const particleCount = DynamicApp.state.isMobile ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                life: Math.random() * 100 + 50
            });
        }
    }
    
    /**
     * Atualiza a posição e propriedades das partículas
     * Implementa física simples com colisão nas bordas
     */
    updateParticles() {
        this.particles.forEach(particle => {
            // Atualiza posição
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Colisão com bordas - inverte velocidade
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Mantém partículas dentro dos limites
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Efeito de vida das partículas
            particle.life--;
            if (particle.life <= 0) {
                // Reposiciona partícula quando "morre"
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = Math.random() * 100 + 50;
            }
        });
    }
    
    /**
     * Renderiza as partículas no canvas
     * Cria efeito visual dourado premium
     */
    renderParticles() {
        // Limpa o canvas com transparência
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Renderiza cada partícula
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
            this.ctx.fill();
            
            // Adiciona brilho sutil
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    /**
     * Loop principal de animação
     * Usa requestAnimationFrame para performance otimizada
     */
    animate() {
        if (!this.isRunning) return;
        
        this.updateParticles();
        this.renderParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Inicia o sistema de animação
     */
    startAnimation() {
        this.isRunning = true;
        this.animate();
    }
    
    /**
     * Para o sistema de animação
     */
    stopAnimation() {
        this.isRunning = false;
    }
    
    /**
     * Gerencia redimensionamento da tela
     * Reconfigura canvas e reposiciona partículas
     */
    handleResize() {
        this.setupCanvas();
        // Reposiciona partículas para nova dimensão
        this.particles.forEach(particle => {
            if (particle.x > this.canvas.width) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = this.canvas.height;
        });
    }
}

/* =====================================================
   3. SISTEMA DE REDE NEURAL ANIMADA
   ===================================================== */

/**
 * Classe NeuralNetwork - Cria animação de rede neural no background
 * Efeito visual impressionante que simula conexões neurais
 */
class NeuralNetwork {
    constructor() {
        this.svg = document.querySelector('.neural-svg');
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        
        if (!this.svg) {
            console.log('SVG neural não encontrado');
            return;
        }
        
        this.initializeNetwork();
        this.startAnimation();
    }
    
    /**
     * Inicializa a rede neural com nós e conexões
     * Cria uma estrutura visual que simula um cérebro artificial
     */
    initializeNetwork() {
        // Posições estratégicas dos nós para simular uma rede neural
        const nodePositions = [
            {x: 100, y: 100}, {x: 300, y: 80}, {x: 500, y: 120}, {x: 700, y: 90},
            {x: 150, y: 250}, {x: 350, y: 230}, {x: 550, y: 270}, {x: 650, y: 240},
            {x: 200, y: 400}, {x: 400, y: 380}, {x: 600, y: 420},
            {x: 120, y: 500}, {x: 380, y: 520}, {x: 620, y: 480}
        ];

        // Cria os nós visuais
        nodePositions.forEach((pos, index) => {
            const node = this.createNode(pos.x, pos.y);
            this.svg.appendChild(node.element);
            this.nodes.push(node);
        });

        // Cria conexões entre nós próximos
        this.createConnections();
    }
    
    /**
     * Cria um nó individual da rede neural
     * @param {number} x - Posição X do nó
     * @param {number} y - Posição Y do nó
     * @returns {Object} Objeto contendo elemento e propriedades do nó
     */
    createNode(x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', Math.random() * 8 + 4);
        circle.setAttribute('fill', 'url(#nodeGradient)');
        circle.setAttribute('opacity', Math.random() * 0.8 + 0.2);
        
        return {
            element: circle,
            x: x,
            y: y,
            pulse: Math.random() * Math.PI * 2,
            baseOpacity: Math.random() * 0.8 + 0.2
        };
    }
    
    /**
     * Cria conexões visuais entre nós próximos
     * Simula sinapses neurais com linhas animadas
     */
    createConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = this.calculateDistance(this.nodes[i], this.nodes[j]);
                
                // Só conecta nós próximos para criar padrão orgânico
                if (distance < 200 && Math.random() > 0.6) {
                    const line = this.createConnection(this.nodes[i], this.nodes[j]);
                    this.svg.insertBefore(line.element, this.svg.firstChild);
                    this.connections.push(line);
                }
            }
        }
    }
    
    /**
     * Calcula distância euclidiana entre dois nós
     * @param {Object} node1 - Primeiro nó
     * @param {Object} node2 - Segundo nó
     * @returns {number} Distância entre os nós
     */
    calculateDistance(node1, node2) {
        return Math.sqrt(
            Math.pow(node1.x - node2.x, 2) + 
            Math.pow(node1.y - node2.y, 2)
        );
    }
    
    /**
     * Cria uma conexão visual entre dois nós
     * @param {Object} node1 - Nó inicial
     * @param {Object} node2 - Nó final
     * @returns {Object} Objeto da conexão
     */
    createConnection(node1, node2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', node1.x);
        line.setAttribute('y1', node1.y);
        line.setAttribute('x2', node2.x);
        line.setAttribute('y2', node2.y);
        line.setAttribute('stroke', 'url(#linkGradient)');
        line.setAttribute('stroke-width', Math.random() * 2 + 0.5);
        line.setAttribute('opacity', Math.random() * 0.6 + 0.1);
        
        return {
            element: line,
            phase: Math.random() * Math.PI * 2,
            baseOpacity: Math.random() * 0.6 + 0.1
        };
    }
    
    /**
     * Anima a rede neural
     * Cria efeito de pulsação e fluxo de dados
     */
    animateNetwork() {
        // Anima nós com pulsação orgânica
        this.nodes.forEach(node => {
            node.pulse += 0.02;
            const opacity = node.baseOpacity + Math.sin(node.pulse) * 0.3;
            node.element.setAttribute('opacity', Math.max(0.1, opacity));
        });

        // Anima conexões simulando fluxo neural
        this.connections.forEach(connection => {
            connection.phase += 0.01;
            const opacity = connection.baseOpacity + Math.sin(connection.phase) * 0.2;
            connection.element.setAttribute('opacity', Math.max(0.05, opacity));
        });

        this.animationId = requestAnimationFrame(() => this.animateNetwork());
    }
    
    /**
     * Inicia a animação da rede neural
     */
    startAnimation() {
        this.animateNetwork();
    }
    
    /**
     * Para a animação da rede neural
     */
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

/* =====================================================
   4. SISTEMA DE CONTADORES ANIMADOS
   ===================================================== */

/**
 * Classe AnimatedCounter - Anima números com efeito crescente
 * Cria impacto visual quando métricas aparecem na tela
 */
class AnimatedCounter {
    constructor(element, target, duration = 2000, suffix = '') {
        this.element = element;
        this.target = parseInt(target) || 0;
        this.duration = duration;
        this.suffix = suffix;
        this.current = 0;
        this.startTime = null;
        this.isRunning = false;
        
        // Detecta formato especial baseado no texto original
        this.detectFormat();
    }
    
    /**
     * Detecta o formato do número baseado no conteúdo original
     * Preserva sufixos como %, +, etc.
     */
    detectFormat() {
        const originalText = this.element.textContent;
        
        if (originalText.includes('%')) {
            this.suffix = '%';
        } else if (originalText.includes('+')) {
            this.suffix = '+';
        } else if (this.target >= 100 && originalText.includes('%')) {
            this.suffix = '%';
        } else if (this.target >= 20) {
            this.suffix = '+';
        }
    }
    
    /**
     * Inicia a animação do contador
     * Usa requestAnimationFrame para animação suave
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startTime = performance.now();
        this.animate();
    }
    
    /**
     * Loop de animação do contador
     * Implementa easing suave para movimento natural
     */
    animate() {
        if (!this.isRunning) return;
        
        const now = performance.now();
        const elapsed = now - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        // Aplicar easing para movimento mais natural
        const easedProgress = this.easeOutQuart(progress);
        this.current = this.target * easedProgress;
        
        // Atualizar display
        this.updateDisplay();
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isRunning = false;
            this.onComplete();
        }
    }
    
    /**
     * Função de easing para animação suave
     * @param {number} t - Progresso da animação (0-1)
     * @returns {number} Valor com easing aplicado
     */
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    /**
     * Atualiza o display do número
     * Formata adequadamente com separadores e sufixos
     */
    updateDisplay() {
        const displayValue = Math.floor(this.current);
        const formattedValue = this.formatNumber(displayValue);
        this.element.textContent = formattedValue + this.suffix;
    }
    
    /**
     * Formata número com separadores de milhares
     * @param {number} num - Número a ser formatado
     * @returns {string} Número formatado
     */
    formatNumber(num) {
        return num.toLocaleString('pt-BR');
    }
    
    /**
     * Callback executado quando animação termina
     * Pode ser estendido para efeitos adicionais
     */
    onComplete() {
        // Adiciona um pequeno efeito de brilho quando completa
        this.element.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
        setTimeout(() => {
            this.element.style.textShadow = '';
        }, 500);
    }
}

/* =====================================================
   5. SISTEMA DE NAVEGAÇÃO NEURAL PREMIUM
   ===================================================== */

/**
 * Sistema de Navegação Neural - Experiência Futurística Premium
 * Cria um hub de comando inteligente que responde ao contexto e ações do usuário
 */
const NeuralNavigation = {
    /**
     * Inicializa o sistema de navegação neural
     * Configura todos os comportamentos interativos e estados visuais
     */
    init() {
        this.neuralNav = document.getElementById('neuralNav');
        this.neuralNodes = document.querySelectorAll('.neural-node');
        this.connections = document.getElementById('neuralConnections');
        
        if (!this.neuralNav) {
            console.log('Sistema de navegação neural não encontrado');
            return;
        }
        
        this.setupNodeInteractions();
        this.createNeuralConnections();
        this.initializeAdaptiveBehavior();
        this.startNeuralAnimation();
        
        console.log('🧠 Sistema de navegação neural ativado');
    },
    
    /**
     * Configura interações avançadas dos nós neurais
     * Cada nó responde de forma única aos eventos do usuário
     */
    setupNodeInteractions() {
        this.neuralNodes.forEach((node, index) => {
            // Efeito de onda neural no hover
            node.addEventListener('mouseenter', () => {
                this.triggerNeuralWave(node, index);
            });
            
            // Efeito de pulso neural no click
            node.addEventListener('click', (e) => {
                this.triggerNeuralPulse(node);
                this.updateActiveState(node);
            });
            
            // Efeito de desvanecimento no mouse leave
            node.addEventListener('mouseleave', () => {
                this.resetNeuralEffects(node);
            });
        });
    },
    
    /**
     * Cria conexões visuais entre os nós neurais
     * Simula sinapses que se ativam baseado na interação do usuário
     */
    createNeuralConnections() {
        if (!this.connections) return;
        
        // Limpa conexões anteriores
        this.connections.innerHTML = '';
        
        // Cria conexões dinâmicas entre nós
        const nodeCount = this.neuralNodes.length;
        
        for (let i = 0; i < nodeCount - 1; i++) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            
            // Calcula posição da conexão baseada nos nós
            const startY = 20 + (i * 60); // Ajusta baseado no layout vertical
            const endY = 20 + ((i + 1) * 60);
            
            connection.style.cssText = `
                top: ${startY}px;
                left: 50%;
                height: ${endY - startY}px;
                transform: translateX(-50%);
                animation-delay: ${i * 0.5}s;
            `;
            
            this.connections.appendChild(connection);
        }
    },
    
    /**
     * Inicializa comportamento adaptativo baseado no contexto
     */
    initializeAdaptiveBehavior() {
        // Adapta aparência baseada na seção ativa
        this.updateContextualStyling(DynamicApp.state.currentSection);
        
        // Adiciona efeitos neurais aos CTAs
        this.enhanceNeuralCTAs();
    },
    
    /**
     * Melhora CTAs com efeitos neurais interativos
     * Adiciona microinterações satisfatórias aos botões principais
     */
    enhanceNeuralCTAs() {
        document.querySelectorAll('.neural-cta').forEach(cta => {
            // Efeito de onda no click
            cta.addEventListener('click', function() {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 800);
            });
        });
    },
    
    /**
     * Atualiza styling contextual baseado na seção ativa
     * @param {string} section - Seção atualmente ativa
     */
    updateContextualStyling(section) {
        // Remove classes contextuais anteriores
        this.neuralNav.classList.remove('home-active', 'curriculum-active', 'contact-active');
        
        // Adiciona classe contextual apropriada
        if (section === 'home') {
            this.neuralNav.classList.add('home-active');
        } else if (section === 'curriculum') {
            this.neuralNav.classList.add('curriculum-active');
        }
    },
    
    /**
     * Dispara efeito de onda neural quando o usuário interage com um nó
     * @param {Element} node - Nó que foi ativado
     * @param {number} index - Índice do nó na sequência
     */
    triggerNeuralWave(node, index) {
        // Cria elemento de onda
        const wave = document.createElement('div');
        wave.className = 'neural-wave';
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(255, 215, 0, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
        `;
        
        node.appendChild(wave);
        
        // Anima a onda
        if (typeof gsap !== 'undefined') {
            gsap.to(wave, {
                width: '200px',
                height: '200px',
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => wave.remove()
            });
        }
        
        // Efeito cascata nos outros nós
        this.triggerCascadeEffect(index);
    },
    
    /**
     * Cria efeito cascata que se propaga pelos outros nós
     * @param {number} originIndex - Índice do nó de origem
     */
    triggerCascadeEffect(originIndex) {
        this.neuralNodes.forEach((node, index) => {
            if (index !== originIndex) {
                const delay = Math.abs(index - originIndex) * 100;
                
                setTimeout(() => {
                    node.style.transform = 'scale(1.1)';
                    node.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
                    
                    setTimeout(() => {
                        node.style.transform = '';
                        node.style.boxShadow = '';
                    }, 200);
                }, delay);
            }
        });
    },
    
    /**
     * Dispara pulso neural intenso no click
     * @param {Element} node - Nó que foi clicado
     */
    triggerNeuralPulse(node) {
        // Adiciona classe temporária para efeito especial
        node.classList.add('neural-pulse-active');
        
        // Cria múltiplos anéis de energia
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ring = document.createElement('div');
                ring.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 50px;
                    height: 50px;
                    border: 2px solid rgba(255, 215, 0, 0.6);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                `;
                
                node.appendChild(ring);
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(ring, {
                        scale: 4,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => ring.remove()
                    });
                }
            }, i * 150);
        }
        
        // Remove classe após efeito
        setTimeout(() => {
            node.classList.remove('neural-pulse-active');
        }, 800);
    },
    
    /**
     * Atualiza estado ativo da navegação neural
     * @param {Element} activeNode - Nó que deve ficar ativo
     */
    updateActiveState(activeNode) {
        // Remove estado ativo de todos os nós
        this.neuralNodes.forEach(node => {
            node.classList.remove('active');
        });
        
        // Ativa o nó selecionado
        activeNode.classList.add('active');
        
        // Atualiza styling contextual
        const section = activeNode.dataset.section;
        this.updateContextualStyling(section);
        
        // Atualiza estado global da aplicação
        DynamicApp.state.currentSection = section;
    },
    
    /**
     * Reseta efeitos neurais para estado padrão
     * @param {Element} node - Nó para resetar
     */
    resetNeuralEffects(node) {
        // Remove transformações temporárias
        node.style.transform = '';
        node.style.boxShadow = '';
    },
    
    /**
     * Inicia animação contínua do sistema neural
     * Cria vida própria para a interface
     */
    startNeuralAnimation() {
        // Animação sutil e contínua das conexões
        setInterval(() => {
            const connections = this.connections.querySelectorAll('.neural-connection');
            connections.forEach((connection, index) => {
                setTimeout(() => {
                    connection.style.opacity = '0.6';
                    setTimeout(() => {
                        connection.style.opacity = '0';
                    }, 500);
                }, index * 200);
            });
        }, 5000);
        
        // Pulso sutil do hub central
        setInterval(() => {
            if (this.neuralNav.querySelector('.neural-hub')) {
                const hub = this.neuralNav.querySelector('.neural-hub');
                hub.style.transform = 'scale(1.02)';
                
                setTimeout(() => {
                    hub.style.transform = '';
                }, 300);
            }
        }, 8000);
    },
    
    /**
     * Método público para atualizar navegação externamente
     * @param {string} section - Seção para ativar
     */
    setActiveSection(section) {
        const targetNode = document.querySelector(`[data-section="${section}"]`);
        if (targetNode) {
            this.updateActiveState(targetNode);
        }
    }
};

/**
 * Gerencia navegação entre seções principais
 * Sistema robusto integrado com navegação neural
 */
const NavigationSystem = {
    /**
     * Inicializa o sistema de navegação
     * Configura eventos e estado inicial
     */
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.handleInitialHash();
    },
    
    /**
     * Armazena referências de elementos em cache para performance
     */
    cacheElements() {
        DynamicApp.elements.homeSection = document.getElementById('home-section');
        DynamicApp.elements.curriculumSection = document.getElementById('curriculum-section');
        DynamicApp.elements.navItems = document.querySelectorAll('.nav-item');
    },
    
    /**
     * Configura listeners de eventos de navegação
     */
    setupEventListeners() {
        // Hash change para navegação via URL
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Listener para links de scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
        });
    },
    
    /**
     * Mostra seção específica com animação otimizada
     * Sistema robusto que previne conflitos de scroll e garante transições suaves
     * @param {string} section - Nome da seção ('home' ou 'curriculum')
     */
    showSection(section) {
        if (DynamicApp.state.isAnimating) return;
        
        // Previne scroll automático durante transição
        document.body.style.overflow = 'hidden';
        
        DynamicApp.state.isAnimating = true;
        DynamicApp.state.currentSection = section;
        
        // Força scroll para topo antes da transição
        window.scrollTo({ top: 0, behavior: 'auto' });
        
        // Esconder todas as seções
        this.hideAllSections();
        
        // Pequeno delay para garantir que o scroll foi processado
        setTimeout(() => {
            // Mostrar seção específica
            if (section === 'home') {
                this.showHomeSection();
            } else if (section === 'curriculum') {
                this.showCurriculumSection();
            }
            
            // Atualizar navegação
            this.updateActiveNavigation(section);
            
            // Restaura scroll após transição
            setTimeout(() => {
                document.body.style.overflow = '';
                DynamicApp.state.isAnimating = false;
            }, 300);
            
        }, 100);
    },
    
    /**
     * Esconde todas as seções
     */
    hideAllSections() {
        if (DynamicApp.elements.homeSection) {
            DynamicApp.elements.homeSection.style.display = 'none';
        }
        if (DynamicApp.elements.curriculumSection) {
            DynamicApp.elements.curriculumSection.style.display = 'none';
        }
    },
    
    /**
     * Mostra seção home com inicializações necessárias
     * Garante que as partículas sejam sempre inicializadas corretamente
     */
    showHomeSection() {
        if (DynamicApp.elements.homeSection) {
            DynamicApp.elements.homeSection.style.display = 'block';
            
            // Força re-inicialização das partículas sempre que voltar para home
            // Isso resolve o problema de atraso na inicialização
            setTimeout(() => {
                this.initializeParticlesJS();
            }, 150);
        }
    },
    
    /**
     * Mostra seção curriculum com animações premium
     */
    showCurriculumSection() {
        if (DynamicApp.elements.curriculumSection) {
            DynamicApp.elements.curriculumSection.style.display = 'block';
            
            // Reinicializar animações AOS após mudança de seção
            setTimeout(() => {
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
                PremiumAnimations.init();
            }, 100);
        }
    },
    
    /**
     * Atualiza estado ativo da navegação neural integrada
     * @param {string} activeSection - Seção ativa
     */
    updateActiveNavigation(activeSection) {
        // Sistema neural integrado
        if (typeof NeuralNavigation !== 'undefined') {
            NeuralNavigation.setActiveSection(activeSection);
        }
        
        // Fallback para sistema tradicional se existir
        const navItems = document.querySelectorAll('.neural-node');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const targetSelector = `[data-section="${activeSection}"]`;
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    },
    
    /**
     * Scroll suave para o topo
     */
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    /**
     * Navega para seção específica dentro da home
     * @param {string} sectionId - ID da seção de destino
     */
    scrollToSection(sectionId) {
        // Garantir que estamos na seção home
        this.showSection('home');
        
        // Aguardar e fazer scroll
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    },
    
    /**
     * Gerencia cliques em links âncora
     * @param {Event} e - Evento de clique
     */
    handleAnchorClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Gerencia mudanças no hash da URL
     */
    handleHashChange() {
        if (window.location.hash === '#curriculum') {
            this.showSection('curriculum');
        } else {
            this.showSection('home');
        }
    },
    
    /**
     * Gerencia hash inicial da página
     */
    handleInitialHash() {
        if (window.location.hash === '#curriculum') {
            this.showSection('curriculum');
        }
    },
    
    /**
     * Inicializa particles.js para a seção home com retry logic
     * Implementa sistema robusto que garante inicialização mesmo com timing issues
     */
    initializeParticlesJS() {
        // Função interna para tentar inicializar
        const attemptInitialization = (retryCount = 0) => {
            const maxRetries = 5;
            const particlesContainer = document.getElementById('particles-js');
            
            // Verifica se o container existe e está visível
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
            
            // Limpa o container
            particlesContainer.innerHTML = '';
            
            // Inicializa com configuração apropriada
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
                // ParticlesJS não carregou ainda, tenta novamente
                if (retryCount < maxRetries) {
                    setTimeout(() => attemptInitialization(retryCount + 1), 300);
                }
            }
        };
        
        // Inicia tentativas de inicialização
        attemptInitialization();
    },
    
    /**
     * Configuração de partículas para desktop
     * @returns {Object} Configuração completa do particles.js
     */
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
    
    /**
     * Configuração otimizada de partículas para mobile
     * @returns {Object} Configuração reduzida para dispositivos móveis
     */
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
                    onclick: { enable: true, mode: "push" } 
                }
            }
        };
    }
};

/* =====================================================
   6. SISTEMA DE ANIMAÇÕES PREMIUM
   ===================================================== */

/**
 * Sistema centralizado de animações premium
 * Gerencia todas as animações GSAP e efeitos visuais
 */
const PremiumAnimations = {
    /**
     * Inicializa todas as animações premium
     */
    init() {
        this.initScrollAnimations();
        this.initMetricsAnimations();
        this.initHoverEffects();
        this.initStoryObservers();
        this.initAchievementCounters();
        this.initInteractiveEffects();
        this.createConstellationLines();
    },
    
    /**
     * Inicializa animações baseadas em scroll
     * Usa GSAP ScrollTrigger para animações fluidas
     */
    initScrollAnimations() {
        if (typeof gsap === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Anima seções de revelação
        gsap.utils.toArray('.reveal-section').forEach((section) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            tl.set(section, { opacity: 1, visibility: 'visible' })
              .from(section.children, { 
                  y: 50, 
                  opacity: 0, 
                  duration: 1, 
                  stagger: 0.2, 
                  ease: 'power3.out' 
              });
        });
    },
    
    /**
     * Inicializa animações das métricas/contadores
     * Observer para detectar quando métricas entram na viewport
     */
    initMetricsAnimations() {
        const metrics = document.querySelectorAll('.metric-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateMetric(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        metrics.forEach(metric => observer.observe(metric));
    },
    
    /**
     * Anima uma métrica específica com efeitos visuais
     * @param {Element} metric - Elemento da métrica a ser animado
     */
    animateMetric(metric) {
        const number = metric.querySelector('.metric-number');
        const label = metric.querySelector('.metric-label');
        const target = parseInt(number.getAttribute('data-value'));
        
        // Efeito confetti para celebrar o número
        if (typeof confetti !== 'undefined') {
            confetti({ 
                particleCount: 100, 
                spread: 70, 
                origin: { y: 0.6 }, 
                colors: ['#FFD700', '#FDB931', '#ffffff'] 
            });
        }
        
        // Inicia contador animado
        const counter = new AnimatedCounter(number, target, 2500);
        counter.start();
        
        // Animação GSAP do card
        if (typeof gsap !== 'undefined') {
            gsap.timeline()
                .to(metric, { rotationY: 360, duration: 1.5, ease: 'power2.out' })
                .to([number, label], { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, '-=1');
        }
        
        // Efeito de energia
        this.createEnergyEffect(metric);
    },
    
    /**
     * Cria efeito visual de energia ao redor do elemento
     * @param {Element} element - Elemento para aplicar efeito
     */
    createEnergyEffect(element) {
        const energy = document.createElement('div');
        energy.className = 'energy-ring';
        energy.style.position = 'absolute';
        energy.style.top = '50%';
        energy.style.left = '50%';
        energy.style.width = '100%';
        energy.style.height = '100%';
        energy.style.border = '2px solid rgba(255, 215, 0, 0.6)';
        energy.style.borderRadius = '50%';
        energy.style.transform = 'translate(-50%, -50%)';
        energy.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(energy);
        
        // Anima o anel de energia
        if (typeof gsap !== 'undefined') {
            gsap.to(energy, { 
                scale: 2, 
                opacity: 0, 
                duration: 1.5, 
                repeat: 2,
                ease: 'power2.out',
                onComplete: () => energy.remove()
            });
        }
    },
    
    /**
     * Inicializa efeitos hover interativos
     * Adiciona microinterações que melhoram UX
     */
    initHoverEffects() {
        // Efeitos para cards de solução
        document.querySelectorAll('.solution-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
                }
            });
        });
    },
    
    /**
     * Inicializa observers para timeline de história
     * Anima capítulos quando entram na viewport
     */
    initStoryObservers() {
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('.story-chapter').forEach(chapter => {
            storyObserver.observe(chapter);
        });
    },
    
    /**
     * Inicializa contadores para achievement cards
     * Anima números quando cards ficam visíveis
     */
    initAchievementCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    const numberElement = entry.target.querySelector('.achievement-number');
                    if (numberElement) {
                        const text = numberElement.textContent;
                        const number = parseInt(text.replace(/[^\d]/g, ''));
                        
                        entry.target.dataset.counted = 'true';
                        
                        const counter = new AnimatedCounter(numberElement, number, 2500);
                        counter.start();
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.achievement-card').forEach(card => {
            counterObserver.observe(card);
        });
    },
    
    /**
     * Inicializa efeitos interativos especiais
     * Parallax do mouse e outros efeitos premium
     */
    initInteractiveEffects() {
        // Efeito parallax com movimento do mouse
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.orb').forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX * speed) - (speed / 2);
                const y = (mouseY * speed) - (speed / 2);
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
        
        // Efeitos hover para value cards
        document.querySelectorAll('.value-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });
    },
    
    /**
     * Cria linhas de constelação responsivas
     * Efeito visual dinâmico que se adapta ao tamanho da tela
     */
    createConstellationLines() {
        const container = document.querySelector('.constellation-lines');
        if (!container) return;
        
        container.innerHTML = '';
        const numberOfLines = DynamicApp.state.isMobile ? 8 : 15;
        
        for(let i = 0; i < numberOfLines; i++) {
            const line = document.createElement('div');
            line.className = 'constellation-line';
            
            // Configurações da linha
            const width = DynamicApp.state.isMobile ? 
                Math.random() * 100 + 30 : 
                Math.random() * 150 + 50;
            
            line.style.cssText = `
                position: absolute;
                width: ${width}px;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.6), transparent);
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                transform: rotate(${Math.random() * 360}deg);
                animation: twinkle 3s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            container.appendChild(line);
        }
    }
};

/* =====================================================
   7. SISTEMA DE DETECÇÃO E RESPONSIVIDADE
   ===================================================== */

/**
 * Sistema de detecção de dispositivo e responsividade
 * Otimiza performance e UX baseado no dispositivo
 */
const ResponsiveSystem = {
    /**
     * Inicializa sistema responsivo
     */
    init() {
        this.detectDevice();
        this.setupResizeListener();
        this.optimizeForDevice();
    },
    
    /**
     * Detecta tipo de dispositivo
     */
    detectDevice() {
        DynamicApp.state.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Também verifica largura da tela
        if (window.innerWidth <= DynamicApp.config.mobileBreakpoint) {
            DynamicApp.state.isMobile = true;
        }
    },
    
    /**
     * Configura listener para redimensionamento
     */
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
    
    /**
     * Gerencia redimensionamento da tela
     */
    handleResize() {
        // Atualiza linhas de constelação
        PremiumAnimations.createConstellationLines();
        
        // Refresh das animações AOS se necessário
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Reinicializa partículas se necessário
        if (DynamicApp.state.currentSection === 'home') {
            NavigationSystem.initializeParticlesJS();
        }
    },
    
    /**
     * Otimiza experiência baseada no dispositivo
     */
    optimizeForDevice() {
        if (DynamicApp.state.isMobile) {
            // Desabilita efeitos pesados em mobile
            document.documentElement.style.setProperty('--reduce-motion', '1');
            
            // Reduz partículas
            this.reduceMobileEffects();
        } else {
            // Habilita todos os efeitos em desktop
            document.documentElement.style.setProperty('--reduce-motion', '0');
        }
    },
    
    /**
     * Reduz efeitos para melhor performance mobile
     */
    reduceMobileEffects() {
        // Reduz animações CSS
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: ${DynamicApp.config.mobileBreakpoint}px) {
                * {
                    animation-duration: 0.5s !important;
                    transition-duration: 0.3s !important;
                }
                .orb { display: none; }
                .floating-orbs { display: none; }
            }
        `;
        document.head.appendChild(style);
    }
};

/* =====================================================
   8. SISTEMA DE INICIALIZAÇÃO PRINCIPAL
   ===================================================== */

/**
 * Sistema principal de inicialização
 * Coordena a inicialização de todos os subsistemas
 */
const MainInitializer = {
    /**
     * Inicializa toda a aplicação
     */
    init() {
        console.log('🚀 Inicializando Dynamic Solutions Premium...');
        
        // Aguarda DOM estar completamente carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startInitialization());
        } else {
            this.startInitialization();
        }
    },
    
    /**
     * Inicia sequência de inicialização otimizada
     * Sistema melhorado que garante ordem correta de carregamento
     */
    startInitialization() {
        try {
            // 1. Sistemas básicos primeiro
            ResponsiveSystem.init();
            
            // 2. Força inicialização das partículas logo no início para evitar atrasos
            setTimeout(() => {
                NavigationSystem.initializeParticlesJS();
            }, 100);
            
            // 3. Inicializa AOS se disponível
            this.initializeAOS();
            
            // 4. Sistema de navegação com navegação neural
            NavigationSystem.init();
            NeuralNavigation.init();
            
            // 5. Animações premium
            setTimeout(() => {
                PremiumAnimations.init();
            }, 200);
            
            // 6. Sistemas específicos da seção curriculum
            this.initializeCurriculumSystems();
            
            // 7. Event listeners globais
            this.setupGlobalEventListeners();
            
            // 8. Configurações finais
            setTimeout(() => {
                this.finalizeInitialization();
            }, 500);
            
            console.log('✅ Dynamic Solutions inicializado com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.handleInitializationError(error);
        }
    },
    
    /**
     * Inicializa AOS (Animate On Scroll)
     */
    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({ 
                duration: DynamicApp.config.animationDuration, 
                once: true, 
                offset: 100 
            });
        }
    },
    
    /**
     * Inicializa sistemas específicos do currículo
     */
    initializeCurriculumSystems() {
        // Só inicializa se estivermos na seção curriculum
        if (DynamicApp.state.currentSection === 'curriculum') {
            new NeuralNetwork();
            new ParticleSystem();
        }
    },
    
    /**
     * Configura event listeners globais otimizados
     * Sistema aprimorado que previne conflitos de scroll
     */
    setupGlobalEventListeners() {
        // Listener para teclas de atalho
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                NavigationSystem.showSection('home');
            }
        });
        
        // Sistema anti-scroll automático indesejado
        let isUserScrolling = false;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (DynamicApp.state.isAnimating) {
                // Durante animações, previne scroll
                window.scrollTo({ top: 0, behavior: 'auto' });
                return;
            }
            
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 150);
        });
        
        // Previne zoom em double tap no mobile
        if (DynamicApp.state.isMobile) {
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
        
        // Re-inicializa partículas quando página ganha foco
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && DynamicApp.state.currentSection === 'home') {
                setTimeout(() => {
                    NavigationSystem.initializeParticlesJS();
                }, 200);
            }
        });
    },
    
    /**
     * Finaliza inicialização
     */
    finalizeInitialization() {
        // Remove loading screens se existirem
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
        
        // Marca aplicação como inicializada
        document.body.classList.add('app-initialized');
        
        // Dispatch evento customizado para outros scripts
        window.dispatchEvent(new CustomEvent('dynamicSolutionsReady', {
            detail: { timestamp: Date.now() }
        }));
    },
    
    /**
     * Gerencia erros de inicialização
     * @param {Error} error - Erro ocorrido
     */
    handleInitializationError(error) {
        // Log detalhado do erro
        console.error('Detalhes do erro:', error.stack);
        
        // Fallback para funcionalidade básica
        this.initBasicFallback();
    },
    
    /**
     * Inicializa funcionalidade básica em caso de erro
     */
    initBasicFallback() {
        console.log('🔄 Iniciando modo de fallback...');
        
        // Funcionalidade mínima de navegação
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href === '#curriculum') {
                    NavigationSystem.showSection('curriculum');
                } else {
                    NavigationSystem.showSection('home');
                }
            });
        });
    }
};

/* =====================================================
   9. FUNÇÕES GLOBAIS DE INTERFACE
   ===================================================== */

/**
 * Função global para mostrar seção - usada pelo HTML
 * @param {string} section - Nome da seção
 */
window.showSection = function(section) {
    NavigationSystem.showSection(section);
};

/**
 * Função global para scroll direto para CTA final - usada pela navegação neural
 * Esta função foi criada especificamente para o terceiro botão neural
 */
window.scrollToFinalCTA = function() {
    // Garantir que estamos na seção home
    NavigationSystem.showSection('home');
    
    // Aguardar e fazer scroll para CTA final
    setTimeout(() => {
        const ctaElement = document.querySelector('.cta-section') || document.querySelector('.neural-cta-primary');
        if (ctaElement) {
            ctaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Adiciona efeito especial de destaque
            ctaElement.style.animation = 'neuralHighlight 2s ease-in-out';
            setTimeout(() => {
                ctaElement.style.animation = '';
            }, 2000);
        }
    }, 300);
};

/**
 * Função global para ativar CTA final
 */
window.enableFinalCTA = function() {
    const finalCTA = document.querySelector('.cta-section .cta-button');
    const ctaSection = document.querySelector('.cta-section');
    
    if (finalCTA && ctaSection) {
        finalCTA.style.pointerEvents = 'all';
        ctaSection.style.pointerEvents = 'all';
        finalCTA.style.zIndex = '1003';
        ctaSection.style.zIndex = '1002';
        
        finalCTA.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
};

/* =====================================================
   10. INICIALIZAÇÃO AUTOMÁTICA
   ===================================================== */

// Inicia automaticamente quando script é carregado
MainInitializer.init();

/* =====================================================
   FINAL DO ARQUIVO JAVASCRIPT
   
   Este sistema mantém 100% da funcionalidade original
   enquanto proporciona:
   
   ✅ Código modular e organizado
   ✅ Performance otimizada
   ✅ Responsividade completa
   ✅ Sistema robusto de erro
   ✅ Fácil manutenção e extensão
   ✅ Comentários detalhados
   ✅ Padrões de desenvolvimento modernos
   
   Desenvolvido com excelência técnica pela
   Dynamic Solutions Team 🚀
   ===================================================== */