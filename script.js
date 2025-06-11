// Import particlesJS library
const particlesJS = window.particlesJS;

// Configuração das partículas
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

// Cursor personalizado - versão corrigida
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

if (cursor && cursorFollower) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Efeito de hover nos links
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
      cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
      cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });
  });
}

// Navegação suave
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

// Animação de digitação
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

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Observer unificado para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const unifiedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-on-scroll");

      // Animar contadores na seção about
      if (entry.target.classList.contains("about")) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
        });
      }
      
      // Animações de skills
      if (entry.target.classList.contains("skills-section")) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    }
  });
}, observerOptions);

// Observar elementos
document.querySelectorAll("section, .skill-category").forEach(el => {
  unifiedObserver.observe(el);
});

// Skills Chart Data - Atualizado para suas categorias
const skillsData = {
  combinan: [
    { name: "Node.js", level: 90, color: "#5B7FFF" },
    { name: "Express.js", level: 85, color: "#8B5FFF" },
    { name: "MySQL", level: 80, color: "#FF6B9D" },
    { name: "MongoDB", level: 75, color: "#5FBAFF" },
    { name: "REST APIs", level: 88, color: "#FF8A5B" },
    { name: "JSON", level: 85, color: "#6366f1" }
  ],
  per: [
    { name: "UI/UX Design", level: 85, color: "#5B7FFF" },
    { name: "Figma", level: 80, color: "#8B5FFF" },
    { name: "Prototipagem", level: 75, color: "#FF6B9D" },
    { name: "Design Thinking", level: 70, color: "#5FBAFF" },
    { name: "Adobe XD", level: 65, color: "#FF8A5B" },
    { name: "User Research", level: 80, color: "#6366f1" },
    { name: "Wireframing", level: 75, color: "#5B7FFF" }
  ],
  frontend: [
    { name: "React", level: 90, color: "#5B7FFF" },
    { name: "JavaScript ES6+", level: 85, color: "#8B5FFF" },
    { name: "HTML5", level: 80, color: "#FF6B9D" },
    { name: "CSS3", level: 75, color: "#5FBAFF" },
    { name: "React Hooks", level: 85, color: "#FF8A5B" }
  ]
};

let currentChartType = "horizontal";

// Função para desenhar gráfico de barras horizontais
function drawHorizontalBarChart(category) {
  const canvas = document.getElementById("skillsChart");
  if (!canvas) {
    console.error("Canvas não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");
  const skills = skillsData[category] || [];
  
  // Restante do código permanece igual...
}

// Função para desenhar gráfico donut
function drawDonutChart(category) {
  const canvas = document.getElementById("skillsChart");
  if (!canvas) {
    console.error("Canvas não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");
  const skills = skillsData[category] || [];
  
  // Restante do código permanece igual...
}

// Função principal para desenhar o gráfico
function drawSkillsChart(category) {
  if (currentChartType === "horizontal") {
    drawHorizontalBarChart(category);
  } else {
    drawDonutChart(category);
  }
}

// Sistema de filtro de skills
function initSkillsFilter() {
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category) => {
    category.addEventListener("click", () => {
      skillCategories.forEach(cat => cat.classList.remove("active"));
      category.classList.add("active");
      drawSkillsChart(category.dataset.category);
    });
  });

  // Botão para alternar tipo de gráfico
  const toggleButton = document.querySelector(".chart-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      currentChartType = currentChartType === "horizontal" ? "donut" : "horizontal";
      const activeCategory = document.querySelector(".skill-category.active");
      if (activeCategory) {
        drawSkillsChart(activeCategory.dataset.category);
      }
    });
  }

  // Desenhar gráfico inicial
  drawSkillsChart("combinan");
}

// Carousel de Projetos
let currentSlide = 0;
let autoPlayInterval;

function initCarousel() {
  const slides = document.querySelectorAll(".project-slide");
  const totalSlides = slides.length;
  const track = document.getElementById("carouselTrack");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carouselContainer = document.querySelector(".projects-carousel");

  function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(${-currentSlide * 100}%)`;
    indicators.forEach((ind, i) => ind.classList.toggle("active", i === currentSlide));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      currentSlide = i;
      updateCarousel();
    });
  });

  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);
  }

  // Iniciar autoplay
  startAutoPlay();
  updateCarousel();
}

// Função debounce para otimização
function debounce(func, wait = 10) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", debounce(() => {
    navbar.style.background = window.scrollY > 100 
      ? "rgba(10, 10, 10, 0.95)" 
      : "rgba(10, 10, 10, 0.9)";
    navbar.style.backdropFilter = "blur(20px)";
  }));
}

// Menu mobile
function initMobileMenu() {
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
}

// Efeito parallax otimizado
function initParallax() {
  let lastScroll = 0;
  window.addEventListener("scroll", debounce(() => {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 5) {
      const parallax = document.querySelector(".hero");
      if (parallax) {
        parallax.style.transform = `translateY(${currentScroll * 0.5}px)`;
      }
      lastScroll = currentScroll;
    }
  }));
}

// Lazy loading para imagens
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Animação de elementos ao aparecer
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(".project-card, .contact-card, .certification-card");
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    animateObserver.observe(el);
  });
}

// Inicialização principal
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar animação de digitação
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    typeWriter(typingElement, 'console.log("Hello World!");', 150);
  }

  // Inicializar componentes
  initSkillsFilter();
  initCarousel();
  initNavbarScroll();
  initMobileMenu();
  initParallax();
  initLazyLoading();
  initScrollAnimations();

  console.log("🚀 Portfolio carregado com sucesso!");
});

// Performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    console.log("🎯 Otimizações de performance aplicadas!");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Configuração do Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  // Observer para elementos que aparecem na tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Animação sequencial dos cards de habilidades
  const skillCards = document.querySelectorAll(".habilidade-categoria")
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
    observer.observe(card)
  })

  // Animação das ferramentas
  const toolCards = document.querySelectorAll(".ferramenta-item")
  toolCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Observer para títulos
  const sectionTitle = document.querySelector(".habilidades-title")
  const toolsTitle = document.querySelector(".ferramentas-title")
  const contactSection = document.querySelector(".contato-section")

  observer.observe(sectionTitle)
  observer.observe(toolsTitle)
  observer.observe(contactSection)

  // Efeitos hover nos itens de habilidades
  const skillItems = document.querySelectorAll(".habilidade-item")
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"
      this.style.background = "rgba(139, 92, 246, 0.15)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
      this.style.background = "transparent"
    })
  })

  // Animação extra das formas geométricas no background das ferramentas
  const shapes = document.querySelectorAll(".shape, .floating-circle, .floating-triangle")

  // Adicionar movimento aleatório às formas
  shapes.forEach((shape, index) => {
    const randomDelay = Math.random() * 2
    const randomDuration = 4 + Math.random() * 4

    shape.style.animationDelay = `${randomDelay}s`
    shape.style.animationDuration = `${randomDuration}s`

    // Movimento adicional no hover da seção de ferramentas
    const ferramentasSection = document.querySelector(".ferramentas-section")

    ferramentasSection.addEventListener("mouseenter", () => {
      shape.style.animationPlayState = "running"
      shape.style.transform += " scale(1.1)"
    })

    ferramentasSection.addEventListener("mouseleave", () => {
      shape.style.transform = shape.style.transform.replace(" scale(1.1)", "")
    })
  })

  // Efeito parallax nas formas do background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const ferramentasSection = document.querySelector(".ferramentas-section")
    const rect = ferramentasSection.getBoundingClientRect()

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      shapes.forEach((shape, index) => {
        const speed = 0.1 + (index % 3) * 0.05
        const yPos = scrolled * speed
        shape.style.transform += ` translateY(${yPos}px)`
      })
    }
  })

  // Efeito de clique nos cards
  const allCards = [...skillCards, ...toolCards]
  allCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Navegação por teclado para acessibilidade
  allCards.forEach((card, index) => {
    card.setAttribute("tabindex", "0")

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }

      if (e.key === "ArrowRight" && index < allCards.length - 1) {
        allCards[index + 1].focus()
      }

      if (e.key === "ArrowLeft" && index > 0) {
        allCards[index - 1].focus()
      }
    })
  })

  // Animação dos links de contato
  const contactLinks = document.querySelectorAll(".contato-link")
  contactLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px) scale(1)"
    })
  })

  // Log para debug
  console.log(`✅ Seção de habilidades carregada com sucesso!`)
  console.log(`📊 Total de habilidades: ${skillItems.length}`)
  console.log(`🛠️ Total de ferramentas: ${toolCards.length}`)
  console.log(`🎨 Formas animadas: ${shapes.length}`)

  // Adicionar classe de carregamento completo
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 500)
})

// JavaScript adicional para animações (opcional)

document.addEventListener("DOMContentLoaded", () => {
  // Animação de entrada dos cards
  const cards = document.querySelectorAll(".habilidade-categoria")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 200)
      }
    })
  })

  // Inicializar animação
  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })

  // Efeito hover nos itens
  const items = document.querySelectorAll(".habilidade-item")
  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
  })
})


document.addEventListener("DOMContentLoaded", () => {
  // Configuração do Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  // Observer para elementos que aparecem na tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Animação sequencial dos cards de habilidades
  const skillCards = document.querySelectorAll(".habilidade-categoria")
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
    observer.observe(card)
  })

  // Animação das ferramentas
  const toolCards = document.querySelectorAll(".ferramenta-item")
  toolCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Observer para títulos
  const sectionTitle = document.querySelector(".habilidades-title")
  const toolsTitle = document.querySelector(".ferramentas-title")
  const contactSection = document.querySelector(".contato-section")

  observer.observe(sectionTitle)
  observer.observe(toolsTitle)
  observer.observe(contactSection)

  // Efeitos hover nos itens de habilidades
  const skillItems = document.querySelectorAll(".habilidade-item")
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"
      this.style.background = "rgba(139, 92, 246, 0.15)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
      this.style.background = "transparent"
    })
  })

  // Efeito parallax nos pontos de fundo
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const dots = document.querySelectorAll(".dot")

    dots.forEach((dot, index) => {
      const speed = 0.5 + index * 0.1
      dot.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Controle das formas geométricas
  const shapes = document.querySelectorAll(".shape")

  // Função para reiniciar animação das formas quando saem da tela
  function resetShapeAnimation(shape) {
    shape.style.animationPlayState = "paused"
    setTimeout(() => {
      shape.style.animationPlayState = "running"
    }, Math.random() * 5000) // Delay aleatório para variar
  }

  // Observar quando as formas saem da tela para reiniciar
  shapes.forEach((shape) => {
    const shapeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Quando a forma sai da tela, programa para reiniciar
          setTimeout(() => {
            resetShapeAnimation(entry.target)
          }, 1000)
        }
      })
    })

    shapeObserver.observe(shape)
  })

  // Efeito de clique nos cards
  const allCards = [...skillCards, ...toolCards]
  allCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Navegação por teclado para acessibilidade
  allCards.forEach((card, index) => {
    card.setAttribute("tabindex", "0")

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }

      if (e.key === "ArrowRight" && index < allCards.length - 1) {
        allCards[index + 1].focus()
      }

      if (e.key === "ArrowLeft" && index > 0) {
        allCards[index - 1].focus()
      }
    })
  })

  // Animação do badge de contato
  const infoBadge = document.querySelector(".info-badge")
  if (infoBadge) {
    infoBadge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    infoBadge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px) scale(1)"
    })
  }

  // Função para criar formas dinâmicas (opcional)
  function createRandomShape() {
    const shapeTypes = ["hexagon", "triangle", "circle", "square", "diamond"]
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
    const randomSide = Math.random() > 0.5 ? "left" : "right"
    const randomTop = Math.random() * 80 + 10 // Entre 10% e 90%

    const newShape = document.createElement("div")
    newShape.className = `shape ${randomType} dynamic-shape`
    newShape.style.top = `${randomTop}%`

    if (randomSide === "left") {
      newShape.style.left = "-100px"
      newShape.style.animation = `moveRight ${20 + Math.random() * 15}s linear infinite`
    } else {
      newShape.style.right = "-100px"
      newShape.style.animation = `moveLeft ${20 + Math.random() * 15}s linear infinite`
    }

    document.querySelector(".geometric-shapes").appendChild(newShape)

    // Remove a forma após a animação
    setTimeout(() => {
      if (newShape.parentNode) {
        newShape.parentNode.removeChild(newShape)
      }
    }, 35000)
  }

  // Criar formas dinâmicas ocasionalmente (opcional)
  setInterval(createRandomShape, 15000) // A cada 15 segundos

  // Log para debug
  console.log(`✅ Seção de habilidades carregada com sucesso!`)
  console.log(`📊 Total de habilidades: ${skillItems.length}`)
  console.log(`🛠️ Total de ferramentas: ${toolCards.length}`)
  console.log(`🎨 Formas geométricas: ${shapes.length}`)

  // Adicionar classe de carregamento completo
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 500)

  // Função para destacar categoria ao passar o mouse
  skillCards.forEach((card) => {
    const items = card.querySelectorAll(".habilidade-item")

    card.addEventListener("mouseenter", () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = "translateX(5px)"
          item.style.background = "rgba(139, 92, 246, 0.05)"
        }, index * 50)
      })
    })

    card.addEventListener("mouseleave", () => {
      items.forEach((item) => {
        item.style.transform = "translateX(0)"
        item.style.background = "transparent"
      })
    })
  })

  // Adicionar smooth scroll
  document.documentElement.style.scrollBehavior = "smooth"
})

document.addEventListener("DOMContentLoaded", () => {
  // Sistema de partículas igual ao da capa
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  // Configurar canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = document.querySelector(".habilidades-section").offsetHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Configurações das partículas
  const particles = []
  const particleCount = 80
  const maxDistance = 120

  // Classe Particle
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 2 + 1
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1

      // Keep particles within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x))
      this.y = Math.max(0, Math.min(canvas.height, this.y))
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = "#8b5cf6"
      ctx.fill()
    }
  }

  // Criar partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Função para desenhar linhas entre partículas próximas
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.3})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }
  }

  // Loop de animação
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Atualizar e desenhar partículas
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Desenhar conexões
    drawConnections()

    requestAnimationFrame(animate)
  }

  // Iniciar animação
  animate()

  // Configuração do Intersection Observer para animações dos cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Animação sequencial dos cards de habilidades
  const skillCards = document.querySelectorAll(".habilidade-categoria")
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
    observer.observe(card)
  })

  // Animação das ferramentas
  const toolCards = document.querySelectorAll(".ferramenta-item")
  toolCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Observer para títulos
  const sectionTitle = document.querySelector(".habilidades-title")
  const toolsTitle = document.querySelector(".ferramentas-title")
  const contactSection = document.querySelector(".contato-section")

  observer.observe(sectionTitle)
  observer.observe(toolsTitle)
  observer.observe(contactSection)

  // Efeitos hover nos itens de habilidades
  const skillItems = document.querySelectorAll(".habilidade-item")
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"
      this.style.background = "rgba(139, 92, 246, 0.15)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
      this.style.background = "transparent"
    })
  })

  // Efeito de clique nos cards
  const allCards = [...skillCards, ...toolCards]
  allCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Navegação por teclado para acessibilidade
  allCards.forEach((card, index) => {
    card.setAttribute("tabindex", "0")

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }

      if (e.key === "ArrowRight" && index < allCards.length - 1) {
        allCards[index + 1].focus()
      }

      if (e.key === "ArrowLeft" && index > 0) {
        allCards[index - 1].focus()
      }
    })
  })

  // Animação do badge de contato
  const infoBadge = document.querySelector(".info-badge")
  if (infoBadge) {
    infoBadge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    infoBadge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px) scale(1)"
    })
  }

  // Interação do mouse com as partículas
  const mouse = { x: 0, y: 0 }

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top

    // Adicionar partículas próximas ao mouse
    particles.forEach((particle) => {
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        particle.vx += dx * 0.0001
        particle.vy += dy * 0.0001
      }
    })
  })

  // Log para debug
  console.log(`✅ Seção de habilidades com partículas carregada!`)
  console.log(`🎨 Partículas ativas: ${particles.length}`)
  console.log(`📊 Total de habilidades: ${skillItems.length}`)
  console.log(`🛠️ Total de ferramentas: ${toolCards.length}`)

  // Adicionar classe de carregamento completo
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 500)

  // Função para destacar categoria ao passar o mouse
  skillCards.forEach((card) => {
    const items = card.querySelectorAll(".habilidade-item")

    card.addEventListener("mouseenter", () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = "translateX(5px)"
          item.style.background = "rgba(139, 92, 246, 0.05)"
        }, index * 50)
      })
    })

    card.addEventListener("mouseleave", () => {
      items.forEach((item) => {
        item.style.transform = "translateX(0)"
        item.style.background = "transparent"
      })
    })
  })

  // Adicionar smooth scroll
  document.documentElement.style.scrollBehavior = "smooth"

  // Redimensionar canvas quando a seção muda de tamanho
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
  })

  resizeObserver.observe(document.querySelector(".habilidades-section"))
})
