// Duplicate ticker content for seamless loop
document.addEventListener('DOMContentLoaded', function() {
    const tickerContent = document.querySelector('.ticker-content');
    const tickerItems = tickerContent.innerHTML;
    tickerContent.innerHTML = tickerItems + tickerItems + tickerItems;
    
    
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.top-buyers-section, .features-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Add parallax effect to featured image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const featuredImage = document.querySelector('.featured-image');
    if (featuredImage) {
        featuredImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});








// ===== HERO SLIDER AUTOMÁTICO =====
const slides = document.querySelectorAll(".hero-slider .slide");
let currentSlide = 0;
const slideInterval = 6000;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, slideInterval);
}









// ===============================
// MODAL COMPRA
// ===============================

// Abrir modal
document.querySelector(".btn-primary").addEventListener("click", () => {
    document.getElementById("modalCompra").style.display = "flex";
});

// Cerrar modal
document.getElementById("cerrarModal").addEventListener("click", () => {
    document.getElementById("modalCompra").style.display = "none";
});

// ===============================
// CONTADOR FIX
// ===============================

// Variables principales
let cantidad = 1;
let precio = 1.5;
let promoAplicado = false;
let selectedMethod = "";

// Actualizar total + actualizar contador en pantalla
function actualizarTotal() {
    const total = cantidad * precio;
    document.getElementById("totalMonto").innerText = `$${total.toFixed(2)}`;

    // 🔥 ACTUALIZA EL NÚMERO EN LA INTERFAZ
    const counterLabel = document.getElementById("ticketCantidad");
    if (counterLabel) counterLabel.innerText = cantidad;
}

// Botón +
document.getElementById("btnMas").addEventListener("click", () => {
    cantidad++;
    actualizarTotal();
});

// Botón -
document.getElementById("btnMenos").addEventListener("click", () => {
    if (cantidad > 1) {
        cantidad--;
        actualizarTotal();
    }
});

// Botones rápidos
document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        cantidad = parseInt(btn.innerText);
        actualizarTotal();
    });
});

// Inicialización
actualizarTotal();








const codigosPromo = {
    "Erikarockxy": 1,  // precio por ticket
    "Yanis": 1        // <-- aquí agregas tu nuevo código
};


// Aplicar código promocional
document.getElementById("aplicarPromo").onclick = () => {
    const code = document.getElementById("promoCode").value.trim();

    if (promoAplicado) {
        document.getElementById("promoMsg").innerText = "Ya utilizaste un código.";
        return;
    }

    if (codigosPromo[code] !== undefined) {
        precio = codigosPromo[code];
        promoAplicado = true;
        document.getElementById("promoMsg").innerText = "Código aplicado correctamente.";
        actualizarTotal();
    } else {
        document.getElementById("promoMsg").innerText = "Código inválido.";
    }
};


// PASOS
document.getElementById("next1").onclick = () => {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
};

document.getElementById("next2").onclick = () => {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
};

// ===============================
// INFO BANCARIA POR MÉTODO
// ===============================
const paymentData = {
    "pago movil": `
        <h3>Pago Móvil</h3>
        <p><strong>Banco:</strong> Banco de Venezuela</p>
        <p><strong>Teléfono:</strong> 04242708903</p>
        <p><strong>Cédula:</strong> V-11055128</p>
    `,

    "paypal": `
        <h3>PayPal</h3>
        <p><strong>Correo:</strong> jeinnermarin28@gmail.com</p>
    `,

    "binance": `
        <h3>Binance</h3>
        <p><strong>Correo:</strong> Jeinnermarin28@gmail.com</p>
    `,

    "zinli": `
        <h3>Zinli</h3>
        <p><strong>Correo:</strong> invstarshop28@gmail.com</p>
    `,

    "zelle": `
        <h3>Zelle</h3>
        <p><strong>Nombre:</strong> Anisa Cova</p>
        <p><strong>Correo:</strong> Anicova805@gmail.com</p>
    `
};

// ===============================
// MOSTRAR INFO SEGÚN MÉTODO
// ===============================
const botonesPago = document.querySelectorAll(".pago-btn");
const paymentInfoBox = document.getElementById("paymentInfo");
const tasaCambio = 320; // 1 USD = 320 VES

botonesPago.forEach(btn => {
    btn.addEventListener("click", () => {

        botonesPago.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        selectedMethod = btn.dataset.method;

        const totalUSD = cantidad * precio;
        let contenido = "";

        if(selectedMethod === "pago-movil") {
            const totalVES = totalUSD * tasaCambio;
            contenido = `
                <h3>Pago Móvil</h3>
                <p><strong>Monto a pagar:</strong> ${totalVES.toFixed(2)} VES</p>
                <p><strong>Banco:</strong> Banco de Venezuela</p>
                <p><strong>Teléfono:</strong> 04242708903</p>
                <p><strong>Cédula:</strong> V-11055128</p>
            `;
        } else if(selectedMethod === "paypal") {
            contenido = `
                <h3>PayPal</h3>
                <p><strong>Monto a pagar:</strong> $${totalUSD.toFixed(2)}</p>
                <p><strong>Correo:</strong> Jeinnermarin28@gmail.com</p>
            `;
        } else if(selectedMethod === "binance") {
            contenido = `
                <h3>Binance</h3>
                <p><strong>Monto a pagar:</strong> $${totalUSD.toFixed(2)}</p>
                <p><strong>Correo:</strong> Jeinnermarin28@gmail.com</p>
            `;
        } else if(selectedMethod === "zinli") {
            contenido = `
                <h3>Zinli</h3>
                <p><strong>Monto a pagar:</strong> $${totalUSD.toFixed(2)}</p>
                <p><strong>Correo:</strong> invstarshop28@gmail.com</p>
            `;
        } else if(selectedMethod === "zelle") {
            contenido = `
                <h3>Zelle</h3>
                <p><strong>Monto a pagar:</strong> $${totalUSD.toFixed(2)}</p>
                <p><strong>Nombre:</strong> Anisa Cova</p>
                <p><strong>Correo:</strong> Anicova805@gmail.com</p>
            `;
        } else {
            contenido = `<p>Método no disponible</p>`;
        }

        paymentInfoBox.style.display = "block";
        paymentInfoBox.innerHTML = contenido;
    });
});


// ===============================
// FINALIZAR COMPRA → WhatsApp
// ===============================
document.getElementById("finalizarCompra").onclick = () => {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const referencia = document.getElementById("referencia").value;

    const total = (cantidad * precio).toFixed(2);

    const promoTxt = promoAplicado ? "Sí, código: Erikarockxy" : "No";

    const mensaje = `
*Nuevo pedido - Rifa Navideña Inv Starshop*
Nombre: ${nombre}
Telefono: ${telefono}
Correo: ${correo}

Cantidad de tickets: ${cantidad}
Método de pago: ${selectedMethod}
Total pagado: $${total}
Referencia bancaria: ${referencia}

Código promocional utilizado: ${promoTxt}
    `;

    const url = `https://wa.me/584124303809?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
};

// ===============================
// MODAL DETALLES
// ===============================
const btnDetalles = document.querySelector(".btn-secondary");
const modalDetalles = document.getElementById("modalDetalles");
const closeDetalles = document.querySelector(".close-detalles");

// Abrir modal
btnDetalles.addEventListener("click", () => {
    modalDetalles.style.display = "block";
});

// Cerrar con X
closeDetalles.addEventListener("click", () => {
    modalDetalles.style.display = "none";
});

// Cerrar tocando fuera
window.addEventListener("click", (e) => {
    if (e.target === modalDetalles) {
        modalDetalles.style.display = "none";
    }
});























// ===== Carrusel Div 1 =====
const carouselTrack = document.querySelector(".carousel-track");
const sslides = Array.from(carouselTrack.children);
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
}

// Botones manuales
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

// Deslizamiento automático
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 10000); // cada 4 segundos

