// Timeline JavaScript - Corrigido para funcionar com a estrutura HTML atualizada

let currentSlide = 0;
let track, cards, totalSlides;

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegação dos meses
    handleMonthNav();

    // Inicializar o carrossel que está ativo inicialmente
    const activeMonthCarousel = document.querySelector(".month-carousel.active");
    if (activeMonthCarousel) {
        initializeOrUpdateCarousel(activeMonthCarousel.id);
    }

    // Adicionar listener de redimensionamento
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Atualizar apenas o carrossel ativo no redimensionamento
            const activeCarousel = document.querySelector(".month-carousel.active");
            if (activeCarousel) {
                updateCarouselView(activeCarousel.id);
            }
        }, 250);
    });
});

// Função para lidar com a navegação dos botões de mês
function handleMonthNav() {
    document.querySelectorAll(".timeline-nav .nav-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const month = this.dataset.month;
            if (!month) return;

            // Atualizar estado do botão ativo
            document.querySelectorAll(".timeline-nav .nav-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Mostrar o carrossel do mês selecionado e esconder os outros
            document.querySelectorAll(".month-carousel").forEach(c => c.classList.remove("active"));
            const targetCarousel = document.getElementById(month);
            if (targetCarousel) {
                targetCarousel.classList.add("active");
                // Garantir que o carrossel recém-ativado seja inicializado e atualizado corretamente
                initializeOrUpdateCarousel(month);
            } else {
                console.error("Elemento do carrossel não encontrado para o mês:", month);
            }
        });
    });
}

// Armazenar estado para cada carrossel (índice atual)
const carouselState = {};

// Inicializar ou atualizar um carrossel específico
function initializeOrUpdateCarousel(monthId) {
    const carouselElement = document.getElementById(monthId);
    if (!carouselElement) return;

    // Inicializar estado se não existir
    if (!carouselState[monthId]) {
        carouselState[monthId] = { currentIndex: 0 };
        
        // Anexar event listeners apenas uma vez durante a inicialização
        const prevBtn = carouselElement.querySelector(".carousel-btn.prev");
        const nextBtn = carouselElement.querySelector(".carousel-btn.next");
        
        if (prevBtn) {
            prevBtn.onclick = () => prevSlide(monthId);
        }
        if (nextBtn) {
            nextBtn.onclick = () => nextSlide(monthId);
        }
    }
    
    // Sempre atualizar a visualização do carrossel (posição e estado dos botões)
    updateCarouselView(monthId);
}

// Atualizar o estado visual de um carrossel (posição de rolagem, estado desabilitado do botão)
function updateCarouselView(monthId) {
    const carouselElement = document.getElementById(monthId);
    if (!carouselElement || !carouselState[monthId]) return;

    const track = carouselElement.querySelector(".carousel-track");
    const cards = track ? track.querySelectorAll(".timeline-card") : [];
    const prevBtn = carouselElement.querySelector(".carousel-btn.prev");
    const nextBtn = carouselElement.querySelector(".carousel-btn.next");
    const wrapper = carouselElement.querySelector(".carousel-wrapper");

    // Lidar com casos onde elementos podem estar faltando
    if (!track || !wrapper || cards.length === 0) {
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        if (track) track.style.transform = "translateX(0px)"; // Resetar posição
        return;
    }

    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(track).gap) || 24; // Usar gap padrão
    const scrollWidth = cardWidth + cardMargin;
    const currentIdx = carouselState[monthId].currentIndex;
    const wrapperWidth = wrapper.offsetWidth;

    // Calcular a largura total do conteúdo
    const totalContentWidth = cards.length * scrollWidth - cardMargin;
    const maxScrollOffset = Math.max(0, totalContentWidth - wrapperWidth);
    
    // Calcular o índice máximo que podemos rolar sem mostrar espaço vazio à direita
    const effectiveMaxIndex = maxScrollOffset > 0 ? Math.ceil(maxScrollOffset / scrollWidth) : 0;

    // Limitar o índice atual apenas por precaução
    carouselState[monthId].currentIndex = Math.max(0, Math.min(currentIdx, effectiveMaxIndex));
    const clampedIdx = carouselState[monthId].currentIndex;

    // Calcular o offset de translação
    let offset = -clampedIdx * scrollWidth;
    // Garantir que não rolamos além do final
    offset = Math.max(offset, -maxScrollOffset);

    // Aplicar a translação
    track.style.transform = `translateX(${offset}px)`;

    // Atualizar estados dos botões
    if (prevBtn) {
        prevBtn.disabled = clampedIdx <= 0;
    }
    if (nextBtn) {
        // Desabilitar se estivermos na última posição possível ou se o conteúdo cabe inteiramente
        nextBtn.disabled = clampedIdx >= effectiveMaxIndex || totalContentWidth <= wrapperWidth;
    }
}

// Ir para o próximo slide
function nextSlide(monthId) {
    if (!carouselState[monthId]) return;
    
    // Calcular índice máximo dinamicamente antes de incrementar
    const carouselElement = document.getElementById(monthId);
    if (!carouselElement) return;
    
    const track = carouselElement.querySelector(".carousel-track");
    const cards = track ? track.querySelectorAll(".timeline-card") : [];
    const wrapper = carouselElement.querySelector(".carousel-wrapper");
    if (!track || !wrapper || cards.length === 0) return;
    
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(track).gap) || 24;
    const scrollWidth = cardWidth + cardMargin;
    const totalContentWidth = cards.length * scrollWidth - cardMargin;
    const wrapperWidth = wrapper.offsetWidth;
    const maxScrollOffset = Math.max(0, totalContentWidth - wrapperWidth);
    const effectiveMaxIndex = maxScrollOffset > 0 ? Math.ceil(maxScrollOffset / scrollWidth) : 0;

    if (carouselState[monthId].currentIndex < effectiveMaxIndex) {
        carouselState[monthId].currentIndex++;
        updateCarouselView(monthId);
    }
}

// Ir para o slide anterior
function prevSlide(monthId) {
    if (!carouselState[monthId]) return;

    if (carouselState[monthId].currentIndex > 0) {
        carouselState[monthId].currentIndex--;
        updateCarouselView(monthId);
    }
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    const activeCarousel = document.querySelector(".month-carousel.active");
    if (!activeCarousel) return;
    
    if (e.key === 'ArrowLeft') prevSlide(activeCarousel.id);
    if (e.key === 'ArrowRight') nextSlide(activeCarousel.id);
});

// Suporte a Touch/Swipe
let startX = 0;
let endX = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;
        
        if (Math.abs(difference) > 50) { // Distância mínima de swipe
            const activeCarousel = document.querySelector(".month-carousel.active");
            if (activeCarousel) {
                if (difference > 0) {
                    nextSlide(activeCarousel.id); // Swipe para esquerda - próximo slide
                } else {
                    prevSlide(activeCarousel.id); // Swipe para direita - slide anterior
                }
            }
        }
    });
});


// CÓDIGO COMPLETO PARA TIMELINE - COM PARTÍCULAS DAS CERTIFICAÇÕES
// Substitua todo o conteúdo da tag <script> no timeline.html por este código:

document.addEventListener('DOMContentLoaded', function() {
    // CONFIGURAÇÃO DAS PARTÍCULAS - EXATAMENTE COMO NAS CERTIFICAÇÕES
    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#6366f1",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6366f1",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onclick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    push: {
                        particles_nb: 4,
                    },
                    remove: {
                        particles_nb: 2,
                    },
                },
            },
            retina_detect: true,
        });
    }

    // CURSOR PERSONALIZADO (das certificações)
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    if (cursor && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        document.querySelectorAll("a, button").forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
                cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
            });

            el.addEventListener("mouseleave", () => {
                cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
                cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
            });
        });
    }

    // NAVEGAÇÃO SUAVE (das certificações)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // ANIMAÇÃO DE DIGITAÇÃO
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = "";

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Inicializar animação de digitação
    const typingElement = document.querySelector(".typing-text");
    if (typingElement) {
        typeWriter(typingElement, 'console.log("Minha Timeline!");', 150);
    }

    // NAVBAR SCROLL EFFECT (das certificações)
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.style.background = window.scrollY > 100 
                ? "rgba(10, 10, 10, 0.95)" 
                : "rgba(10, 10, 10, 0.9)";
            navbar.style.backdropFilter = "blur(20px)";
        });
    }

    // MENU MOBILE (das certificações)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // SISTEMA DE CARROSSEL DA TIMELINE
    const carouselStates = {
        janeiro: { currentIndex: 0 },
        marco: { currentIndex: 0 },
        abril: { currentIndex: 0 },
        maio: { currentIndex: 0 },
        junho: { currentIndex: 0 }
    };

    // Navegação dos meses
    document.querySelectorAll(".timeline-nav .nav-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const month = this.dataset.month;
            if (!month) return;

            document.querySelectorAll(".timeline-nav .nav-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            document.querySelectorAll(".month-carousel").forEach(c => c.classList.remove("active"));
            const targetCarousel = document.getElementById(month);
            if (targetCarousel) {
                targetCarousel.classList.add("active");
                updateCarouselView(month);
            }
        });
    });

    // Configurar botões dos carrosséis
    function setupCarouselButtons() {
        Object.keys(carouselStates).forEach(monthId => {
            const prevBtn = document.getElementById(`${monthId}-prev`);
            const nextBtn = document.getElementById(`${monthId}-next`);
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (carouselStates[monthId].currentIndex > 0) {
                        carouselStates[monthId].currentIndex--;
                        updateCarouselView(monthId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    const track = document.getElementById(`${monthId}-track`);
                    const cards = track?.querySelectorAll(".timeline-card");
                    const wrapper = track?.parentElement;
                    
                    if (track && cards && wrapper) {
                        const cardWidth = cards[0].offsetWidth;
                        const gap = 24;
                        const totalWidth = cards.length * (cardWidth + gap) - gap;
                        const wrapperWidth = wrapper.offsetWidth;
                        const maxIndex = Math.max(0, Math.ceil((totalWidth - wrapperWidth) / (cardWidth + gap)));
                        
                        if (carouselStates[monthId].currentIndex < maxIndex) {
                            carouselStates[monthId].currentIndex++;
                            updateCarouselView(monthId);
                        }
                    }
                });
            }
        });
    }

    function updateCarouselView(monthId) {
        const track = document.getElementById(`${monthId}-track`);
        const cards = track?.querySelectorAll(".timeline-card");
        const wrapper = track?.parentElement;
        const prevBtn = document.getElementById(`${monthId}-prev`);
        const nextBtn = document.getElementById(`${monthId}-next`);

        if (!track || !cards || !wrapper) return;

        const cardWidth = cards[0].offsetWidth;
        const gap = 24;
        const currentIndex = carouselStates[monthId].currentIndex;
        const totalWidth = cards.length * (cardWidth + gap) - gap;
        const wrapperWidth = wrapper.offsetWidth;
        const maxIndex = Math.max(0, Math.ceil((totalWidth - wrapperWidth) / (cardWidth + gap)));

        // Aplicar transformação
        const offset = -currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(${offset}px)`;

        // Atualizar estado dos botões
        if (prevBtn) prevBtn.disabled = currentIndex <= 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex || totalWidth <= wrapperWidth;
    }

    // Inicializar carrosséis
    setupCarouselButtons();
    updateCarouselView('janeiro');

    // NAVEGAÇÃO POR TECLADO
    document.addEventListener('keydown', (e) => {
        const activeCarousel = document.querySelector(".month-carousel.active");
        if (!activeCarousel) return;
        
        const monthId = activeCarousel.id;
        if (e.key === 'ArrowLeft' && carouselStates[monthId].currentIndex > 0) {
            carouselStates[monthId].currentIndex--;
            updateCarouselView(monthId);
        }
        if (e.key === 'ArrowRight') {
            const track = document.getElementById(`${monthId}-track`);
            const cards = track?.querySelectorAll(".timeline-card");
            const wrapper = track?.parentElement;
            
            if (track && cards && wrapper) {
                const cardWidth = cards[0].offsetWidth;
                const gap = 24;
                const totalWidth = cards.length * (cardWidth + gap) - gap;
                const wrapperWidth = wrapper.offsetWidth;
                const maxIndex = Math.max(0, Math.ceil((totalWidth - wrapperWidth) / (cardWidth + gap)));
                
                if (carouselStates[monthId].currentIndex < maxIndex) {
                    carouselStates[monthId].currentIndex++;
                    updateCarouselView(monthId);
                }
            }
        }
    });

    // SUPORTE A TOUCH/SWIPE
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;
        
        if (Math.abs(difference) > 50) {
            const activeCarousel = document.querySelector(".month-carousel.active");
            if (activeCarousel) {
                const monthId = activeCarousel.id;
                if (difference > 0) { // Swipe left - next
                    const track = document.getElementById(`${monthId}-track`);
                    const cards = track?.querySelectorAll(".timeline-card");
                    const wrapper = track?.parentElement;
                    
                    if (track && cards && wrapper) {
                        const cardWidth = cards[0].offsetWidth;
                        const gap = 24;
                        const totalWidth = cards.length * (cardWidth + gap) - gap;
                        const wrapperWidth = wrapper.offsetWidth;
                        const maxIndex = Math.max(0, Math.ceil((totalWidth - wrapperWidth) / (cardWidth + gap)));
                        
                        if (carouselStates[monthId].currentIndex < maxIndex) {
                            carouselStates[monthId].currentIndex++;
                            updateCarouselView(monthId);
                        }
                    }
                } else { // Swipe right - prev
                    if (carouselStates[monthId].currentIndex > 0) {
                        carouselStates[monthId].currentIndex--;
                        updateCarouselView(monthId);
                    }
                }
            }
        }
    });

    console.log("🚀 Timeline carregada com sucesso!");
});

// TESTE SIMPLES DAS PARTÍCULAS
// Adicione este código no final do seu timeline.html, antes de </body>

// Versão mais simples para testar
particlesJS('particles-js', {
  particles: {
    number: { value: 80 },
    color: { value: '#6366f1' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#6366f1',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      out_mode: 'out'
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' }
    },
    modes: {
      repulse: { distance: 200 },
      push: { particles_nb: 4 }
    }
  }
});

// Debug
setTimeout(() => {
  const canvas = document.querySelector('#particles-js canvas');
  if (canvas) {
    console.log('✅ Partículas funcionando!');
  } else {
    console.log('❌ Partículas não carregaram');
  }
}, 2000);