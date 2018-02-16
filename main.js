const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let win

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })

  if (process.env.NODE_ENV === 'production') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(url.format({
      protocol: 'http:',
      slashes: true,
      hostname: 'localhost',
      port: 8080,
    }));
  }

  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
