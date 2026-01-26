/**
 * Integrity Electrical - Core Interaction Script
 * Handles: Mobile Menu, Modals, Forms (AJAX + Validation)
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initModalSystem();
    initForms();
});

/* --- Mobile Menu --- */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('#mobile-menu a');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        toggleMenu(!isOpen);
    });

    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    function toggleMenu(show) {
        if (show) {
            menu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock Body Scroll
            btn.innerHTML = '<i class="fas fa-times text-2xl text-electric"></i>';
        } else {
            menu.classList.remove('open');
            document.body.style.overflow = '';
            btn.innerHTML = '<i class="fas fa-bars text-2xl text-white"></i>';
        }
    }
}

/* --- Modal System --- */
function initModalSystem() {
    const modal = document.getElementById('modal-overlay');
    const triggers = document.querySelectorAll('[data-trigger="modal"]');
    const closers = document.querySelectorAll('[data-close="modal"]');

    if (!modal) return;

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closers.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close on outside click is handled by the overlay div background itself if structured correctly,
    // or we can add specific listener:
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    function openModal() {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            modal.querySelector('.modal-container').classList.remove('modal-enter');
            modal.querySelector('.modal-container').classList.add('modal-enter-active');
        });
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        // Reverse animation could go here
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/* --- Form Handling --- */
function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Phone Masking
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }

        // Submission Logic
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmission(form);
        });
    });
}

function formatPhoneNumber(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
}

function handleSubmission(form) {
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    // Validate
    const phone = form.querySelector('input[type="tel"]');
    if (phone && phone.value.length < 14) {
        alert("Please enter a valid phone number."); // Fallback alert, could be cleaner inline
        phone.classList.add('border-red-500');
        return;
    }

    // Lock UI
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Sending...';

    // Simulate Network Request
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check mr-2"></i> Sent!';
        btn.classList.add('bg-green-500', 'text-white');

        // Show Inline Success
        const successMsg = document.createElement('div');
        successMsg.className = 'mt-4 p-4 bg-green-500/10 border border-green-500 rounded text-green-100 text-center font-bold animate-pulse';
        successMsg.innerHTML = "Thanks! We'll reach out shortly.";

        // Replace form content or append?
        // Let's append for now to not shift layout too drastically
        form.appendChild(successMsg);

        form.reset();

        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = originalText;
            btn.classList.remove('bg-green-500', 'text-white');
            successMsg.remove();

            // If modal, close it
            if (form.closest('#modal-overlay')) {
                document.getElementById('modal-overlay').classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 3000);

    }, 1200);
}
