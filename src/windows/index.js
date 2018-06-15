const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
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

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {

})