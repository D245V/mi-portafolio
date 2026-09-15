document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Fade-in al cargar la página
    document.body.classList.add('page-loaded');

    initScrollEffects();
    initSmoothScroll();
    initHeaderScroll();
    initHeroFadeOut();
});

// 2. Efecto de desvanecimiento (Fade-out y leve escalado) al bajar la pantalla
function initHeroFadeOut() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scrollPosition <= windowHeight) {
            // Calcula la opacidad reduciéndose hacia 0 al scroll
            const opacity = 1 - (scrollPosition / (windowHeight * 0.75));
            // Calcula un suave escalado hacia abajo
            const scale = 1 - (scrollPosition / (windowHeight * 4));

            heroSection.style.opacity = Math.max(opacity, 0);
            heroSection.style.transform = `scale(${Math.max(scale, 0.95)})`;
        }
    });
}

// 3. Revelación progresiva para elementos [data-scroll]
function initScrollEffects() {
    const elementsToReveal = document.querySelectorAll('[data-scroll]');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInScroll 0.8s ease-out forwards';
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    elementsToReveal.forEach(element => {
        revealOnScroll.observe(element);
    });
}

// 4. Desplazamiento suave de navegación
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. Cambio de opacidad del header al hacer scroll
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });
}

// 6. Configuración para usuarios con reducción de movimiento activada
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}