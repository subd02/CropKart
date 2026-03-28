const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'images/cotton.png'), // Using your logo
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html'); // This loads your main CropKart page
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});