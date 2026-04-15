/* js/main.js */
document.addEventListener("DOMContentLoaded", () => {

    // --- LAZY-LOADING & GLOBAL ELEMENTS ---
    const header = document.querySelector(".header");
    const backToTopButton = document.querySelector(".back-to-top");
    const cartItemCount = document.getElementById("cart-item-count");

    // --- WOW FACTOR: LOADING SCREEN ---
    const loadingScreen = document.querySelector('.loading-screen');
    if (sessionStorage.getItem('isLoaded')) {
        loadingScreen.style.display = 'none';
    } else {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            sessionStorage.setItem('isLoaded', 'true');
        }, 2000);
    }

    // --- WOW FACTOR: CURSOR TRAIL ---
    const cursorTrail = document.querySelector('.cursor-trail');
    if (window.matchMedia("(min-width: 992px)").matches) {
        window.addEventListener('mousemove', e => {
            cursorTrail.style.left = `${e.clientX}px`;
            cursorTrail.style.top = `${e.clientY}px`;
        });
    }

    // --- WOW FACTOR: MAGNETIC BUTTONS ---
    const magneticButtons = document.querySelectorAll('.magnetic');
    if (window.matchMedia("(min-width: 992px)").matches) {
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
            });
            button.addEventListener('mouseleave', function() {
                button.style.transform = 'translate(0,0)';
            });
        });
    }

    // --- NAVBAR & SCROLL BEHAVIOR ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("solid");
            if (backToTopButton) backToTopButton.classList.add("visible");
        } else {
            header.classList.remove("solid");
            if (backToTopButton) backToTopButton.classList.remove("visible");
        }
    };
    window.addEventListener("scroll", handleScroll);

    // --- HAMBURGER MENU ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // --- SCROLL ANIMATIONS ---
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));


    // --- CART LOGIC (LocalStorage) ---
    let cart = JSON.parse(localStorage.getItem('etremCart')) || [];

    const saveCart = () => {
        localStorage.setItem('etremCart', JSON.stringify(cart));
        updateCartCount();
    };

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCount.textContent = totalItems;
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id && item.volume === product.volume);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        saveCart();
        showToast(`✓ ${product.name.split('|')[0].trim()} added to cart!`);
    };

    // Add to cart listeners (for cards and PDP)
    document.querySelectorAll('.add-to-cart-btn, .add-to-cart-pdp').forEach(button => {
        button.addEventListener('click', (e) => {
            let productData;
            if (e.target.closest('.product-detail-page') || e.target.closest('.sticky-add-to-cart-bar')) {
                // Product Detail Page Logic
                const selectedVolumeBtn = document.querySelector('.volume-btn.active');
                productData = {
                    id: window.location.pathname.includes('expance') ? 'expance' : 'warden',
                    name: document.getElementById('productName').textContent,
                    price: parseFloat(selectedVolumeBtn.dataset.price),
                    image: document.getElementById('mainProductImage').getAttribute('src'),
                    volume: selectedVolumeBtn.dataset.volume,
                    quantity: parseInt(document.getElementById('quantity').value)
                };
            } else {
                // Product Card Logic
                const card = e.target.closest('.product-card');
                productData = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price),
                    image: button.dataset.image,
                    volume: button.dataset.volume,
                    quantity: 1
                };
            }
            addToCart(productData);
        });
    });

    // --- WOW FACTOR: TOAST NOTIFICATIONS ---
    const toastContainer = document.getElementById('toast-container');
    const showToast = (message) => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    };

    // --- ACCORDION ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.padding = "1rem 0";
            }
        });
    });

    // --- HOMEPAGE: NOTES VISUALIZER ---
    const notesToggleButtons = document.querySelectorAll('.notes-toggle-btn');
    if (notesToggleButtons.length > 0) {
        notesToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                notesToggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                document.querySelectorAll('.notes-pyramid').forEach(pyramid => {
                    pyramid.classList.remove('active');
                });
                document.getElementById(button.dataset.target).classList.add('active');
            });
        });
    }
    
    // --- HOMEPAGE: NEWSLETTER ---
    const newsletterForm = document.getElementById('newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = e.target.elements.email.value;
            localStorage.setItem('newsletter_email', email);
            showToast('🌿 You\'re on the list!');
            newsletterForm.reset();
        });
    }

    // --- SHOP PAGE: FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrid = document.getElementById('product-grid');
    if (filterButtons.length > 0 && productGrid) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.dataset.filter;
                productGrid.querySelectorAll('.product-card').forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- PRODUCT DETAIL PAGE LOGIC ---
    if (document.querySelector('.product-detail-page')) {
        // Volume & Price Changer
        const volumeBtns = document.querySelectorAll('.volume-btn');
        const productPriceEl = document.getElementById('productPrice');
        const originalPriceEl = document.getElementById('originalPrice');
        const stickyBarPriceEl = document.getElementById('sticky-bar-price');

        volumeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                volumeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                productPriceEl.textContent = `₹${btn.dataset.price}`;
                originalPriceEl.textContent = `₹${btn.dataset.mrp}`;
                if (stickyBarPriceEl) stickyBarPriceEl.textContent = `₹${btn.dataset.price}`;
            });
        });

        // Quantity Selector
        const decreaseQty = document.getElementById('decrease-qty');
        const increaseQty = document.getElementById('increase-qty');
        const quantityInput = document.getElementById('quantity');

        decreaseQty.addEventListener('click', () => {
            let currentVal = parseInt(quantityInput.value);
            if (currentVal > 1) quantityInput.value = currentVal - 1;
        });
        increaseQty.addEventListener('click', () => {
            let currentVal = parseInt(quantityInput.value);
            if (currentVal < 10) quantityInput.value = currentVal + 1;
        });

        // Sticky Add-to-Cart Bar
        const stickyBar = document.querySelector('.sticky-add-to-cart-bar');
        const mainAddToCartBtn = document.querySelector('.add-to-cart-pdp');
        const stickyObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                stickyBar.classList.toggle('visible', !entry.isIntersecting);
            });
        }, { rootMargin: "-100px 0px 0px 0px" });
        stickyObserver.observe(mainAddToCartBtn);
        
        // Image Lightbox
        const lightbox = document.getElementById('lightbox');
        const mainImage = document.getElementById('mainProductImage');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeLightbox = document.querySelector('.close-lightbox');

        mainImage.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = mainImage.src;
        });
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // --- CART PAGE LOGIC ---
    const cartContent = document.getElementById('cart-content');
    if (cartContent) {
        const renderCartPage = () => {
            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <h2>Your cart is empty.</h2>
                        <p>Explore our collection to find your signature scent.</p>
                        <a href="./shop.html" class="btn btn-primary">Shop Now</a>
                    </div>
                `;
                return;
            }

            const cartItemsHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}" data-volume="${item.volume}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Volume: ${item.volume}</p>
                    </div>
                    <div class="cart-item-qty">
                        <div class="quantity-input">
                            <button class="update-qty-btn" data-change="-1">-</button>
                            <input type="number" value="${item.quantity}" min="1" max="10" readonly>
                            <button class="update-qty-btn" data-change="1">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-remove">
                        <button class="remove-item-btn">&times;</button>
                    </div>
                </div>
            `).join('');

            const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const shippingCost = subtotal > 499 || subtotal === 0 ? 0 : 60;
            const total = subtotal + shippingCost;

            cartContent.innerHTML = `
                <div class="cart-layout">
                    <div class="cart-items">
                        ${cartItemsHTML}
                    </div>
                    <aside class="order-summary">
                        <h3>Order Summary</h3>
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span id="subtotal">₹${subtotal.toFixed(2)}</span>
                        </div>
                         <div class="summary-row">
                            <span>Discount</span>
                            <span id="discount-amount">- ₹0.00</span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span>${shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                        </div>
                        <div class="summary-row summary-total">
                            <span>Total</span>
                            <span id="total-amount">₹${total.toFixed(2)}</span>
                        </div>
                        <form class="promo-code-form" id="promo-form">
                            <input type="text" id="promo-code" placeholder="Promo code">
                            <button type="submit">Apply</button>
                        </form>
                        <p id="promo-message"></p>
                        <button class="btn btn-primary btn-block" id="checkout-btn">Proceed to Checkout</button>
                    </aside>
                </div>
            `;
            addCartPageEventListeners();
        };

        const addCartPageEventListeners = () => {
            // Remove item
            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', e => {
                    const itemEl = e.target.closest('.cart-item');
                    const id = itemEl.dataset.id;
                    const volume = itemEl.dataset.volume;
                    cart = cart.filter(item => !(item.id === id && item.volume === volume));
                    saveCart();
                    renderCartPage();
                });
            });

            // Update quantity
            document.querySelectorAll('.update-qty-btn').forEach(button => {
                button.addEventListener('click', e => {
                    const itemEl = e.target.closest('.cart-item');
                    const id = itemEl.dataset.id;
                    const volume = itemEl.dataset.volume;
                    const change = parseInt(e.target.dataset.change);
                    const item = cart.find(i => i.id === id && i.volume === volume);
                    if (item) {
                        const newQuantity = item.quantity + change;
                        if (newQuantity >= 1 && newQuantity <= 10) {
                            item.quantity = newQuantity;
                            saveCart();
                            renderCartPage();
                        }
                    }
                });
            });
            
            // Checkout button
            document.getElementById('checkout-btn').addEventListener('click', () => {
                showToast('Payment gateway launching soon. Stay tuned!');
            });
            
            // Promo code
            document.getElementById('promo-form').addEventListener('submit', e => {
                e.preventDefault();
                const promoInput = document.getElementById('promo-code');
                const promoMessage = document.getElementById('promo-message');
                if(promoInput.value.toUpperCase() === 'NAKED10'){
                    // Apply 10% discount
                    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    const discount = subtotal * 0.10;
                    const shippingCost = (subtotal - discount) > 499 ? 0 : 60;
                    const total = subtotal - discount + shippingCost;
                    
                    document.getElementById('discount-amount').textContent = `- ₹${discount.toFixed(2)}`;
                    document.getElementById('total-amount').textContent = `₹${total.toFixed(2)}`;
                    promoMessage.textContent = "✓ NAKED10 applied!";
                    promoMessage.style.color = "green";

                } else {
                    promoMessage.textContent = "Invalid promo code.";
                    promoMessage.style.color = "red";
                }
            });
        };

        renderCartPage();
    }
    
    // --- CONTACT PAGE ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            showToast(`Thanks, ${name}! We've received your message.`);
            contactForm.reset();
        });
    }

    // --- INITIALIZE ---
    updateCartCount();
});
``````xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://etrem.in/index.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://etrem.in/shop.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://etrem.in/product-expance.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://etrem.in/product-warden.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://etrem.in/cart.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>https://etrem.in/about.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://etrem.in/contact.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.60</priority>
  </url>
  <url>
    <loc>https://etrem.in/shipping-returns.html</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.60</priority>
  </url>
</urlset>
``````text
# robots.txt
User-agent: *
Allow: /

Sitemap: https://etrem.in/sitemap.xml
```