// Navegación responsive
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace (móvil)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// Filtros de productos
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al botón clickeado
        button.classList.add('active');

        const filterValue = button.dataset.filter;

        productCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Carrito de compras
let cartCount = 0;
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.querySelector('.cart-count');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        cartCountElement.textContent = cartCount;

        // Animación de feedback
        button.textContent = '✓';
        button.style.backgroundColor = '#2ecc71';

        setTimeout(() => {
            button.innerHTML = '+';
            button.style.backgroundColor = '';
        }, 1000);
    });
});

// Formulario de contacto con backend Flask
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        fetch('http://localhost:5000/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: contactForm.nombre.value,
                email: contactForm.email.value,
                mensaje: contactForm.mensaje.value
            })
        })
            .then(res => res.json())
            .then(data => {
                formMsg.textContent = data.mensaje;
                formMsg.style.color = '#2ecc71';
                contactForm.reset();
                setTimeout(() => { formMsg.textContent = ''; }, 5000);
            })
            .catch(() => {
                formMsg.textContent = 'Error al enviar. Intenta de nuevo.';
                formMsg.style.color = '#e74c3c';
            });
    });
}

// Newsletter
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        emailInput.value = '';
        emailInput.placeholder = '¡Gracias por suscribirte!';

        setTimeout(() => {
            emailInput.placeholder = 'tu@email.com';
        }, 3000);
    });
}

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de entrada al hacer scroll con clase .visible
function revealOnScroll() {
    const elements = document.querySelectorAll('.section, .product-card, .blog-list article, .services-list li');
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Loader animado
window.addEventListener('load', function () {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.opacity = '0';
        setTimeout(() => { if (loader) loader.style.display = 'none'; }, 500);
    }, 800);
});

// Fondo de partículas en hero (simple efecto animado)
const canvas = document.getElementById('hero-particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7
        });
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(52,152,219,0.18)';
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Typing effect en hero
const typedText = document.getElementById('typed-text');
const cursor = document.querySelector('.typed-cursor');
const phrases = [
    'Elegancia en Simplicidad',
    'Moda Urbana Sostenible',
    'Minimalismo Contemporáneo'
];
let phraseIndex = 0, charIndex = 0, typing = true;
function typeLoop() {
    if (!typedText) return;
    if (typing) {
        if (charIndex < phrases[phraseIndex].length) {
            typedText.textContent += phrases[phraseIndex][charIndex++];
            setTimeout(typeLoop, 80);
        } else {
            typing = false;
            setTimeout(typeLoop, 1200);
        }
    } else {
        if (charIndex > 0) {
            typedText.textContent = phrases[phraseIndex].slice(0, --charIndex);
            setTimeout(typeLoop, 40);
        } else {
            typing = true;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeLoop, 400);
        }
    }
}
if (typedText) typeLoop();

// Testimonial slider/carousel
const slider = document.getElementById('testimonial-slider');
if (slider) {
    const testimonials = slider.querySelectorAll('.testimonial');
    const leftBtn = slider.querySelector('.testimonial-arrow.left');
    const rightBtn = slider.querySelector('.testimonial-arrow.right');
    let current = 0;
    function showTestimonial(idx) {
        testimonials.forEach((t, i) => {
            t.style.display = (i === idx) ? 'block' : 'none';
        });
    }
    showTestimonial(current);
    if (leftBtn) leftBtn.onclick = () => { current = (current - 1 + testimonials.length) % testimonials.length; showTestimonial(current); };
    if (rightBtn) rightBtn.onclick = () => { current = (current + 1) % testimonials.length; showTestimonial(current); };
    // Auto-slide
    setInterval(() => { current = (current + 1) % testimonials.length; showTestimonial(current); }, 6000);
}

// Botón ir arriba
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) scrollTopBtn.style.display = 'block';
    else scrollTopBtn.style.display = 'none';
});
scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Stats animadas (contador)
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = +el.dataset.count;
        let count = 0;
        const step = Math.max(1, Math.floor(target / 60));
        function update() {
            count += step;
            if (count > target) count = target;
            el.textContent = count;
            if (count < target) requestAnimationFrame(update);
        }
        update();
    });
}
window.addEventListener('DOMContentLoaded', animateStats);

// Cookie banner
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
if (cookieBanner && acceptCookies) {
    if (!localStorage.getItem('cookiesAccepted')) cookieBanner.style.display = 'flex';
    acceptCookies.onclick = () => {
        cookieBanner.style.display = 'none';
        localStorage.setItem('cookiesAccepted', '1');
    };
}

// Leer más/Leer menos en blog
function setupReadMoreBlog() {
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const content = btn.closest('.blog-content');
            if (content) {
                const full = content.querySelector('.blog-full');
                const summary = content.querySelector('.blog-summary');
                if (full && summary) {
                    full.style.display = 'block';
                    summary.style.display = 'none';
                    btn.style.display = 'none';
                    // Crear botón Leer menos
                    let lessBtn = content.querySelector('.read-less');
                    if (!lessBtn) {
                        lessBtn = document.createElement('a');
                        lessBtn.href = '#';
                        lessBtn.className = 'read-less';
                        lessBtn.innerHTML = 'Leer menos <i class="fas fa-arrow-up"></i>';
                        lessBtn.style.display = 'inline-block';
                        lessBtn.style.marginTop = '1rem';
                        full.appendChild(lessBtn);
                    } else {
                        lessBtn.style.display = 'inline-block';
                    }
                    lessBtn.onclick = function (ev) {
                        ev.preventDefault();
                        full.style.display = 'none';
                        summary.style.display = 'block';
                        btn.style.display = 'inline-block';
                        lessBtn.style.display = 'none';
                    };
                }
            }
        });
    });
}
window.addEventListener('DOMContentLoaded', setupReadMoreBlog);