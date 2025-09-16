document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initMobileMenu();
    initHeaderScroll();
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (!name || !phone) {
        showNotification('Будь ласка, заповніть обов\'язкові поля', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showNotification('Будь ласка, введіть коректний номер телефону', 'error');
        return;
    }

    const telegramApiToken = '7965648457:AAGyy8boPO1T_4XmQBqVrgRkEOB3zVx5J3M';
    const chatId = '900891446';
    const telegramMessage = `
        Нова заявка з сайту:
        Ім'я: ${name}
        Телефон: ${phone}
        Повідомлення: ${message || 'Не вказано'}
    `;

    showLoadingState(true);
    
    fetch(`https://api.telegram.org/bot${telegramApiToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        showLoadingState(false);
        if (data.ok) {
            showNotification('Дякуємо за заявку! Ми зв\'яжемося з вами найближчим часом.', 'success');
            e.target.reset();
        } else {
            showNotification('Помилка при відправці заявки. Спробуйте ще раз.', 'error');
        }
    })
    .catch(() => {
        showLoadingState(false);
        showNotification('Помилка при відправці заявки. Спробуйте ще раз.', 'error');
    });
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function showLoadingState(isLoading) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    
    if (submitBtn) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Відправляємо...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Відправити заявку';
            submitBtn.style.opacity = '1';
        }
    }
}

function initScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.category-card, .feature-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(el);
    });
}

function initMobileMenu() {
    if (window.innerWidth <= 768) {
        createMobileMenuButton();
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            createMobileMenuButton();
        } else {
            removeMobileMenuButton();
        }
    });
}

function createMobileMenuButton() {
    const header = document.querySelector('.header');
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 5px;
    `;
    
    navContainer.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = 'var(--dark-bg)';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    });
}

function removeMobileMenuButton() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.remove();
    }
    
    if (navMenu) {
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.width = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
    }
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            header.style.top = '-100px';
        } else {
            header.style.top = '0'; 
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    });
}