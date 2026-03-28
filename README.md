# CropKart 🌾
An agriculture-focused platform for managing crop pricing and logistics.

🚀 Live Demo
**Link**: https://cropcart-echelon.vercel.app

## 🌍 Strategic Design: Why a Web-First Approach?

While the competition suggests building a native app, **CropKart** is intentionally built as a high-performance Web Application (PWA). This decision was made to solve two critical pain points for our target users (Farmers):

1. **Zero-Install Friction:** Farmers with low-end devices or limited storage (16GB/32GB) cannot afford to download bulky 100MB+ apps. CropKart works instantly via a URL.
2. **Low-Data Optimization:** Our "Single Page Architecture" ensures that only essential data is fetched. This makes the platform usable even on unstable 2G/3G connections in rural areas.
3. **Cross-Platform Readiness:** By using a web-first stack, we provide a consistent experience across Android, iOS, and Desktop (via the included Electron wrapper) without needing separate codebases.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (`main.js`, `app.js`)
* **Backend/Logic:** Node.js (`server.js`), Java, and C++ (`PriceAndDistanceLogic`)
* **Deployment:** Vercel

## ⚙️ How to Run Locally
1. Clone the repo: `git clone https://github.com/subd02/CropKart.git`
2. Install dependencies: `npm install`
3. Start the server: `node server.js`
4. Open `index.html` in your browser.

## 📦 Project Structure
* `/images`: Product assets (Rice, Wheat, Mustard, etc.)
* `PriceAndDistanceLogic`: Core algorithms implemented in multiple languages for more prescision.
* `vercel.json`: Configuration for seamless Vercel hosting.

## Sample Account Credentials
* email- test@example.com
* password- password123
* if while registering or login error show "Server offline" try login as guest
