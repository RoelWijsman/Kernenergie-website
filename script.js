// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay/easing to the outline for a fluid feel
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effects for cursor
document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.backgroundColor = 'rgba(0, 242, 96, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ["een schonere wereld", "minder CO2 uitstoot", "veilige energie", "toekomstige generaties"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    
    typingText.textContent = currentChars;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger number counters if it's the stats section
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.counter');
                if(counter && counter.innerText === '0') {
                    animateCounter(counter);
                }
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.stat-item').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Number Counter Animation
function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    let current = 0;
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            el.innerText = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            el.innerText = target.toLocaleString();
        }
    };
    updateCounter();
}

// Particle Effect in Reactor Core (Simple random movement)
const particles = document.querySelectorAll('.particles span');
particles.forEach(p => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    const duration = 2 + Math.random() * 3;
    
    p.style.setProperty('--x', `${randomX}px`);
    p.style.setProperty('--y', `${randomY}px`);
    
    p.animate([
        { transform: 'translate(0,0) scale(0)' },
        { transform: `translate(${randomX}px, ${randomY}px) scale(1)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        iterations: Infinity
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Verzonden!';
        btn.style.borderColor = 'var(--primary-color)';
        btn.style.background = 'rgba(0, 242, 96, 0.1)';
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerText = originalText;
            btn.style.background = 'transparent';
        }, 3000);
    });
}
