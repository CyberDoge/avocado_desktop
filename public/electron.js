const electron = require("electron")

const { app } = electron
const { BrowserWindow } = electron
const path = require("path")
const fs = require("fs")
const isDev = require("electron-is-dev")
const extract = require("extract-zip")
const { ipcMain } = require("electron")

let mainWindow

function createWindow() {
  const image = electron.nativeImage.createFromPath("public/icon.png")
  image.setTemplateImage(true)
  mainWindow = new BrowserWindow({
    icon: image,
    webPreferences: {
      // God, forgive me
      webSecurity: false,
      nodeIntegration: true,
      allowRunningInsecureContent: false,
      devTools: isDev
    }
  })

  mainWindow.openDevTools()
  mainWindow.maximize()
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  )

  mainWindow.on("closed", () => {
    mainWindow = null
  })
  electron.protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""))
    callback(pathname)
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.handle("unzip", async (event, sources, dest) => {
  const files = []
  sources.forEach((source) => {
    extract(source, {
      dir: dest,
      onEntry: (entry) => {
        const imagePath = `${dest}${path.sep}${entry.fileName}`
        if (fs.lstatSync(imagePath).isFile()) {
          files.push(imagePath)
        }
      }
    })
  })

  return files
})
