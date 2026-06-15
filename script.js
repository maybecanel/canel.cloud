document.addEventListener('DOMContentLoaded', () => {
    // Drop in some scroll reveal magic
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Make sections and cards slide in when they hit the viewport
    const elementsToReveal = document.querySelectorAll('section, .work-card');
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Helper style for the reveal effect
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for nav links (CSS handles most of this but backups don't hurt)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Luminate showcase video modal logic
    const modal = document.getElementById('video-modal');
    const showcaseBtn = document.getElementById('showcase-btn');
    const closeBtn = document.querySelector('.close-modal');
    const video = document.getElementById('showcase-video');

    if (showcaseBtn && modal) {
        showcaseBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            // Simple hack to trigger the scale-up animation properly
            modal.offsetHeight;
            modal.classList.add('active');
            video.play();
            updatePlayIcon();
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            // Give the exit animation a bit of time before we kill the display
            setTimeout(() => {
                if (!modal.classList.contains('active')) {
                    modal.style.display = 'none';
                    video.pause();
                    video.currentTime = 0;
                    updatePlayIcon();
                }
            }, 500);
        });

        // Kill modal when clicking the backdrop
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (!modal.classList.contains('active')) {
                        modal.style.display = 'none';
                        video.pause();
                        video.currentTime = 0;
                        updatePlayIcon();
                    }
                }, 500);
            }
        });

        // Custom video player bits
        const playPauseBtn = document.querySelector('.play-pause');
        const muteBtn = document.querySelector('.mute-btn');
        const progress = document.querySelector('.progress-bar');
        const progressFilled = document.querySelector('.progress-filled');
        const timeDisplay = document.querySelector('.time');

        function updatePlayIcon() {
            const icon = playPauseBtn.querySelector('i');
            icon.className = video.paused ? 'fas fa-play' : 'fas fa-pause';
        }

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) video.play();
            else video.pause();
            updatePlayIcon();
        });

        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = `${percent}%`;
            
            const curMins = Math.floor(video.currentTime / 60);
            const curSecs = Math.floor(video.currentTime % 60);
            const durMins = Math.floor(video.duration / 60) || 0;
            const durSecs = Math.floor(video.duration % 60) || 0;
            
            timeDisplay.textContent = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs} / ${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
        });

        progress.addEventListener('click', (e) => {
            const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
        });

        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.querySelector('i').className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        });
    }

    // Modal that warns people they're leaving for another site
    const redirectModal = document.getElementById('redirect-modal');
    const confirmRedirect = document.getElementById('confirm-redirect');
    const cancelRedirect = document.getElementById('cancel-redirect');
    const redirectUrlDisplay = document.getElementById('redirect-url');
    
    // Grab all work buttons that aren't for the showcase
    const visitLinks = document.querySelectorAll('.work-btn:not(.disabled):not(.secondary)');

    visitLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            redirectUrlDisplay.textContent = url;
            confirmRedirect.setAttribute('href', url);
            confirmRedirect.setAttribute('target', '_blank');
            
            redirectModal.style.display = 'flex';
            redirectModal.offsetHeight; // Force reflow so the bounce works
            redirectModal.classList.add('active');
        });
    });

    const closeRedirect = () => {
        redirectModal.classList.remove('active');
        setTimeout(() => {
            if (!redirectModal.classList.contains('active')) {
                redirectModal.style.display = 'none';
            }
        }, 500);
    };

    cancelRedirect.addEventListener('click', closeRedirect);
    confirmRedirect.addEventListener('click', closeRedirect);

    // Close redirect modal if they click outside the box
    window.addEventListener('click', (e) => {
        if (e.target === redirectModal) {
            closeRedirect();
        }
    });
});
