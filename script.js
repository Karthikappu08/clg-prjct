document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const words = ["Web Developer", "Programmer", "Tech Enthusiast"];
    let i = 0;
    let isDeleting = false;
    let wordIndex = 0;
    const typingText = document.getElementById('typing-text');

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, i - 1);
            i--;
        } else {
            typingText.textContent = currentWord.substring(0, i + 1);
            i++;
        }

        if (!isDeleting && i === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 400);
        } else {
            setTimeout(typeEffect, isDeleting ? 40 : 90);
        }
    }

    typeEffect();

    // Mobile Menu Toggle
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    mobileMenuBtn.addEventListener('click', () => {
        header.classList.toggle('menu-open');
        // Toggle icon between bars and close (x)
        const icon = mobileMenuBtn.querySelector('i');
        if (header.classList.contains('menu-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scroll on nav link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (header.classList.contains('menu-open')) {
                header.classList.remove('menu-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }

            const id = this.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Highlight active nav link as you scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
});
