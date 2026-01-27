// ------ NAVBAR - Dark Mode -------
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verificar preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    // Guardar preferencia
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('.menu-dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
            }
        }
    });
});

// Scroll effect (opcional - añade sombra al hacer scroll)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});


// ------ CARRUSEL -------
const track = document.querySelector('.carrusel-track');
const slides = document.querySelectorAll('.slide');
const DELAY = 4000; // 4 segundos entre slides
let index = 1; // Empezamos en el primer slide real (después del clon)

function actualizarCarrusel(conTransicion = true) {
    if (!track) return; // Verificar que existe
    
    if (conTransicion) {
        track.style.transition = 'transform 0.5s ease-in-out';
    } else {
        track.style.transition = 'none';
    }
    
    const desplazamiento = -index * 100;
    track.style.transform = `translateX(${desplazamiento}%)`;
}

// Solo ejecutar si existe el carrusel
if (track && slides.length > 0) {
    // Posición inicial
    actualizarCarrusel(false);

    // Autoplay
    setInterval(() => {
        index++;
        actualizarCarrusel();

        // Si llegamos al clon final, volver al inicio real
        if (index === slides.length - 1) {
            setTimeout(() => {
                index = 1;
                actualizarCarrusel(false);
            }, 500);
        }
    }, DELAY);
}


// ------ FOOTER -------  

// Actualizar año automáticamente en el copyright
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `© ${currentYear} Ayrd & Bloom. Todos los derechos reservados. Diseñado con amor.`;
    }
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si es un enlace con ancla (#)
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Animación de entrada cuando el footer es visible
function initScrollAnimation() {
    const footer = document.querySelector('.footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('footer-visible');
            }
        });
    }, observerOptions);
    
    if (footer) {
        observer.observe(footer);
    }
}

// Efecto hover en iconos sociales
function initSocialHover() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Copiar email al hacer click
function initEmailCopy() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('.material-icons-outlined');
        if (icon && icon.textContent.trim() === 'email') {
            const emailElement = item.querySelector('.contact-text');
            
            if (emailElement) {
                emailElement.style.cursor = 'pointer';
                emailElement.title = 'Click para copiar';
                
                emailElement.addEventListener('click', () => {
                    const email = emailElement.textContent.trim();
                    
                    navigator.clipboard.writeText(email).then(() => {
                        // Crear notificación temporal
                        const notification = document.createElement('span');
                        notification.textContent = '¡Email copiado!';
                        notification.style.cssText = `
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background-color: #B59258;
                            color: white;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                            z-index: 1000;
                            animation: slideInUp 0.3s ease-out;
                        `;
                        
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.style.animation = 'slideOutDown 0.3s ease-out';
                            setTimeout(() => notification.remove(), 300);
                        }, 2000);
                    }).catch(err => {
                        console.error('Error al copiar:', err);
                    });
                });
            }
        }
    });
}

// Inicializar todas las funciones
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
    initSmoothScroll();
    initScrollAnimation();
    initSocialHover();
    initEmailCopy();
});

// Agregar estilos para las animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);