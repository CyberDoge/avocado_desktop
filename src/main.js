const nativeImage = require("electron").nativeImage
const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require("path")
const isDev = require("electron-is-dev")
let mainWindow

function createWindow() {
  const image = nativeImage.createFromPath("public/logo.png")
  image.setTemplateImage(true)
  mainWindow = new BrowserWindow({
    fullscreen: true, icon: image, webPreferences: {
      // God, forgive me
      webSecurity: false,
      allowRunningInsecureContent: false,
      devTools: true,
    }
  })
  mainWindow.openDevTools()
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  )
  mainWindow.on("closed", () => (mainWindow = null))
  electron.protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''))
    callback(pathname);
  });
}

app.on("ready", createWindow)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
  console.log(__dirname)
})
app.on("activate", () => {
  console.log(__dirname)

  if (mainWindow === null) {
    createWindow()
  }
})
