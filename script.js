// ===== TELEGRAM BOT CONFIGURATION =====
const BOT_TOKEN = "8233490739:AAG7iLvbECdJekX-g20IY1wSqbuH9275DNs";
const CHAT_ID = "7973433557";

// ===== LANGUAGE SYSTEM =====
let currentLang = 'ru';

// ===== EXPANDABLE HERO ITEMS =====
document.addEventListener('DOMContentLoaded', function() {
    const expandableItems = document.querySelectorAll('.expandable-item');
    
    expandableItems.forEach(item => {
        item.addEventListener('click', function() {
            const expandId = this.getAttribute('data-expand');
            const expandContent = document.getElementById(`expand-${expandId}`);
            const allExpands = document.querySelectorAll('.expand-content');
            const allItems = document.querySelectorAll('.expandable-item');
            
            // Закрываем все другие
            allExpands.forEach(content => {
                if (content.id !== `expand-${expandId}`) {
                    content.classList.remove('active');
                }
            });
            
            allItems.forEach(li => {
                if (li !== this) {
                    li.classList.remove('active');
                }
            });
            
            // Переключаем текущий
            expandContent.classList.toggle('active');
            this.classList.toggle('active');
            
            // Плавный скролл к раскрытому контенту
            if (expandContent.classList.contains('active')) {
                setTimeout(() => {
                    expandContent.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    });
    
    // Остальная инициализация
    initScrollProgress();
    initAnimations();
    initMobileMenu();
    initCounters();
    
    // Проверяем сохраненный язык
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    setLanguage(savedLang);
});

// Функция установки языка
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем весь текст на странице
    updatePageLanguage(lang);
}

// Добавляем обработчики на кнопки языков
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

// ===== MAP FUNCTIONS =====
function openMap(mapType) {
    const lat = '41.2232151';
    const lng = '69.1408283';
    
    let url = '';
    
    if (mapType === 'yandex') {
        // Открыть в Яндекс.Картах
        url = `https://yandex.ru/maps/?pt=${lng},${lat}&z=16&l=map`;
    } else if (mapType === 'google') {
        // Открыть в Google Maps
        url = `https://www.google.com/maps?q=${lat},${lng}`;
    }
    
    if (url) {
        window.open(url, '_blank');
    }
}

// Функция обновления текста на странице
function updatePageLanguage(lang) {
    const elements = document.querySelectorAll('.lang-text');
    
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            // Проверяем, является ли элемент input или textarea
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    window.addEventListener('scroll', function() {
        const scrollProgress = document.getElementById('scroll-progress');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
        
        // Header scroll effect
        const header = document.querySelector('header');
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с классом animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('#mainNav a').forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== MODAL FUNCTIONS =====
function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Сбрасываем форму и показываем форму заново
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('successMessage').classList.remove('active');
    document.getElementById('modalForm').reset();
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// ===== TELEGRAM INTEGRATION =====
async function sendToTelegram(name, phone, source, comment = '') {
    const translations = {
        ru: {
            newRequest: '🆕 НОВАЯ ЗАЯВКА!',
            source: 'Источник',
            name: 'Имя',
            phone: 'Телефон',
            comment: 'Комментарий',
            time: 'Время'
        },
        en: {
            newRequest: '🆕 NEW REQUEST!',
            source: 'Source',
            name: 'Name',
            phone: 'Phone',
            comment: 'Comment',
            time: 'Time'
        },
        uz: {
            newRequest: '🆕 YANGI SO\'ROV!',
            source: 'Manba',
            name: 'Ism',
            phone: 'Telefon',
            comment: 'Izoh',
            time: 'Vaqt'
        }
    };
    
    const t = translations[currentLang];
    const commentText = comment ? `\n${t.comment}: ${comment}` : '';
    const text = `${t.newRequest}\n\n${t.source}: ${source}\n${t.name}: ${name}\n${t.phone}: ${phone}${commentText}\n${t.time}: ${new Date().toLocaleString('ru-RU')}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                chat_id: CHAT_ID, 
                text: text,
                parse_mode: "HTML" 
            })
        });
        
        const data = await response.json();
        return data.ok === true;
    } catch (error) {
        console.error("Telegram error:", error);
        return false;
    }
}

// ===== FORM SUBMISSION =====
const modalForm = document.getElementById("modalForm");
if (modalForm) {
    modalForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const name = document.getElementById("modalName").value.trim();
        const phone = document.getElementById("modalPhone").value.trim();
        const comment = document.getElementById("modalComment").value.trim();
        
        // Валидация
        if (!name || !phone) {
            const errorMessages = {
                ru: 'Пожалуйста, заполните имя и телефон',
                en: 'Please fill in name and phone',
                uz: 'Iltimos, ism va telefonni to\'ldiring'
            };
            alert(errorMessages[currentLang]);
            return;
        }
        
        // Показываем индикатор загрузки
        const submitBtn = modalForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        const loadingTexts = {
            ru: 'Отправка...',
            en: 'Sending...',
            uz: 'Yuborilmoqda...'
        };
        submitBtn.textContent = loadingTexts[currentLang];
        submitBtn.disabled = true;
        
        // Отправляем в Telegram
        const sourceTexts = {
            ru: 'Модальное окно',
            en: 'Modal Window',
            uz: 'Modal oyna'
        };
        const success = await sendToTelegram(name, phone, sourceTexts[currentLang], comment);
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (success) {
            // Показываем сообщение об успехе
            document.getElementById("formSection").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("successMessage").classList.add("active");
            modalForm.reset();
        } else {
            const errorMessages = {
                ru: '❌ Ошибка отправки. Попробуйте позже или свяжитесь с нами напрямую.',
                en: '❌ Sending error. Try later or contact us directly.',
                uz: '❌ Yuborishda xato. Keyinroq urinib ko\'ring yoki biz bilan to\'g\'ridan-to\'g\'ri bog\'laning.'
            };
            alert(errorMessages[currentLang]);
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FLOATING PARTICLES ANIMATION =====
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = hero.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    // Создаем дополнительные плавающие частицы
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Добавляем CSS для анимации частиц
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(10px, -20px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-10px, -40px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(15px, -20px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Инициализируем частицы после загрузки страницы
window.addEventListener('load', createFloatingParticles);

// ===== PHONE NUMBER FORMATTER =====
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Если начинается не с 998, добавляем
        if (value.length > 0 && !value.startsWith('998')) {
            value = '998' + value;
        }
        
        // Форматируем: +998 XX XXX XX XX
        if (value.length >= 3) {
            value = '+' + value.slice(0, 3) + ' ' + value.slice(3);
        }
        if (value.length >= 7) {
            value = value.slice(0, 7) + ' ' + value.slice(7);
        }
        if (value.length >= 11) {
            value = value.slice(0, 11) + ' ' + value.slice(11);
        }
        if (value.length >= 14) {
            value = value.slice(0, 14) + ' ' + value.slice(14, 16);
        }
        
        e.target.value = value;
    });
    
    // Устанавливаем начальное значение
    if (!input.value) {
        input.value = '+998 ';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Ленивая загрузка изображений
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== FORM VALIDATION =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const name = form.querySelector('input[type="text"]');
    const phone = form.querySelector('input[type="tel"]');
    
    let isValid = true;
    
    // Проверка имени
    if (name && name.value.trim().length < 2) {
        isValid = false;
        name.style.borderColor = 'red';
    } else if (name) {
        name.style.borderColor = '';
    }
    
    // Проверка телефона
    if (phone && phone.value.replace(/\D/g, '').length < 12) {
        isValid = false;
        phone.style.borderColor = 'red';
    } else if (phone) {
        phone.style.borderColor = '';
    }
    
    return isValid;
}

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 MoyDeklarant.uz', 'color: #8B0000; font-size: 24px; font-weight: bold;');
console.log('%c💼 Ваш надежный таможенный партнер', 'color: #FFD700; font-size: 16px;');
console.log('%c📞 Контакты:', 'color: #8B0000; font-size: 14px; font-weight: bold;');
console.log('%cTelegram: @umid70_03', 'color: #0088cc; font-size: 12px;');
console.log('%cInstagram: @s.u.j_', 'color: #C837AB; font-size: 12px;');
console.log('%cТелефон: +998 97 243 49 57', 'color: #FFD700; font-size: 12px;');

// ===== ERROR TRACKING =====
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});