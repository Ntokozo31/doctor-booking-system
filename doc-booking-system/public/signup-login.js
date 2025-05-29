// Enhanced JavaScript with modern features
class DocBookApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupModal();
        this.setupAuth();
        this.setupScrollEffects();
        this.setupAnimations();
    }

    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        const navbar = document.getElementById('navbar');

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && !e.target.classList.contains('btn')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupModal() {
        const modal = document.getElementById('auth-modal');
        const authBtns = document.querySelectorAll('#auth-btn, #book-appointment, #cta-book');
        const closeBtn = document.getElementById('modal-close');

        // Open modal
        authBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    setupAuth() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const showSignupBtn = document.getElementById('show-signup');
        const showLoginBtn = document.getElementById('show-login');

        // Form switching
        showSignupBtn.addEventListener('click', () => {
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });

        showLoginBtn.addEventListener('click', () => {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });

        // Login form submission
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin(e);
        });

        // Signup form submission
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSignup(e);
        });
    }

    async handleLogin(event) {
        const formData = new FormData(event.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        const messageEl = document.getElementById('login-message');
        
        try {
            // Simulate API call
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage(messageEl, data.message || 'Login successful!', 'success');
                // Store token if provided
                if (data.userToken) {
                    localStorage.setItem('token', data.userToken);
                }
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            } else {
                this.showMessage(messageEl, data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage(messageEl, 'Sorry, something went wrong. Please try again.', 'error');
        }
    }

    async handleSignup(event) {
        const formData = new FormData(event.target);
        const signupData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        const messageEl = document.getElementById('signup-message');

        try {
            // Simulate API call
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage(messageEl, data.message || 'Account created successfully!', 'success');
                // Store token if provided
                if (data.userToken) {
                    localStorage.setItem('token', data.userToken);
                }
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            } else {
                this.showMessage(messageEl, data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showMessage(messageEl, 'Sorry, something went wrong. Please try again.', 'error');
        }
    }

    showMessage(element, message, type) {
        element.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            element.innerHTML = '';
        }, 5000);
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.feature-card, .step, .specialty-card, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupAnimations() {
        // Add stagger animation to cards
        const animateCards = (selector, delay = 100) => {
            document.querySelectorAll(selector).forEach((card, index) => {
                card.style.animationDelay = `${index * delay}ms`;
            });
        };

        animateCards('.feature-card');
        animateCards('.specialty-card', 50);
        animateCards('.testimonial-card', 150);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocBookApp();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});