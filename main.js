const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess = null;

function startServer() {
    serverProcess = spawn('node', [path.join(__dirname, 'server.js')], {
        cwd: __dirname,
        stdio: 'inherit' // Shows server logs in the same terminal
    });

    serverProcess.on('error', (err) => {
        console.error('Failed to start server:', err);
    });

    console.log('CropKart backend server started.');
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'images/cotton.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    startServer();
    // Small delay to let the server boot before the window opens
    setTimeout(createWindow, 1000);
});

app.on('window-all-closed', () => {
    if (serverProcess) {
        serverProcess.kill();
        console.log('CropKart backend server stopped.');
    }
    if (process.platform !== 'darwin') app.quit();
});