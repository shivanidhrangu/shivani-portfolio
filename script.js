// ==========================================================================
//   MOBILE NAVIGATION TOGGLE
// ==========================================================================
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle icon between bars and xmark
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});

// ==========================================================================
//   STICKY NAVBAR & ACTIVE LINK HIGHLIGHTING
// ==========================================================================
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Sticky Nav effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// ==========================================================================
//   SCROLL REVEAL ANIMATION (Intersection Observer)
// ==========================================================================
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// ==========================================================================
//   FORM SUBMISSION HANDLER (AJAX FORMSPREE)
// ==========================================================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Ye redirect rokega
        
        formStatus.innerHTML = "Sending message...";
        formStatus.style.color = "#007BFF";

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = "✅ Message sent successfully! I'll get back to you soon.";
                formStatus.style.color = "#28a745";
                contactForm.reset();
            } else {
                formStatus.innerHTML = "❌ Oops! Something went wrong. Please try again.";
                formStatus.style.color = "#dc3545";
            }
        } catch (error) {
            formStatus.innerHTML = "❌ Network error. Message not sent.";
            formStatus.style.color = "#dc3545"; 
        }
    });
}