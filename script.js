// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Project videos
    const video1 = document.getElementById('projectVideo1');
    const video2 = document.getElementById('projectVideo2');
    const video3 = document.getElementById('projectVideo3');
    const hoverSign = document.querySelector('.hover-sign');
    const videoList = [video1, video2, video3];

    // Video controls
    videoList.forEach(function(video) {
        if (video) {
            video.muted = true; // Required for autoplay
            video.addEventListener("mouseover", function() {
                video.play().catch(e => console.log('Video play failed'));
                if (hoverSign) hoverSign.classList.add("active");
            });
            video.addEventListener("mouseout", function() {
                video.pause();
                video.currentTime = 0;
                if (hoverSign) hoverSign.classList.remove("active");
            });
        }
    });

    // Sidebar functionality
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

    // Simple form success message
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show success state
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
            submitBtn.style.background = '#4CAF50';
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init();
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

// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load videos when they enter viewport
    const videos = document.querySelectorAll('video[preload="none"]');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load();
                video.classList.add('loaded');
                videoObserver.unobserve(video);
            }
        });
    });

    videos.forEach(video => videoObserver.observe(video));
});