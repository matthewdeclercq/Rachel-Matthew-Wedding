// Gallery modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryModal = document.getElementById('gallery-modal');
    const galleryContent = document.querySelector('.gallery-content');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryBackdrop = document.querySelector('.gallery-backdrop');
    const openGallery = document.getElementById('open-gallery');
    
    if (!galleryModal || !galleryContent || !galleryClose || !galleryBackdrop) {
        console.warn('Gallery modal elements not found');
        return;
    }

    let startY = null;
    let isSwiping = false;

    function openGalleryModal(e) {
        e.preventDefault();
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        galleryModal.focus();
    }

    function closeGalleryModal() {
        galleryContent.classList.add('closing');
        galleryBackdrop.classList.add('closing');

        const handleAnimationEnd = () => {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            galleryContent.classList.remove('closing');
            galleryBackdrop.classList.remove('closing');
            galleryContent.removeEventListener('animationend', handleAnimationEnd);
        };

        galleryContent.addEventListener('animationend', handleAnimationEnd, { once: true });
    }

    // Event listeners
    if (openGallery) {
        openGallery.addEventListener('click', openGalleryModal);
    }

    galleryClose.addEventListener('click', closeGalleryModal);
    galleryBackdrop.addEventListener('click', closeGalleryModal);

    // Touch events for swipe down to close
    galleryContent.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1 && galleryContent.scrollTop === 0) {
            startY = e.touches[0].clientY;
            isSwiping = true;
        } else {
            isSwiping = false;
        }
    });

    galleryContent.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        const currentY = e.touches[0].clientY;
        const diffY = currentY - startY;
        
        if (diffY > 40 && galleryContent.scrollTop === 0) {
            closeGalleryModal();
            isSwiping = false;
        }
    });

    galleryContent.addEventListener('touchend', () => {
        isSwiping = false;
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
            closeGalleryModal();
        }
    });
});
