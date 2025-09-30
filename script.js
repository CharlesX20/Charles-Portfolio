document.addEventListener('DOMContentLoaded', function() {
    const sideBar = document.querySelector('.sidebar');
    const menu = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (menu && sideBar && closeIcon) {
        menu.addEventListener("click", function() {
            sideBar.classList.remove("close-sidebar");
            sideBar.classList.add("open-sidebar");
        });

        closeIcon.addEventListener("click", function() {
            sideBar.classList.remove("open-sidebar");
            sideBar.classList.add("close-sidebar");
        });
    }

    // Form success message
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
                submitBtn.style.background = '#4CAF50';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            submitBtn.innerHTML = '<i class="bx bx-error"></i> Failed to Send';
            submitBtn.style.background = '#f44336';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Simple but devastating scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .skills-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add devastating animation class
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0)';
            }
        });
    }, { threshold: 0.1 });

    // Set initial state for all elements
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.filter = 'blur(5px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
});