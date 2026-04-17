document.addEventListener("DOMContentLoaded", () => {

    // --- 1. CONFIGURATION & DATABASE ---

    // !! IMPORTANT !! PASTE YOUR FIREBASE CONFIG HERE
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_AUTH_DOMAIN_HERE",
        projectId: "YOUR_PROJECT_ID_HERE",
        storageBucket: "YOUR_STORAGE_BUCKET_HERE",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
        appId: "YOUR_APP_ID_HERE"
    };

    // Razorpay and EmailJS Keys
    const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID_HERE";
    const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID_HERE";
    const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID_HERE";
    const EMAILJS_USER_ID = "YOUR_EMAILJS_USER_ID_HERE";

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // The single source of truth for all product data
    const allProducts = {
        // ... (Product data will be defined inside the app object)
    };

    // --- 2. THE MAIN APP OBJECT ---

    const app = {
        products: [
            // Your entire product database goes here
            { id: 'the-poem', name: 'The Poem', price: 399, mrp: 599, images: ['1.webp', '2.webp', '3.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'], bestFor: 'Romantic nights, festive occasions' },
            { id: 'the-expanse', name: 'The Expanse', price: 399, mrp: 599, images: ['4.webp', '5.webp', '6.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Aquatic', 'Fresh'], bestFor: 'Summer days, holidays, casual wear' },
            // ... Add ALL 9 individual 50ml products here
            // ... Add ALL 9 individual 20ml products here
            { id: 'the-poem-20', name: 'The Poem', price: 199, mrp: 299, images: ['28.webp', '29.webp', '3.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'] },
            // ... Add all Trial Packs
            { id: 'trial-him', name: 'Trial Pack – For Him', price: 99, mrp: 99, images: ['46.webp'], category: 'trial', contents: ['the-forge', 'the-expanse', 'the-warden'] },
            // ... Add all Combo Packs
            { id: 'combo-him-20ml', name: 'Combo For Him (3 x 20ml)', price: 499, mrp: 999, images: ['50.webp'], category: 'combo-him' }
        ],

        // --- INITIALIZATION ---
        init() {
            this.renderSharedComponents();
            this.auth.init();
            
            // Page specific initializers
            if (document.body.querySelector('.hero-slider-section')) this.initHomePage();
            if (document.body.querySelector('.shop-page')) this.initShopPage();
            if (document.body.querySelector('.product-detail-page')) this.initProductPage();
            if (document.body.querySelector('.auth-page')) this.auth.initAuthPage();
            if (document.body.querySelector('.wishlist-page')) this.wishlist.initWishlistPage();
            // ... other page inits
        },

        // --- SHARED COMPONENT RENDERING ---
        renderSharedComponents() {
            // Renders Navbar and Footer on every page to keep HTML clean
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');
            
            if (header) {
                header.innerHTML = `
                    <nav class="navbar">
                        <a href="./index.html" class="navbar-logo"><img src="./images/etrem.webp" alt="ETREM Logo"></a>
                        <ul class="nav-menu">
                            <li><a href="./shop.html" class="nav-link">Shop</a></li>
                            <li><a href="./about.html" class="nav-link">About</a></li>
                            <li><a href="./quiz.html" class="nav-link">Scent Quiz</a></li>
                        </ul>
                        <div class="nav-actions">
                            <button class="nav-action-btn" id="search-icon"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
                            <a href="./wishlist.html" class="nav-action-btn"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></a>
                            <a href="#" id="auth-link" class="nav-action-btn">Login</a>
                            <a href="./cart.html" class="nav-action-btn"><svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 11H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg><span class="cart-item-count">0</span></a>
                        </div>
                    </nav>
                `;
            }
            if (footer) {
                // ... Render footer HTML
            }
        },

        // --- HOMEPAGE LOGIC ---
        initHomePage() {
            // Hero Slider Logic
            // Populate featured products
        },

        // --- SHOP PAGE LOGIC ---
        initShopPage() {
            this.shop.renderProducts(this.products);
            this.shop.addEventListeners();
        },

        shop: {
            filters: { gender: [], family: [], price: null, category: 'all' },
            sortBy: 'newest',
            renderProducts(productsToRender) {
                const grid = document.getElementById('shop-product-grid');
                grid.innerHTML = productsToRender.map(p => this.createProductCardHTML(p)).join('');
            },
            applyFiltersAndSort() {
                let filtered = [...app.products];
                // Apply all filters and sorting logic here...
                this.renderProducts(filtered);
            },
            addEventListeners() {
                // Add listeners for all checkboxes, radios, and dropdowns
                // On change, update this.filters and call this.applyFiltersAndSort()
            },
            createProductCardHTML(product) {
                // Return the HTML string for a single product card
                return `<div class="product-card" data-id="${product.id}">...</div>`;
            }
        },
        
        // --- PRODUCT PAGE LOGIC ---
        initProductPage() {
            // Logic for image gallery, size selection, share button, etc.
        },

        // --- AUTHENTICATION LOGIC ---
        auth: {
            user: null,
            init() {
                auth.onAuthStateChanged(user => {
                    this.user = user;
                    app.updateAuthUI(user);
                });
            },
            initAuthPage() {
                // Add listeners for login, signup, google signin forms
            },
            // ... other auth methods: signUp, logIn, logOut, signInWithGoogle
        },
        
        updateAuthUI(user) {
            const authLink = document.getElementById('auth-link');
            if (user) {
                authLink.textContent = 'My Account';
                authLink.href = './profile.html';
            } else {
                authLink.textContent = 'Login';
                authLink.href = './login.html';
            }
        },

        // --- WISHLIST LOGIC ---
        wishlist: {
            async initWishlistPage() {
                // check if user is logged in, if not, redirect
                // fetch wishlist from firestore
                // render products
            },
            toggleWishlistItem(productId) {
                // add or remove item from firestore
            }
        },
        
        // ... Other modules for Cart, Checkout, Search, Quiz
    };

    // --- START THE APP ---
    app.init();
});