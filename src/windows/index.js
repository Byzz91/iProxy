const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const ip = require('ip');
const child_process = require('child_process');
const jquery = require('jquery');

let mainWindow;
let logEmitters = [];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: true,
    transparent: false
  })

  let startUrl = url.format(process.env.ELECTRON_START_URL || {
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: "file:",
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => window = null);
  mainWindow.setResizable(false);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
});

ipcMain.on('bring-logs', (event, senderType) => {
  event.sender.send('sending-logs', logEmitters);
  logEmitters = [];
});

const proxyInstance = child_process.fork(path.join(__dirname, '../proxy-server.js'), [], ['pipe', 'pipe', 'pipe', 'ipc']);
proxyInstance.on('message', (data) => {
  logEmitters.push( data );
});