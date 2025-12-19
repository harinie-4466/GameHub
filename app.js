const { app, BrowserWindow, ipcMain } = require('electron');
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const PORT = 3000;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(`http://localhost:${PORT}`);
    mainWindow.webContents.openDevTools();

    // Handle IPC to navigate to after login page
    ipcMain.on('navigate-to-after-login', () => {
        mainWindow.loadFile('After login page.html');
    });
}

app.on('ready', () => {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url);
        const pathName = parsedUrl.pathname;

        console.log(`Received request for ${pathName} with method ${req.method}`);

        if (pathName === '/login' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
            });
            req.on('end', () => {
                const { username, password, createAccount } = JSON.parse(body);
                if (createAccount) {
                    // Append new user credentials to "text.txt"
                    const newUser = `${username}:${password}`;
                    fs.appendFile("text.txt", "\n" + newUser, err => { // Appending new user to a new line
                        if (err) {
                            console.error(err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Account created successfully');
                    });
                } else {
                    // Validate username and password against text.txt
                    fs.readFile("text.txt", "utf-8", (err, data) => {
                        if (err) {
                            console.error(err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                            return;
                        }
                        const credentials = data.trim().split('\n').map(line => line.split(':'));
                        const found = credentials.find(([storedUsername, storedPassword]) => 
                            storedUsername.trim() === username.trim() && storedPassword.trim() === password.trim()
                        );
                        if (found) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: true }));
                        } else {
                            res.writeHead(401, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false }));
                        }
                    });
                }
            });
        } else {
            const filePath = pathName === '/' ? '/login.html' : pathName;
            const ext = path.extname(filePath).slice(1);
            const contentType = {
                html: 'text/html',
                css: 'text/css',
                js: 'application/javascript',
                png: 'image/png',
                jpg: 'image/jpeg',
                gif: 'image/gif',
            }[ext] || 'text/plain';

            fs.readFile(`.${filePath}`, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not Found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            });
        }
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    createWindow();
});