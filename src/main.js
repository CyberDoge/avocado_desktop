const nativeImage = require('electron').nativeImage;
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  const image = nativeImage.createFromPath('public/logo.png');
  image.setTemplateImage(true);
  mainWindow = new BrowserWindow({width: 900, height: 680, icon: image});
  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  console.log(__dirname)

});
app.on("activate", () => {
  console.log(__dirname)

  if (mainWindow === null) {
    createWindow();
  }
});
