// NextUpTech JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initModals();
    initBookingSystem();
    initBookingModals();
    initCookiesBanner();
    initAnimations();
    initFormValidation();
    
    // Log successful initialization
    console.log('NextUpTech website loaded successfully!');
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Modal functionality
function initModals() {
    // Login modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const showRegisterModal = document.getElementById('showRegisterModal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', function() {
            loginModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (showRegisterModal) {
        showRegisterModal.addEventListener('click', function() {
            loginModal.classList.add('hidden');
            document.getElementById('registerModal').classList.remove('hidden');
        });
    }
    
    // Register modal
    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const showLoginModal = document.getElementById('showLoginModal');
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', function() {
            registerModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeRegisterModal && registerModal) {
        closeRegisterModal.addEventListener('click', function() {
            registerModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (showLoginModal) {
        showLoginModal.addEventListener('click', function() {
            registerModal.classList.add('hidden');
            loginModal.classList.remove('hidden');
        });
    }
    
    // Close modals when clicking outside
    [loginModal, registerModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// Booking system functionality
function initBookingSystem() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('nextuptech_user');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (isLoggedIn) {
        const user = JSON.parse(isLoggedIn);
        showUserMenu(user.name);
    } else {
        // Ensure the "Register Now & Get Bonus" button is enabled if user is not logged in
        enableRegisterNowBonusButton();
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate login attempt - always redirect to registration
            const loginModal = document.getElementById('loginModal');
            const registerModal = document.getElementById('registerModal');
            
            loginModal.classList.add('hidden');
            registerModal.classList.remove('hidden');
            
            // Show message
            showNotification('Please create an account to continue.', 'info');
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            // Simulate registration
            const user = {
                name: name,
                email: email,
                password: password,
                registeredAt: new Date().toISOString()
            };
            
            localStorage.setItem('nextuptech_user', JSON.stringify(user));
            
            // Hide register modal and show user menu
            registerModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            showUserMenu(name);
            
            showNotification('Account created successfully! Welcome to NextUpTech!', 'success');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('nextuptech_user');
            hideUserMenu();
            showNotification('You have been logged out successfully.', 'info');
        });
    }
    
    // Add Book Now functionality to all buttons
    addBookNowListeners();
    
    // Add event listener to "Register Now & Get Bonus" button
    const registerNowBonusBtn = document.getElementById('registerNowBonusBtn');
    if (registerNowBonusBtn) {
        registerNowBonusBtn.addEventListener('click', function() {
            if (!this.disabled) {
                const registerModal = document.getElementById('registerModal');
                if (registerModal) {
                    registerModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    }
    
    // Add event listener to "Start Learning Today" button (Home page)
    const startLearningBtn = document.getElementById('startLearningBtn');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            // Scroll to Popular Courses section
            const popularCoursesSection = document.getElementById('popularCourses');
            if (popularCoursesSection) {
                popularCoursesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add event listener to "Start Learning Today" button (Courses page)
    const coursesStartLearningBtn = document.getElementById('coursesStartLearningBtn');
    if (coursesStartLearningBtn) {
        coursesStartLearningBtn.addEventListener('click', function() {
            // Scroll to Featured Courses section
            const featuredCoursesSection = document.getElementById('featuredCourses');
            if (featuredCoursesSection) {
                featuredCoursesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add event listeners to "Browse Templates" buttons (Templates page)
    const templatesBrowseBtns = document.querySelectorAll('[templates-browse-btn]');
    templatesBrowseBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to Featured Templates section
            const featuredTemplatesSection = document.getElementById('featuredTemplates');
            if (featuredTemplatesSection) {
                featuredTemplatesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add event listeners to "Browse Memberships" buttons (Memberships page)
    const membershipsBrowseBtns = document.querySelectorAll('[memberships-browse-btn]');
    membershipsBrowseBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to Featured Memberships section
            const featuredMembershipsSection = document.getElementById('featuredMemberships');
            if (featuredMembershipsSection) {
                featuredMembershipsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add event listeners to "Read Latest Posts" buttons (Blog page)
    const blogReadPostsBtns = document.querySelectorAll('[blog-read-posts-btn]');
    blogReadPostsBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to Latest Articles section
            const latestArticlesSection = document.getElementById('latestArticles');
            if (latestArticlesSection) {
                latestArticlesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Newsletter subscription functionality
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const subscribeBtn = document.getElementById('newsletterSubscribeBtn');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const originalText = subscribeBtn.textContent;
            subscribeBtn.textContent = 'Subscribing...';
            subscribeBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Store subscription in localStorage
                const subscriptions = JSON.parse(localStorage.getItem('nextuptech_newsletter_subscriptions') || '[]');
                if (!subscriptions.includes(email)) {
                    subscriptions.push(email);
                    localStorage.setItem('nextuptech_newsletter_subscriptions', JSON.stringify(subscriptions));
                    
                    // Show success message
                    showNotification('Successfully subscribed to our newsletter!', 'success');
                    
                    // Clear form
                    emailInput.value = '';
                } else {
                    showNotification('This email is already subscribed to our newsletter.', 'info');
                }
                
                // Reset button
                subscribeBtn.textContent = originalText;
                subscribeBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Contact page button functionality
    // Get Support button - scroll to Get in Touch section
    const contactGetSupportBtns = document.querySelectorAll('[contact-get-support-btn]');
    contactGetSupportBtns.forEach(button => {
        button.addEventListener('click', function() {
            const getInTouchSection = document.getElementById('getInTouch');
            if (getInTouchSection) {
                getInTouchSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // View FAQ button - scroll to FAQ section
    const contactViewFaqBtns = document.querySelectorAll('[contact-view-faq-btn]');
    contactViewFaqBtns.forEach(button => {
        button.addEventListener('click', function() {
            const faqSection = document.getElementById('frequentlyAskedQuestions');
            if (faqSection) {
                faqSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Browse Courses button - redirect to Courses page
    const contactBrowseCoursesBtns = document.querySelectorAll('[contact-browse-courses-btn]');
    contactBrowseCoursesBtns.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = '../courses/index.html';
        });
    });
    
    // View Templates button - redirect to Templates page
    const contactViewTemplatesBtns = document.querySelectorAll('[contact-view-templates-btn]');
    contactViewTemplatesBtns.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = '../templates/index.html';
        });
    });
    
    // Contact form submission with confirmation notification
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                // Show success notification
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function showUserMenu(name) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (loginBtn) loginBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    if (userName) userName.textContent = name;
    
    // Disable the "Register Now & Get Bonus" button
    disableRegisterNowBonusButton();
}

function hideUserMenu() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (registerBtn) registerBtn.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('hidden');
    
    // Enable the "Register Now & Get Bonus" button
    enableRegisterNowBonusButton();
}

// Function to disable the "Register Now & Get Bonus" button
function disableRegisterNowBonusButton() {
    const registerNowBonusBtn = document.getElementById('registerNowBonusBtn');
    if (registerNowBonusBtn) {
        registerNowBonusBtn.disabled = true;
        registerNowBonusBtn.classList.add('opacity-50', 'cursor-not-allowed');
        registerNowBonusBtn.classList.remove('hover:bg-yellow-300');
        registerNowBonusBtn.textContent = 'Already Registered';
    }
}

// Function to enable the "Register Now & Get Bonus" button
function enableRegisterNowBonusButton() {
    const registerNowBonusBtn = document.getElementById('registerNowBonusBtn');
    if (registerNowBonusBtn) {
        registerNowBonusBtn.disabled = false;
        registerNowBonusBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        registerNowBonusBtn.classList.add('hover:bg-yellow-300');
        registerNowBonusBtn.textContent = 'Register Now & Get Bonus';
    }
}

function addBookNowListeners() {
    // Add event listeners to all "Book Now" buttons
    const bookNowButtons = document.querySelectorAll('[data-book-now]');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('nextuptech_user');
            
            if (!isLoggedIn) {
                // Show login modal
                document.getElementById('loginModal').classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                return;
            }
            
            // Show booking modal
            showBookingModal();
        });
    });
}

function showBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill user data if available
        const user = JSON.parse(localStorage.getItem('nextuptech_user'));
        if (user) {
            document.getElementById('bookingName').value = user.name;
            document.getElementById('bookingEmail').value = user.email;
        }
        
        // Set up calendar with available dates
        setupBookingCalendar();
    }
}

function setupBookingCalendar() {
    const dateInput = document.getElementById('bookingDate');
    if (!dateInput) return;
    
    // Set minimum date to today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    dateInput.min = tomorrow.toISOString().split('T')[0];
    
    // Set maximum date to 30 days from now
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    // Add event listener to validate selected date
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        
        // Disable weekends (Saturday = 6, Sunday = 0)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            this.setCustomValidity('Weekends are not available for booking');
            this.reportValidity();
        } else {
            this.setCustomValidity('');
        }
    });
}

// Booking modal functionality
function initBookingModals() {
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookingData = {
                name: document.getElementById('bookingName').value,
                email: document.getElementById('bookingEmail').value,
                phone: document.getElementById('bookingPhone').value,
                date: document.getElementById('bookingDate').value,
                comments: document.getElementById('bookingComments').value,
                submittedAt: new Date().toISOString()
            };
            
            // Store booking data
            const bookings = JSON.parse(localStorage.getItem('nextuptech_bookings') || '[]');
            bookings.push(bookingData);
            localStorage.setItem('nextuptech_bookings', JSON.stringify(bookings));
            
            // Hide booking modal and show confirmation
            document.getElementById('bookingModal').classList.add('hidden');
            document.getElementById('confirmationModal').classList.remove('hidden');
            
            showNotification('Booking submitted successfully!', 'success');
        });
    }
    
    // Close booking modal
    const closeBookingModal = document.getElementById('closeBookingModal');
    if (closeBookingModal) {
        closeBookingModal.addEventListener('click', function() {
            document.getElementById('bookingModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close confirmation modal
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    if (closeConfirmationModal) {
        closeConfirmationModal.addEventListener('click', function() {
            document.getElementById('confirmationModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
}

// Cookies banner functionality
function initCookiesBanner() {
    const cookiesBanner = document.getElementById('cookiesBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    // Check if cookies have been accepted
    const cookiesAccepted = localStorage.getItem('nextuptech_cookies_accepted');
    
    if (cookiesAccepted === null && cookiesBanner) {
        cookiesBanner.classList.remove('hidden');
    } else if (cookiesAccepted === 'true' && cookiesBanner) {
        cookiesBanner.classList.add('hidden');
    }
    
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('nextuptech_cookies_accepted', 'true');
            cookiesBanner.classList.add('hidden');
            showNotification('Cookies accepted. Thank you!', 'success');
        });
    }
    
    if (declineCookies) {
        declineCookies.addEventListener('click', function() {
            localStorage.setItem('nextuptech_cookies_accepted', 'false');
            cookiesBanner.classList.add('hidden');
            showNotification('Cookies declined. Some features may not work properly.', 'warning');
        });
    }
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card-hover, .feature-icon, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    input.classList.remove('border-gray-300');
                } else {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-gray-300');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set notification type and content
    const typeClasses = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${typeClasses[type] || typeClasses.info}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation' : 'info'}-circle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.classList.add('loading');
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// Additional initialization can be added to the main DOMContentLoaded listener above
