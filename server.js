const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(bodyParser.json());

// Load users from file
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

// Save users to file
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

app.listen(PORT, () => {
    console.log(`CropKart Server running on http://localhost:${PORT}`);
});
