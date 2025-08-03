// Variables globales
let isMenuOpen = false;
let activeSection = "home";
let currentSlide = 0;
let slideInterval;
let currentTestimonial = 0;
let testimonialInterval;

// Función para verificar contraseña de administración
function verificarPassword() {
  const modal = document.getElementById("modal-password");
  const passwordInput = document.getElementById("password-input");
  const submitBtn = document.getElementById("password-submit");
  const cancelBtn = document.getElementById("password-cancel");
  const closeBtn = document.getElementById("close-modal-password");
  const errorMsg = document.getElementById("password-error");
  const togglePasswordBtn = document.getElementById("toggle-password");

  // Mostrar modal
  modal.style.display = "flex";
  passwordInput.focus();

  // Limpiar input y errores previos
  passwordInput.value = "";
  errorMsg.style.display = "none";
  
  // Resetear el tipo de input y el icono
  passwordInput.type = "password";
  togglePasswordBtn.className = "fas fa-eye";

  // Función para cerrar modal
  function cerrarModal() {
    modal.style.display = "none";
    passwordInput.value = "";
    errorMsg.style.display = "none";
    // Resetear el toggle de contraseña
    passwordInput.type = "password";
    togglePasswordBtn.className = "fas fa-eye";
  }

  // Función para validar contraseña
  function validarPassword() {
    const contraseña = passwordInput.value;
    
    if (contraseña === "Soluciones2025*") {
      cerrarModal();
      window.location.href = "formato.html";
    } else {
      errorMsg.style.display = "block";
      passwordInput.focus();
      passwordInput.select();
    }
  }

  // Event listeners
  submitBtn.onclick = validarPassword;
  cancelBtn.onclick = cerrarModal;
  closeBtn.onclick = cerrarModal;
  
  // Toggle para mostrar/ocultar contraseña
  togglePasswordBtn.onclick = function() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordBtn.className = "fas fa-eye-slash";
    } else {
      passwordInput.type = "password";
      togglePasswordBtn.className = "fas fa-eye";
    }
  };

  // Permitir Enter para enviar
  passwordInput.onkeypress = function(e) {
    if (e.key === "Enter") {
      validarPassword();
    }
  };

  // Cerrar modal al hacer click fuera
  modal.onclick = function(e) {
    if (e.target === modal) {
      cerrarModal();
    }
  };
}

// Consolidar todos los DOMContentLoaded en uno solo y eliminar funciones no usadas y comentarios de ejemplo
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeScrollEffects();
  initializeContactForm();
  initializeCarousel();
  initializeTestimonialCarousel();
  // Efectos adicionales para iconos interactivos
  const heroIcons = document.querySelectorAll(".icon-circle")
  heroIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Inicializar menú desplegable
  initializeDropdownMenu();

  // Efecto parallax sutil para el hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroContent = document.querySelector(".hero-content")
    const heroIcons = document.querySelector(".hero-icons")

    if (heroContent && heroIcons) {
      heroContent.style.transform = `translateY(${scrolled * 0.1}px)`
      heroIcons.style.transform = `translateY(${scrolled * 0.15}px)`
    }
  })

  // Función para manejar redimensionamiento de ventana
  window.addEventListener("resize", () => {
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth > 768 && isMenuOpen) {
      const mobileMenu = document.getElementById("mobileMenu")
      const menuIcon = document.getElementById("menuIcon")

      isMenuOpen = false
      mobileMenu.classList.remove("active")
      mobileMenu.style.display = "none"
      menuIcon.className = "fas fa-bars"
    }
  })

  // Lazy loading para imágenes (si se agregan)
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
});

// Inicializar navegación
function initializeNavigation() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const menuIcon = document.getElementById("menuIcon")
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  // Toggle menú móvil
  mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen

    if (isMenuOpen) {
      mobileMenu.classList.add("active")
      mobileMenu.style.display = "flex"
      menuIcon.className = "fas fa-times"
    } else {
      mobileMenu.classList.remove("active")
      mobileMenu.style.display = "none"
      menuIcon.className = "fas fa-bars"
    }
  })

  // Manejar clicks en enlaces de navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const sectionId = this.getAttribute("data-section")
      
      // Solo interceptar enlaces internos (que tienen data-section)
      if (sectionId) {
        e.preventDefault()
        scrollToSection(sectionId)
      }

      // Cerrar menú móvil si está abierto
      if (isMenuOpen) {
        isMenuOpen = false
        mobileMenu.classList.remove("active")
        mobileMenu.style.display = "none"
        menuIcon.className = "fas fa-bars"
      }
    })
  })
}

// Inicializar efectos de scroll
function initializeScrollEffects() {
  // Detectar sección activa al hacer scroll
  window.addEventListener("scroll", () => {
    const sections = ["home", "about", "calculadora", "contact"]
    const scrollPosition = window.scrollY + 100

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          updateActiveNavLink(sectionId)
        }
      }
    })
  })

  // Animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stats-container')) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0) scale(1)"
        } else if (entry.target.classList.contains('stat-icon')) {
          entry.target.style.opacity = "0.8"
          entry.target.style.transform = "scale(1) rotate(0deg)"
        } else {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
        
        // Animar números de estadísticas
        if (entry.target.classList.contains('stat-number')) {
          setTimeout(() => animateNumber(entry.target), 500)
        }
      }
    })
  }, observerOptions)

  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll(".card, .benefit-card, .step, .stat-number, .stat-icon, .stats-container")
  animatedElements.forEach((el) => {
    if (el.classList.contains('stats-container')) {
      el.style.opacity = "0"
      el.style.transform = "translateY(50px) scale(0.95)"
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    } else if (el.classList.contains('stat-icon')) {
      el.style.opacity = "0"
      el.style.transform = "scale(0) rotate(-180deg)"
      el.style.transition = "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s"
    } else {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    }
    observer.observe(el)
  })
}

// Animar números de estadísticas
function animateNumber(element) {
  const text = element.textContent
  const hasPlus = text.includes('+')
  const hasHash = text.includes('#')
  const hasKg = text.includes('kg')
  
  let targetNumber = 0
  if (hasHash) {
    targetNumber = 1
  } else {
    targetNumber = parseInt(text.replace(/[^\d]/g, '')) || 0
  }
  
  let current = 0
  const increment = targetNumber / 50
  const duration = 2000
  const stepTime = duration / 50
  
  const timer = setInterval(() => {
    current += increment
    if (current >= targetNumber) {
      current = targetNumber
      clearInterval(timer)
    }
    
    let displayValue = Math.floor(current)
    if (hasHash) {
      element.textContent = `#${displayValue}`
    } else if (hasPlus && hasKg) {
      element.textContent = `+${displayValue} kg`
    } else if (hasPlus) {
      element.textContent = `+${displayValue}`
    } else {
      element.textContent = displayValue
    }
  }, stepTime)
}

// Actualizar enlace activo en navegación
function updateActiveNavLink(sectionId) {
  if (activeSection !== sectionId) {
    activeSection = sectionId

    // Remover clase active de todos los enlaces
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })

    // Agregar clase active al enlace correspondiente
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`)
    if (activeLink && activeLink.classList.contains("nav-link")) {
      activeLink.classList.add("active")
    }
  }
}

// Función para scroll suave a sección
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Ajuste para navbar fija
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Inicializar formulario de contacto
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = contactForm.querySelector('input[placeholder="Tu Nombre"]').value.trim();
    const email = contactForm.querySelector('input[placeholder="Tu Email"]').value.trim();
    const mensaje = contactForm.querySelector('textarea[placeholder="Tu Mensaje"]').value.trim();

    // Construir mensaje para WhatsApp
    const texto = `Hola, mi nombre es ${nombre}. Mi correo es ${email}. ${mensaje}`;
    const numero = "573213342609"; // Número de WhatsApp en formato internacional sin +
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(url, '_blank');
  });
}

// Variables para el carrusel

function initializeCarousel() {
  const indicators = document.querySelectorAll(".indicator");

  // Configurar indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Iniciar carrusel automático
  startAutoSlide();

  // Pausar en hover
  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", stopAutoSlide);
  hero.addEventListener("mouseleave", startAutoSlide);

  // Inicializar posición
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  indicators.forEach((indicator, i) => {
    if (i === currentSlide) indicator.classList.add('active');
    else indicator.classList.remove('active');
  });
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % document.querySelectorAll('.carousel-slide').length;
    updateCarousel();
  }, 5000); // Cambiar cada 5 segundos
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Variables para el carrusel de testimonios

// Inicializar carrusel de testimonios cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initializeTestimonialCarousel()
})

// Inicializar carrusel de testimonios
function initializeTestimonialCarousel() {
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const indicators = document.querySelectorAll(".testimonial-indicator")

  // Configurar indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToTestimonial(index)
    })
  })

  // Inicializar posición inicial
  setTimeout(() => {
    updateTestimonial()
  }, 100)

  // Iniciar carrusel automático
  startAutoTestimonial()

  // Pausar en hover
  const testimonialSection = document.querySelector(".testimonials-carousel")
  if (testimonialSection) {
    testimonialSection.addEventListener("mouseenter", stopAutoTestimonial)
    testimonialSection.addEventListener("mouseleave", startAutoTestimonial)
  }

  // Manejar redimensionamiento de ventana
  window.addEventListener("resize", () => {
    setTimeout(() => {
      updateTestimonial()
    }, 100)
  })
}

// Cambiar testimonio
function changeTestimonial(direction) {
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const totalTestimonials = testimonialCards.length

  currentTestimonial += direction

  // Lógica infinita
  if (currentTestimonial >= totalTestimonials) {
    currentTestimonial = 0
  } else if (currentTestimonial < 0) {
    currentTestimonial = totalTestimonials - 1
  }

  updateTestimonial()
}

// Ir a testimonio específico
function goToTestimonial(testimonialIndex) {
  currentTestimonial = testimonialIndex
  updateTestimonial()
}

// Actualizar testimonio activo
function updateTestimonial() {
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const indicators = document.querySelectorAll(".testimonial-indicator");
  const track = document.querySelector(".testimonials-track");
  const total = indicators.length; // número real de testimonios

  // Cálculo circular
  const prev = (currentTestimonial - 1 + total) % total;
  const curr = currentTestimonial % total;
  const next = (currentTestimonial + 1) % total;

  testimonialCards.forEach((card) => {
    const idx = parseInt(card.getAttribute("data-index"));
    if (idx === prev || idx === curr || idx === next) {
      card.style.display = "block";
      if (idx === curr) {
        card.classList.add("active");
        card.style.transform = "scale(1.1)";
        card.style.opacity = "1";
        card.style.zIndex = "2";
      } else {
        card.classList.remove("active");
        card.style.transform = "scale(0.9)";
        card.style.opacity = "0.7";
        card.style.zIndex = "1";
      }
    } else {
      card.style.display = "none";
    }
  });

  // Actualizar indicadores
  indicators.forEach((indicator, i) => {
    if (i === curr) indicator.classList.add("active");
    else indicator.classList.remove("active");
  });

  // Centrar el testimonio activo
  const cardWidth = testimonialCards[0].offsetWidth + 32;
  const containerWidth = track.parentElement.offsetWidth;
  const centerOffset = (containerWidth - cardWidth) / 2;
  const activeCard = document.querySelector(`.testimonial-card[data-index="${curr}"]`);
  const activeCardIndex = Array.from(testimonialCards).indexOf(activeCard);
  const targetOffset = -(activeCardIndex * cardWidth) + centerOffset;
  track.style.transform = `translateX(${targetOffset}px)`;
}

// Iniciar carrusel automático de testimonios
function startAutoTestimonial() {
  testimonialInterval = setInterval(() => {
    changeTestimonial(1)
  }, 6000) // Cambiar cada 6 segundos
}

// Detener carrusel automático de testimonios
function stopAutoTestimonial() {
  clearInterval(testimonialInterval)
}

// Modal para Aparato de intercambio de temperatura

document.addEventListener('DOMContentLoaded', function() {
  // Abrir modal al seleccionar la opción de temperatura
  const radioTemp = document.querySelector('input[name="componente"][value="comp1"]');
  const modalTemp = document.getElementById('modal-temperatura');
  const closeModalTemp = document.getElementById('close-modal-temperatura');

  if (radioTemp && modalTemp && closeModalTemp) {
    radioTemp.addEventListener('change', function() {
      if (this.checked) {
        modalTemp.style.display = 'flex';
      }
    });
    closeModalTemp.addEventListener('click', function() {
      modalTemp.style.display = 'none';
    });
    // Cerrar modal al hacer click fuera del contenido
    modalTemp.addEventListener('click', function(e) {
      if (e.target === modalTemp) {
        modalTemp.style.display = 'none';
      }
    });
  }
});

// Modal para Monitores (superficie superior a 100 cm)
document.addEventListener('DOMContentLoaded', function() {
  // Abrir modal al seleccionar la opción de monitores
  const radioMon = document.querySelector('input[name="componente"][value="comp2"]');
  const modalMon = document.getElementById('modal-monitores');
  const closeModalMon = document.getElementById('close-modal-monitores');

  if (radioMon && modalMon && closeModalMon) {
    radioMon.addEventListener('change', function() {
      if (this.checked) {
        modalMon.style.display = 'flex';
      }
    });
    closeModalMon.addEventListener('click', function() {
      modalMon.style.display = 'none';
    });
    // Cerrar modal al hacer click fuera del contenido
    modalMon.addEventListener('click', function(e) {
      if (e.target === modalMon) {
        modalMon.style.display = 'none';
      }
    });
  }
});

// Modal para Lámparas
// Modal para Grandes Aparatos
// Modal para Pequeños Aparatos
// Modal para Aparatos de Informática y/o Telecomunicaciones
document.addEventListener('DOMContentLoaded', function() {
  // Lámparas
  const radioLamp = document.querySelector('input[name="componente"][value="comp3"]');
  const modalLamp = document.getElementById('modal-lamparas');
  const closeModalLamp = document.getElementById('close-modal-lamparas');
  if (radioLamp && modalLamp && closeModalLamp) {
    radioLamp.addEventListener('change', function() {
      if (this.checked) modalLamp.style.display = 'flex';
    });
    closeModalLamp.addEventListener('click', function() {
      modalLamp.style.display = 'none';
    });
    modalLamp.addEventListener('click', function(e) {
      if (e.target === modalLamp) modalLamp.style.display = 'none';
    });
  }

  // Grandes Aparatos
  const radioGrandes = document.querySelector('input[name="componente"][value="comp4"]');
  const modalGrandes = document.getElementById('modal-grandes');
  const closeModalGrandes = document.getElementById('close-modal-grandes');
  if (radioGrandes && modalGrandes && closeModalGrandes) {
    radioGrandes.addEventListener('change', function() {
      if (this.checked) modalGrandes.style.display = 'flex';
    });
    closeModalGrandes.addEventListener('click', function() {
      modalGrandes.style.display = 'none';
    });
    modalGrandes.addEventListener('click', function(e) {
      if (e.target === modalGrandes) modalGrandes.style.display = 'none';
    });
  }

  // Pequeños Aparatos
  const radioPeq = document.querySelector('input[name="componente"][value="comp5"]');
  const modalPeq = document.getElementById('modal-pequenos');
  const closeModalPeq = document.getElementById('close-modal-pequenos');
  if (radioPeq && modalPeq && closeModalPeq) {
    radioPeq.addEventListener('change', function() {
      if (this.checked) modalPeq.style.display = 'flex';
    });
    closeModalPeq.addEventListener('click', function() {
      modalPeq.style.display = 'none';
    });
    modalPeq.addEventListener('click', function(e) {
      if (e.target === modalPeq) modalPeq.style.display = 'none';
    });
  }

  // Aparatos de Informática
  const radioInfo = document.querySelector('input[name="componente"][value="comp6"]');
  const modalInfo = document.getElementById('modal-informatica');
  const closeModalInfo = document.getElementById('close-modal-informatica');
  if (radioInfo && modalInfo && closeModalInfo) {
    radioInfo.addEventListener('change', function() {
      if (this.checked) modalInfo.style.display = 'flex';
    });
    closeModalInfo.addEventListener('click', function() {
      modalInfo.style.display = 'none';
    });
    modalInfo.addEventListener('click', function(e) {
      if (e.target === modalInfo) modalInfo.style.display = 'none';
    });
  }
});

// Modularización del manejo de modales de la calculadora
function setupCalculadoraModal(radioValue, modalId, closeId) {
  const radio = document.querySelector(`input[name="componente"][value="${radioValue}"]`);
  const modal = document.getElementById(modalId);
  const closeModal = document.getElementById(closeId);
  if (radio && modal && closeModal) {
    radio.addEventListener('change', function() {
      if (this.checked) modal.style.display = 'flex';
    });
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setupCalculadoraModal('comp1', 'modal-temperatura', 'close-modal-temperatura');
  setupCalculadoraModal('comp2', 'modal-monitores', 'close-modal-monitores');
  setupCalculadoraModal('comp3', 'modal-lamparas', 'close-modal-lamparas');
  setupCalculadoraModal('comp4', 'modal-grandes', 'close-modal-grandes');
  setupCalculadoraModal('comp5', 'modal-pequenos', 'close-modal-pequenos');
  setupCalculadoraModal('comp6', 'modal-informatica', 'close-modal-informatica');
});

// Referencia global al gráfico para poder actualizarlo
let graficoPastelChart = null;

window.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('graficoPastel');

  if (ctx) {
    graficoPastelChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Fabricación nueva', 'Restauración'],
        datasets: [{
          data: [500, 100], // Valor inicial de ejemplo
          backgroundColor: [
            'rgba(65, 95, 38, 0.8)', // #415F26 - Verde oscuro
            'rgba(107, 142, 35, 0.8)'  // #6B8E23 - Verde claro
          ],
          borderColor: [
            'rgba(65, 95, 38, 1)', // #415F26
            'rgba(107, 142, 35, 1)'  // #6B8E23
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: false
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  document.querySelectorAll('.modal-select-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const li = e.target.closest('li');
      if (!li) return;
      let subtipo = li.textContent.replace('Seleccionar', '').trim().toLowerCase();
      // Normalizar para que coincida con las claves del objeto
      if (subtipo.includes('aire acondicionado')) subtipo = 'aire acondicionado doméstico';
      if (subtipo.includes('nevera')) subtipo = 'nevera mediana';
      if (subtipo.includes('calefactor')) subtipo = 'calefactor eléctrico sencillo';
      if (subtipo.includes('monitor') && subtipo.includes('24')) subtipo = 'monitor (≥ 24")';
      if (subtipo.includes('pantalla')) subtipo = 'pantalla (40” – 55”)';
      if (subtipo.includes('industrial') || subtipo.includes('superficie')) subtipo = 'aparato de superficie > 100 cm² (industrial / comercial)';
      if (subtipo.includes('bombillo')) subtipo = 'bombillo led o cfl (doméstico)';
      if (subtipo.includes('lámpara')) subtipo = 'lámpara grande (industrial / vial)';
      if (subtipo.includes('linterna')) subtipo = 'linterna (manual / recargable)';
      if (subtipo.includes('herramienta')) subtipo = 'herramienta eléctrica pequeña (taladros, lijadoras)';
      if (subtipo.includes('mando') || subtipo.includes('controles')) subtipo = 'mando a distancia / controles pequeños';
      if (subtipo.includes('aparato pequeño')) subtipo = 'aparato pequeño (< 50 cm, electrónico)';
      if (subtipo.includes('computador')) subtipo = 'computadores (portátiles / torre)';
      if (subtipo.includes('red')) subtipo = 'equipos de red (routers, switches, módems)';
      if (subtipo.includes('servidores')) subtipo = 'servidores y telecomunicaciones grandes';
      const datos = obtenerDatosGrafico(subtipo);
      if (graficoPastelChart) {
        graficoPastelChart.data.datasets[0].data = [datos.fabricacion, datos.restauracion];
        graficoPastelChart.reset();
        graficoPastelChart.update();
      }
      // Mostrar resultado debajo de la gráfica
      const resultadoDiv = document.getElementById('co2-resultado');
      if (resultadoDiv) {
        resultadoDiv.innerHTML = `
          <div style="font-size:2rem;font-weight:bold;color:#415F26">
            ${datos.fabricacion} kg CO2 <span style="font-size:1.2rem;color:#6B8E23;">Nueva</span>
          </div>
          <div style="font-size:2rem;font-weight:bold;color:#6B8E23">
            ${datos.restauracion} kg CO2 <span style="font-size:1.2rem;color:#415F26;">Restaurada</span>
          </div>
        `;
      }
      // Cerrar todos los modales abiertos
      document.querySelectorAll('.modal').forEach(modal => {
        if (getComputedStyle(modal).display !== 'none') {
          modal.style.display = 'none';
        }
      });
      // Deseleccionar el radio button activo en la calculadora
      const checkedRadio = document.querySelector('.calculadora-lista input[type="radio"]:checked');
      if (checkedRadio) {
        checkedRadio.checked = false;
      }
    });
  });
});

// Información base de CO2 para cada sublistado (promedios)
const datosAparatos = {
  // Aparato de intercambio de temperatura
  "aire acondicionado doméstico": { fabricacion: 500, restauracion: 100 },
  "nevera mediana": { fabricacion: 400, restauracion: 80 },
  "calefactor eléctrico sencillo": { fabricacion: 200, restauracion: 40 },
  // Monitores (superficie superior a 100 cm)
  'monitor (≥ 24")': { fabricacion: 200, restauracion: 50 },
  'pantalla (40” – 55”)': { fabricacion: 450, restauracion: 100 },
  'aparato de superficie > 100 cm² (industrial / comercial)': { fabricacion: 850, restauracion: 190 },
  // Lámparas
  'bombillo led o cfl (doméstico)': { fabricacion: 10, restauracion: 3 },
  'lámpara grande (industrial / vial)': { fabricacion: 140, restauracion: 32.5 },
  'linterna (manual / recargable)': { fabricacion: 35, restauracion: 10 },
  // Pequeños aparatos
  'herramienta eléctrica pequeña (taladros, lijadoras)': { fabricacion: 100, restauracion: 25 },
  'mando a distancia / controles pequeños': { fabricacion: 12.5, restauracion: 4.5 },
  'aparato pequeño (< 50 cm, electrónico)': { fabricacion: 50, restauracion: 15 },
  // Aparatos de informática y/o telecomunicaciones
  'computadores (portátiles / torre)': { fabricacion: 350, restauracion: 90 },
  'equipos de red (routers, switches, módems)': { fabricacion: 60, restauracion: 17.5 },
  'servidores y telecomunicaciones grandes': { fabricacion: 900, restauracion: 215 },
  // Grandes aparatos
  'lavadora doméstica': { fabricacion: 300, restauracion: 60 },
  'equipo de audio (towers, amplificadores)': { fabricacion: 120, restauracion: 30 },
  'aparato grande (> 50 cm, múltiples materiales)': { fabricacion: 600, restauracion: 150 }
};

// Función para obtener los datos del gráfico pastel según el sublistado seleccionado
function obtenerDatosGrafico(subtipo) {
  const info = datosAparatos[subtipo.toLowerCase()];
  if (!info) return { fabricacion: 0, restauracion: 0 };
  return {
    fabricacion: info.fabricacion,
    restauracion: info.restauracion
  };
}

// Ejemplo de uso:
// const datos = obtenerDatosGrafico('aire acondicionado doméstico');
// datos.ahorro -> 77.5
// datos.noAhorro -> 22.5

// Modal de información de la calculadora
document.addEventListener('DOMContentLoaded', function() {
  const infoBtn = document.getElementById('info-calculadora-btn');
  const infoModal = document.getElementById('modal-info-calculadora');
  const closeInfoModal = document.getElementById('close-modal-info-calculadora');

  if (infoBtn && infoModal && closeInfoModal) {
    infoBtn.onclick = function() {
      infoModal.style.display = 'flex'; // Cambiado de 'block' a 'flex' para centrar
    };
    closeInfoModal.onclick = function() {
      infoModal.style.display = 'none';
    };
    window.addEventListener('click', function(event) {
      if (event.target === infoModal) {
        infoModal.style.display = 'none';
      }
    });
  }
});

// Carrusel de testimonios cíclico real
(function() {
  const carousel = document.getElementById('testimony-cards-carousel');
  const leftBtn = document.getElementById('testimony-arrow-left');
  const rightBtn = document.getElementById('testimony-arrow-right');
  if (!carousel) return;
  const cards = Array.from(carousel.children);
  let current = 0;
  let intervalId = null;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function getVisibleCards() {
    return isMobile() ? 1 : 3;
  }

  function getCardWidth() {
    const card = cards[0];
    const width = card.getBoundingClientRect().width;
    const gap = isMobile() ? 20 : 40; // Gap menor en móvil
    return width + gap;
  }

  function updateCarousel(animate = true) {
    const cardWidth = getCardWidth();
    const visibleCards = getVisibleCards();
    
    carousel.style.transition = animate ? 'transform 0.5s cubic-bezier(.77,0,.18,1)' : 'none';
    carousel.style.transform = `translateX(-${current * cardWidth}px)`;
    
    // Asegurar que siempre inicie desde la primera tarjeta
    if (current < 0) current = 0;
    if (current >= cards.length - visibleCards + 1) current = cards.length - visibleCards;
    
    // Deshabilita flechas si está al inicio o final
    if (leftBtn) leftBtn.disabled = current === 0;
    if (rightBtn) rightBtn.disabled = current >= cards.length - visibleCards;
  }

  function next() {
    const visibleCards = getVisibleCards();
    if (current < cards.length - visibleCards) {
      current++;
      updateCarousel();
    }
  }

  function prev() {
    if (current > 0) {
      current--;
      updateCarousel();
    }
  }

  if (rightBtn) rightBtn.onclick = next;
  if (leftBtn) leftBtn.onclick = prev;

  function startAuto() {
    intervalId = setInterval(() => {
      const visibleCards = getVisibleCards();
      if (current < cards.length - visibleCards) {
        next();
      } else {
        // Si llega al final, regresa automáticamente al inicio
        current = 0;
        updateCarousel();
      }
    }, 4000);
  }
  
  function stopAuto() {
    clearInterval(intervalId);
  }
  
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  
  window.addEventListener('resize', () => {
    // Reiniciar el carrusel cuando cambia el tamaño de pantalla
    current = 0;
    setTimeout(() => updateCarousel(false), 100);
  });

  // Inicializa posición - asegurar que siempre inicie desde la primera tarjeta
  current = 0;
  setTimeout(() => {
    updateCarousel(false);
    startAuto();
  }, 100);
})();

// === Modal de Noticia Ampliada ===
document.addEventListener('DOMContentLoaded', function() {
  const noticiasGrid = document.querySelector('.noticias-grid');
  if (!noticiasGrid) return;

  noticiasGrid.addEventListener('click', function(e) {
    const card = e.target.closest('.noticia-card');
    if (!card) return;

    // Extraer datos de la tarjeta
    const imagenDiv = card.querySelector('.noticia-imagen');
    const titulo = card.querySelector('.noticia-titulo');

    // Obtener la URL de la imagen desde el background-image
    const backgroundImage = window.getComputedStyle(imagenDiv).backgroundImage;
    const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');

    // Determinar qué noticia es basándose en las clases y contenido
    let noticiaTipo = '';
    let textoEjemplo = '';
    let tituloModal = '';
    
    if (card.classList.contains('ANLA-card')) {
      noticiaTipo = 'ANLA';
      tituloModal = titulo ? titulo.textContent : 'Autoridad Nacional de Licencias Ambientales';
      textoEjemplo = 'La ANLA es la autoridad ambiental nacional que evalúa y otorga licencias ambientales para proyectos, obras o actividades que puedan causar daños al medio ambiente. Trabajamos en conjunto con la ANLA para garantizar el cumplimiento de todas las normativas ambientales en nuestros procesos de gestión de RAEE.';
    } else if (card.classList.contains('cormacarena-card')) {
      noticiaTipo = 'cormacarena';
      tituloModal = titulo ? titulo.textContent : 'Corporación Autónoma Regional del Meta';
      textoEjemplo = 'CORMACARENA es la autoridad ambiental del departamento del Meta, encargada de la protección y conservación de los recursos naturales. Colaboramos estrechamente con CORMACARENA para asegurar que nuestras actividades de reciclaje y disposición de RAEE cumplan con los estándares ambientales regionales.';
    } else if (card.classList.contains('resolucion-card')) {
      noticiaTipo = 'resolucion';
      tituloModal = titulo ? titulo.textContent : 'Resoluciones Ambientales';
      textoEjemplo = 'Las resoluciones ambientales establecen los lineamientos y procedimientos para la gestión integral de residuos sólidos, incluyendo los RAEE. Nuestros procesos están alineados con las resoluciones vigentes para garantizar una gestión ambientalmente responsable.';
    } else {
      noticiaTipo = 'default';
      tituloModal = titulo ? titulo.textContent : 'Noticia';
      textoEjemplo = 'Esta es una noticia destacada sobre nuestras actividades en gestión ambiental y reciclaje de RAEE. Contáctanos para más información sobre nuestros servicios profesionales.';
    }

    // Crear overlay y modal
    const overlay = document.createElement('div');
    overlay.className = 'noticia-modal-overlay';
    overlay.innerHTML = `
      <div class="noticia-modal">
        <button class="noticia-modal-close" title="Cerrar">&times;</button>
        <div class="noticia-modal-imagen ${noticiaTipo}-type" style="background-image: url('${imageUrl}')"></div>
        <div class="noticia-modal-contenido">
          <h2 class="noticia-modal-titulo">${tituloModal}</h2>
          <div class="noticia-modal-texto" style="margin-top:1.5em; color:#444; font-size:1.1em; line-height:1.7;">${textoEjemplo}</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    console.log('Modal creado y agregado al DOM');
    
    // Cerrar al hacer click fuera o en el botón de cerrar
    overlay.addEventListener('click', function(ev) {
      if (ev.target === overlay || ev.target.classList.contains('noticia-modal-close')) {
        overlay.remove();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function escListener(ev) {
      if (ev.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', escListener);
      }
    });
  });
});

// Animación de entrada para las noticias base con Intersection Observer
function animarNoticiasScrollReveal() {
  const noticias = document.querySelectorAll('.noticia');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadein');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Aparece cuando la mitad de la tarjeta está visible
  });
  noticias.forEach(noticia => {
    observer.observe(noticia);
  });
}
document.addEventListener('DOMContentLoaded', animarNoticiasScrollReveal);

// === Carrusel de Aliados ===
function initializeAliadosCarousel() {
  const carruselTrack = document.querySelector('.carrusel-track');
  if (!carruselTrack) return;

  let currentSlide = 0;
  const slides = carruselTrack.querySelectorAll('.carrusel-slide');
  const totalSlides = slides.length;
  let interval;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    const translateX = -currentSlide * 100;
    carruselTrack.style.transform = `translateX(${translateX}%)`;
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 2500); // Cambia cada 0.5 segundos
  }

  function stopAutoSlide() {
    if (interval) {
      clearInterval(interval);
    }
  }

  // Pausar el carrusel cuando el mouse está sobre él
  const carruselContainer = document.querySelector('.aliados-carrusel');
  if (carruselContainer) {
    carruselContainer.addEventListener('mouseenter', stopAutoSlide);
    carruselContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Iniciar el carrusel automático
  startAutoSlide();
}

// Inicializar el carrusel de aliados cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeAliadosCarousel);

// Inicializar menú desplegable
function initializeDropdownMenu() {
  const dropdownBtn = document.getElementById("dropdownMenuBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  let isDropdownOpen = false;

  // Toggle menú desplegable
  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    
    if (isDropdownOpen) {
      dropdownMenu.classList.add("active");
    } else {
      dropdownMenu.classList.remove("active");
    }
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !dropdownBtn.contains(e.target)) {
      isDropdownOpen = false;
      dropdownMenu.classList.remove("active");
    }
  });

  // Cerrar menú al presionar Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isDropdownOpen) {
      isDropdownOpen = false;
      dropdownMenu.classList.remove("active");
    }
  });
}

// Función para cambiar imágenes de la noticia "¿Qué puedes traer?"
function initializeQuePuedesTraerImageRotation() {
  // Buscar la noticia por ID
  const img = document.getElementById('noticia-cambiante');
  
  if (img) {
    const imagenes = [
      'imagenes/noticias/noticia2.jpg',
      'imagenes/noticias/noticia2.1.jpg'
    ];
    let currentIndex = 0;
    
    console.log('Iniciando rotación de imágenes para la noticia cambiante');
    
    // Cambiar imagen cada 3 segundos
    setInterval(() => {
      currentIndex = (currentIndex + 1) % imagenes.length;
      img.src = imagenes[currentIndex];
      console.log('Cambiando a imagen:', imagenes[currentIndex]);
    }, 3000);
  } else {
    console.log('No se encontró la imagen con ID noticia-cambiante');
  }
}

// Inicializar la rotación de imágenes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeQuePuedesTraerImageRotation);