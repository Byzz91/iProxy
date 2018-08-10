const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const child_process = require('child_process');

let mainWindow;
let logEmitters = [];
let queueEmitters = [];

function createWindow() {
  mainWindow = new BrowserWindow({
    width      : 500,
    height     : 950,
    frame      : true,
    transparent: false,
    icon       : path.join(__dirname, "favicon-96x96.png")
  })

  let startUrl = url.format(process.env.ELECTRON_START_URL || {
    pathname: path.join(__dirname, '../../build/index.html')
  });

  // console.log('startUrl', startUrl);

  mainWindow.loadURL(startUrl);

  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => window = null);
  mainWindow.setResizable(true);
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
  if ( queueEmitters.length ) {
    (async () => {
      logEmitters = await JSON.parse(JSON.stringify(queueEmitters));
      event.sender.send('sending-logs', logEmitters);

      queueEmitters = [];
    })();
  }
});

const proxyInstance = child_process.fork(path.join(__dirname, './proxy-server.js'), [], ['pipe', 'pipe', 'pipe', 'ipc']);
proxyInstance.on('message', (data) => {
  queueEmitters.push( data );
});