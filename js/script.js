/**
 * Base Template - Core Interaction Script
 * Handles: Mobile Menu, Modals, Forms (AJAX + Validation)
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initModalSystem();
    initForms();
    initStats();
    initScrollReveal();
    initConversionModal();
    initMobileStickyCTA();
});

/* --- Stats Counter --- */
function initStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                if (finalValue) animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + (obj.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

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

    // Button Triggers
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close Triggers
    closers.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Outside Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    // Exit Intent (Desktop Only)
    // Triggers when mouse leaves the viewport at the top
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            // Check session storage to avoid spamming
            if (!sessionStorage.getItem('modalShown')) {
                openModal();
                sessionStorage.setItem('modalShown', 'true');
            }
        }
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

async function handleSubmission(form) {
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    // Validate
    const phone = form.querySelector('input[type="tel"]');
    if (phone && phone.value.length < 14) {
        alert("Please enter a valid phone number.");
        phone.classList.add('border-red-500');
        return;
    }

    // Lock UI
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Sending...';

    // Prepare Data
    const formData = new FormData(form);

    // Explicitly add common FormSubmit configurations if not in HTML
    if (!formData.has('_captcha')) formData.append('_captcha', 'false');
    if (!formData.has('_subject')) formData.append('_subject', 'New Lead from Website');

    try {
        const response = await fetch('https://formsubmit.co/{{EMAIL}}', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i> Sent!';
            btn.classList.add('bg-green-500', 'text-white');

            // Show Inline Success
            const successMsg = document.createElement('div');
            successMsg.className = 'mt-4 p-4 bg-green-500/10 border border-green-500 rounded text-green-100 text-center font-bold animate-pulse';
            successMsg.innerHTML = "Thanks! We'll reach out shortly.";
            form.appendChild(successMsg);

            form.reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.innerText = originalText;
                btn.classList.remove('bg-green-500', 'text-white');
                if (successMsg.parentNode) successMsg.remove();

                if (form.closest('#modal-overlay')) {
                    document.getElementById('modal-overlay').classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }, 4000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        btn.disabled = false;
        btn.innerText = originalText;
        alert('Something went wrong. Please call us directly.');
    }
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --- Conversion Modal System --- */
function initConversionModal() {
    const overlay = document.getElementById('conversion-modal-overlay');
    const fab = document.getElementById('fab-cta');
    const closeBtn = overlay?.querySelector('.conversion-modal-close');
    const triggers = document.querySelectorAll('[data-trigger="conversion-modal"]');

    if (!overlay) return;

    function openModal() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // FAB trigger
    if (fab) {
        fab.addEventListener('click', openModal);
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    // Other triggers (mobile sticky CTA, etc.)
    triggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Delayed auto-open (2.5s) - session-based to avoid spam
    const isHomepage = window.location.pathname === '/' ||
        window.location.pathname.endsWith('/index.html') ||
        window.location.pathname === window.location.pathname.split('/').slice(0, 2).join('/') + '/';
    const isServicesPage = window.location.pathname.includes('/services');

    if ((isHomepage || isServicesPage) && !sessionStorage.getItem('conversionModalShown')) {
        setTimeout(() => {
            openModal();
            sessionStorage.setItem('conversionModalShown', 'true');
        }, 2500);
    }

    // Handle form submission inside modal
    const modalForm = overlay.querySelector('form');
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmission(modalForm);
            setTimeout(closeModal, 3000);
        });
    }
}

/* --- Mobile Sticky CTA --- */
function initMobileStickyCTA() {
    const stickyCTA = document.getElementById('mobile-sticky-cta');
    if (!stickyCTA) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateStickyCTA() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.scrollHeight;

        // Show after scrolling past hero (300px) and hide near bottom
        const shouldShow = scrollY > 300 && (scrollY + windowHeight) < (docHeight - 200);

        if (shouldShow) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateStickyCTA);
            ticking = true;
        }
    }, { passive: true });
}
