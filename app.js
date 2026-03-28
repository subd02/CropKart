/**
 * CropKart - Main JavaScript Logic
 * Handles Routing, UI Interactions, and Multilingual Support.
 */

// --- Global UI State & Translations --- //
let currentLang = 'en';

// --- Session State Management --- //
const userState = {
    currentUser: null,
    cart: [],
    myListings: [],
    orderHistory: []
};

const i18n = {
    en: {
        nav_sell: "SELL NOW",
        home_welcome: "Welcome back, Farmer!",
        home_subtitle: "Dashboard & Quick Access",
        cattle_market: "Pashu Mandi",
        smart_market: "Aaj Ka Bhav",
        agri_store: "Sabji Mandi",
        storage: "Thanda Ghar",
        local_news: "Local News & Alerts",
        settings_title: "Settings",
        settings_subtitle: "Manage account & preferences",
        member_since: "Member since 2024",
        pref_lang: "Language",
        pref_records: "My Records",
        order_history: "Order History",
        listing_history: "My Listings",
        logout_btn: "Logout",
        back: "Back",
        call: "Call",
        add_cart: "Add to Cart",
        buy_sell: "Buy & Sell livestock",
        crop_ai: "Crop AI pricing",
        raw_materials: "Raw materials",
        cold_storage: "Cold storage locator",
        login_subtitle: "Your Complete Agriculture Ecosystem"
    },
    hi: {
        nav_sell: "अभी बेचें",
        home_welcome: "वापसी पर स्वागत है, किसान भाई!",
        home_subtitle: "डैशबोर्ड और त्वरित पहुँच",
        cattle_market: "पशु मंडी",
        smart_market: "आज का भाव",
        agri_store: "सब्जी मंडी",
        storage: "ठंडा घर",
        local_news: "स्थानीय समाचार और अलर्ट",
        settings_title: "सेटिंग्स",
        settings_subtitle: "खाता और प्राथमिकताएं प्रबंधित करें",
        member_since: "सदस्यता: 2024",
        pref_lang: "भाषा चुनें",
        pref_records: "मेरी जानकारी",
        order_history: "ऑर्डर का इतिहास",
        listing_history: "मेरी लिस्टिंग",
        logout_btn: "लॉग आउट",
        back: "पीछे",
        call: "कॉल करें",
        add_cart: "कार्ट में जोड़ें",
        buy_sell: "पशुधन खरीदें और बेचें",
        crop_ai: "फसल एआई मूल्य",
        raw_materials: "कच्चा माल",
        cold_storage: "कोल्ड स्टोरेज खोजें",
        login_subtitle: "आपका संपूर्ण कृषि पारिस्थितिकी तंत्र"
    },
    or: {
        nav_sell: "ବିକ୍ରୟ କରନ୍ତୁ",
        home_welcome: "ସ୍ୱାଗତ, ଚାଷୀ ଭାଇ!",
        home_subtitle: "ଡ୍ୟାସବୋର୍ଡ ଏବଂ ଶୀଘ୍ର ପ୍ରବେଶ",
        cattle_market: "ପଶୁ ମଣ୍ଡି",
        smart_market: "ଆଜିର ଭାଉ",
        agri_store: "ସବଜି ମଣ୍ଡି",
        storage: "ଥଣ୍ଡା ଘର",
        local_news: "ସ୍ଥାନୀୟ ଖବର",
        settings_title: "ସେଟିଂସ",
        settings_subtitle: "ଆକାଉଣ୍ଟ ପରିଚାଳନା",
        member_since: "ସଦସ୍ୟତା: ୨୦୨୪",
        pref_lang: "ଭାଷା ଚୟନ",
        pref_records: "ମୋର ରେକର୍ଡ",
        order_history: "ଅର୍ଡର ଇତିହାସ",
        listing_history: "ମୋର ବିକ୍ରୟ",
        logout_btn: "ଲଗ୍ ଆଉଟ୍",
        back: "ଫେରନ୍ତୁ",
        call: "କଲ୍",
        add_cart: "ଯୋଗ କରନ୍ତୁ",
        buy_sell: "ପଶୁ କିଣାବିକା",
        crop_ai: "ଫସଲ ମୂଲ୍ୟ",
        raw_materials: "କଞ୍ଚାମାଲ",
        cold_storage: "ଷ୍ଟୋରେଜ୍ ଖୋଜନ୍ତୁ",
        login_subtitle: "ଆପଣଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ କୃଷି ବ୍ୟବସ୍ଥା"
    },
    bn: {
        nav_sell: "এখন বিক্রি করুন",
        home_welcome: "স্বাগতম, কৃষক ভাই!",
        home_subtitle: "ড্যাশবোর্ড এবং দ্রুত অ্যাকসেস",
        cattle_market: "পশু মান্ডি",
        smart_market: "আজকের ভাব",
        agri_store: "সবজি মান্ডি",
        storage: "ঠান্ডা ঘর",
        local_news: "স্থানীয় সংবাদ",
        settings_title: "সেটিংস",
        settings_subtitle: "অ্যাকাউন্ট ম্যানেজ করুন",
        member_since: "সদস্যপদ: ২০২৪",
        pref_lang: "ভাষা পরিবর্তন",
        pref_records: "আমার রেকর্ড",
        order_history: "অর্ডারের ইতিহাস",
        listing_history: "আমার লিস্টিং",
        logout_btn: "লগ আউট",
        back: "পিছনে",
        call: "কল করুন",
        add_cart: "কার্টে যোগ করুন",
        buy_sell: "গবাদি পশু কেনা-বেচা",
        crop_ai: "ফসল এআই মূল্য",
        raw_materials: "কাঁচামাল",
        cold_storage: "কোল্ড স্টোরেজ খুঁজুন",
        login_subtitle: "আপনার সম্পূর্ণ কৃষি বাস্তুতন্ত্র"
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });
    initApp(); // Re-render feeds to update dynamic content instructions
    showToast('Language Updated');
}

// --- Global UI State & Navigation --- //
function navigate(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (viewId === 'sell-portal') {
        resetSellForm();
    }

    // Toggle Navigation Bar visibility
    const nav = document.getElementById('navbar');
    if (viewId === 'login' || viewId === 'register') {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    // Dynamic rendering for state-driven views
    if (viewId === 'cart') renderCart();
    if (viewId === 'order-history') renderOrderHistory();
    if (viewId === 'my-listings') renderMyListings();
    if (viewId === 'agri-store') initApp(); // Refresh store when navigating back to see updated quantities
}

// --- Toast Notifications --- //
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- Auth Handling --- //
const API_URL = "https://cropkart-v3bb.onrender.com/api";

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, id: user, pass })
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Successfully Registered! Please log in.');
            e.target.reset();
            navigate('login');
        } else {
            showToast(data.message || 'Registration failed');
        }
    } catch (error) {
        showToast('Server is currently offline. Please try again later.');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user, pass })
        });

        const data = await response.json();

        if (response.ok) {
            userState.currentUser = data.user;
            showToast(`Welcome back, ${data.user.name.split(' ')[0]}!`);

            const profileNameEl = document.querySelector('.profile-info h3');
            if (profileNameEl) profileNameEl.textContent = data.user.name;

            navigate('home');
        } else {
            showToast('Invalid phone/email or password!');
        }
    } catch (error) {
        showToast('Server is currently offline. Please try again later.');
    }
}

function handleGuestLogin() {
    userState.currentUser = { name: 'Guest Farmer', id: 'guest' };
    showToast('Logged in as Guest');
    navigate('home');
}

function logout() {
    userState.currentUser = null;
    showToast('Logged out securely.');
    navigate('login');
}

async function handleSendOTP(e) {
    e.preventDefault();
    const user = document.getElementById('otp-user').value;
    const btn = document.getElementById('btn-send-otp');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const response = await fetch(`${API_URL}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user })
        });

        const data = await response.json();
        btn.disabled = false;
        btn.textContent = 'Send OTP';

        if (response.ok) {
            showToast('OTP sent to your email/phone!');
            document.getElementById('send-otp-form').classList.add('hidden');
            document.getElementById('verify-otp-form').classList.remove('hidden');
        } else {
            showToast(data.message || 'Error sending OTP');
        }
    } catch (error) {
        btn.disabled = false;
        btn.textContent = 'Send OTP';
        showToast('Server is currently offline. Please try again later.');
    }
}

async function handleVerifyOTP(e) {
    e.preventDefault();
    const user = document.getElementById('otp-user').value;
    const otp = document.getElementById('otp-code').value;

    try {
        const response = await fetch(`${API_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user, otp })
        });

        const data = await response.json();

        if (response.ok) {
            userState.currentUser = data.user;
            showToast(`Welcome back, ${data.user.name.split(' ')[0]}!`);

            const profileNameEl = document.querySelector('.profile-info h3');
            if (profileNameEl) profileNameEl.textContent = data.user.name;

            navigate('home');
            resetOTPForm();
        } else {
            showToast(data.message || 'Invalid OTP');
        }
    } catch (error) {
        showToast('Server is currently offline. Please try again later.');
    }
}

function resetOTPForm() {
    const sendForm = document.getElementById('send-otp-form');
    const verifyForm = document.getElementById('verify-otp-form');
    if (sendForm) sendForm.classList.remove('hidden');
    if (verifyForm) verifyForm.classList.add('hidden');
    const otpCode = document.getElementById('otp-code');
    if (otpCode) otpCode.value = '';
}

let currentSelectedImage = null;

function handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            currentSelectedImage = event.target.result;
            document.getElementById('photo-preview').src = currentSelectedImage;
            document.getElementById('photo-preview-container').classList.remove('hidden');
            document.getElementById('upload-prompt').classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function resetSellForm() {
    currentSelectedImage = null;
    const form = document.getElementById('sell-form');
    if (form) form.reset();
    const photoInput = document.getElementById('sell-photo-input');
    if (photoInput) photoInput.value = '';
    const preview = document.getElementById('photo-preview-container');
    if (preview) preview.classList.add('hidden');
    const prompt = document.getElementById('upload-prompt');
    if (prompt) prompt.classList.remove('hidden');
}

function handleSellSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('sell-type').value;
    const details = e.target.querySelector('input[type="text"]').value;
    const price = e.target.querySelector('input[type="number"]').value;

    const newListing = {
        type: type.charAt(0).toUpperCase() + type.slice(1),
        name: details,
        price: "₹" + parseInt(price).toLocaleString(),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        image: currentSelectedImage
    };

    userState.myListings.unshift(newListing);
    showToast('Listing submitted successfully!');
    resetSellForm();
    setTimeout(() => {
        navigate('home');
    }, 1000);
}

// --- Cart & Order Logic --- //
function addToCart(index) {
    const item = mockStore[index];
    const existing = userState.cart.find(c => c.name === item.name);

    if (existing) {
        existing.quantity++;
    } else {
        userState.cart.push({ ...item, quantity: 1, cartId: Date.now() });
    }

    updateCartIcon();
    initApp(); // Refresh store buttons
    if (document.getElementById('view-cart').classList.contains('active')) renderCart();
    showToast(`${item.name} quantity updated!`);
}

function decrementCart(index) {
    const item = mockStore[index];
    const cartItemIndex = userState.cart.findIndex(c => c.name === item.name);

    if (cartItemIndex > -1) {
        userState.cart[cartItemIndex].quantity--;
        if (userState.cart[cartItemIndex].quantity <= 0) {
            userState.cart.splice(cartItemIndex, 1);
        }
    }

    updateCartIcon();
    initApp(); // Refresh store buttons
    if (document.getElementById('view-cart').classList.contains('active')) renderCart();
}

function removeFromCart(cartId) {
    userState.cart = userState.cart.filter(item => item.cartId !== cartId);
    updateCartIcon();
    renderCart();
    initApp();
}

function updateCartIcon() {
    const count = document.getElementById('cart-count');
    if (count) {
        const totalItems = userState.cart.reduce((sum, item) => sum + item.quantity, 0);
        count.textContent = totalItems;
        count.style.transform = 'scale(1.2)';
        setTimeout(() => count.style.transform = 'scale(1)', 200);
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty');
    const summary = document.getElementById('cart-summary');
    const totalEl = document.getElementById('cart-total');

    if (userState.cart.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        summary.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    summary.classList.remove('hidden');

    let total = 0;
    container.innerHTML = userState.cart.map(item => {
        const numPrice = parseInt(item.price.replace(/[^\d]/g, ''));
        const subtotal = numPrice * item.quantity;
        total += subtotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="cart-item-qty">Qty: ${item.quantity}</span>
                    <button class="btn-remove" onclick="removeFromCart(${item.cartId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.textContent = `₹${total.toLocaleString()}`;
}

function placeOrder() {
    if (userState.cart.length === 0) return;

    const order = {
        items: [...userState.cart],
        total: document.getElementById('cart-total').textContent,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        id: 'ORD-' + Math.floor(Math.random() * 9000 + 1000)
    };

    userState.orderHistory.unshift(order);
    userState.cart = [];
    updateCartIcon();
    showToast('Order placed successfully!');
    navigate('order-history');
}

function renderOrderHistory() {
    const container = document.getElementById('order-history-feed');
    const emptyState = document.getElementById('history-empty');

    if (userState.orderHistory.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = userState.orderHistory.map(order => `
        <div class="order-card">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span class="order-date">${order.date}</span>
                <span style="font-weight: 700; color: var(--forest-green); font-size: 0.85rem;">${order.id}</span>
            </div>
            <div style="font-size: 0.9rem; margin-bottom: 8px;">
                ${order.items.map(i => i.name).join(', ')}
            </div>
            <div style="font-weight: 700; color: var(--clay-warm); text-align: right;">
                Total: ${order.total}
            </div>
        </div>
    `).join('');
}

function renderMyListings() {
    const container = document.getElementById('my-listings-feed');
    const emptyState = document.getElementById('listings-empty');

    if (userState.myListings.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = userState.myListings.map(listing => {
        const imageHtml = listing.image
            ? `<img src="${listing.image}" class="listing-img">`
            : `<div class="listing-placeholder"><i class="fas fa-camera"></i> No Photo</div>`;

        return `
            <div class="listing-card">
                ${imageHtml}
                <div class="listing-details">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span class="listing-date">${listing.date}</span>
                        <span class="detail-badge">${listing.type}</span>
                    </div>
                    <div class="card-title">${listing.name}</div>
                    <div style="font-weight: 700; color: var(--clay-warm); margin-top: 5px;">
                        Listed at: ${listing.price}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- Mock Data Injection & Renderers --- //

const mockNews = [
    { title: "Monsoon Expected Early", desc: "Meteorological dept predicts rains by next week. Prepare soil accordingly." },
    { title: "Govt Subsidy on Urea", desc: "New 20% subsidy announced for registered farmers." },
    { title: "Local Mandi Rates Up", desc: "Wheat rates surge by 5% in the local market today." }
];

const mockCattle = [
    { breed: "Gir Cow", age: "3 Years", yield: "12 L/day", price: "₹45,000", phone: "9876543210", image: "images/gir.jpg" },
    { breed: "Murrah Buffalo", age: "4 Years", yield: "16 L/day", price: "₹65,000", phone: "9123456789", image: "images/buffalo.jpg" },
    { breed: "Holstein Friesian", age: "2.5 Years", yield: "20 L/day", price: "₹55,000", phone: "8877665544", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=400&h=300" },
    { breed: "Sahiwal Cow", age: "3.5 Years", yield: "14 L/day", price: "₹48,000", phone: "7766554433", image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400&h=300" },
    { breed: "Jamnapari Goat", age: "1.5 Years", yield: "2.5 L/day", price: "₹12,000", phone: "9900112233", image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400&h=300" },
    { breed: "Osmanabadi Goat", age: "2 Years", yield: "2 L/day", price: "₹10,500", phone: "8899001122", image: "images/goat.jpg" },
    { breed: "Nellore Sheep", age: "1 Year", yield: "N/A", price: "₹8,500", phone: "7788990011", image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=400&h=300" }
];

const mockCrops = [
    { name: "Wheat", current: 2200, trend: "up", predicted: 2350, advice: "HOLD", impact: "Rain delay increases demand" },
    { name: "Rice (Paddy)", current: 1900, trend: "down", predicted: 1800, advice: "SELL", impact: "Good harvest expected" },
    { name: "Soybean", current: 4500, trend: "up", predicted: 4700, advice: "HOLD", impact: "Export demand rising" },
    { name: "Corn (Maize)", current: 1850, trend: "up", predicted: 2000, advice: "HOLD", impact: "Poultry industry demand surge" },
    { name: "Mustard", current: 5200, trend: "down", predicted: 5050, advice: "SELL", impact: "New stocks arriving in Mandi" }
];

const mockStore = [
    { name: "Rice (High Quality Grain)", price: "₹450", image: "images/rice.png" },
    { name: "Cotton (Raw Harvested)", price: "₹850", image: "images/cotton.png" },
    { name: "Wheat (Premium Pusa)", price: "₹320", image: "images/wheat.png" },
    { name: "Mustard (Black Grain)", price: "₹680", image: "images/mustard.png" },
    { name: "DAP Fertilizer (50kg)", price: "₹1,200", image: "https://images.unsplash.com/photo-1592982537447-6f2bf1ecb3d9?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Golden Rice Seeds", price: "₹650", image: "https://images.unsplash.com/photo-1588612143431-897f26f743b8?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Carrot Seeds (Hybrid)", price: "₹320", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Wheat Seeds (PBW 343)", price: "₹450", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Pesticide Spray", price: "₹850", image: "https://images.unsplash.com/photo-1628189689408-db28c1154ce1?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Irrigation Pipe", price: "₹1,500", image: "https://images.unsplash.com/photo-1632053001859-e9357ab0138d?auto=format&fit=crop&q=80&w=400&h=300" }
];

const mockStorage = [
    { name: "AgriCold Logistics", dist: 4.2, capacity: "Available", phone: "9876500111" },
    { name: "Kisan Mega Storage", dist: 7.8, capacity: "Limited", phone: "9876500222" },
    { name: "Green Valley Cold", dist: 12.5, capacity: "Full", phone: "9876500333" },
    { name: "Rural Warehousing", dist: 15.0, capacity: "Available", phone: "9876500444" },
    { name: "Farmer-First Chain", dist: 18.2, capacity: "Available", phone: "9876500555" }
];

function callNumber(number) {
    showToast(`Initiating call to ${number}...`);
    setTimeout(() => {
        window.location.href = `tel:${number}`;
    }, 1000);
}

function initApp() {
    // Render News
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = mockNews.map(news => `
        <div class="news-card">
            <h4>${news.title}</h4>
            <p>${news.desc}</p>
        </div>
    `).join('');

    // Render Cattle Market
    const cattleContainer = document.getElementById('cattle-feed');
    cattleContainer.innerHTML = mockCattle.map(cattle => `
        <div class="card">
            <img src="${cattle.image}" class="card-img" alt="${cattle.breed}">
            <div class="card-content">
                <div class="card-title">${cattle.breed}</div>
                <div class="card-details">
                    <span class="detail-badge"><i class="fas fa-calendar"></i> ${cattle.age}</span>
                    <span class="detail-badge"><i class="fas fa-tint"></i> ${cattle.yield}</span>
                </div>
                <div class="price-tag">${cattle.price}</div>
                <button class="btn-primary w-100" onclick="callNumber('${cattle.phone}')"><i class="fas fa-phone-alt"></i> ${i18n[currentLang].call}</button>
            </div>
        </div>
    `).join('');

    // Render Smart Market
    const cropContainer = document.getElementById('crop-feed');
    cropContainer.innerHTML = mockCrops.map(crop => `
        <div class="card">
            <div class="card-content">
                <div class="card-title">${crop.name}</div>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">${crop.impact}</p>
                <div class="predicted-price">
                    <div class="current">Current: ₹${crop.current}</div>
                    <div class="future ${crop.trend === 'up' ? 'trend-up' : 'trend-down'}">
                        ₹${crop.predicted} 
                        <i class="fas fa-arrow-${crop.trend}"></i>
                    </div>
                </div>
                <div class="advice-tag ${crop.advice === 'HOLD' ? 'bg-hold' : 'bg-sell'}">
                    <strong>${crop.advice}</strong>
                </div>
            </div>
        </div>
    `).join('');

    // Render Agri-Store
    const storeContainer = document.getElementById('store-feed');
    if (storeContainer) {
        storeContainer.innerHTML = mockStore.map((item, index) => {
            const inCart = userState.cart.find(c => c.name === item.name);
            const qtyControl = inCart ? `
                <div class="qty-control">
                    <button class="btn-qty" onclick="decrementCart(${index})">-</button>
                    <span class="qty-count">${inCart.quantity}</span>
                    <button class="btn-qty" onclick="addToCart(${index})">+</button>
                </div>
            ` : `
                <button class="btn-secondary w-100" onclick="addToCart(${index})">
                    <i class="fas fa-shopping-cart"></i> ${i18n[currentLang].add_cart}
                </button>
            `;

            return `
                <div class="card store-card">
                    <img src="${item.image}" class="card-img" alt="${item.name}">
                    <div class="card-content">
                        <div class="card-title">${item.name}</div>
                        <div class="price-tag">${item.price}</div>
                        ${qtyControl}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render Storage
    const storageContainer = document.getElementById('storage-feed');
    storageContainer.innerHTML = mockStorage.sort((a, b) => a.dist - b.dist).map(store => `
        <div class="card">
            <div class="card-content" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div class="card-title" style="margin-bottom: 4px;">${store.name}</div>
                    <div class="card-details" style="margin-bottom: 0;">
                        <span class="detail-badge"><i class="fas fa-map-marker-alt"></i> ${store.dist} km</span>
                        <span class="detail-badge" style="color: ${store.capacity === 'Full' ? '#D32F2F' : 'var(--forest-green)'}">${store.capacity}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-icon-sm" onclick="showToast('Opening Map...')"><i class="fas fa-map-marked-alt"></i></button>
                    <button class="btn-icon-sm" onclick="callNumber('${store.phone}')"><i class="fas fa-phone-alt"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize databinding on load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    initApp();
});
