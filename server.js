const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// 🔥 RENDER PORT FIX
const PORT = process.env.PORT || 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

// --- EMAIL SETUP --- //
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dsubhayu07@gmail.com', // <-- Type your actual Gmail right here
        pass: 'yljiwlwzvfhhcsyu'
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const otps = {};

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
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

    const newUser = { name, id, pass };
    users.push(newUser);
    saveUsers(users);

    console.log(`User registered: ${id}`);
    res.json({ message: 'Registration successful', name: name });
});

// LOGIN ENDPOINT
app.post('/api/login', (req, res) => {
    const { id, pass } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.id === id && u.pass === pass);

    if (user) {
        console.log(`User logged in: ${id}`);
        res.json({ message: 'Login successful', user: user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// --- REAL SEND OTP ENDPOINT --- //
app.post('/api/send-otp', async (req, res) => {
    const { id } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[id] = otp;

    // Build the email
    const mailOptions = {
        from: 'CropKart Team',
        to: id,
        subject: 'Your CropKart OTP Code',
        text: `Welcome back, ${user.name}! Your One-Time Password (OTP) is: ${otp}. Do not share this with anyone.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Real Email OTP sent to ${id}`);
        res.json({ message: `OTP sent successfully to your email!` });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: 'Error sending email. Please try again later.' });
    }
});

// VERIFY OTP ENDPOINT
app.post('/api/verify-otp', (req, res) => {
    const { id, otp } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.id === id);

    if (user && otps[id] === otp) {
        delete otps[id];
        console.log(`User logged in with OTP: ${id}`);
        res.json({ message: 'Login successful', user: user });
    } else {
        res.status(401).json({ message: 'Invalid or expired OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`CropKart Server running on port ${PORT}`);
});