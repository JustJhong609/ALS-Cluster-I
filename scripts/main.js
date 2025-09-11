// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real implementation, you would send the form data to a server
    // For this demo, we'll just show a success message
    contactForm.reset();
    formSuccess.classList.remove('hidden');
    
    // Hide the success message after 5 seconds
    setTimeout(() => {
        formSuccess.classList.add('hidden');
    }, 5000);
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Team section functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('a[href="#full-team"]');
    const teamSection = document.getElementById('full-team');
    const closeBtn = document.querySelector('.close-team');
    
    if (viewAllBtn && teamSection && closeBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            teamSection.classList.remove('hidden');
            teamSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            teamSection.classList.add('hidden');
            // Scroll back to the about section
            document.querySelector('section.py-16.bg-white').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Accordion functionality for municipality team list
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const municipality = this.getAttribute('data-municipality');
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.accordion-arrow');
            const isOpen = !content.classList.contains('hidden');
            
            // Close all other accordions (single-open behavior)
            accordionHeaders.forEach(otherHeader => {
                const otherContent = otherHeader.nextElementSibling;
                const otherArrow = otherHeader.querySelector('.accordion-arrow');
                
                if (otherHeader !== this) {
                    otherContent.classList.add('hidden');
                    otherArrow.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current accordion
            if (isOpen) {
                content.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });
});
