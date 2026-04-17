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

    const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_HERE"; 
    const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID_HERE";
    const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID_HERE";
    const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY_HERE";

    // Initialize Firebase
    let auth, db;
try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.database();
} catch (error) { 
        console.error("Firebase initialization failed:", error);
    }

    // --- 2. THE MAIN APP OBJECT & PRODUCT DATABASE ---

    const app = {
        products: [
            // Individuals 50ml
            { id: 'the-poem-50', name: 'The Poem', price: 399, mrp: 599, images: ['1.webp', '2.webp', '3.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'], bestFor: 'Romantic nights, festive occasions', notes: 'Lavender, Cardamom, Tobacco, Vanilla, Musk, Amber', bestSeller: true },
            { id: 'the-expanse-50', name: 'The Expanse', price: 399, mrp: 599, images: ['4.webp', '5.webp', '6.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Aquatic', 'Fresh'], bestFor: 'Summer days, holidays, casual wear', notes: 'Sea Notes, Grapefruit, Ambergris, Oakmoss', bestSeller: true },
            { id: 'the-forge-50', name: 'The Forge', price: 399, mrp: 599, images: ['7.webp', '8.webp', '9.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Aromatic', 'Woody'], bestFor: 'Evenings, date nights, formal gatherings', notes: 'Grapefruit, Tobacco, Amber, Cedar' },
            { id: 'the-muse-50', name: 'The Muse', price: 399, mrp: 599, images: ['10.webp', '11.webp', '12.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Floral', 'Aquatic'], bestFor: 'Office to casual evenings', notes: 'Floral, Aquatic, Fruity, Citrus, Ozonic' },
            { id: 'the-affair-50', name: 'The Affair', price: 399, mrp: 599, images: ['13.webp', '14.webp', '15.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Gourmand', 'Oriental'], bestFor: 'Evenings, parties, intimate moments', notes: 'Almond, Coffee, Cacao Vanilla, Sandalwood', bestSeller: true },
            { id: 'the-warden-50', name: 'The Warden', price: 399, mrp: 599, images: ['16.webp', '17.webp', '18.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Woody', 'Aromatic'], bestFor: 'Professionals, formal events, daily wear', notes: 'Bergamot, Lavender, Patchouli, Vetiver', bestSeller: true },
            { id: 'the-genesis-50', name: 'The Genesis', price: 399, mrp: 599, images: ['19.webp', '20.webp', '21.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Fruity', 'Gourmand'], bestFor: 'Daily wear, versatile day-to-night', notes: 'Ripe Fruits, Creamy Vanilla, Musk' },
            { id: 'the-murk-50', name: 'The Murk', price: 399, mrp: 599, images: ['22.webp', '23.webp', '24.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Gourmand', 'Oriental'], bestFor: 'Intimate evenings, all seasons', notes: 'Cinnamon, Pear, Jasmine, Coffee, Bourbon Vanilla' },
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
        ],
        cart: [],
        wishlistItems: [],
        currentUser: null,

        // --- CORE INITIALIZATION ---
renderSharedComponents() {
            // Add your header/footer/nav render logic here
        },

        initHomePage() {
            // Add your hero slider and home page logic here
        },

        initShopPage() {
            this.shop.initShopPage();
        },

        init() {
            this.cart = JSON.parse(localStorage.getItem('etremCart')) || [];
            this.renderSharedComponents();
            this.auth.init(); // This will also trigger UI updates after checking auth state

            // Page-specific initializers
            const page = document.body.className;
            if (document.querySelector('.hero-slider-section')) this.initHomePage();
            if (document.querySelector('.shop-page')) this.initShopPage();
            if (document.querySelector('.product-detail-page')) this.initProductPage();
            if (document.querySelector('.auth-page')) this.auth.initAuthPage();
            if (document.querySelector('.wishlist-page')) this.wishlist.initWishlistPage();
            if (document.querySelector('.cart-page')) this.cartManager.initCartPage();
            if (document.querySelector('.checkout-page')) this.checkout.initCheckoutPage();
            if (document.querySelector('.quiz-page')) this.quiz.init();
            
            this.cartManager.updateCartCount();
        },

        // [PASTE THIS CODE INSIDE THE 'app' OBJECT]

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
                app.wishlist.updateAllHeartIcons(); // Update hearts after rendering
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
                    const [min, max] = this.filters.price.split('-').map(Number);
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
                        // Assuming order in array is newest first
                        break;
                }
                
                this.renderProducts(filtered);
            },

            addEventListeners() {
                // ... Event listeners for shop filters, sorting, and tabs
            },

            createProductCardHTML(product) {
                const isWishlisted = app.wishlist.includes(product.id);
                const pageUrl = `product-${product.id.split('-')[1]}.html`; // simplified url generation
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
                        </div>
                        <div class="product-card-actions">
                            <button class="btn btn-primary btn-block add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
            },
        },


        // --- 7. WISHLIST MODULE ---
        wishlist: {
            items: [],

            initWishlistPage() {
                if (!app.currentUser) {
                    document.getElementById('wishlist-content').innerHTML = `<p>Please <a href="./login.html">login</a> to see your wishlist.</p>`;
                    return;
                }
                this.renderWishlistPage();
            },

            async fetchWishlist() {
                if (!app.currentUser) return;
                try {
                    const snapshot = await firebase.database().ref(`wishlists/${app.currentUser.uid}`).once('value');
                    this.items = snapshot.val() ? Object.keys(snapshot.val()) : [];
                    this.updateAllHeartIcons();
                    if (document.body.classList.contains('wishlist-page')) {
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
                const wishlistRef = firebase.database().ref(`wishlists/${app.currentUser.uid}/${productId}`);
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
                document.querySelectorAll('.wishlist-btn').forEach(btn => {
                    this.updateHeartIcon(btn.dataset.productId);
                });
            },

            renderWishlistPage() {
                const grid = document.getElementById('wishlist-content');
                if (this.items.length === 0) {
                    grid.innerHTML = `<p>Your wishlist is empty. Start exploring!</p>`;
                    return;
                }
                const wishlistedProducts = app.products.filter(p => this.items.includes(p.id));
                grid.innerHTML = wishlistedProducts.map(p => app.shop.createProductCardHTML(p)).join('');
            }
        },

        // --- 8. CART MODULE ---
        cartManager: {
            initCartPage() {
                this.renderCartPage();
            },

            add(productId, quantity = 1) {
                const product = app.products.find(p => p.id === productId);
                if (!product) return;

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
            },

            save() {
                localStorage.setItem('etremCart', JSON.stringify(app.cart));
                this.updateCartCount();
            },

            updateCartCount() {
                const count = app.cart.reduce((sum, item) => sum + item.quantity, 0);
                document.querySelectorAll('.cart-item-count').forEach(el => el.textContent = count);
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
                                <button class="qty-btn" onclick="app.cartManager.update('${product.id}', ${item.quantity - 1})">−</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="app.cartManager.update('${product.id}', ${item.quantity + 1})">+</button>
                            </div>
                            <p class="cart-item-total">₹${product.price * item.quantity}</p>
                            <button class="remove-btn" onclick="app.cartManager.remove('${product.id}')">✕</button>
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
            }
        },

        // --- 9. CHECKOUT MODULE ---
        checkout: {
            initCheckoutPage() {
                // ... Logic to populate checkout summary from cart
            },
            
            placeOrder() {
                // ... Logic to validate form, create order object
                // ... Call Razorpay or save as COD
            }
        },

        // --- 10. SEARCH MODULE ---
        search: {
            init() {
                const searchIcon = document.getElementById('search-icon');
                const searchOverlay = document.getElementById('search-overlay');
                const closeSearch = document.getElementById('close-search');
                const searchInput = document.getElementById('search-input');

                searchIcon.addEventListener('click', () => searchOverlay.classList.add('active'));
                closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
                searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
            },

            performSearch(query) {
                const resultsContainer = document.getElementById('search-results');
                if (query.length < 2) {
                    resultsContainer.innerHTML = '';
                    return;
                }
                const lowerQuery = query.toLowerCase();
                const results = app.products.filter(p => 
                    p.name.toLowerCase().includes(lowerQuery) ||
                    (p.family && p.family.join(' ').toLowerCase().includes(lowerQuery)) ||
                    (p.notes && p.notes.toLowerCase().includes(lowerQuery))
                ).slice(0, 5); // Limit to 5 results

                resultsContainer.innerHTML = results.length ? 
                    results.map(p => this.createSearchResultHTML(p)).join('') :
                    '<p>No results found.</p>';
            },

            createSearchResultHTML(product) {
                 const pageUrl = `product-${product.id.split('-')[1]}.html`; // simplified
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
            questions: [
                { id: 1, text: "1. What's your ideal vibe for an evening out?", options: { woody: "Confident & Commanding", oriental: "Mysterious & Seductive", fresh: "Effortless & Casual", gourmand: "Playful & Sweet" }},
                { id: 2, text: "2. Pick a setting that calls to you:", options: { fresh: "A breezy beach house", woody: "A crackling fireplace in a cabin", gourmand: "A bustling Parisian bakery", floral: "A sun-drenched secret garden" }},
                { id: 3, text: "3. Choose a drink:", options: { oriental: "Spiced old fashioned", gourmand: "Rich hot chocolate", fresh: "Classic gin & tonic", woody: "Aged single malt" }},
                { id: 4, text: "4. Your preferred style is:", options: { woody: "Timeless & classic", floral: "Elegant & chic", fresh: "Minimalist & clean", oriental: "Bold & expressive" }}
            ],
            
            init() {
                // ... Full quiz logic to show questions and calculate result
            },
            
            calculateResult() {
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
                
                const resultId = recommendations[topChoice] || 'the-genesis-50'; // Default
                this.showResult(resultId);
            },
            
            showResult(productId) {
                // ... Logic to hide quiz and show the result product card
            }
        }
    };

    // --- START THE APP ---
    app.init();
});
