const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Configurar tamanho do canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Configurações das partículas
const particles = [];
const numParticles = 100;
const connectionDistance = 150;

// Criar partículas
for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 2
    });
}

// Função de animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar partículas
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebater nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Desenhar partícula com cor futurista
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#8A2BE2'; // Entre roxo e azul
        ctx.fill();

        // Conectar partículas próximas
        particles.forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(138, 43, 226, ${1 - distance/connectionDistance})`; // Entre roxo e azul
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

// Interatividade com o mouse
let mouse = { x: null, y: null };

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    
    // Atrair partículas para o mouse
    particles.forEach(particle => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
            particle.x += dx * 0.02;
            particle.y += dy * 0.02;
        }
    });
});
