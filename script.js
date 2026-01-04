/* =====================================================
   LUTHER PORTFOLIO - Dark Creepy Joker Theme JS
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNavigation();
    initScrollProgress();
    initScrollReveal();
    initSkillBars();
    initProjectFilter();
    initTypedText();
    initDiscordCopy();
    initSmoothScroll();
    initParallax();
    initGlitchEffect();
    initScrollIndicator();
    initProjectModal();
});

/* =====================================================
   LOADER - Cartas em Leque
   ===================================================== */

function initLoader() {
    const loader = document.querySelector('.loader');
    
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
        // Dar tempo para animação das cartas
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 3500);
    });
    
    // Fallback
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }, 6000);
}

/* =====================================================
   CURSOR PERSONALIZADO - Estilo Cruz/Estrela
   ===================================================== */

function initCursor() {
    // Verificar se é mobile/touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }
    
    const cursor = document.querySelector('.cursor-card');
    const trail = document.querySelector('.cursor-trail');
    
    if (!cursor || !trail) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    // Ativar cursor
    setTimeout(() => {
        cursor.classList.add('active');
        trail.classList.add('active');
    }, 100);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor principal - mais responsivo
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Trail - segue mais devagar
        trailX += (mouseX - trailX) * 0.08;
        trailY += (mouseY - trailY) * 0.08;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .tool-item, .detail-item, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide on leave window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trail.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        trail.style.opacity = '1';
    });
}

/* =====================================================
   NAVEGAÇÃO
   ===================================================== */

function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* =====================================================
   SCROLL PROGRESS
   ===================================================== */

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* =====================================================
   SCROLL REVEAL
   ===================================================== */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skill-category, .project-card, .discord-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

/* =====================================================
   SKILL BARS
   ===================================================== */

function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress');
                
                setTimeout(() => {
                    progressBar.style.width = skillLevel + '%';
                }, 200);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => skillObserver.observe(item));
}

/* =====================================================
   PROJECT FILTER
   ===================================================== */

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

/* =====================================================
   TYPED TEXT
   ===================================================== */

function initTypedText() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const phrases = [
        'Criando experiências sombrias...',
        'Dominando o código...',
        'The wild card always wins...',
        'Where darkness meets creation...',
        'Front-end & Back-end...'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause no final
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1500);
}

/* =====================================================
   DISCORD COPY
   ===================================================== */

function initDiscordCopy() {
    const copyBtn = document.getElementById('copyBtn');
    const username = document.getElementById('discordUsername');
    
    if (!copyBtn || !username) return;
    
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(username.textContent);
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = username.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        }
    });
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   PARALLAX
   ===================================================== */

function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    const floatCards = document.querySelectorAll('.float-card');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = index === 0 ? 0.3 : 0.2;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        floatCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/* =====================================================
   GLITCH EFFECT - Para título
   ===================================================== */

function initGlitchEffect() {
    const titleChars = document.querySelectorAll('.title-char');
    
    titleChars.forEach(char => {
        char.addEventListener('mouseenter', () => {
            char.style.animation = 'glitchChar 0.3s ease';
            setTimeout(() => {
                char.style.animation = '';
            }, 300);
        });
    });
    
    // Add glitch keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitchChar {
            0% { transform: translateY(-15px) scale(1.1); color: var(--color-blood); }
            25% { transform: translateY(-15px) translateX(-3px) scale(1.1); }
            50% { transform: translateY(-15px) translateX(3px) scale(1.1); }
            75% { transform: translateY(-15px) translateX(-3px) scale(1.1); }
            100% { transform: translateY(-15px) scale(1.1); color: var(--color-blood); }
        }
    `;
    document.head.appendChild(style);
}

/* =====================================================
   RANDOM CARD SYMBOL ROTATION
   ===================================================== */

// Função extra para adicionar interatividade aos símbolos de carta
document.querySelectorAll('.link-card, .filter-card, .detail-icon').forEach(el => {
    el.addEventListener('click', () => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = 'cardSpin 0.5s ease';
    });
});

// Add card spin keyframes
const cardSpinStyle = document.createElement('style');
cardSpinStyle.textContent = `
    @keyframes cardSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.3); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(cardSpinStyle);

/* =====================================================
   SCROLL INDICATOR - Esconde ao rolar
   ===================================================== */

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Esconde quando rolar mais de 100px
        if (currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

/* =====================================================
   PROJECT MODAL - Painel de preview dos projetos
   ===================================================== */

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalLoading = document.getElementById('modalLoading');
    const projectIframe = document.getElementById('projectIframe');
    const openExternal = document.getElementById('openExternal');
    const closeModal = document.getElementById('closeModal');
    const projectLinks = document.querySelectorAll('.project-link[data-project]');
    
    if (!modal) return;
    
    // Abrir modal ao clicar em "Ver Projeto"
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectUrl = link.dataset.project;
            const projectTitle = link.dataset.title;
            
            // Atualizar título e link externo
            modalTitle.textContent = projectTitle;
            openExternal.href = projectUrl;
            
            // Mostrar loading
            modalLoading.classList.remove('hidden');
            
            // Carregar iframe
            projectIframe.src = projectUrl;
            
            // Quando iframe carregar, esconder loading
            projectIframe.onload = () => {
                modalLoading.classList.add('hidden');
            };
            
            // Abrir modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modal
    function closeProjectModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Limpar iframe após animação
        setTimeout(() => {
            projectIframe.src = '';
        }, 300);
    }
    
    closeModal.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', closeProjectModal);
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}
