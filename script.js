// script.js - Manejo de navegación y modales
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');
    const hamburger = document.querySelector('.hamburger');
    const loginToggle = document.getElementById('login-toggle');
    const cartToggle = document.getElementById('cart-toggle');
    const loginModal = document.getElementById('login-modal');
    const cartModal = document.getElementById('cart-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const notification = document.getElementById('notification');
    const searchInput = document.querySelector('.search-input');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const removeItems = document.querySelectorAll('.remove-item');
    const checkoutBtn = document.querySelector('.cart-actions .btn-primary');
    
    // Estado de la aplicación
    let cart = [
        { id: 1, name: "Urban Weave", price: 349.99, quantity: 1, size: "Mediana", color: "Beige" },
        { id: 4, name: "Minimal Grid", price: 299.99, quantity: 2, size: "Pequeña", color: "Gris" }
    ];
    
    let currentPage = 'inicio';
    
    // Inicialización
    init();
    
    function init() {
        // Cargar la página inicial
        loadPage('inicio');
        
        // Configurar eventos
        setupEventListeners();
        
        // Actualizar carrito
        updateCart();
    }
    
    function setupEventListeners() {
        // Navegación
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.textContent.trim().toLowerCase();
                loadPage(page);
                
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Cerrar menú móvil
                if (window.innerWidth <= 1024) {
                    mainNav.style.display = 'none';
                    hamburger.classList.remove('active');
                }
            });
        });
        
        // Menú móvil
        mobileMenuToggle.addEventListener('click', function() {
            const isVisible = mainNav.style.display === 'flex';
            mainNav.style.display = isVisible ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });
        
        // Modales
        loginToggle.addEventListener('click', () => toggleModal(loginModal));
        cartToggle.addEventListener('click', () => toggleModal(cartModal));
        
        closeModals.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.classList.remove('active');
            });
        });
        
        // Cerrar modales al hacer clic fuera
        [loginModal, cartModal].forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        });
        
        // Login form
        document.querySelector('.login-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Inicio de sesión exitoso');
            loginModal.classList.remove('active');
        });
        
        // Búsqueda
        searchInput?.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                loadPage('tienda');
                showNotification(`Buscando: "${this.value}"`);
                this.value = '';
            }
        });
        
        // Carrito
        setupCartEvents();
    }
    
    function loadPage(page) {
        currentPage = page;
        let pageContent = '';
        
        switch(page) {
            case 'inicio':
                pageContent = getHomePage();
                break;
            case 'tienda':
                pageContent = getShopPage();
                break;
            case 'nosotros':
                pageContent = getAboutPage();
                break;
            case 'contacto':
                pageContent = getContactPage();
                break;
            default:
                pageContent = getHomePage();
        }
        
        mainContent.innerHTML = pageContent;
        
        // Reconfigurar eventos para elementos dinámicos
        if (page === 'inicio' || page === 'tienda') {
            setupProductEvents();
        }
    }
    
    function getHomePage() {
        return `
            <div class="hero-section">
                <div class="container">
                    <div class="hero-container">
                        <div class="hero-content">
                            <h1>Redefine <span>tu espacio</span></h1>
                            <p>Alfombras sostenibles y artesanales para el hogar moderno. Diseños de edición limitada que cuentan una historia.</p>
                            <div class="hero-actions">
                                <a href="shop.html" class="btn btn-primary">Comprar Ahora <i class="fas fa-arrow-right"></i></a>
                                <a href="about.html" class="btn btn-secondary">Nuestra Historia</a>
                            </div>
                            <div class="hero-stats">
                                <div class="hero-stat">
                                    <div class="hero-stat-number">100%</div>
                                    <div class="hero-stat-text">Sostenible</div>
                                </div>
                                <div class="hero-stat">
                                    <div class="hero-stat-number">✓</div>
                                    <div class="hero-stat-text">Hecho a mano</div>
                                </div>
                                <div class="hero-stat">
                                    <div class="hero-stat-number">50+</div>
                                    <div class="hero-stat-text">Diseños</div>
                                </div>
                            </div>
                        </div>
                        <div class="hero-image">
                            <img src="img/6.jpeg" alt="Alfombra moderna en sala de estar">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="stats-section">
                <div class="container">
                    <h2 class="section-title">MOSS & RUG EN NÚMEROS</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number">500+</div>
                            <div class="stat-text">Clientes Satisfechos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">5</div>
                            <div class="stat-text">Años de Experiencia</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">29</div>
                            <div class="stat-text">Diseños Únicos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">100%</div>
                            <div class="stat-text">Materiales Naturales</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bestseller-section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">LOS MÁS VENDIDOS</h2>
                        <a href="shop.html" class="view-all">Ver Todos <i class="fas fa-arrow-right"></i></a>
                    </div>
                    <div class="products-grid">
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/3.jpeg" alt="Alfombra Urban Weave">
                                <div class="product-badge">NUEVO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Urban Weave</h3>
                                <p class="product-description">Diseño geométrico moderno en tonos tierra</p>
                                <div class="product-price">
                                    <div class="price">$349.99</div>
                                    <button class="add-to-cart" data-id="1">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="1">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/4.jpeg" alt="Alfombra Silk Canvas">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Silk Canvas</h3>
                                <p class="product-description">Seda de lujo con diseño minimalista</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$1,199.99</span>
                                        $899.99
                                    </div>
                                    <button class="add-to-cart" data-id="2">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="2">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/5.jpeg" alt="Alfombra Wool Cloud">
                                <div class="product-badge">NUEVO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Wool Cloud</h3>
                                <p class="product-description">Lana ultra suave en paleta neutral</p>
                                <div class="product-price">
                                    <div class="price">$499.99</div>
                                    <button class="add-to-cart" data-id="3">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="3">Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getShopPage() {
        return `
            <div class="shop-header">
                <div class="container">
                    <h1>TIENDA DE ALFOMBRAS</h1>
                    <p>Descubre nuestra colección de alfombras artesanales y sostenibles</p>
                </div>
            </div>
            
            <div class="shop-filters">
                <div class="container">
                    <div class="filters-container">
                        <div class="filter-group">
                            <label for="category-filter">Categoría:</label>
                            <select id="category-filter">
                                <option value="all">Todas</option>
                                <option value="modern">Modernas</option>
                                <option value="traditional">Tradicionales</option>
                                <option value="wool">Lana</option>
                                <option value="silk">Seda</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label for="size-filter">Tamaño:</label>
                            <select id="size-filter">
                                <option value="all">Todos</option>
                                <option value="small">Pequeñas</option>
                                <option value="medium">Medianas</option>
                                <option value="large">Grandes</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label for="sort-filter">Ordenar por:</label>
                            <select id="sort-filter">
                                <option value="featured">Destacados</option>
                                <option value="newest">Más Nuevos</option>
                                <option value="price-low">Precio: Bajo a Alto</option>
                                <option value="price-high">Precio: Alto a Bajo</option>
                                <option value="bestseller">Más Vendidos</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-secondary">Aplicar Filtros</button>
                    </div>
                </div>
            </div>
            
            <div class="shop-grid">
                <div class="container">
                    <div class="products-grid">
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/1.jpeg" alt="Alfombra Urban Weave">
                                <div class="product-badge">NUEVO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Urban Weave</h3>
                                <p class="product-description">Diseño geométrico moderno en tonos tierra</p>
                                <div class="product-price">
                                    <div class="price">$349.99</div>
                                    <button class="add-to-cart" data-id="1">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="1">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/2.jpeg" alt="Alfombra Silk Canvas">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Silk Canvas</h3>
                                <p class="product-description">Seda de lujo con diseño minimalista</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$1,199.99</span>
                                        $899.99
                                    </div>
                                    <button class="add-to-cart" data-id="2">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="2">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/3.jpeg" alt="Alfombra Wool Cloud">
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Wool Cloud</h3>
                                <p class="product-description">Lana ultra suave en paleta neutral</p>
                                <div class="product-price">
                                    <div class="price">$499.99</div>
                                    <button class="add-to-cart" data-id="3">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="3">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/4.jpeg" alt="Alfombra Terracotta Grid">
                                <div class="product-badge">OFERTA</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Terracotta Grid</h3>
                                <p class="product-description">Patrón geométrico en terracota y carbón</p>
                                <div class="product-price">
                                    <div class="price">$429.99</div>
                                    <button class="add-to-cart" data-id="4">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="4">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/5.jpeg" alt="Alfombra Midnight Lines">
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Midnight Lines</h3>
                                <p class="product-description">Diseño lineal en carbón profundo y crema</p>
                                <div class="product-price">
                                    <div class="price">$379.99</div>
                                    <button class="add-to-cart" data-id="5">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="5">Ver Detalles</button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/6.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/7.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/8.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/9.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/10.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/11.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/12.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/13.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/14.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/15.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/16.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/17.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/18.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/19.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/20.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/21.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/22.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/23.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/24.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/25.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/26.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/27.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/28.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">
                                <img src="img/29.jpeg" alt="Alfombra Heritage Wool">
                                <div class="product-badge">MÁS VENDIDO</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">Heritage Wool</h3>
                                <p class="product-description">Patrón tradicional en lana premium</p>
                                <div class="product-price">
                                    <div class="price">
                                        <span class="original-price">$799.99</span>
                                        $649.99
                                    </div>
                                    <button class="add-to-cart" data-id="6">
                                        <i class="fas fa-bag-shopping"></i>
                                    </button>
                                </div>
                                <button class="btn btn-secondary view-details" data-id="6">Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pagination" style="display: flex; justify-content: center; margin-top: 60px; gap: 8px;">
                        <button class="btn btn-secondary active">1</button>
                        <button class="btn btn-secondary">2</button>
                        <button class="btn btn-secondary">3</button>
                        <button class="btn btn-secondary">Siguiente <i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getAboutPage() {
        return `
            <div class="about-hero">
                <div class="container">
                    <div class="about-hero-content">
                        <h1>NUESTRA HISTORIA</h1>
                        <p>Desde 2010, creamos alfombras que combinan diseño contemporáneo con técnicas artesanales tradicionales y sostenibilidad.</p>
                    </div>
                </div>
            </div>
            
            <div class="about-story">
                <div class="container">
                    <div class="story-container">
                        <div class="story-image">
                            <img src="img/logo.jpeg" alt="Proceso artesanal de alfombras">
                        </div>
                        <div class="story-content">
                            <h2>Artesanía con Propósito</h2>
                            <p>Moss & Rug nació de la pasión por crear piezas únicas que transforman espacios mientras honramos técnicas artesanales centenarias.</p>
                            <p>Trabajamos directamente con comunidades de artesanos en Marruecos, India y Perú, asegurando condiciones laborales justas y precios equitativos.</p>
                            <p>Cada alfombra en nuestra colección cuenta una historia - desde las manos que la tejieron hasta el hogar que la acoge.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="about-values">
                <div class="container">
                    <h2 class="section-title">NUESTROS VALORES</h2>
                    <div class="values-grid">
                        <div class="value-card">
                            <div class="value-icon">
                                <i class="fas fa-seedling"></i>
                            </div>
                            <h3>Sostenibilidad</h3>
                            <p>Materiales 100% naturales, producción de cero residuos y envío carbono neutral.</p>
                        </div>
                        
                        <div class="value-card">
                            <div class="value-icon">
                                <i class="fas fa-hand-sparkles"></i>
                            </div>
                            <h3>Hecho a Mano</h3>
                            <p>Cada pieza es creada por artesanos expertos con salarios justos y condiciones seguras.</p>
                        </div>
                        
                        <div class="value-card">
                            <div class="value-icon">
                                <i class="fas fa-palette"></i>
                            </div>
                            <h3>Diseño Innovador</h3>
                            <p>Colaboraciones con diseñadores emergentes que expanden los límites del arte textil.</p>
                        </div>
                        
                        <div class="value-card">
                            <div class="value-icon">
                                <i class="fas fa-heart-circle-check"></i>
                            </div>
                            <h3>Calidad Garantizada</h3>
                            <p>Garantía de por vida en la fabricación de todas nuestras alfombras.</p>
                        </div>
                    </div>
                </div>
            </div>
            
                 `;
    }
    
    function getContactPage() {
        return `
            <div class="contact-hero">
                <div class="container">
                    <h1>CONTÁCTANOS</h1>
                    <p>¿Tienes preguntas sobre nuestras alfombras o necesitas asesoramiento de diseño? Estamos aquí para ayudarte.</p>
                </div>
            </div>
            
            <div class="contact-content">
                <div class="container">
                    <div class="contact-container">
                        <div class="contact-info">
                            <h2>INFORMACIÓN DE CONTACTO</h2>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-location-dot"></i>
                                </div>
                                <div class="info-text">
                                    <h3>VISITA NUESTRO SHOWROOM</h3>
                                    <p>Complejo Turístico Mi Pueblito</p>
                                    <p>Manzana 080814 136338-6, Panama City, Panamá Province</p>
                                                                   </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="info-text">
                                    <h3>LLÁMANOS</h3>
                                    <p>+34 93 123 45 67</p>
                                    <p>Disponible 9am-7pm CET</p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="info-text">
                                    <h3>EMAIL</h3>
                                    <p>hola@mossandrug.com</p>
                                    <p>Respondemos en 24 horas</p>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-comments"></i>
                                </div>
                                <div class="info-text">
                                    <h3>CHAT EN VIVO</h3>
                                    <p>Haz clic en el ícono de chat</p>
                                    <p>Disponible en horario comercial</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contact-form-container">
                            <h2>ENVIANOS UN MENSAJE</h2>
                            <form class="contact-form" id="main-contact-form">
                                <div class="form-group">
                                    <label for="contact-name">NOMBRE COMPLETO *</label>
                                    <input type="text" id="contact-name" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact-email">EMAIL *</label>
                                    <input type="email" id="contact-email" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact-subject">ASUNTO</label>
                                    <input type="text" id="contact-subject">
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact-message">MENSAJE *</label>
                                    <textarea id="contact-message" required placeholder="Cuéntanos sobre tu proyecto o pregunta..."></textarea>
                                </div>
                                
                                <button type="submit" class="btn btn-primary">ENVIAR MENSAJE <i class="fas fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.4003961630915!2d-79.54871967876159!3d8.95489044824669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8b2c74f3ac3%3A0x67eaacd64683ab1e!2sComplejo%20Tur%C3%ADstico%20Mi%20Pueblito!5e1!3m2!1ses!2spa!4v1765475061505!5m2!1ses!2spa" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        `;
    }
    
    function toggleModal(modal) {
        modal.classList.toggle('active');
    }
    
    function showNotification(message) {
        const notificationContent = notification.querySelector('p');
        notificationContent.textContent = message;
        
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    function setupProductEvents() {
        // Botones "Añadir al carrito"
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
        
        // Botones "Ver detalles"
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                showProductDetails(productId);
            });
        });
        
        // Filtros de la tienda
        document.querySelector('.filters-container .btn-secondary')?.addEventListener('click', function() {
            showNotification('Filtros aplicados');
        });
        
        // Formulario de contacto
        document.getElementById('main-contact-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Mensaje enviado. Te contactaremos pronto.');
            this.reset();
        });
    }
    
    function setupCartEvents() {
        // Botones de cantidad en el carrito
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const isIncrease = this.classList.contains('increase');
                const quantityElement = this.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                
                if (isIncrease) {
                    quantity++;
                } else {
                    if (quantity > 1) quantity--;
                }
                
                quantityElement.textContent = quantity;
                updateCartTotal();
            });
        });
        
        // Botones para eliminar productos
        removeItems.forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.cart-item').remove();
                updateCart();
                showNotification('Producto eliminado del carrito');
            });
        });
        
        // Botón de checkout
        checkoutBtn?.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Tu carrito está vacío');
                return;
            }
            cartModal.classList.remove('active');
            showNotification('Redirigiendo al proceso de pago...');
            // Aquí normalmente redirigirías a la página de checkout
        });
    }
    
    function addToCart(productId) {
        // Simular añadir producto al carrito
        const products = {
            1: { name: "Urban Weave", price: 349.99 },
            2: { name: "Silk Canvas", price: 899.99 },
            3: { name: "Wool Cloud", price: 499.99 },
            4: { name: "Terracotta Grid", price: 429.99 },
            5: { name: "Midnight Lines", price: 379.99 },
            6: { name: "Heritage Wool", price: 649.99 }
        };
        
        const product = products[productId];
        if (product) {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
            updateCart();
            showNotification(`${product.name} añadido al carrito`);
        }
    }
    
    function updateCart() {
        // Actualizar contador del carrito
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Actualizar total en modal si está abierto
        updateCartTotal();
    }
    
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            subtotal += price * quantity;
        });
        
        const totalElement = document.querySelector('.cart-summary .total span:last-child');
        const subtotalElement = document.querySelector('.cart-summary .summary-row:first-child span:last-child');
        
        if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    function showProductDetails(productId) {
        showNotification(`Mostrando detalles del producto ${productId}`);
        // Aquí normalmente abrirías un modal con detalles del producto
    }
});