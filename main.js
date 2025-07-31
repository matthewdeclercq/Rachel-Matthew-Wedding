// JavaScript for gallery modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const galleryModal = document.getElementById('gallery-modal');
    const galleryContent = document.querySelector('.gallery-content');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryBackdrop = document.querySelector('.gallery-backdrop');
    let startY = null;
    let isSwiping = false;

    // Open modal function
    function openGalleryModal(e) {
        e.preventDefault();
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        galleryModal.focus();
    }

    // Close modal function
    function closeGalleryModal() {
        // Add a class to trigger the closing animation
        galleryContent.classList.add('closing');
        galleryBackdrop.classList.add('closing');

        // Listen for animation end, then hide modal
        galleryContent.addEventListener('animationend', function handler() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            galleryContent.classList.remove('closing');
            galleryBackdrop.classList.remove('closing');
            galleryContent.removeEventListener('animationend', handler);
        });
    }

    // Open modal on inspiration board link click
    const openGallery = document.getElementById('open-gallery');
    if (openGallery) {
        openGallery.addEventListener('click', openGalleryModal);
    }

    // Close on close button
    if (galleryClose) {
        galleryClose.addEventListener('click', closeGalleryModal);
    }

    // Touch events for swipe down to close
    galleryContent.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1 && galleryContent.scrollTop === 0) {
            startY = e.touches[0].clientY;
            isSwiping = true;
        } else {
            isSwiping = false;
        }
    });

    galleryContent.addEventListener('touchmove', function (e) {
        if (!isSwiping) return;
        const currentY = e.touches[0].clientY;
        const diffY = currentY - startY;
        // Only close if swiping down and still at top
        if (diffY > 40 && galleryContent.scrollTop === 0) {
            closeGalleryModal();
            isSwiping = false;
        }
    });

    galleryContent.addEventListener('touchend', function () {
        isSwiping = false;
    });

    // Close on backdrop click
    if (galleryBackdrop) {
        galleryBackdrop.addEventListener('click', closeGalleryModal);
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
            closeGalleryModal();
        }
    });
});
