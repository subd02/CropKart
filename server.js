const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

// --- EMAIL SETUP --- //
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dsubhayu07@gmail.com',
        pass: 'yljiwlwzvfhhcsyu'
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const otps = {};

function loadUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    } catch (e) { return []; }
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// REGISTER ENDPOINT
app.post('/api/register', (req, res) => {
    const { name, id, pass } = req.body;
    let users = loadUsers();
    if (users.find(u => u.id === id)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ name, id, pass });
    saveUsers(users);
    res.json({ message: 'Registration successful!', name: name });
});

// LOGIN ENDPOINT
app.post('/api/login', (req, res) => {
    const { id, pass } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.id === id && u.pass === pass);
    if (user) {
        res.json({ message: 'Login successful', user: user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// --- RANDOM OTP SENDING WITH FAILSAFE --- //
app.post('/api/send-otp', async (req, res) => {
    const { id } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // 🎲 GENERATE RANDOM 6-DIGIT OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[id] = otp;

    const mailOptions = {
        from: '"CropKart Team" <dsubhayu07@gmail.com>',
        to: id,
        subject: 'Your CropKart OTP Code',
        text: `Welcome back, ${user.name}! Your random OTP is: ${otp}`
    };

    try {
        // Try to send the real email
        await transporter.sendMail(mailOptions);
        console.log(`Random OTP ${otp} sent to ${id}`);
        res.json({ message: 'OTP sent to your email!' });
    } catch (error) {
        console.error("GMAIL BLOCK:", error.message);
        // ⚠️ FAILSAFE: If email fails, the OTP shows up on your phone screen so you can still log in!
        res.json({ message: `[DEMO MODE] Your OTP is: ${otp}` });
    }
});

// VERIFY OTP ENDPOINT
app.post('/api/verify-otp', (req, res) => {
    const { id, otp } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.id === id);

    if (user && otps[id] === otp) {
        delete otps[id];
        res.json({ message: 'Login successful', user: user });
    } else {
        res.status(401).json({ message: 'Invalid or expired OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`);
});