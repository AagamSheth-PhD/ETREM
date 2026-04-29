// --- ETREM main.js – Complete Working Version ---

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. CONFIGURATION & SENSITIVE DATA ---

    const firebaseConfig = {
        apiKey: "AIzaSyARW03lQ6nTvoUvLmVlrkTwcuW3TLV7pUk",
        authDomain: "etrem-a3c78.firebaseapp.com",
        projectId: "etrem-a3c78",
        storageBucket: "etrem-a3c78.firebasestorage.app",
        messagingSenderId: "231377942781",
        appId: "1:231377942781:web:f1e3e42bc927c5fe236694",
        databaseURL: "https://etrem-a3c78-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

    const RAZORPAY_KEY_ID = "rzp_live_SeyxOn5i0PuGaO";
    const EMAILJS_SERVICE_ID = "service_r7f83sg";
    const EMAILJS_TEMPLATE_ID = "template_jlyjy5i";
    const EMAILJS_PUBLIC_KEY = "M2IU4HlY2wh4L6Fc0";
    // ⬇️ Google Apps Script deployed Web App URL
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyikqOUPBPz11d_JMN2qWoO_XiuCdd3oxAveJ65all5pZXFpUoOScmB1F0Phj6DhZDvbQ/exec";

    // Initialize Firebase
    let auth, db;
    try {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            if (typeof firebase.database === 'function') {
                db = firebase.database();
            }
        } else {
            console.warn("Firebase SDK not loaded. Auth and database features will be unavailable.");
        }
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }

    // --- 2. THE MAIN APP OBJECT & PRODUCT DATABASE ---

    const app = {
        products: [
            // Individuals 50ml
            { id: 'the-poem-50', name: 'The Poem', price: 399, mrp: 599, images: ['1.webp', '2.webp', '3.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'], bestFor: 'Romantic nights, festive occasions', notes: 'Lavender, Cardamom, Tobacco, Vanilla, Musk, Amber', bestSeller: true },
            { id: 'the-expanse-50', name: 'The Expanse', price: 399, mrp: 599, images: ['4.webp', '5.webp', '6.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Aquatic', 'Fresh'], bestFor: 'Summer days, holidays, casual wear', notes: 'Sea Notes, Grapefruit, Ambergris, Oakmoss', bestSeller: true },
            { id: 'the-forge-50', name: 'The Forge', price: 399, mrp: 599, images: ['7.webp', '8.webp', '9.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Aromatic', 'Woody'], bestFor: 'Evenings, date nights, formal gatherings', notes: 'Grapefruit, Tobacco, Amber, Cedar', bestSeller: true },
            { id: 'the-muse-50', name: 'The Muse', price: 399, mrp: 599, images: ['10.webp', '11.webp', '12.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Floral', 'Aquatic'], bestFor: 'Office to casual evenings', notes: 'Floral, Aquatic, Fruity, Citrus, Ozonic', bestSeller: true },
            { id: 'the-affair-50', name: 'The Affair', price: 399, mrp: 599, images: ['13.webp', '14.webp', '15.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Gourmand', 'Oriental'], bestFor: 'Evenings, parties, intimate moments', notes: 'Almond, Coffee, Cacao Vanilla, Sandalwood', bestSeller: true },
            { id: 'the-warden-50', name: 'The Warden', price: 399, mrp: 599, images: ['16.webp', '17.webp', '18.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Woody', 'Aromatic'], bestFor: 'Professionals, formal events, daily wear', notes: 'Bergamot, Lavender, Patchouli, Vetiver', bestSeller: true },
            { id: 'the-genesis-50', name: 'The Genesis', price: 399, mrp: 599, images: ['19.webp', '20.webp', '21.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Fruity', 'Gourmand'], bestFor: 'Daily wear, versatile day-to-night', notes: 'Ripe Fruits, Creamy Vanilla, Musk', bestSeller: true },
            { id: 'the-murk-50', name: 'The Murk', price: 399, mrp: 599, images: ['22.webp', '23.webp', '24.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Gourmand', 'Oriental'], bestFor: 'Intimate evenings, all seasons', notes: 'Cinnamon, Pear, Jasmine, Coffee, Bourbon Vanilla', bestSeller: true },
            { id: 'the-reign-50', name: 'The Reign', price: 399, mrp: 599, images: ['25.webp', '26.webp', '27.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Aquatic', 'Woody'], bestFor: 'Day-to-night, versatile and sophisticated', notes: 'Sea Water, Herbal Mint, Sandalwood, Musk' },

            // Individuals 20ml
            { id: 'the-poem-20', name: 'The Poem', price: 199, mrp: 299, images: ['28.webp', '29.webp', '3.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'] },
            { id: 'the-expanse-20', name: 'The Expanse', price: 199, mrp: 299, images: ['30.webp', '31.webp', '6.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Aquatic', 'Fresh'] },
            { id: 'the-forge-20', name: 'The Forge', price: 199, mrp: 299, images: ['32.webp', '33.webp', '9.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Aromatic', 'Woody'] },
            { id: 'the-muse-20', name: 'The Muse', price: 199, mrp: 299, images: ['34.webp', '35.webp', '12.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Floral', 'Aquatic'] },
            { id: 'the-affair-20', name: 'The Affair', price: 199, mrp: 299, images: ['36.webp', '37.webp', '15.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Gourmand', 'Oriental'] },
            { id: 'the-warden-20', name: 'The Warden', price: 199, mrp: 299, images: ['38.webp', '39.webp', '18.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Woody', 'Aromatic'] },
            { id: 'the-genesis-20', name: 'The Genesis', price: 199, mrp: 299, images: ['40.webp', '41.webp', '21.webp'], category: 'individual-20ml', gender: 'Unisex', family: ['Fruity', 'Gourmand'] },
            { id: 'the-murk-20', name: 'The Murk', price: 199, mrp: 299, images: ['42.webp', '43.webp', '24.webp'], category: 'individual-20ml', gender: 'Unisex', family: ['Gourmand', 'Oriental'] },
            { id: 'the-reign-20', name: 'The Reign', price: 199, mrp: 299, images: ['44.webp', '45.webp', '27.webp'], category: 'individual-20ml', gender: 'Unisex', family: ['Aquatic', 'Woody'] },

            // Trial Packs
            { id: 'trial-him', name: 'Trial Pack – For Him', price: 99, mrp: 99, images: ['46.webp'], category: 'trial', gender: 'Masculine', family: ['Woody', 'Aquatic', 'Aromatic'] },
            { id: 'trial-unisex', name: 'Trial Pack – Unisex', price: 99, mrp: 99, images: ['47.webp'], category: 'trial', gender: 'Unisex', family: ['Fruity', 'Gourmand', 'Aquatic'] },
            { id: 'trial-her', name: 'Trial Pack – For Her', price: 99, mrp: 99, images: ['48.webp'], category: 'trial', gender: 'Feminine', family: ['Aromatic', 'Floral', 'Gourmand'] },
            { id: 'trial-all', name: 'Trial Pack – All 9', price: 299, mrp: 299, images: ['49.webp'], category: 'trial', gender: 'Unisex' },

            // Combo Packs
            { id: 'combo-him-20ml', name: 'Combo For Him (3 x 20ml)', price: 499, mrp: 999, images: ['50.webp'], category: 'combo-him', gender: 'Masculine' },
            { id: 'combo-her-20ml', name: 'Combo For Her (3 x 20ml)', price: 499, mrp: 999, images: ['58.webp'], category: 'combo-her', gender: 'Feminine' },
            { id: 'combo-unisex-20ml', name: 'Combo Unisex (3 x 20ml)', price: 499, mrp: 999, images: ['66.webp'], category: 'combo-unisex', gender: 'Unisex' },
            { id: 'combo-her-50ml', name: 'Combo For Her (3 x 50ml)', price: 1099, mrp: 1799, images: ['74.webp'], category: 'combo-her', gender: 'Feminine' },
            { id: 'combo-him-50ml', name: 'Combo For Him (3 x 50ml)', price: 1099, mrp: 1799, images: ['82.webp'], category: 'combo-him', gender: 'Masculine' },
            { id: 'combo-unisex-50ml', name: 'Combo For Both – Unisex (3 x 50ml)', price: 1099, mrp: 1799, images: ['90.webp', '91.webp', '92.webp', '93.webp', '94.webp', '95.webp', '96.webp', '97.webp'], category: 'combo-unisex', gender: 'Unisex' },
        ],
        cart: [],
        wishlistItems: [],
        currentUser: null,

        // --- UTILITY: Get product page URL from product ID ---
        getProductPageUrl(productId) {
            // Map product IDs to their actual HTML page filenames
            const idToPage = {
                'the-poem-50': 'product-the-poem.html',
                'the-poem-20': 'product-the-poem.html',
                'the-expanse-50': 'product-the-expanse.html',
                'the-expanse-20': 'product-the-expanse.html',
                'the-forge-50': 'product-the-forge.html',
                'the-forge-20': 'product-the-forge.html',
                'the-muse-50': 'product-the-muse.html',
                'the-muse-20': 'product-the-muse.html',
                'the-affair-50': 'product-the-affair.html',
                'the-affair-20': 'product-the-affair.html',
                'the-warden-50': 'product-the-warden.html',
                'the-warden-20': 'product-the-warden.html',
                'the-genesis-50': 'product-the-genesis.html',
                'the-genesis-20': 'product-the-genesis.html',
                'the-murk-50': 'product-the-murk.html',
                'the-murk-20': 'product-the-murk.html',
                'the-reign-50': 'product-the-reign.html',
                'the-reign-20': 'product-the-reign.html',
                'trial-him': 'product-trial-him.html',
                'trial-her': 'product-trial-her.html',
                'trial-unisex': 'product-trial-unisex.html',
                'trial-all': 'product-trial-all.html',
                'combo-him-20ml': 'product-combo-him-20ml.html',
                'combo-her-20ml': 'product-combo-her-20ml.html',
                'combo-unisex-20ml': 'product-combo-unisex-20ml.html',
                'combo-her-50ml': 'product-combo-her-50ml.html',
                'combo-him-50ml': 'product-combo-him-50ml.html',
                'combo-unisex-50ml': 'product-combo-unisex-50ml.html',
            };
            return idToPage[productId] || 'shop.html';
        },

        // --- UTILITY: Show Toast Notification ---
        showToast(message, type = 'success') {
            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toast-container';
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            container.appendChild(toast);

            // Trigger animation
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        },

        // --- 3. RENDER HEADER & FOOTER ---
        renderSharedComponents() {
            // ---- HEADER ----
            const header = document.querySelector('header.header');
            if (header) {
                header.innerHTML = `
                    <nav class="navbar">
                        <a href="./index.html" class="navbar-logo">
                            <img src="./images/etrem.webp" alt="ETREM – The Naked Perfume" onerror="this.onerror=null; this.src='./images/etrem.jpg';">
                        </a>
                        <ul class="nav-menu">
                            <li><a href="./index.html" class="nav-link">Home</a></li>
                            <li><a href="./shop.html" class="nav-link">Shop</a></li>
                            <li><a href="./about.html" class="nav-link">About</a></li>
                            <li><a href="./quiz.html" class="nav-link">Find Your Scent</a></li>
                            <li><a href="./blog.html" class="nav-link">Blog</a></li>
                            <li><a href="./contact.html" class="nav-link">Contact</a></li>
                        </ul>
                        <div class="nav-actions">
                            <button class="nav-action-btn" id="search-icon" aria-label="Search">
                                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </button>
                            <a href="./wishlist.html" class="nav-action-btn" aria-label="Wishlist">
                                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </a>
                            <a href="./cart.html" class="nav-action-btn" aria-label="Cart">
                                <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                <span class="cart-item-count">0</span>
                            </a>
                            <a href="#" class="nav-action-btn" id="user-icon" aria-label="Account">
                                <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            </a>
                            <button class="hamburger" id="hamburger-btn" aria-label="Menu">
                                <span></span><span></span><span></span>
                            </button>
                        </div>
                    </nav>
                `;

                // Hamburger menu toggle
                const hamburger = document.getElementById('hamburger-btn');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.addEventListener('click', () => {
                        navMenu.classList.toggle('active');
                        hamburger.classList.toggle('active');
                    });
                    // Close menu on link click
                    navMenu.querySelectorAll('.nav-link').forEach(link => {
                        link.addEventListener('click', () => {
                            navMenu.classList.remove('active');
                            hamburger.classList.remove('active');
                        });
                    });
                }

                // Search icon
                const searchIcon = document.getElementById('search-icon');
                const searchOverlay = document.getElementById('search-overlay');
                if (searchIcon && searchOverlay) {
                    searchIcon.addEventListener('click', () => searchOverlay.classList.add('active'));
                    const closeSearch = document.getElementById('close-search');
                    if (closeSearch) {
                        closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
                    }
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) {
                        searchInput.addEventListener('input', (e) => this.search.performSearch(e.target.value));
                    }
                }

                // User icon
                const userIcon = document.getElementById('user-icon');
                if (userIcon) {
                    userIcon.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (this.currentUser) {
                            window.location.href = './profile.html';
                        } else {
                            window.location.href = './login.html';
                        }
                    });
                }

                // Highlight active nav link
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                document.querySelectorAll('.nav-link').forEach(link => {
                    const href = link.getAttribute('href').replace('./', '');
                    if (href === currentPage) {
                        link.classList.add('active');
                    }
                });
            }

            // ---- FOOTER ----
            const footer = document.querySelector('footer');
            if (footer) {
                footer.className = 'footer';
                footer.innerHTML = `
                    <div class="container">
                        <div class="footer-grid">
                            <div class="footer-col">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="./shop.html">Shop All</a></li>
                                    <li><a href="./about.html">About ETREM</a></li>
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="./contact.html">Contact Us</a></li>
                                </ul>
                            </div>
                            <div class="footer-col">
                                <h4>Customer Care</h4>
                                <ul>
                                    <li><a href="./shipping-returns.html">Shipping & Returns</a></li>
                                    <li><a href="./privacy-policy.html">Privacy Policy</a></li>
                                    <li><a href="./terms-of-service.html">Terms of Service</a></li>
                                </ul>
                            </div>
                            <div class="footer-col">
                                <h4>Get In Touch</h4>
                                <ul>
                                    <li><a href="mailto:etrem.perfumes@gmail.com">etrem.perfumes@gmail.com</a></li>
                                    <li><a href="tel:+917069122218">+91 7069 122 218</a></li>
                                    <li><a href="https://www.instagram.com/etrem_perfume?igsh=NW5lazVrYWtxYjlj" target="_blank">Instagram</a></li>
                                </ul>
                            </div>
                            <div class="footer-col">
                                <h4>ETREM</h4>
                                <p style="color: var(--text-muted);">India's raw, honest luxury perfume brand. No gimmicks. Just scent. #Lastsforever</p>
                                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">NH INC. | GSTIN: 24AXSPJ6355J1ZY</p>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; ${new Date().getFullYear()} ETREM – The Naked Perfume. All rights reserved.</p>
                            <p id="dev-credit">Crafted with ♥ in India</p>
                            <p class="dev-attribution">Designed and Developed by <a href="https://digitalorigami.in" target="_blank" rel="noopener">Digital Origami</a></p>
                        </div>
                    </div>
                `;
            }

            // Ensure toast container exists
            if (!document.getElementById('toast-container')) {
                const tc = document.createElement('div');
                tc.id = 'toast-container';
                document.body.appendChild(tc);
            }

            // Scroll-based header background + hide-on-scroll
            const headerEl = document.querySelector('.header');
            if (headerEl) {
                let lastScrollY = window.scrollY;
                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;
                    // Background toggle
                    if (currentScrollY > 50) {
                        headerEl.classList.add('scrolled');
                    } else {
                        headerEl.classList.remove('scrolled');
                    }
                    // Hide on scroll down, show on scroll up
                    if (!headerEl.classList.contains('solid')) {
                        if (currentScrollY > lastScrollY && currentScrollY > 100) {
                            headerEl.classList.add('header-hidden');
                        } else {
                            headerEl.classList.remove('header-hidden');
                        }
                    }
                    lastScrollY = currentScrollY;
                });
            }
        },

        // --- 4. HOME PAGE ---
        initHomePage() {
            // ---- Hero Slider ----
            const slides = document.querySelectorAll('.hero-slider .slide');
            const dotsContainer = document.querySelector('.slider-dots');
            const prevBtn = document.querySelector('.slider-arrow.prev');
            const nextBtn = document.querySelector('.slider-arrow.next');

            if (slides.length > 0) {
                let currentSlide = 0;
                let slideInterval;

                // Create dots
                if (dotsContainer) {
                    slides.forEach((_, i) => {
                        const dot = document.createElement('span');
                        dot.className = `dot ${i === 0 ? 'active' : ''}`;
                        dot.addEventListener('click', () => goToSlide(i));
                        dotsContainer.appendChild(dot);
                    });
                }

                function goToSlide(index) {
                    slides[currentSlide].classList.remove('active');
                    const dots = document.querySelectorAll('.slider-dots .dot');
                    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

                    currentSlide = (index + slides.length) % slides.length;

                    slides[currentSlide].classList.add('active');
                    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
                }

                function nextSlide() {
                    goToSlide(currentSlide + 1);
                }

                function prevSlide() {
                    goToSlide(currentSlide - 1);
                }

                function startAutoSlide() {
                    slideInterval = setInterval(nextSlide, 4000);
                }

                function stopAutoSlide() {
                    clearInterval(slideInterval);
                }

                if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
                if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });

                startAutoSlide();
            }

            // ---- Featured / Best Seller Products (show 8) ----
            const featuredGrid = document.getElementById('featured-products');
            if (featuredGrid) {
                const bestSellers = this.products.filter(p => p.bestSeller).slice(0, 8);
                featuredGrid.innerHTML = bestSellers.map(p => this.shop.createProductCardHTML(p)).join('');

                // Add event listeners for the rendered cards
                this._attachProductCardListeners(featuredGrid);
                this.shop.initRatingsAndShare(featuredGrid);
            }
        },

        // --- 5. PRODUCT DETAIL PAGE ---
        initProductPage() {
            const page = document.querySelector('.product-detail-page');
            if (!page) return;

            // Thumbnail image switching
            const mainImage = document.getElementById('mainProductImage');
            const thumbnails = document.querySelectorAll('.thumb-img');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    if (mainImage) {
                        mainImage.src = thumb.dataset.mainSrc || thumb.src;
                    }
                });
            });

            // Volume selector
            const volumeBtns = document.querySelectorAll('.volume-btn');
            volumeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    volumeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const price = btn.dataset.price;
                    const mrp = btn.dataset.mrp;
                    const images = btn.dataset.images ? btn.dataset.images.split(',') : [];

                    const priceEl = document.getElementById('productPrice');
                    const mrpEl = document.getElementById('originalPrice');
                    const savingsEl = document.getElementById('savingsLabel');

                    if (priceEl) priceEl.textContent = `₹${price}`;
                    if (mrpEl) mrpEl.textContent = `₹${mrp}`;
                    if (savingsEl && mrp > price) {
                        const savings = Math.round((1 - price / mrp) * 100);
                        savingsEl.textContent = `You save ${savings}%`;
                    }

                    // Update images
                    if (images.length > 0 && mainImage) {
                        mainImage.src = `./images/${images[0]}`;
                        thumbnails.forEach((thumb, i) => {
                            if (images[i]) {
                                thumb.src = `./images/${images[i]}`;
                                thumb.dataset.mainSrc = `./images/${images[i]}`;
                            }
                        });
                        if (thumbnails[0]) {
                            thumbnails.forEach(t => t.classList.remove('active'));
                            thumbnails[0].classList.add('active');
                        }
                    }
                });
            });

            // Quantity selector
            const qtyInput = document.getElementById('quantity');
            const decreaseBtn = document.getElementById('decrease-qty');
            const increaseBtn = document.getElementById('increase-qty');

            if (decreaseBtn && qtyInput) {
                decreaseBtn.addEventListener('click', () => {
                    let val = parseInt(qtyInput.value) || 1;
                    if (val > 1) qtyInput.value = val - 1;
                });
            }
            if (increaseBtn && qtyInput) {
                increaseBtn.addEventListener('click', () => {
                    let val = parseInt(qtyInput.value) || 1;
                    if (val < 10) qtyInput.value = val + 1;
                });
            }

            // Add to Cart from PDP
            const addToCartPDP = document.querySelector('.add-to-cart-pdp');
            if (addToCartPDP) {
                addToCartPDP.addEventListener('click', () => {
                    const productData = page.dataset.productId;
                    const quantity = parseInt(qtyInput ? qtyInput.value : 1);

                    // Check if the data-product-id is already a valid product ID
                    // (combo and trial pages use the full ID directly)
                    const directMatch = app.products.find(p => p.id === productData);
                    if (directMatch) {
                        app.cartManager.add(productData, quantity);
                        return;
                    }

                    // For individual perfume pages with volume selectors
                    const activeVolume = document.querySelector('.volume-btn.active');
                    const volume = activeVolume ? activeVolume.dataset.volume : '50ml';
                    const volumeSuffix = volume === '20ml' ? '-20' : '-50';
                    const productId = productData + volumeSuffix;

                    app.cartManager.add(productId, quantity);
                });
            }

            // Wishlist from PDP
            const wishlistBtnPDP = page.querySelector('.wishlist-btn');
            if (wishlistBtnPDP) {
                wishlistBtnPDP.addEventListener('click', () => {
                    const productData = page.dataset.productId;

                    // Direct match for combo/trial pages
                    const directMatch = app.products.find(p => p.id === productData);
                    if (directMatch) {
                        app.wishlist.toggle(productData);
                        return;
                    }

                    // Volume-based for individual pages
                    const activeVolume = document.querySelector('.volume-btn.active');
                    const volume = activeVolume ? activeVolume.dataset.volume : '50ml';
                    const volumeSuffix = volume === '20ml' ? '-20' : '-50';
                    const productId = productData + volumeSuffix;
                    app.wishlist.toggle(productId);
                });
            }

            // Accordion
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    const icon = header.querySelector('.accordion-icon');
                    const isOpen = content.style.maxHeight;

                    // Close all
                    document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
                    document.querySelectorAll('.accordion-icon').forEach(i => i.textContent = '+');

                    if (!isOpen) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        if (icon) icon.textContent = '−';
                    }
                });
            });

            // Share button
            const shareBtn = page.querySelector('.share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', () => {
                    if (navigator.share) {
                        navigator.share({ title: document.title, url: window.location.href });
                    } else {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            this.showToast('Link copied to clipboard!');
                        });
                    }
                });
            }
        },

        initShopPage() {
            this.shop.initShopPage();
        },

        // --- CORE INITIALIZATION ---
        init() {
            this.cart = JSON.parse(localStorage.getItem('etremCart')) || [];

            // Clean up stale/invalid cart items that don't match any product
            const validCart = this.cart.filter(item => this.products.some(p => p.id === item.id));
            if (validCart.length !== this.cart.length) {
                this.cart = validCart;
                localStorage.setItem('etremCart', JSON.stringify(this.cart));
            }

            this.renderSharedComponents();
            this.auth.init();

            // Page-specific initializers
            if (document.querySelector('.hero-slider-section')) this.initHomePage();
            if (document.querySelector('.shop-page')) this.initShopPage();
            if (document.querySelector('.product-detail-page')) this.initProductPage();
            if (document.querySelector('.auth-page')) this.auth.initAuthPage();
            if (document.querySelector('.wishlist-page')) this.wishlist.initWishlistPage();
            if (document.querySelector('.cart-page')) this.cartManager.initCartPage();
            if (document.querySelector('.checkout-page')) this.checkout.initCheckoutPage();
            if (document.querySelector('.quiz-page')) this.quiz.init();
            if (document.querySelector('.profile-page')) this.profileManager.initProfilePage();

            this.cartManager.updateCartCount();
        },

        // --- Helper: attach click listeners to product cards ---
        _attachProductCardListeners(container) {
            if (!container) return;

            // Add to Cart buttons
            container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const productId = btn.dataset.productId;
                    this.cartManager.add(productId);
                });
            });

            // Wishlist buttons
            container.querySelectorAll('.wishlist-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const productId = btn.dataset.productId;
                    this.wishlist.toggle(productId);
                });
            });
        },

        // --- 5. AUTH MODULE ---
        auth: {
            init() {
                if (typeof firebase === 'undefined' || !firebase.auth) return;
                try {
                    firebase.auth().onAuthStateChanged((user) => {
                        app.currentUser = user;
                        app.auth.updateUI(user);
                        if (user) {
                            app.wishlist.fetchWishlist();
                        } else {
                            app.wishlist.clearWishlist();
                        }
                    });
                } catch (error) {
                    console.warn("Auth state listener failed:", error);
                }
            },

            updateUI(user) {
                const userIcon = document.getElementById('user-icon');
                if (userIcon) {
                    if (user) {
                        userIcon.title = `Logged in as ${user.displayName || user.email}`;
                    } else {
                        userIcon.title = 'Login / Sign Up';
                    }
                }
                // Profile page
                const profileName = document.getElementById('profile-name');
                const profileEmail = document.getElementById('profile-email');
                if (profileName && user) profileName.textContent = user.displayName || 'User';
                if (profileEmail && user) profileEmail.textContent = user.email;
            },

            initAuthPage() {
                const loginForm = document.getElementById('login-form');
                const signupForm = document.getElementById('signup-form');
                const showSignup = document.getElementById('show-signup');
                const showLogin = document.getElementById('show-login');
                const googleBtn = document.getElementById('google-signin-btn');
                const loginWrapper = document.getElementById('login-wrapper');
                const signupWrapper = document.getElementById('signup-wrapper');

                if (showSignup) {
                    showSignup.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (loginWrapper) loginWrapper.style.display = 'none';
                        if (signupWrapper) signupWrapper.style.display = 'block';
                    });
                }

                if (showLogin) {
                    showLogin.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (signupWrapper) signupWrapper.style.display = 'none';
                        if (loginWrapper) loginWrapper.style.display = 'block';
                    });
                }

                if (loginForm) {
                    loginForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const email = document.getElementById('login-email').value;
                        const password = document.getElementById('login-password').value;
                        const errorEl = document.getElementById('login-error');
                        try {
                            await firebase.auth().signInWithEmailAndPassword(email, password);
                            app.showToast('Login successful!');
                            setTimeout(() => window.location.href = './index.html', 1000);
                        } catch (err) {
                            if (errorEl) errorEl.textContent = err.message;
                        }
                    });
                }

                if (signupForm) {
                    signupForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const name = document.getElementById('signup-name').value;
                        const email = document.getElementById('signup-email').value;
                        const password = document.getElementById('signup-password').value;
                        const errorEl = document.getElementById('signup-error');
                        try {
                            const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
                            await cred.user.updateProfile({ displayName: name });
                            app.showToast('Account created successfully!');
                            setTimeout(() => window.location.href = './index.html', 1000);
                        } catch (err) {
                            if (errorEl) errorEl.textContent = err.message;
                        }
                    });
                }

                if (googleBtn) {
                    googleBtn.addEventListener('click', async () => {
                        try {
                            const provider = new firebase.auth.GoogleAuthProvider();
                            await firebase.auth().signInWithPopup(provider);
                            app.showToast('Logged in with Google!');
                            setTimeout(() => window.location.href = './index.html', 1000);
                        } catch (err) {
                            console.error('Google sign-in error:', err);
                            app.showToast(err.message, 'error');
                        }
                    });
                }
            }
        },

        // --- 6. SHOP PAGE MODULE ---
        shop: {
            filters: { gender: [], family: [], price: null, category: 'all' },
            sortBy: 'newest',

            initShopPage() {
                const urlParams = new URLSearchParams(window.location.search);
                const category = urlParams.get('category');
                if (category) {
                    this.filters.category = category;
                    document.querySelectorAll('.cat-tab').forEach(t => {
                        t.classList.toggle('active', t.dataset.category === category);
                    });
                }
                this.applyFiltersAndSort();
                this.addEventListeners();
            },

            renderProducts(productsToRender) {
                const grid = document.getElementById('shop-product-grid');
                if (!grid) return;
                if (productsToRender.length === 0) {
                    grid.innerHTML = `<p class="no-results">No products match your criteria. Try clearing some filters!</p>`;
                    return;
                }
                grid.innerHTML = productsToRender.map(p => this.createProductCardHTML(p)).join('');
                app.wishlist.updateAllHeartIcons();
                app._attachProductCardListeners(grid);
                this.initRatingsAndShare(grid);
            },

            applyFiltersAndSort() {
                let filtered = [...app.products];

                // Category Filter
                if (this.filters.category !== 'all') {
                    filtered = filtered.filter(p => p.category === this.filters.category);
                }

                // Gender Filter
                if (this.filters.gender.length > 0) {
                    filtered = filtered.filter(p => this.filters.gender.includes(p.gender));
                }

                // Family Filter
                if (this.filters.family.length > 0) {
                    filtered = filtered.filter(p => p.family && this.filters.family.some(f => p.family.includes(f)));
                }

                // Price Filter
                if (this.filters.price) {
                    const [min, max] = this.filters.price.split('-').map(v => v === 'Infinity' ? Infinity : Number(v));
                    filtered = filtered.filter(p => p.price >= min && p.price <= (max || Infinity));
                }

                // Sorting
                switch (this.sortBy) {
                    case 'price-asc':
                        filtered.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        filtered.sort((a, b) => b.price - a.price);
                        break;
                    case 'best-sellers':
                        filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
                        break;
                    case 'newest':
                    default:
                        break;
                }

                this.renderProducts(filtered);
            },

            addEventListeners() {
                // Category tabs
                document.querySelectorAll('.cat-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        this.filters.category = tab.dataset.category;
                        this.applyFiltersAndSort();
                    });
                });

                // Gender checkboxes
                document.querySelectorAll('input[name="gender"]').forEach(cb => {
                    cb.addEventListener('change', () => {
                        this.filters.gender = [...document.querySelectorAll('input[name="gender"]:checked')].map(c => c.value);
                        this.applyFiltersAndSort();
                    });
                });

                // Family checkboxes
                document.querySelectorAll('input[name="family"]').forEach(cb => {
                    cb.addEventListener('change', () => {
                        this.filters.family = [...document.querySelectorAll('input[name="family"]:checked')].map(c => c.value);
                        this.applyFiltersAndSort();
                    });
                });

                // Price radio buttons
                document.querySelectorAll('input[name="price"]').forEach(rb => {
                    rb.addEventListener('change', () => {
                        this.filters.price = rb.value;
                        this.applyFiltersAndSort();
                    });
                });

                // Sort dropdown
                const sortSelect = document.getElementById('sort-by');
                if (sortSelect) {
                    sortSelect.addEventListener('change', () => {
                        this.sortBy = sortSelect.value;
                        this.applyFiltersAndSort();
                    });
                }

                // Clear filters
                const clearBtn = document.getElementById('clear-filters');
                if (clearBtn) {
                    clearBtn.addEventListener('click', () => {
                        this.filters = { gender: [], family: [], price: null, category: 'all' };
                        this.sortBy = 'newest';
                        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
                        const allTab = document.querySelector('.cat-tab[data-category="all"]');
                        if (allTab) allTab.classList.add('active');
                        document.querySelectorAll('.filter-sidebar input').forEach(inp => {
                            inp.checked = false;
                        });
                        const sortSel = document.getElementById('sort-by');
                        if (sortSel) sortSel.value = 'newest';
                        this.applyFiltersAndSort();
                    });
                }
            },

            createProductCardHTML(product) {
                const isWishlisted = app.wishlist.includes(product.id);
                const pageUrl = app.getProductPageUrl(product.id);
                const shareUrl = `https://etremperfumes.com/${pageUrl}`;
                return `
                    <div class="product-card" data-id="${product.id}">
                        <div class="product-card-image">
                            <a href="${pageUrl}">
                                <img src="./images/${product.images[0]}" alt="ETREM ${product.name} perfume India" loading="lazy">
                            </a>
                            <button class="wishlist-btn" data-product-id="${product.id}" aria-label="Add to wishlist">
                                <span class="heart-icon ${isWishlisted ? 'filled' : ''}">${isWishlisted ? '♥' : '♡'}</span>
                            </button>
                        </div>
                        <div class="product-card-content">
                            <h3><a href="${pageUrl}">${product.name}</a></h3>
                            <div class="price-container">
                                <span class="current-price">₹${product.price}</span>
                                ${product.mrp > product.price ? `<span class="original-price">₹${product.mrp}</span>` : ''}
                            </div>
                            <!-- Star Rating Widget -->
                            <div class="product-rating" id="rating-${product.id}">
                                <span class="stars-display">★★★★★</span>
                                <span class="rating-count">Loading...</span>
                            </div>
                        </div>
                        <div class="product-card-actions" style="display:flex;gap:0.5rem;flex-direction:column;">
                            <button class="btn btn-primary btn-block add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                            <div style="display:flex;gap:0.5rem;align-items:center;justify-content:space-between;">
                                <!-- Rate this product -->
                                <div class="stars-input" data-product-id="${product.id}" title="Rate this product">
                                    <span data-val="1">★</span>
                                    <span data-val="2">★</span>
                                    <span data-val="3">★</span>
                                    <span data-val="4">★</span>
                                    <span data-val="5">★</span>
                                </div>
                                <!-- Share button -->
                                <div style="position:relative;">
                                    <button class="share-btn" data-product-id="${product.id}" data-share-url="${shareUrl}" data-name="${product.name}">
                                        <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            },

            // Called after renderProducts to attach rating + share interactivity
            initRatingsAndShare(container) {
                if (!container) return;

                // ---- STAR RATINGS ----
                // Load & display ratings from Firebase
                container.querySelectorAll('.product-rating').forEach(ratingEl => {
                    const pid = ratingEl.id.replace('rating-', '');
                    if (db) {
                        db.ref(`ratings/${pid}`).once('value').then(snap => {
                            const data = snap.val();
                            if (data && data.ratingCount > 0) {
                                const avg = (data.totalStars / data.ratingCount).toFixed(1);
                                const stars = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
                                ratingEl.innerHTML = `
                                    <span class="stars-display">${stars}</span>
                                    <span class="rating-count">★ ${avg} | ${data.ratingCount} rating${data.ratingCount > 1 ? 's' : ''}</span>
                                `;
                            } else {
                                ratingEl.innerHTML = `<span class="rating-count">No ratings yet</span>`;
                            }
                        }).catch(() => {
                            ratingEl.innerHTML = '';
                        });
                    } else {
                        ratingEl.innerHTML = '';
                    }
                });

                // Star input: hover + click
                container.querySelectorAll('.stars-input').forEach(starInput => {
                    const pid = starInput.dataset.productId;
                    const stars = starInput.querySelectorAll('span');
                    const alreadyRated = localStorage.getItem(`etrem_rated_${pid}`);

                    if (alreadyRated) {
                        starInput.innerHTML = `<span class="rating-submitted">✓ Rated</span>`;
                        return;
                    }

                    stars.forEach(star => {
                        star.addEventListener('mouseenter', () => {
                            const val = parseInt(star.dataset.val);
                            stars.forEach((s, i) => s.classList.toggle('hovered', i < val));
                        });
                        star.addEventListener('mouseleave', () => {
                            stars.forEach(s => s.classList.remove('hovered'));
                        });
                        star.addEventListener('click', () => {
                            const rating = parseInt(star.dataset.val);
                            if (!db) return;
                            const ref = db.ref(`ratings/${pid}`);
                            ref.transaction(current => {
                                if (current) {
                                    return { totalStars: (current.totalStars || 0) + rating, ratingCount: (current.ratingCount || 0) + 1 };
                                }
                                return { totalStars: rating, ratingCount: 1 };
                            }).then(() => {
                                localStorage.setItem(`etrem_rated_${pid}`, rating);
                                starInput.innerHTML = `<span class="rating-submitted">✓ Thanks for rating!</span>`;
                                app.showToast('Rating submitted! ⭐');
                                // Refresh the display rating
                                const displayEl = document.getElementById(`rating-${pid}`);
                                if (displayEl) {
                                    ref.once('value').then(snap => {
                                        const d = snap.val();
                                        if (d && d.ratingCount > 0) {
                                            const avg = (d.totalStars / d.ratingCount).toFixed(1);
                                            const starsStr = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
                                            displayEl.innerHTML = `<span class="stars-display">${starsStr}</span><span class="rating-count">★ ${avg} | ${d.ratingCount} ratings</span>`;
                                        }
                                    });
                                }
                            }).catch(err => console.error('Rating error:', err));
                        });
                    });
                });

                // ---- SHARE BUTTON ----
                container.querySelectorAll('.share-btn').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        e.stopPropagation();
                        const url   = btn.dataset.shareUrl;
                        const name  = btn.dataset.name;

                        if (navigator.share) {
                            try {
                                await navigator.share({ title: `ETREM – ${name}`, text: `Check out ${name} by ETREM Perfumes!`, url });
                            } catch (_) {}
                        } else {
                            try {
                                await navigator.clipboard.writeText(url);
                                // Show tooltip
                                const tip = document.createElement('span');
                                tip.className = 'share-tooltip';
                                tip.textContent = 'Link Copied!';
                                btn.parentElement.appendChild(tip);
                                setTimeout(() => tip.remove(), 2100);
                            } catch (_) {
                                app.showToast('Could not copy link.', 'error');
                            }
                        }
                    });
                });
            },


        }, // end shop

        // --- 7. WISHLIST MODULE ---
        wishlist: {
            items: [],

            initWishlistPage() {
                if (!app.currentUser) {
                    const wc = document.getElementById('wishlist-content');
                    if (wc) wc.innerHTML = `<p>Please <a href="./login.html">login</a> to see your wishlist.</p>`;
                    return;
                }
                this.renderWishlistPage();
            },

            async fetchWishlist() {
                if (!app.currentUser || !db) return;
                try {
                    const snapshot = await db.ref(`wishlists/${app.currentUser.uid}`).once('value');
                    this.items = snapshot.val() ? Object.keys(snapshot.val()) : [];
                    this.updateAllHeartIcons();
                    if (document.querySelector('.wishlist-page')) {
                        this.renderWishlistPage();
                    }
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            },

            clearWishlist() {
                this.items = [];
                this.updateAllHeartIcons();
            },

            async toggle(productId) {
                if (!app.currentUser) {
                    app.showToast("Please login to use the wishlist", "error");
                    window.location.href = './login.html';
                    return;
                }
                if (!db) {
                    app.showToast("Database not available", "error");
                    return;
                }
                try {
                    const wishlistRef = db.ref(`wishlists/${app.currentUser.uid}/${productId}`);
                    if (this.items.includes(productId)) {
                        await wishlistRef.remove();
                        this.items = this.items.filter(id => id !== productId);
                        app.showToast("Removed from wishlist");
                    } else {
                        await wishlistRef.set(true);
                        this.items.push(productId);
                        app.showToast("Added to wishlist");
                    }
                    this.updateHeartIcon(productId);
                } catch (error) {
                    console.error("Wishlist toggle error:", error);
                    app.showToast("Error updating wishlist", "error");
                }
            },

            includes(productId) {
                return this.items.includes(productId);
            },

            updateHeartIcon(productId) {
                document.querySelectorAll(`.wishlist-btn[data-product-id="${productId}"] .heart-icon`).forEach(icon => {
                    const isWishlisted = this.includes(productId);
                    icon.classList.toggle('filled', isWishlisted);
                    icon.innerHTML = isWishlisted ? '♥' : '♡';
                });
            },

            updateAllHeartIcons() {
                document.querySelectorAll('.wishlist-btn[data-product-id]').forEach(btn => {
                    this.updateHeartIcon(btn.dataset.productId);
                });
            },

            renderWishlistPage() {
                const grid = document.getElementById('wishlist-content');
                if (!grid) return;
                if (this.items.length === 0) {
                    grid.innerHTML = `<p>Your wishlist is empty. Start exploring!</p>`;
                    return;
                }
                const wishlistedProducts = app.products.filter(p => this.items.includes(p.id));
                grid.innerHTML = '<div class="product-grid">' + wishlistedProducts.map(p => app.shop.createProductCardHTML(p)).join('') + '</div>';
                app._attachProductCardListeners(grid);
            }
        },

        // --- 8. CART MODULE ---
        cartManager: {
            initCartPage() {
                this.renderCartPage();
            },

            add(productId, quantity = 1) {
                const product = app.products.find(p => p.id === productId);
                if (!product) {
                    console.warn("Product not found:", productId);
                    return;
                }

                const existingItem = app.cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    app.cart.push({ id: productId, quantity });
                }
                this.save();
                app.showToast(`${product.name} added to cart!`);
            },

            update(productId, quantity) {
                const item = app.cart.find(i => i.id === productId);
                if (item) {
                    item.quantity = quantity;
                    if (item.quantity <= 0) {
                        this.remove(productId);
                    } else {
                        this.save();
                    }
                }
                this.renderCartPage();
            },

            remove(productId) {
                app.cart = app.cart.filter(item => item.id !== productId);
                this.save();
                this.renderCartPage();
                app.showToast('Item removed from cart');
            },

            save() {
                localStorage.setItem('etremCart', JSON.stringify(app.cart));
                this.updateCartCount();
            },

            updateCartCount() {
                const count = app.cart.reduce((sum, item) => sum + item.quantity, 0);
                document.querySelectorAll('.cart-item-count').forEach(el => {
                    el.textContent = count;
                    el.style.display = count > 0 ? 'flex' : 'none';
                });
            },

            renderCartPage() {
                const cartContent = document.getElementById('cart-content');
                if (!cartContent) return;

                if (app.cart.length === 0) {
                    cartContent.innerHTML = `<div class="empty-cart"><p>Your cart is empty.</p><a href="./shop.html" class="btn btn-primary">Continue Shopping</a></div>`;
                    return;
                }

                const cartItems = app.cart.map(item => {
                    const product = app.products.find(p => p.id === item.id);
                    if (!product) return '';
                    return `
                        <div class="cart-item" data-id="${product.id}">
                            <img src="./images/${product.images[0]}" alt="${product.name}">
                            <div class="cart-item-details">
                                <h4>${product.name}</h4>
                                <p>₹${product.price}</p>
                            </div>
                            <div class="cart-item-controls">
                                <button class="qty-btn" data-action="decrease" data-id="${product.id}" data-qty="${item.quantity - 1}">−</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" data-action="increase" data-id="${product.id}" data-qty="${item.quantity + 1}">+</button>
                            </div>
                            <p class="cart-item-total">₹${product.price * item.quantity}</p>
                            <button class="remove-btn" data-id="${product.id}">✕</button>
                        </div>
                    `;
                }).join('');

                const total = app.cart.reduce((sum, item) => {
                    const product = app.products.find(p => p.id === item.id);
                    return sum + (product ? product.price * item.quantity : 0);
                }, 0);

                cartContent.innerHTML = `
                    <div class="cart-items">${cartItems}</div>
                    <div class="cart-summary">
                        <h3>Order Summary</h3>
                        <p>Total: <strong>₹${total}</strong></p>
                        <a href="./checkout.html" class="btn btn-primary">Proceed to Checkout</a>
                    </div>
                `;

                // Attach listeners (replaces inline onclick)
                cartContent.querySelectorAll('.qty-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        app.cartManager.update(btn.dataset.id, parseInt(btn.dataset.qty));
                    });
                });
                cartContent.querySelectorAll('.remove-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        app.cartManager.remove(btn.dataset.id);
                    });
                });
            }
        },

        // --- 9. CHECKOUT MODULE ---
        checkout: {
            FREE_SHIPPING_THRESHOLD: 499,
            SHIPPING_COST: 60,

            initCheckoutPage() {
                const checkoutItemsEl = document.getElementById('checkout-items');
                const subtotalEl = document.getElementById('checkout-subtotal');
                const shippingEl = document.getElementById('checkout-shipping');
                const totalEl = document.getElementById('checkout-total');
                const placeOrderBtn = document.getElementById('place-order-btn');

                if (!checkoutItemsEl) return;

                // If cart is empty, redirect to shop
                if (app.cart.length === 0) {
                    checkoutItemsEl.innerHTML = `<p>Your cart is empty. <a href="./shop.html">Continue Shopping</a></p>`;
                    if (placeOrderBtn) placeOrderBtn.disabled = true;
                    return;
                }

                // Render order summary
                let subtotal = 0;
                checkoutItemsEl.innerHTML = app.cart.map(item => {
                    const product = app.products.find(p => p.id === item.id);
                    if (!product) return '';
                    const itemTotal = product.price * item.quantity;
                    subtotal += itemTotal;
                    return `
                        <div class="summary-row">
                            <span>${product.name} \u00d7 ${item.quantity}</span>
                            <span>\u20b9${itemTotal}</span>
                        </div>
                    `;
                }).join('');

                const shipping = subtotal >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.SHIPPING_COST;
                let discount = 0;
                let grandTotal = subtotal + shipping;

                if (subtotalEl) subtotalEl.textContent = `\u20b9${subtotal}`;
                if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `\u20b9${shipping}`;
                if (totalEl) totalEl.textContent = `\u20b9${grandTotal}`;

                // Store totals for placeOrder
                this._orderTotal = grandTotal;
                this._subtotal = subtotal;
                this._shipping = shipping;
                this._discount = 0;
                this._couponCode = '';

                // --- CITY DROPDOWN + DYNAMIC SHIPPING ---
                const citySelect = document.getElementById('city-select');
                const otherCityGroup = document.getElementById('other-city-group');
                const cityInput = document.getElementById('city');

                const updateShipping = () => {
                    const selectedCity = citySelect?.value;
                    let newShipping;

                    if (selectedCity === 'Surat') {
                        newShipping = 0;
                        if (otherCityGroup) otherCityGroup.style.display = 'none';
                        if (cityInput) cityInput.required = false;
                        if (shippingEl) {
                            shippingEl.textContent = 'FREE';
                            shippingEl.style.color = '#4CAF50';
                        }
                    } else if (selectedCity === 'other') {
                        newShipping = 60;
                        if (otherCityGroup) otherCityGroup.style.display = 'block';
                        if (cityInput) cityInput.required = true;
                        if (shippingEl) {
                            shippingEl.textContent = '+ \u20b960';
                            shippingEl.style.color = '';
                        }
                    } else {
                        return; // nothing selected yet
                    }

                    this._shipping = newShipping;
                    const newTotal = subtotal - (this._discount || 0) + newShipping;
                    this._orderTotal = newTotal;
                    if (totalEl) totalEl.textContent = `\u20b9${newTotal}`;
                };

                if (citySelect) citySelect.addEventListener('change', updateShipping);

                // --- COUPON CODE SYSTEM ---
                const couponInput = document.getElementById('coupon-input');
                const couponBtn = document.getElementById('apply-coupon-btn');
                const couponMsg = document.getElementById('coupon-message');
                const discountRow = document.getElementById('discount-row');
                const discountAmountEl = document.getElementById('checkout-discount');

                // Coupon definitions — add/remove coupons here
                const COUPONS = {
                    'FNF25': {
                        discount: 0.25,           // 25% off
                        label: '25% off',
                        validFrom: new Date('2025-01-01T00:00:00'),
                        validUntil: new Date('2099-12-31T23:59:59')   // never expires
                    }
                };

                const formatValidity = (until) => {
                    const now = new Date();
                    const diffMs = until - now;
                    if (diffMs <= 0) return null; // expired
                    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                    const diffDays = Math.floor(diffHrs / 24);
                    const remHrs = diffHrs % 24;
                    if (diffDays > 0) return `Valid for ${diffDays} day${diffDays > 1 ? 's' : ''} and ${remHrs} hour${remHrs !== 1 ? 's' : ''}`;
                    return `Valid for ${diffHrs} hour${diffHrs !== 1 ? 's' : ''} only!`;
                };

                if (couponBtn && couponInput) {
                    couponBtn.addEventListener('click', () => {
                        const code = couponInput.value.trim().toUpperCase();
                        const coupon = COUPONS[code];
                        const now = new Date();

                        if (!coupon) {
                            if (couponMsg) {
                                couponMsg.textContent = '\u274c Invalid coupon code.';
                                couponMsg.style.color = '#f44336';
                            }
                            return;
                        }

                        if (now < coupon.validFrom || now > coupon.validUntil) {
                            if (couponMsg) {
                                couponMsg.textContent = '\u274c Coupon has expired.';
                                couponMsg.style.color = '#f44336';
                            }
                            return;
                        }

                        // Valid coupon
                        discount = Math.round(subtotal * coupon.discount);
                        grandTotal = subtotal - discount + (this._shipping || shipping);
                        this._discount = discount;
                        this._orderTotal = grandTotal;
                        this._couponCode = code;

                        const validity = formatValidity(coupon.validUntil);
                        const validityNote = validity ? ` (${validity})` : '';

                        if (discountRow) discountRow.style.display = 'flex';
                        if (discountAmountEl) discountAmountEl.textContent = `- \u20b9${discount}`;
                        if (totalEl) totalEl.textContent = `\u20b9${grandTotal}`;
                        if (couponMsg) {
                            couponMsg.textContent = `\u2705 ${coupon.label} applied!${validityNote}`;
                            couponMsg.style.color = '#4CAF50';
                        }
                        couponInput.disabled = true;
                        couponBtn.disabled = true;
                        couponBtn.textContent = 'Applied';
                        app.showToast(`Coupon ${code} applied! ${coupon.label}`);
                    });
                }

                // Place Order button
                if (placeOrderBtn) {
                    placeOrderBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.placeOrder();
                    });
                }

                // Pre-fill email if user is logged in
                if (app.currentUser && app.currentUser.email) {
                    const emailInput = document.getElementById('email');
                    if (emailInput) emailInput.value = app.currentUser.email;
                    const nameInput = document.getElementById('name');
                    if (nameInput && app.currentUser.displayName) nameInput.value = app.currentUser.displayName;
                }

                // --- CHECKOUT RECOMMENDATIONS ---
                this._renderRecommendations();
            },

            _renderRecommendations() {
                // Determine cart gender profile
                const cartIds = app.cart.map(i => i.id);
                const cartProducts = cartIds.map(id => app.products.find(p => p.id === id)).filter(Boolean);

                // Find dominant gender in cart
                const genderCount = { Masculine: 0, Feminine: 0, Unisex: 0 };
                cartProducts.forEach(p => { if (genderCount[p.gender] !== undefined) genderCount[p.gender]++; });
                const dominantGender = Object.entries(genderCount).sort((a, b) => b[1] - a[1])[0][0];

                // Get candidates: same gender, 50ml, not in cart already
                const candidates = app.products.filter(p =>
                    p.gender === dominantGender &&
                    p.category === 'individual-50ml' &&
                    !cartIds.includes(p.id)
                ).slice(0, 3);

                if (candidates.length === 0) return;

                // Inject the recommendations section into checkout layout
                const main = document.querySelector('.checkout-page .container');
                if (!main) return;

                const section = document.createElement('div');
                section.className = 'checkout-recommendations';
                section.innerHTML = `
                    <h3 style="margin: 2rem 0 1rem; font-family: 'Playfair Display', serif; color: var(--accent-gold);">You May Also Like</h3>
                    <div class="rec-grid">
                        ${candidates.map(p => `
                            <div class="rec-card">
                                <img src="./images/${p.images[0]}" alt="${p.name}" onerror="this.src='./images/etrem.webp'">
                                <div class="rec-info">
                                    <p class="rec-name">${p.name}</p>
                                    <p class="rec-price">₹${p.price}</p>
                                    <button class="btn btn-outline rec-add-btn" data-product-id="${p.id}">+ Add to Cart</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                main.appendChild(section);

                // Attach add-to-cart listeners
                section.querySelectorAll('.rec-add-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        app.cartManager.add(btn.dataset.productId);
                        btn.textContent = '✓ Added';
                        btn.disabled = true;
                    });
                });
            },

            placeOrder() {
                // Validate shipping form
                const form = document.getElementById('shipping-form');
                if (form && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                // Validate and Clean phone number
                let phoneInput = document.getElementById('phone')?.value || '';
                let cleanPhone = phoneInput.replace(/\D/g, '');
                
                if (cleanPhone.length !== 10) {
                    app.showToast('Please enter a valid 10-digit mobile number.', 'error');
                    return;
                }

                // Resolve city from dropdown
                const citySelectVal = document.getElementById('city-select')?.value || '';
                const cityTextVal   = document.getElementById('city')?.value || '';
                const resolvedCity  = citySelectVal === 'other' ? cityTextVal : citySelectVal;

                if (!resolvedCity) {
                    app.showToast('Please select your city.', 'error');
                    return;
                }

                // Collect shipping details
                const shippingDetails = {
                    name:     document.getElementById('name')?.value || '',
                    email:    document.getElementById('email')?.value || '',
                    phone:    cleanPhone,
                    address:  document.getElementById('address')?.value || '',
                    city:     resolvedCity,
                    state:    document.getElementById('state')?.value || '',
                    pincode:  document.getElementById('pincode')?.value || '',
                    shippingCharge: this._shipping
                };

                const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'razorpay';
                const totalAmount = this._orderTotal || 0;

                if (totalAmount <= 0) {
                    app.showToast('Cart is empty.', 'error');
                    return;
                }

                if (paymentMethod === 'cod') {
                    // Cash on Delivery
                    this._saveOrder(shippingDetails, 'COD', null);
                } else {
                    // Razorpay Online Payment
                    if (typeof Razorpay === 'undefined') {
                        app.showToast('Payment gateway failed to load. Please refresh and try again.', 'error');
                        console.error('Razorpay SDK not loaded.');
                        return;
                    }

                    const options = {
                        key: RAZORPAY_KEY_ID,
                        amount: totalAmount * 100, // Razorpay uses paise
                        currency: 'INR',
                        name: 'ETREM – The Naked Perfume',
                        description: `Order of ${app.cart.length} item(s)`,
                        image: './images/etrem.webp',
                        prefill: {
                            name: shippingDetails.name,
                            email: shippingDetails.email,
                            contact: shippingDetails.phone
                        },
                        theme: {
                            color: '#C9A84C'
                        },
                        handler: (response) => {
                            // Payment successful
                            this._saveOrder(shippingDetails, 'Razorpay', response.razorpay_payment_id);
                        },
                        modal: {
                            ondismiss: () => {
                                app.showToast('Payment cancelled.', 'error');
                            }
                        }
                    };

                    try {
                        const rzp = new Razorpay(options);
                        rzp.on('payment.failed', (response) => {
                            app.showToast('Payment failed: ' + response.error.description, 'error');
                            console.error('Razorpay Error:', response.error);
                        });
                        rzp.open();
                    } catch (err) {
                        console.error('Razorpay error:', err);
                        app.showToast('Could not open payment gateway. Please try again.', 'error');
                    }
                }
            },

            _generateOrderId() {
                // Sequential order IDs: 000456, 000457, 000458 …
                const START = 456;
                const stored = parseInt(localStorage.getItem('etremLastOrderId') || (START - 1));
                const next = stored + 1;
                localStorage.setItem('etremLastOrderId', next);
                return String(next).padStart(6, '0');
            },

            _saveOrder(shippingDetails, paymentMethod, paymentId) {
                console.log("_saveOrder called, email will be sent");
                const orderId = this._generateOrderId();
                const orderData = {
                    items: app.cart.map(item => {
                        const product = app.products.find(p => p.id === item.id);
                        return {
                            id: item.id,
                            name: product ? product.name : item.id,
                            price: product ? product.price : 0,
                            quantity: item.quantity,
                            volume: item.volume || ''
                        };
                    }),
                    orderId: orderId,
                    subtotal: this._subtotal,
                    shipping: this._shipping,
                    discount: this._discount || 0,
                    couponCode: this._couponCode || '',
                    total: this._orderTotal,
                    shippingDetails: shippingDetails,
                    paymentMethod: paymentMethod,
                    paymentId: paymentId || ('cod-' + orderId),
                    status: paymentMethod === 'COD' ? 'confirmed' : 'paid',
                    createdAt: new Date().toISOString(),
                    userId: app.currentUser ? app.currentUser.uid : 'guest',
                    phone: shippingDetails.phone || ''
                };

                // ── NEW GOOGLE_SHEETS_URL ──────────────────────────────────
                const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxOJT3g88QQ8MxrMcOuwChic5ZyDyCs0ZBWx-gsQml2RXwdHDZWtI5GJtPj-aMa7aTN/exec';

                // ── BUILD SHARED DATA ──────────────────────────────────────
                const SERVICE_ID = 'service_r7f83sg';
                const ADMIN_TEMPLATE = 'template_n4wrqtj';
                const CUSTOMER_TEMPLATE = 'template_6oupid9';
                const PUB_KEY = 'M2IU4HlY2wh4L6Fc0';

                const totalQty = orderData.items.reduce((s, i) => s + i.quantity, 0);
                const productSummary = orderData.items.map(i => `${i.name} (${i.volume || 'N/A'})`).join(', ');
                // HTML list for admin email
                const productDetailsHtml = orderData.items.map(i =>
                    `${i.name} (${i.volume || 'N/A'}) x${i.quantity} — \u20b9${i.price * i.quantity}`
                ).join('\n');
                const fullAddress = `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`;

                // ── ADMIN EMAIL (template_n4wrqtj) ─────────────────────────
                const adminParams = {
                    order_id:            orderId,
                    product_summary:     productSummary,
                    product_size:        orderData.items.map(i => i.volume || 'N/A').join(', '),
                    total_quantity:      totalQty,
                    product_details_html: productDetailsHtml,
                    total_amount:        this._orderTotal,
                    shipping_charge:     shippingDetails.shippingCharge || 0,
                    payment_status:      paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid Online',
                    customer_name:       shippingDetails.name,
                    customer_phone:      shippingDetails.phone,
                    customer_email:      shippingDetails.email,
                    address:             fullAddress
                };

                // ── CUSTOMER EMAIL (template_6oupid9) ──────────────────────
                const itemLines = orderData.items.map(i =>
                    `\u2022 ${i.name} (${i.volume || 'N/A'}) x${i.quantity} — \u20b9${i.price * i.quantity}`
                ).join('\n');
                const customerParams = {
                    to_name:     shippingDetails.name,
                    to_email:    shippingDetails.email,
                    message_body:
`Thank you for your order! Here are your order details:\n\n` +
`Order ID: #${orderId}\n` +
`Items:\n${itemLines}\n\n` +
`Subtotal: \u20b9${orderData.subtotal}\n` +
`Shipping: \u20b9${shippingDetails.shippingCharge || 0}\n` +
(orderData.discount ? `Discount: -\u20b9${orderData.discount}\n` : '') +
`Total: \u20b9${this._orderTotal}\n\n` +
`Payment: ${paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid Online'}\n\n` +
`Delivery Address:\n${fullAddress}\n\n` +
`Expected delivery: 5\u20137 business days.\n` +
`For support, WhatsApp us at +91 7069 122 218.`
                };

                const sendEmail = (templateId, params) => fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ service_id: SERVICE_ID, template_id: templateId, user_id: PUB_KEY, template_params: params })
                });

                sendEmail(ADMIN_TEMPLATE, adminParams)
                    .then(r => r.ok ? console.log('Admin email sent ✅') : r.text().then(t => console.error('Admin email failed', r.status, t)))
                    .catch(e => console.error('Admin email error:', e));

                sendEmail(CUSTOMER_TEMPLATE, customerParams)
                    .then(r => r.ok ? console.log('Customer email sent ✅') : r.text().then(t => console.error('Customer email failed', r.status, t)))
                    .catch(e => console.error('Customer email error:', e));

                // ── GOOGLE SHEETS SYNC (always fires, outside Firebase) ────
                const fi = orderData.items[0] || {};
                const sheetsPayload = JSON.stringify({
                    order_id:        orderId,
                    timestamp:       orderData.createdAt,
                    name:            shippingDetails.name,
                    phone:           shippingDetails.phone,
                    email:           shippingDetails.email,
                    address:         shippingDetails.address,
                    city:            shippingDetails.city,
                    state:           shippingDetails.state,
                    pincode:         shippingDetails.pincode,
                    product_name:    fi.name || '',
                    product_size:    fi.volume || '',
                    quantity:        fi.quantity || 1,
                    product_details: orderData.items.map(i => `${i.name} (${i.volume||'N/A'}) x${i.quantity}`).join('; '),
                    subtotal:        orderData.subtotal,
                    shipping_charge: shippingDetails.shippingCharge || 0,
                    discount:        orderData.discount || 0,
                    total_amount:    orderData.total,
                    payment_method:  paymentMethod,
                    payment_status:  paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid Online',
                    coupon_code:     orderData.couponCode || '',
                    item_count:      orderData.items.length,
                    product_summary: productSummary,
                    total_qty:       totalQty
                });
                fetch(SHEETS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: sheetsPayload
                }).then(() => console.log('Sheets sync request sent ✅'))
                  .catch(e => console.error('Sheets sync error:', e));

                // ── FIREBASE SAVE ──────────────────────────────────────────
                if (db) {
                    const orderRef = db.ref('orders/' + orderId);
                    orderRef.set(orderData)
                        .then(() => console.log('Firebase save ✅', orderId))
                        .catch(e => console.error('Firebase save error:', e));
                    const phone = (shippingDetails.phone || '').replace(/[^0-9]/g, '');
                    if (phone) db.ref(`orders-by-phone/${phone}/${orderId}`).set(orderData).catch(() => {});
                    if (app.currentUser) db.ref(`users/${app.currentUser.uid}/orders/${orderId}`).set(orderData).catch(() => {});
                }

                // Clear cart
                app.cart = [];
                app.cartManager.save();
                app.cartManager.updateCartCount();

                // --- SUCCESS MODAL POPUP ---
                const method = paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment';
                const modal = document.createElement('div');
                modal.id = 'order-success-modal';
                modal.style.cssText = `
                    position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:99999;
                    display:flex; align-items:center; justify-content:center; padding:1rem;
                    animation: fadeInModal 0.4s ease;
                `;
                modal.innerHTML = `
                    <style>
                        @keyframes fadeInModal { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
                        #order-success-modal .modal-box { background:#111; border:1px solid #C9A84C; border-radius:16px; padding:2.5rem 2rem; max-width:420px; width:100%; text-align:center; font-family:'Inter',sans-serif; }
                        #order-success-modal .check-icon { font-size:3.5rem; margin-bottom:0.75rem; }
                        #order-success-modal h2 { color:#C9A84C; font-family:'Playfair Display',serif; font-size:1.8rem; margin-bottom:0.5rem; }
                        #order-success-modal p { color:#aaa; font-size:0.95rem; margin:0.4rem 0; line-height:1.6; }
                        #order-success-modal .order-id-box { background:rgba(201,168,76,0.1); border:1px dashed rgba(201,168,76,0.4); border-radius:8px; padding:0.75rem 1rem; margin:1.25rem 0; }
                        #order-success-modal .order-id-box strong { color:#C9A84C; font-size:1.4rem; letter-spacing:3px; }
                        #order-success-modal .order-id-box small { display:block; color:#888; font-size:0.75rem; margin-bottom:0.25rem; }
                        #order-success-modal .modal-btn { display:inline-block; margin-top:1.25rem; background:#C9A84C; color:#000; padding:0.75rem 2rem; border-radius:6px; font-weight:700; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; border:none; cursor:pointer; transition:background 0.3s; }
                        #order-success-modal .modal-btn:hover { background:#b8922e; }
                    </style>
                    <div class="modal-box">
                        <div class="check-icon">✅</div>
                        <h2>Order Confirmed!</h2>
                        <p>Thank you, <strong style="color:#fff">${shippingDetails.name}</strong>!</p>
                        <p>Your order has been placed successfully via <strong style="color:#fff">${method}</strong>.</p>
                        <div class="order-id-box">
                            <small>Your Order ID</small>
                            <strong>#${orderId}</strong>
                        </div>
                        <p>A confirmation email has been sent to <strong style="color:#fff">${shippingDetails.email}</strong>.</p>
                        <p style="font-size:0.82rem; color:#666; margin-top:0.5rem;">Delivery within 5–7 business days.</p>
                        <button class="modal-btn" onclick="window.location.href='./index.html'">Continue Shopping</button>
                    </div>
                `;
                document.body.appendChild(modal);
            }
        },

        // --- 10. SEARCH MODULE ---
        search: {
            performSearch(query) {
                const resultsContainer = document.getElementById('search-results');
                if (!resultsContainer) return;
                if (query.length < 2) {
                    resultsContainer.innerHTML = '';
                    return;
                }
                const lowerQuery = query.toLowerCase();
                const results = app.products.filter(p =>
                    p.name.toLowerCase().includes(lowerQuery) ||
                    (p.family && p.family.join(' ').toLowerCase().includes(lowerQuery)) ||
                    (p.notes && p.notes.toLowerCase().includes(lowerQuery))
                ).slice(0, 5);

                resultsContainer.innerHTML = results.length ?
                    results.map(p => this.createSearchResultHTML(p)).join('') :
                    '<p>No results found.</p>';
            },

            createSearchResultHTML(product) {
                const pageUrl = app.getProductPageUrl(product.id);
                return `
                    <a href="${pageUrl}" class="search-result-item">
                        <img src="./images/${product.images[0]}" alt="${product.name}">
                        <div>
                            <h4>${product.name}</h4>
                            <p>₹${product.price}</p>
                        </div>
                    </a>
                `;
            }
        },

        // --- 11. QUIZ MODULE ---
        quiz: {
            answers: {},
            currentQuestion: 0,
            questions: [
                { id: 1, text: "1. What's your ideal vibe for an evening out?", options: { woody: "Confident & Commanding", oriental: "Mysterious & Seductive", fresh: "Effortless & Casual", gourmand: "Playful & Sweet" }},
                { id: 2, text: "2. Pick a setting that calls to you:", options: { fresh: "A breezy beach house", woody: "A crackling fireplace in a cabin", gourmand: "A bustling Parisian bakery", floral: "A sun-drenched secret garden" }},
                { id: 3, text: "3. Choose a drink:", options: { oriental: "Spiced old fashioned", gourmand: "Rich hot chocolate", fresh: "Classic gin & tonic", woody: "Aged single malt" }},
                { id: 4, text: "4. Your preferred style is:", options: { woody: "Timeless & classic", floral: "Elegant & chic", fresh: "Minimalist & clean", oriental: "Bold & expressive" }}
            ],

            init() {
                const quizContainer = document.getElementById('quiz-container');
                if (!quizContainer) return;

                this.currentQuestion = 0;
                this.answers = {};
                this.renderQuestion(quizContainer);
            },

            renderQuestion(container) {
                if (this.currentQuestion >= this.questions.length) {
                    this.calculateResult(container);
                    return;
                }

                const q = this.questions[this.currentQuestion];
                const optionsHTML = Object.entries(q.options).map(([key, text]) => `
                    <button class="quiz-option btn btn-secondary" data-value="${key}">${text}</button>
                `).join('');

                container.innerHTML = `
                    <div class="quiz-question">
                        <div class="quiz-progress">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
                        <h3>${q.text}</h3>
                        <div class="quiz-options">${optionsHTML}</div>
                    </div>
                `;

                container.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.answers[q.id] = btn.dataset.value;
                        this.currentQuestion++;
                        this.renderQuestion(container);
                    });
                });
            },

            calculateResult(container) {
                const scores = {};
                for (const answer of Object.values(this.answers)) {
                    scores[answer] = (scores[answer] || 0) + 1;
                }
                const topChoice = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

                const recommendations = {
                    woody: 'the-warden-50',
                    oriental: 'the-affair-50',
                    fresh: 'the-expanse-50',
                    gourmand: 'the-murk-50',
                    floral: 'the-muse-50'
                };

                const resultId = recommendations[topChoice] || 'the-genesis-50';
                this.showResult(resultId, container);
            },

            showResult(productId, container) {
                const product = app.products.find(p => p.id === productId);
                if (!product || !container) return;
                const pageUrl = app.getProductPageUrl(productId);

                container.innerHTML = `
                    <div class="quiz-result">
                        <h2>Your Perfect Match</h2>
                        <div class="quiz-result-card">
                            <img src="./images/${product.images[0]}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p class="current-price">₹${product.price}</p>
                            ${product.notes ? `<p>${product.notes}</p>` : ''}
                            <a href="${pageUrl}" class="btn btn-primary">View Fragrance</a>
                        </div>
                        <button class="btn btn-secondary retake-quiz-btn" style="margin-top: 1rem;">Retake Quiz</button>
                    </div>
                `;

                container.querySelector('.retake-quiz-btn')?.addEventListener('click', () => {
                    this.currentQuestion = 0;
                    this.answers = {};
                    this.renderQuestion(container);
                });
            }
        },

        // --- 12. PROFILE & ORDER TRACKING MODULE ---
        profileManager: {
            initProfilePage() {
                // Tab navigation
                const tabs = document.querySelectorAll('.profile-tab');
                tabs.forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = tab.dataset.target;
                        if (!targetId) return;

                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');

                        document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));
                        const target = document.getElementById(targetId);
                        if (target) target.classList.add('active');
                    });
                });

                // Logout button
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', async (e) => {
                        e.preventDefault();
                        try {
                            await firebase.auth().signOut();
                            app.showToast('Logged out successfully');
                            window.location.href = './index.html';
                        } catch (err) {
                            console.error('Logout error:', err);
                        }
                    });
                }

                // Track order by phone
                const trackBtn = document.getElementById('track-order-btn');
                const trackInput = document.getElementById('track-phone-input');
                if (trackBtn && trackInput) {
                    trackBtn.addEventListener('click', () => {
                        const phone = trackInput.value.replace(/[^0-9]/g, '');
                        if (phone.length < 10) {
                            app.showToast('Please enter a valid 10-digit phone number', 'error');
                            return;
                        }
                        this.loadOrdersByPhone(phone);
                    });
                    trackInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') trackBtn.click();
                    });
                }

                // If logged in, auto-load orders
                if (app.currentUser) {
                    this.loadUserOrders();
                }
            },

            loadUserOrders() {
                if (!db || !app.currentUser) return;
                const container = document.getElementById('order-history-container');
                if (!container) return;

                container.innerHTML = '<p class="loading-text">Loading your orders...</p>';

                db.ref(`users/${app.currentUser.uid}/orders`).orderByChild('createdAt').once('value')
                    .then(snapshot => {
                        if (!snapshot.exists()) {
                            container.innerHTML = '<p>No orders found. <a href="./shop.html">Start shopping!</a></p>';
                            return;
                        }
                        const orders = [];
                        snapshot.forEach(child => orders.push(child.val()));
                        orders.reverse(); // newest first
                        this.renderOrders(orders, container);
                    })
                    .catch(err => {
                        console.error('Load orders error:', err);
                        container.innerHTML = '<p>Could not load orders. Please try again later.</p>';
                    });
            },

            loadOrdersByPhone(phone) {
                if (!db) return;
                const container = document.getElementById('order-history-container');
                if (!container) return;

                container.innerHTML = '<p class="loading-text">Searching orders...</p>';

                // Switch to orders tab
                document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));
                const ordersTab = document.querySelector('[data-target="orders-content"]');
                const ordersContent = document.getElementById('orders-content');
                if (ordersTab) ordersTab.classList.add('active');
                if (ordersContent) ordersContent.classList.add('active');

                db.ref(`orders-by-phone/${phone}`).orderByChild('createdAt').once('value')
                    .then(snapshot => {
                        if (!snapshot.exists()) {
                            container.innerHTML = `<p>No orders found for phone number ending in ...${phone.slice(-4)}. Please check the number and try again.</p>`;
                            return;
                        }
                        const orders = [];
                        snapshot.forEach(child => orders.push(child.val()));
                        orders.reverse();
                        this.renderOrders(orders, container);
                        app.showToast(`Found ${orders.length} order(s)!`);
                    })
                    .catch(err => {
                        console.error('Phone order lookup error:', err);
                        container.innerHTML = '<p>Could not load orders. Please try again later.</p>';
                    });
            },

            renderOrders(orders, container) {
                container.innerHTML = orders.map(order => {
                    const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    });
                    const itemsList = (order.items || []).map(item =>
                        `<span class="order-item-tag">${item.name} \u00d7 ${item.quantity}</span>`
                    ).join('');
                    const statusClass = order.status === 'paid' ? 'status-paid' :
                                        order.status === 'confirmed' ? 'status-confirmed' : 'status-default';
                    const payLabel = order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment';

                    return `
                        <div class="order-card">
                            <div class="order-card-header">
                                <div>
                                    <span class="order-date">${date}</span>
                                    <span class="order-status ${statusClass}">${order.status || 'processing'}</span>
                                </div>
                                <span class="order-total">\u20b9${order.total}</span>
                            </div>
                            <div class="order-card-items">${itemsList}</div>
                            <div class="order-card-footer">
                                <span class="order-payment">${payLabel}</span>
                                ${order.couponCode ? `<span class="order-coupon">Coupon: ${order.couponCode}</span>` : ''}
                                ${order.orderId ? `<span class="order-id">ID: ${order.orderId.slice(-8)}</span>` : ''}
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    };

    // --- MAKE APP GLOBAL ---
    window.app = app;

    // --- START THE APP ---
    app.init();
});
