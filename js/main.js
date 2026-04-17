document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // --- 1. CONFIGURATION & API KEYS ---
    // !! REPLACE ALL PLACEHOLDERS BELOW WITH YOUR REAL KEYS !!
    // =========================================================

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_AUTH_DOMAIN_HERE",
        projectId: "YOUR_PROJECT_ID_HERE",
        storageBucket: "YOUR_STORAGE_BUCKET_HERE",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
        appId: "YOUR_APP_ID_HERE"
    };

    const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID_HERE";
    const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID_HERE";
    const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID_HERE";
    const EMAILJS_USER_ID = "YOUR_EMAILJS_USER_ID_HERE";
    const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Your WhatsApp number with country code, no +
    const COMPANY_GSTIN = "YOUR_GSTIN_HERE";
    const COMPANY_ADDRESS = "YOUR_COMPANY_ADDRESS_HERE";

    // =========================================================
    // --- 2. FIREBASE INITIALIZATION ---
    // =========================================================
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // =========================================================
    // --- 3. PRODUCT DATABASE ---
    // Add ALL your products here. This is the single source of truth.
    // =========================================================
    const ALL_PRODUCTS = [
        // --- Individual 50ml ---
        { id: 'the-poem', name: 'The Poem', price: 399, mrp: 599, images: ['images/products/1.webp', 'images/products/2.webp', 'images/products/3.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'], bestFor: 'Romantic nights, festive occasions', description: 'A deeply poetic fragrance that speaks without words.', url: './product-the-poem.html' },
        { id: 'the-expanse', name: 'The Expanse', price: 399, mrp: 599, images: ['images/products/4.webp', 'images/products/5.webp', 'images/products/6.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Aquatic', 'Fresh'], bestFor: 'Summer days, holidays, casual wear', description: 'Boundless, open, and free — like the horizon.', url: './product-the-expanse.html' },
        { id: 'the-forge', name: 'The Forge', price: 399, mrp: 599, images: ['images/products/7.webp', 'images/products/8.webp', 'images/products/9.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Woody', 'Aromatic'], bestFor: 'Office, formal events', description: 'Raw power, refined.', url: './product-the-forge.html' },
        { id: 'the-genesis', name: 'The Genesis', price: 399, mrp: 599, images: ['images/products/10.webp', 'images/products/11.webp', 'images/products/12.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Fresh', 'Woody'], bestFor: 'Everyday wear, work, travel', description: 'The beginning of something extraordinary.', url: './product-the-genesis.html' },
        { id: 'the-murk', name: 'The Murk', price: 399, mrp: 599, images: ['images/products/13.webp', 'images/products/14.webp', 'images/products/15.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Woody', 'Oriental'], bestFor: 'Nights out, special events', description: 'Deep, dark, and irresistible.', url: './product-the-murk.html' },
        { id: 'the-muse', name: 'The Muse', price: 399, mrp: 599, images: ['images/products/16.webp', 'images/products/17.webp', 'images/products/18.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Floral', 'Gourmand'], bestFor: 'Dates, evenings, festive occasions', description: 'Inspiring, playful, unforgettable.', url: './product-the-muse.html' },
        { id: 'the-warden', name: 'The Warden', price: 399, mrp: 599, images: ['images/products/19.webp', 'images/products/20.webp', 'images/products/21.webp'], category: 'individual-50ml', gender: 'Masculine', family: ['Woody', 'Aromatic'], bestFor: 'Formal events, boardroom, power meetings', description: 'Authority in a bottle.', url: './product-the-warden.html' },
        { id: 'the-affair', name: 'The Affair', price: 399, mrp: 599, images: ['images/products/22.webp', 'images/products/23.webp', 'images/products/24.webp'], category: 'individual-50ml', gender: 'Feminine', family: ['Oriental', 'Floral'], bestFor: 'Romantic evenings, special occasions', description: 'A secret worth keeping.', url: './product-the-affair.html' },
        { id: 'the-reign', name: 'The Reign', price: 399, mrp: 599, images: ['images/products/25.webp', 'images/products/26.webp', 'images/products/27.webp'], category: 'individual-50ml', gender: 'Unisex', family: ['Oriental', 'Woody'], bestFor: 'Evenings, celebrations', description: 'Rule every room you enter.', url: './product-the-reign.html' },
        // --- Individual 20ml ---
        { id: 'the-poem-20', name: 'The Poem (20ml)', price: 199, mrp: 299, images: ['images/products/28.webp', 'images/products/29.webp', 'images/products/3.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Aromatic', 'Oriental'], url: './product-the-poem.html' },
        { id: 'the-expanse-20', name: 'The Expanse (20ml)', price: 199, mrp: 299, images: ['images/products/4.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Aquatic', 'Fresh'], url: './product-the-expanse.html' },
        { id: 'the-forge-20', name: 'The Forge (20ml)', price: 199, mrp: 299, images: ['images/products/7.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Woody', 'Aromatic'], url: './product-the-forge.html' },
        { id: 'the-genesis-20', name: 'The Genesis (20ml)', price: 199, mrp: 299, images: ['images/products/10.webp'], category: 'individual-20ml', gender: 'Unisex', family: ['Fresh', 'Woody'], url: './product-the-genesis.html' },
        { id: 'the-murk-20', name: 'The Murk (20ml)', price: 199, mrp: 299, images: ['images/products/13.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Woody', 'Oriental'], url: './product-the-murk.html' },
        { id: 'the-muse-20', name: 'The Muse (20ml)', price: 199, mrp: 299, images: ['images/products/16.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Floral', 'Gourmand'], url: './product-the-muse.html' },
        { id: 'the-warden-20', name: 'The Warden (20ml)', price: 199, mrp: 299, images: ['images/products/19.webp'], category: 'individual-20ml', gender: 'Masculine', family: ['Woody', 'Aromatic'], url: './product-the-warden.html' },
        { id: 'the-affair-20', name: 'The Affair (20ml)', price: 199, mrp: 299, images: ['images/products/22.webp'], category: 'individual-20ml', gender: 'Feminine', family: ['Oriental', 'Floral'], url: './product-the-affair.html' },
        { id: 'the-reign-20', name: 'The Reign (20ml)', price: 199, mrp: 299, images: ['images/products/25.webp'], category: 'individual-20ml', gender: 'Unisex', family: ['Oriental', 'Woody'], url: './product-the-reign.html' },
        // --- Trial Packs ---
        { id: 'trial-him', name: 'Trial Pack – For Him', price: 99, mrp: 99, images: ['images/products/46.webp'], category: 'trial', gender: 'Masculine', family: [], contents: ['the-forge', 'the-expanse', 'the-warden'], description: '3 x 2ml samples of our bestselling masculine fragrances.', url: './product-trial-him.html' },
        { id: 'trial-her', name: 'Trial Pack – For Her', price: 99, mrp: 99, images: ['images/products/47.webp'], category: 'trial', gender: 'Feminine', family: [], contents: ['the-poem', 'the-muse', 'the-affair'], description: '3 x 2ml samples of our bestselling feminine fragrances.', url: './product-trial-her.html' },
        { id: 'trial-unisex', name: 'Trial Pack – Unisex', price: 99, mrp: 99, images: ['images/products/48.webp'], category: 'trial', gender: 'Unisex', family: [], contents: ['the-genesis', 'the-reign', 'the-expanse'], description: '3 x 2ml samples of our bestselling unisex fragrances.', url: './product-trial-unisex.html' },
        { id: 'trial-all', name: 'Trial Pack – All Scents', price: 149, mrp: 149, images: ['images/products/49.webp'], category: 'trial', gender: 'Unisex', family: [], description: 'Try all 9 fragrances in 2ml samples.', url: './product-trial-all.html' },
        // --- Combo Packs ---
        { id: 'combo-him-20ml', name: 'Combo For Him (3 x 20ml)', price: 499, mrp: 999, images: ['images/products/50.webp'], category: 'combo-him', gender: 'Masculine', family: [], description: 'Our top 3 masculine scents in 20ml each.', url: './product-combo-him-20ml.html' },
        { id: 'combo-him-50ml', name: 'Combo For Him (3 x 50ml)', price: 999, mrp: 1799, images: ['images/products/51.webp'], category: 'combo-him', gender: 'Masculine', family: [], description: 'Our top 3 masculine scents in full 50ml size.', url: './product-combo-him-50ml.html' },
        { id: 'combo-her-20ml', name: 'Combo For Her (3 x 20ml)', price: 499, mrp: 999, images: ['images/products/52.webp'], category: 'combo-her', gender: 'Feminine', family: [], description: 'Our top 3 feminine scents in 20ml each.', url: './product-combo-her-20ml.html' },
        { id: 'combo-her-50ml', name: 'Combo For Her (3 x 50ml)', price: 999, mrp: 1799, images: ['images/products/53.webp'], category: 'combo-her', gender: 'Feminine', family: [], description: 'Our top 3 feminine scents in full 50ml size.', url: './product-combo-her-50ml.html' },
        { id: 'combo-unisex-20ml', name: 'Combo Unisex (3 x 20ml)', price: 499, mrp: 999, images: ['images/products/54.webp'], category: 'combo-unisex', gender: 'Unisex', family: [], description: 'Our top 3 unisex scents in 20ml each.', url: './product-combo-unisex-20ml.html' },
    ];

    // =========================================================
    // --- 4. CART HELPER FUNCTIONS (localStorage based) ---
    // =========================================================
    const Cart = {
        get() {
            return JSON.parse(localStorage.getItem('etrem_cart') || '[]');
        },
        save(cart) {
            localStorage.setItem('etrem_cart', JSON.stringify(cart));
            this.updateCartIcon();
        },
        add(productId, quantity = 1) {
            const cart = this.get();
            const existing = cart.find(i => i.id === productId);
            if (existing) {
                existing.qty += quantity;
            } else {
                cart.push({ id: productId, qty: quantity });
            }
            this.save(cart);
            this.showToast('Added to cart!');
        },
        remove(productId) {
            const cart = this.get().filter(i => i.id !== productId);
            this.save(cart);
        },
        updateQty(productId, qty) {
            const cart = this.get();
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.qty = qty;
                if (item.qty <= 0) return this.remove(productId);
            }
            this.save(cart);
        },
        clear() {
            localStorage.removeItem('etrem_cart');
            this.updateCartIcon();
        },
        getTotal() {
            const cart = this.get();
            return cart.reduce((sum, item) => {
                const p = ALL_PRODUCTS.find(p => p.id === item.id);
                return p ? sum + p.price * item.qty : sum;
            }, 0);
        },
        updateCartIcon() {
            const el = document.querySelector('.cart-item-count');
            if (el) {
                const total = this.get().reduce((s, i) => s + i.qty, 0);
                el.textContent = total;
                el.style.display = total > 0 ? 'inline-block' : 'none';
            }
        },
        showToast(msg) {
            let toast = document.getElementById('cart-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'cart-toast';
                toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#222;color:#fff;padding:12px 20px;border-radius:8px;z-index:9999;font-size:14px;opacity:0;transition:opacity 0.3s;';
                document.body.appendChild(toast);
            }
            toast.textContent = msg;
            toast.style.opacity = '1';
            setTimeout(() => { toast.style.opacity = '0'; }, 2500);
        }
    };

    // =========================================================
    // --- 5. SHARED COMPONENTS (Navbar & Footer) ---
    // =========================================================
    function renderSharedComponents() {
        const header = document.querySelector('header');
        if (header) {
            header.innerHTML = `
                <nav class="navbar">
                    <a href="./index.html" class="navbar-logo">
                        <img src="./images/etrem.webp" alt="ETREM Logo" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\'font-size:1.5rem;font-weight:900;letter-spacing:2px;\'>ETREM</span>';">
                    </a>
                    <ul class="nav-menu">
                        <li><a href="./shop.html" class="nav-link">Shop</a></li>
                        <li><a href="./about.html" class="nav-link">About</a></li>
                        <li><a href="./quiz.html" class="nav-link">Scent Quiz</a></li>
                        <li><a href="./blog.html" class="nav-link">Blog</a></li>
                    </ul>
                    <div class="nav-actions">
                        <div class="search-wrapper" style="position:relative;">
                            <button class="nav-action-btn" id="search-icon" aria-label="Search">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </button>
                            <div id="search-dropdown" style="display:none;position:absolute;top:40px;right:0;background:#fff;border:1px solid #ddd;border-radius:8px;width:300px;z-index:9999;padding:8px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
                                <input type="text" id="search-input" placeholder="Search fragrances..." style="width:100%;padding:8px 12px;border:1px solid #eee;border-radius:4px;font-size:14px;box-sizing:border-box;">
                                <div id="search-results" style="max-height:300px;overflow-y:auto;margin-top:6px;"></div>
                            </div>
                        </div>
                        <a href="./wishlist.html" class="nav-action-btn" aria-label="Wishlist">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </a>
                        <a href="#" id="auth-link" class="nav-action-btn" style="font-size:13px;font-weight:600;">Login</a>
                        <a href="./cart.html" class="nav-action-btn" aria-label="Cart" style="position:relative;">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 14.1 5.9 15 7 15h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            <span class="cart-item-count" style="position:absolute;top:-6px;right:-6px;background:#c0392b;color:#fff;border-radius:50%;width:16px;height:16px;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:700;">0</span>
                        </a>
                        <button class="hamburger" id="hamburger-btn" aria-label="Menu" style="display:none;background:none;border:none;cursor:pointer;padding:4px;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                        </button>
                    </div>
                </nav>
                <div id="mobile-menu" style="display:none;background:#fff;padding:16px;border-top:1px solid #eee;">
                    <a href="./shop.html" style="display:block;padding:10px 0;border-bottom:1px solid #f0f0f0;">Shop</a>
                    <a href="./about.html" style="display:block;padding:10px 0;border-bottom:1px solid #f0f0f0;">About</a>
                    <a href="./quiz.html" style="display:block;padding:10px 0;border-bottom:1px solid #f0f0f0;">Scent Quiz</a>
                    <a href="./blog.html" style="display:block;padding:10px 0;">Blog</a>
                </div>
            `;

            // Hamburger toggle
            const hamburger = document.getElementById('hamburger-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            hamburger.addEventListener('click', () => {
                mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
            });

            // Show hamburger on small screens
            if (window.innerWidth < 768) {
                hamburger.style.display = 'block';
                document.querySelector('.nav-menu').style.display = 'none';
            }

            // Search dropdown
            document.getElementById('search-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('search-dropdown');
                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                if (dropdown.style.display === 'block') document.getElementById('search-input').focus();
            });

            document.getElementById('search-input').addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                const resultsEl = document.getElementById('search-results');
                if (!query) { resultsEl.innerHTML = ''; return; }
                const matches = ALL_PRODUCTS.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    (p.family && p.family.some(f => f.toLowerCase().includes(query))) ||
                    (p.description && p.description.toLowerCase().includes(query))
                ).slice(0, 6);
                if (matches.length === 0) {
                    resultsEl.innerHTML = '<p style="padding:8px;color:#888;font-size:13px;">No results found.</p>';
                } else {
                    resultsEl.innerHTML = matches.map(p => `
                        <a href="${p.url}" style="display:flex;align-items:center;gap:10px;padding:8px;text-decoration:none;color:#222;border-radius:4px;transition:background 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='none'">
                            <img src="${p.images[0]}" alt="${p.name}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;" onerror="this.style.display='none'">
                            <span>
                                <strong style="font-size:13px;">${p.name}</strong><br>
                                <small style="color:#888;">₹${p.price}</small>
                            </span>
                        </a>
                    `).join('');
                }
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-wrapper')) {
                    const dd = document.getElementById('search-dropdown');
                    if (dd) dd.style.display = 'none';
                }
            });
        }

        const footer = document.querySelector('footer');
        if (footer) {
            footer.innerHTML = `
                <div class="footer-content" style="background:#111;color:#ccc;padding:40px 20px 20px;">
                    <div class="container" style="max-width:1200px;margin:0 auto;">
                        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;margin-bottom:32px;">
                            <div>
                                <h4 style="color:#fff;margin-bottom:12px;font-size:16px;">ETREM</h4>
                                <p style="font-size:13px;line-height:1.7;color:#999;">The Naked Perfume. Raw. Real. #Lastsforever</p>
                                <p style="font-size:12px;color:#666;margin-top:8px;">GSTIN: ${COMPANY_GSTIN}</p>
                                <p style="font-size:12px;color:#666;">${COMPANY_ADDRESS}</p>
                            </div>
                            <div>
                                <h4 style="color:#fff;margin-bottom:12px;font-size:16px;">Shop</h4>
                                <ul style="list-style:none;padding:0;margin:0;">
                                    <li><a href="./shop.html" style="color:#999;text-decoration:none;font-size:13px;line-height:2;">All Products</a></li>
                                    <li><a href="./product-trial-all.html" style="color:#999;text-decoration:none;font-size:13px;line-height:2;">Trial Packs</a></li>
                                    <li><a href="./quiz.html" style="color:#999;text-decoration:none;font-size:13px;line-height:2;">Scent Quiz</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="color:#fff;margin-bottom:12px;font-size:16px;">Help</h4>
                                <ul style="list-style:none;padding:0;margin:0;">
                                    <li><a href="./shipping-returns.html" style="color:#999;text-decoration:none;font-size:13px;line-height:2;">Shipping & Returns</a></li>
                                    <li><a href="./privacy-policy.html" style="color:#999;text-decoration:none;font-size:13px;line-height:2;">Privacy Policy</a></li>
                                    <li><a href="./contact.html" style="color:#999;text-decoration:none;font-size:13px;line-height:2;">Contact Us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="color:#fff;margin-bottom:12px;font-size:16px;">Connect</h4>
                                <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" style="color:#25D366;font-size:13px;text-decoration:none;">💬 WhatsApp Us</a>
                                <p style="margin-top:12px;font-size:13px;color:#999;">Pan-India Delivery<br>Fast & Secure</p>
                            </div>
                        </div>
                        <div style="border-top:1px solid #333;padding-top:16px;text-align:center;font-size:12px;color:#555;">
                            © ${new Date().getFullYear()} ETREM. All rights reserved.
                        </div>
                    </div>
                </div>
            `;
        }

        // Update cart icon count
        Cart.updateCartIcon();
    }

    // =========================================================
    // --- 6. AUTH STATE LISTENER ---
    // =========================================================
    function initAuth() {
        auth.onAuthStateChanged(user => {
            const authLink = document.getElementById('auth-link');
            if (authLink) {
                if (user) {
                    authLink.textContent = 'My Account';
                    authLink.href = './profile.html';
                } else {
                    authLink.textContent = 'Login';
                    authLink.href = './login.html';
                }
            }
            // Store user globally
            window._etremUser = user;
        });
    }

    // =========================================================
    // --- 7. PRODUCT CARD HTML HELPER ---
    // =========================================================
    function createProductCardHTML(product) {
        const discount = product.mrp > product.price
            ? Math.round((1 - product.price / product.mrp) * 100) : 0;
        return `
            <div class="product-card" data-id="${product.id}" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);transition:transform 0.2s,box-shadow 0.2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 12px rgba(0,0,0,0.08)';">
                <a href="${product.url || '#'}" style="text-decoration:none;color:inherit;">
                    <div style="position:relative;aspect-ratio:1;overflow:hidden;background:#f8f8f8;">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy"
                             style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s;"
                             onerror="this.style.display='none';this.parentElement.style.background='#eee';"
                             onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        ${discount > 0 ? `<span style="position:absolute;top:8px;left:8px;background:#c0392b;color:#fff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700;">${discount}% OFF</span>` : ''}
                        <button class="wishlist-btn" data-id="${product.id}" title="Add to wishlist"
                            style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.9);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.2s;"
                            onclick="event.preventDefault();event.stopPropagation();handleWishlistToggle('${product.id}',this);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                    </div>
                    <div style="padding:14px;">
                        <p style="font-size:11px;color:#888;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">${product.gender || ''} ${product.family && product.family.length ? '· ' + product.family[0] : ''}</p>
                        <h3 style="font-size:15px;font-weight:700;margin:0 0 8px;color:#111;">${product.name}</h3>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="font-size:16px;font-weight:800;color:#111;">₹${product.price}</span>
                            ${product.mrp > product.price ? `<span style="font-size:13px;color:#aaa;text-decoration:line-through;">₹${product.mrp}</span>` : ''}
                        </div>
                    </div>
                </a>
                <div style="padding:0 14px 14px;">
                    <button onclick="Cart.add('${product.id}')" style="width:100%;background:#111;color:#fff;border:none;padding:10px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:0.5px;transition:background 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#111'">ADD TO CART</button>
                </div>
            </div>
        `;
    }

    // Make Cart global so onclick in HTML works
    window.Cart = Cart;

    // =========================================================
    // --- 8. WISHLIST HELPERS ---
    // =========================================================
    window.handleWishlistToggle = async function(productId, btn) {
        const user = window._etremUser;
        if (!user) {
            window.location.href = './login.html';
            return;
        }
        try {
            const ref = db.collection('users').doc(user.uid).collection('wishlist').doc(productId);
            const doc = await ref.get();
            if (doc.exists) {
                await ref.delete();
                btn.style.color = '#888';
                Cart.showToast('Removed from wishlist');
            } else {
                await ref.set({ addedAt: firebase.firestore.FieldValue.serverTimestamp() });
                btn.style.color = '#c0392b';
                Cart.showToast('Added to wishlist ♥');
            }
        } catch (e) {
            console.error('Wishlist error:', e);
        }
    };

    // =========================================================
    // --- 9. HOME PAGE ---
    // =========================================================
    function initHomePage() {
        // Hero slider
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelector('.slider-dots');
        let current = 0;
        let timer;

        if (slides.length) {
            // Create dots
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.style.cssText = `width:8px;height:8px;border-radius:50%;border:none;background:${i===0?'#fff':'rgba(255,255,255,0.5)'};cursor:pointer;padding:0;margin:0 3px;transition:background 0.3s;`;
                dot.addEventListener('click', () => goToSlide(i));
                if (dots) dots.appendChild(dot);
            });

            function goToSlide(n) {
                slides[current].classList.remove('active');
                current = (n + slides.length) % slides.length;
                slides[current].classList.add('active');
                if (dots) {
                    dots.querySelectorAll('button').forEach((d, i) => {
                        d.style.background = i === current ? '#fff' : 'rgba(255,255,255,0.5)';
                    });
                }
            }

            function startTimer() {
                clearInterval(timer);
                timer = setInterval(() => goToSlide(current + 1), 4000);
            }

            document.querySelector('.slider-arrow.prev')?.addEventListener('click', () => { goToSlide(current - 1); startTimer(); });
            document.querySelector('.slider-arrow.next')?.addEventListener('click', () => { goToSlide(current + 1); startTimer(); });
            startTimer();
        }

        // Featured products (show 4 best sellers)
        const featuredGrid = document.getElementById('featured-products');
        if (featuredGrid) {
            const featured = ALL_PRODUCTS.filter(p => p.category === 'individual-50ml').slice(0, 4);
            featuredGrid.innerHTML = featured.map(createProductCardHTML).join('');
        }
    }

    // =========================================================
    // --- 10. SHOP PAGE ---
    // =========================================================
    function initShopPage() {
        let activeFilters = { gender: [], family: [], price: null, category: 'all' };
        let activeSortBy = 'newest';

        function applyFiltersAndSort() {
            let products = [...ALL_PRODUCTS];

            // Category tab
            if (activeFilters.category !== 'all') {
                products = products.filter(p => p.category === activeFilters.category);
            }
            // Gender
            if (activeFilters.gender.length > 0) {
                products = products.filter(p => activeFilters.gender.includes(p.gender));
            }
            // Family
            if (activeFilters.family.length > 0) {
                products = products.filter(p =>
                    p.family && p.family.some(f => activeFilters.family.includes(f))
                );
            }
            // Price
            if (activeFilters.price) {
                const [min, max] = activeFilters.price.split('-').map(Number);
                products = products.filter(p => p.price >= min && p.price <= (isNaN(max) ? Infinity : max));
            }
            // Sort
            if (activeSortBy === 'price-asc') products.sort((a, b) => a.price - b.price);
            else if (activeSortBy === 'price-desc') products.sort((a, b) => b.price - a.price);

            const grid = document.getElementById('shop-product-grid');
            if (grid) {
                grid.innerHTML = products.length
                    ? products.map(createProductCardHTML).join('')
                    : '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">No products match your filters.</p>';
            }

            // Update count
            const countEl = document.getElementById('product-count');
            if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
        }

        // Initial render
        applyFiltersAndSort();

        // Category tabs
        document.querySelectorAll('.cat-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilters.category = btn.dataset.category;
                applyFiltersAndSort();
            });
        });

        // Gender checkboxes
        document.querySelectorAll('input[name="gender"]').forEach(cb => {
            cb.addEventListener('change', () => {
                activeFilters.gender = [...document.querySelectorAll('input[name="gender"]:checked')].map(e => e.value);
                applyFiltersAndSort();
            });
        });

        // Family checkboxes
        document.querySelectorAll('input[name="family"]').forEach(cb => {
            cb.addEventListener('change', () => {
                activeFilters.family = [...document.querySelectorAll('input[name="family"]:checked')].map(e => e.value);
                applyFiltersAndSort();
            });
        });

        // Price radio
        document.querySelectorAll('input[name="price"]').forEach(rb => {
            rb.addEventListener('change', () => {
                activeFilters.price = rb.value;
                applyFiltersAndSort();
            });
        });

        // Sort
        const sortEl = document.getElementById('sort-by');
        if (sortEl) {
            sortEl.addEventListener('change', () => {
                activeSortBy = sortEl.value;
                applyFiltersAndSort();
            });
        }

        // Clear filters
        document.getElementById('clear-filters')?.addEventListener('click', () => {
            activeFilters = { gender: [], family: [], price: null, category: 'all' };
            activeSortBy = 'newest';
            document.querySelectorAll('input[name="gender"], input[name="family"], input[name="price"]').forEach(el => el.checked = false);
            if (sortEl) sortEl.value = 'newest';
            document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
            document.querySelector('.cat-tab[data-category="all"]')?.classList.add('active');
            applyFiltersAndSort();
        });
    }

    // =========================================================
    // --- 11. LOGIN PAGE ---
    // =========================================================
    function initLoginPage() {
        // Toggle between login and signup
        document.getElementById('show-signup')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-wrapper').style.display = 'none';
            document.getElementById('signup-wrapper').style.display = 'block';
        });
        document.getElementById('show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signup-wrapper').style.display = 'none';
            document.getElementById('login-wrapper').style.display = 'block';
        });

        // Login form
        document.getElementById('login-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errEl = document.getElementById('login-error');
            try {
                await auth.signInWithEmailAndPassword(email, password);
                window.location.href = './index.html';
            } catch (err) {
                errEl.textContent = getFriendlyError(err.code);
            }
        });

        // Signup form
        document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const errEl = document.getElementById('signup-error');
            try {
                const cred = await auth.createUserWithEmailAndPassword(email, password);
                await cred.user.updateProfile({ displayName: name });
                await db.collection('users').doc(cred.user.uid).set({ name, email, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                window.location.href = './index.html';
            } catch (err) {
                errEl.textContent = getFriendlyError(err.code);
            }
        });

        // Google sign in
        document.getElementById('google-signin-btn')?.addEventListener('click', async () => {
            try {
                const provider = new firebase.auth.GoogleAuthProvider();
                const cred = await auth.signInWithPopup(provider);
                // Save user to Firestore if new
                const userRef = db.collection('users').doc(cred.user.uid);
                const doc = await userRef.get();
                if (!doc.exists) {
                    await userRef.set({ name: cred.user.displayName, email: cred.user.email, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                }
                window.location.href = './index.html';
            } catch (err) {
                document.getElementById('login-error').textContent = getFriendlyError(err.code);
            }
        });
    }

    function getFriendlyError(code) {
        const map = {
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password. Please try again.',
            'auth/email-already-in-use': 'This email is already registered.',
            'auth/weak-password': 'Password must be at least 6 characters.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/popup-closed-by-user': 'Sign-in popup was closed.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
        };
        return map[code] || 'Something went wrong. Please try again.';
    }

    // =========================================================
    // --- 12. PROFILE PAGE ---
    // =========================================================
    function initProfilePage() {
        auth.onAuthStateChanged(async user => {
            if (!user) { window.location.href = './login.html'; return; }

            document.getElementById('profile-name').textContent = user.displayName || 'N/A';
            document.getElementById('profile-email').textContent = user.email;

            // Profile tab switching
            document.querySelectorAll('.profile-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    document.getElementById(tab.dataset.target)?.classList.add('active');
                });
            });

            // Load orders
            try {
                const ordersSnap = await db.collection('orders').where('userId', '==', user.uid).orderBy('createdAt', 'desc').get();
                const container = document.getElementById('order-history-container');
                if (ordersSnap.empty) {
                    container.innerHTML = '<p style="color:#888;">You have not placed any orders yet.</p>';
                } else {
                    container.innerHTML = ordersSnap.docs.map(doc => {
                        const o = doc.data();
                        const date = o.createdAt?.toDate().toLocaleDateString('en-IN') || 'N/A';
                        return `
                            <div style="border:1px solid #eee;border-radius:8px;padding:16px;margin-bottom:12px;">
                                <p style="margin:0 0 4px;"><strong>Order #${doc.id.slice(-6).toUpperCase()}</strong> &nbsp; <span style="color:#888;font-size:13px;">${date}</span></p>
                                <p style="margin:0 0 8px;font-size:13px;color:#555;">Items: ${o.items?.map(i => `${i.name} x${i.qty}`).join(', ') || 'N/A'}</p>
                                <p style="margin:0;"><strong>Total: ₹${o.total}</strong> &nbsp; <span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:4px;font-size:12px;">${o.status || 'Processing'}</span></p>
                            </div>`;
                    }).join('');
                }
            } catch (e) {
                console.error('Error loading orders:', e);
            }

            // Logout
            document.getElementById('logout-btn')?.addEventListener('click', async (e) => {
                e.preventDefault();
                await auth.signOut();
                window.location.href = './index.html';
            });
        });
    }

    // =========================================================
    // --- 13. WISHLIST PAGE ---
    // =========================================================
    function initWishlistPage() {
        auth.onAuthStateChanged(async user => {
            const container = document.getElementById('wishlist-content');
            if (!user) {
                container.innerHTML = '<div style="text-align:center;padding:40px;grid-column:1/-1;"><p>Please <a href="./login.html" style="color:#111;font-weight:700;">log in</a> to view your wishlist.</p></div>';
                return;
            }
            try {
                const snap = await db.collection('users').doc(user.uid).collection('wishlist').get();
                if (snap.empty) {
                    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">Your wishlist is empty. <a href="./shop.html" style="color:#111;font-weight:700;">Browse the collection.</a></p>';
                    return;
                }
                const wishlistIds = snap.docs.map(d => d.id);
                const products = ALL_PRODUCTS.filter(p => wishlistIds.includes(p.id));
                container.innerHTML = products.length
                    ? products.map(createProductCardHTML).join('')
                    : '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">No matching products found.</p>';
            } catch (e) {
                console.error('Error loading wishlist:', e);
                container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:red;">Error loading wishlist. Please try again.</p>';
            }
        });
    }

    // =========================================================
    // --- 14. CART PAGE ---
    // =========================================================
    function initCartPage() {
        function renderCart() {
            const cartItems = Cart.get();
            const container = document.getElementById('cart-content');
            if (!container) return;

            if (cartItems.length === 0) {
                container.innerHTML = '<div style="text-align:center;padding:60px 20px;"><p style="font-size:18px;color:#888;margin-bottom:16px;">Your cart is empty.</p><a href="./shop.html" class="btn btn-primary" style="background:#111;color:#fff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;">Shop Now</a></div>';
                return;
            }

            let subtotal = 0;
            const itemsHTML = cartItems.map(item => {
                const p = ALL_PRODUCTS.find(prod => prod.id === item.id);
                if (!p) return '';
                const lineTotal = p.price * item.qty;
                subtotal += lineTotal;
                return `
                    <div style="display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid #f0f0f0;">
                        <a href="${p.url}"><img src="${p.images[0]}" alt="${p.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;" onerror="this.style.display='none'"></a>
                        <div style="flex:1;">
                            <p style="margin:0 0 4px;font-weight:700;">${p.name}</p>
                            <p style="margin:0;font-size:13px;color:#888;">₹${p.price} each</p>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <button onclick="Cart.updateQty('${p.id}', ${item.qty - 1});initCartPage();" style="width:28px;height:28px;border:1px solid #ddd;background:#fff;border-radius:4px;cursor:pointer;font-size:16px;">−</button>
                            <span style="min-width:20px;text-align:center;font-weight:600;">${item.qty}</span>
                            <button onclick="Cart.updateQty('${p.id}', ${item.qty + 1});initCartPage();" style="width:28px;height:28px;border:1px solid #ddd;background:#fff;border-radius:4px;cursor:pointer;font-size:16px;">+</button>
                        </div>
                        <p style="font-weight:700;min-width:60px;text-align:right;">₹${lineTotal}</p>
                        <button onclick="Cart.remove('${p.id}');initCartPage();" style="background:none;border:none;cursor:pointer;color:#aaa;font-size:18px;" title="Remove">✕</button>
                    </div>`;
            }).join('');

            const shipping = subtotal >= 499 ? 0 : 49;
            const total = subtotal + shipping;

            container.innerHTML = `
                <div style="display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;">
                    <div>
                        <div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                            ${itemsHTML}
                        </div>
                    </div>
                    <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);min-width:280px;">
                        <h3 style="margin:0 0 16px;font-size:18px;">Order Summary</h3>
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Subtotal</span><span>₹${subtotal}</span></div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:green;">FREE</span>' : '₹' + shipping}</span></div>
                        ${shipping > 0 ? `<p style="font-size:12px;color:#888;margin:0 0 8px;">Add ₹${499 - subtotal} more for free shipping</p>` : ''}
                        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:16px;border-top:1px solid #eee;padding-top:12px;margin-top:4px;"><span>Total</span><span>₹${total}</span></div>
                        <a href="./checkout.html" style="display:block;margin-top:16px;background:#111;color:#fff;text-align:center;padding:14px;border-radius:6px;text-decoration:none;font-weight:600;letter-spacing:0.5px;transition:background 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#111'">PROCEED TO CHECKOUT</a>
                    </div>
                </div>`;
        }
        renderCart();
        window.initCartPage = initCartPage; // allow re-init from onclick
    }

    // =========================================================
    // --- 15. CHECKOUT PAGE ---
    // =========================================================
    function initCheckoutPage() {
        const cartItems = Cart.get();
        const checkoutItemsEl = document.getElementById('checkout-items');
        const subtotalEl = document.getElementById('checkout-subtotal');
        const shippingEl = document.getElementById('checkout-shipping');
        const totalEl = document.getElementById('checkout-total');

        if (cartItems.length === 0) {
            document.querySelector('.checkout-page').innerHTML = '<div style="text-align:center;padding:80px 20px;"><p style="font-size:18px;color:#888;">Your cart is empty.</p><a href="./shop.html" style="color:#111;font-weight:700;">Continue Shopping</a></div>';
            return;
        }

        let subtotal = 0;
        const enrichedItems = cartItems.map(item => {
            const p = ALL_PRODUCTS.find(prod => prod.id === item.id);
            if (!p) return null;
            subtotal += p.price * item.qty;
            return { ...p, qty: item.qty };
        }).filter(Boolean);

        const shipping = subtotal >= 499 ? 0 : 49;
        const total = subtotal + shipping;

        if (checkoutItemsEl) {
            checkoutItemsEl.innerHTML = enrichedItems.map(item => `
                <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;border-bottom:1px solid #f5f5f5;">
                    <span>${item.name} × ${item.qty}</span>
                    <span>₹${item.price * item.qty}</span>
                </div>`).join('');
        }
        if (subtotalEl) subtotalEl.textContent = '₹' + subtotal;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
        if (totalEl) totalEl.textContent = '₹' + total;

        document.getElementById('place-order-btn')?.addEventListener('click', async () => {
            const form = document.getElementById('shipping-form');
            if (!form.checkValidity()) { form.reportValidity(); return; }

            const shippingData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                pincode: document.getElementById('pincode').value,
            };

            const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
            const user = window._etremUser;

            const orderData = {
                userId: user?.uid || 'guest',
                items: enrichedItems.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
                shipping: shippingData,
                subtotal,
                shippingCost: shipping,
                total,
                status: 'Processing',
                paymentMethod,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            if (paymentMethod === 'cod') {
                await placeOrder(orderData);
            } else {
                // Razorpay online payment
                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: total * 100, // in paise
                    currency: 'INR',
                    name: 'ETREM',
                    description: 'Fragrance Purchase',
                    handler: async function (response) {
                        orderData.razorpayPaymentId = response.razorpay_payment_id;
                        orderData.status = 'Paid';
                        await placeOrder(orderData);
                    },
                    prefill: { name: shippingData.name, email: shippingData.email, contact: shippingData.phone },
                    theme: { color: '#111111' }
                };
                const rzp = new Razorpay(options);
                rzp.open();
            }
        });

        async function placeOrder(orderData) {
            try {
                const ref = await db.collection('orders').add(orderData);
                Cart.clear();
                window.location.href = `./index.html?order=${ref.id}`;
            } catch (e) {
                console.error('Order error:', e);
                alert('There was an error placing your order. Please try again.');
            }
        }
    }

    // =========================================================
    // --- 16. QUIZ PAGE ---
    // =========================================================
    function initQuizPage() {
        const questions = [
            {
                q: "1. What's your ideal vibe for an evening out?",
                options: [
                    { label: 'Confident and Commanding', value: 'woody' },
                    { label: 'Mysterious and Seductive', value: 'oriental' },
                    { label: 'Effortless and Casual', value: 'fresh' },
                    { label: 'Playful and Sweet', value: 'gourmand' },
                ]
            },
            {
                q: "2. What's your preferred season?",
                options: [
                    { label: 'Summer – beach & sunshine', value: 'aquatic' },
                    { label: 'Monsoon – petrichor & fresh greens', value: 'fresh' },
                    { label: 'Winter – cozy & warm', value: 'oriental' },
                    { label: 'All year, I wear bold always', value: 'woody' },
                ]
            },
            {
                q: "3. Pick a setting that feels like you:",
                options: [
                    { label: 'Boardroom – power & precision', value: 'woody' },
                    { label: 'Candlelit dinner – intimacy & romance', value: 'oriental' },
                    { label: 'Open terrace – freedom & fresh air', value: 'aquatic' },
                    { label: 'Café – soft, warm & inviting', value: 'gourmand' },
                ]
            },
            {
                q: "4. Which word describes your signature style?",
                options: [
                    { label: 'Elegant', value: 'floral' },
                    { label: 'Bold', value: 'woody' },
                    { label: 'Mysterious', value: 'oriental' },
                    { label: 'Fresh & Clean', value: 'fresh' },
                ]
            },
        ];

        const quizContainer = document.getElementById('quiz-container');
        const resultContainer = document.getElementById('quiz-result');
        if (!quizContainer) return;

        // Render all questions
        quizContainer.innerHTML = questions.map((q, qi) => `
            <div class="quiz-question ${qi === 0 ? 'active' : ''}" data-question="${qi + 1}" style="display:${qi === 0 ? 'block' : 'none'};max-width:600px;margin:0 auto;padding:24px;">
                <h2 style="font-size:20px;margin-bottom:20px;line-height:1.4;">${q.q}</h2>
                <div class="quiz-options" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    ${q.options.map(opt => `
                        <button class="quiz-option" data-value="${opt.value}" data-question="${qi}"
                            style="padding:14px;border:2px solid #eee;background:#fff;border-radius:8px;cursor:pointer;font-size:14px;transition:all 0.2s;text-align:left;"
                            onmouseover="this.style.borderColor='#111';this.style.background='#f8f8f8';"
                            onmouseout="if(!this.classList.contains('selected')){this.style.borderColor='#eee';this.style.background='#fff';}">
                            ${opt.label}
                        </button>`).join('')}
                </div>
                <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;">
                    ${qi > 0 ? `<button onclick="quizPrev(${qi})" style="background:none;border:1px solid #ddd;padding:10px 20px;border-radius:6px;cursor:pointer;">← Back</button>` : '<span></span>'}
                    <button id="quiz-next-${qi}" onclick="quizNext(${qi}, ${qi === questions.length - 1})" disabled
                        style="background:#111;color:#fff;border:none;padding:12px 28px;border-radius:6px;cursor:pointer;opacity:0.4;font-weight:600;transition:opacity 0.2s;">
                        ${qi === questions.length - 1 ? 'See My Result →' : 'Next →'}
                    </button>
                </div>
            </div>`).join('');

        const answers = {};

        // Handle option selection
        quizContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.quiz-option');
            if (!btn) return;
            const qi = parseInt(btn.dataset.question);
            quizContainer.querySelectorAll(`[data-question="${qi}"].quiz-option`).forEach(b => {
                b.classList.remove('selected');
                b.style.borderColor = '#eee';
                b.style.background = '#fff';
                b.style.fontWeight = 'normal';
            });
            btn.classList.add('selected');
            btn.style.borderColor = '#111';
            btn.style.background = '#f0f0f0';
            btn.style.fontWeight = '700';
            answers[qi] = btn.dataset.value;
            const nextBtn = document.getElementById(`quiz-next-${qi}`);
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
        });

        window.quizNext = function(qi, isLast) {
            if (isLast) {
                showQuizResult();
            } else {
                document.querySelector(`[data-question="${qi + 1}"]`).style.display = 'block';
                document.querySelector(`[data-question="${qi + 1}"]`).previousElementSibling?.style && null;
                quizContainer.querySelectorAll('.quiz-question').forEach((q, i) => {
                    q.style.display = (i === qi + 1) ? 'block' : 'none';
                });
            }
        };

        window.quizPrev = function(qi) {
            quizContainer.querySelectorAll('.quiz-question').forEach((q, i) => {
                q.style.display = (i === qi - 1) ? 'block' : 'none';
            });
        };

        function showQuizResult() {
            // Tally answers
            const tally = {};
            Object.values(answers).forEach(v => { tally[v] = (tally[v] || 0) + 1; });
            const topFamily = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] || 'woody';

            // Map to product
            const familyToProduct = {
                woody: 'the-forge',
                oriental: 'the-murk',
                fresh: 'the-expanse',
                aquatic: 'the-expanse',
                gourmand: 'the-muse',
                floral: 'the-poem',
            };
            const recommendedId = familyToProduct[topFamily] || 'the-genesis';
            const product = ALL_PRODUCTS.find(p => p.id === recommendedId) || ALL_PRODUCTS[0];

            quizContainer.style.display = 'none';
            if (resultContainer) {
                resultContainer.style.display = 'block';
                document.getElementById('result-product-card').innerHTML = `
                    <div style="max-width:400px;margin:0 auto;text-align:center;">
                        <p style="font-size:14px;color:#888;margin-bottom:16px;">Based on your answers, you're a <strong>${topFamily}</strong> lover.</p>
                        ${createProductCardHTML(product)}
                        <a href="./quiz.html" style="display:inline-block;margin-top:16px;color:#888;font-size:13px;text-decoration:underline;" onclick="location.reload()">Retake Quiz</a>
                    </div>`;
            }
        }
    }

    // =========================================================
    // --- 17. DETECT CURRENT PAGE & INITIALIZE ---
    // =========================================================
    renderSharedComponents();
    initAuth();

    const body = document.body;
    if (body.querySelector('.hero-slider-section'))     initHomePage();
    if (body.querySelector('.shop-page'))               initShopPage();
    if (body.querySelector('.auth-page'))               initLoginPage();
    if (body.querySelector('.profile-page'))            initProfilePage();
    if (body.querySelector('.wishlist-page'))           initWishlistPage();
    if (body.querySelector('.cart-page'))               initCartPage();
    if (body.querySelector('.checkout-page'))           initCheckoutPage();
    if (body.querySelector('.quiz-page'))               initQuizPage();

    // Show order success message if redirected after checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('order')) {
        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#2e7d32;color:#fff;text-align:center;padding:14px;z-index:9999;font-size:15px;font-weight:600;';
        banner.textContent = '✅ Order placed successfully! Thank you for shopping with ETREM.';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 5000);
    }

}); // end DOMContentLoaded
