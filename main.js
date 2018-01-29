require('require-rebuild')()

const electron = require('electron')
  , fs = require('fs')
  , sqlite3 = require('sqlite3')
  , ipcMain = electron.ipcMain
  , app = electron.app
  , BrowserWindow = electron.BrowserWindow
  , config = require('./config')

let mainWindow
  , modalWindow

app.setName(config.productName)

let WindowManager = {
  Main: null,
  Modal: null,
  Create: {
    Main: () => {
      WindowManager.Main = new BrowserWindow({
        width: 900,
        minWidth: 900,
        Height: 600,
        minHeight: 600,
        frame: false,
        maximized: false,
        center: true,
        title: 'Fixtures Finder',
        icon: 'dist/img/favicon.ico',
        titleBarStyle: 'customButtonsOnHover'
      })

      WindowManager.Main.loadURL(`file://${__dirname}/public/html/index.html`)

      //WindowManager.Main.webContents.openDevTools()

      WindowManager.Main.on('closed', () => WindowManager.Main = null)
    },
    Modal: () => {
      WindowManager.Modal = new BrowserWindow({
        parent: WindowManager.Main,
        modal: true,
        show: false
      })
      WindowManager.Modal.loadURL(`file://${__dirname}/public/html/modal_windows.html`)

      WindowManager.Modal.once('ready-to-show', () => WindowManager.Modal.show())

      WindowManager.Modal.on('closed', () => WindowManager.Modal = null)
    }
  }
}
app.on('ready', () => {
  WindowManager.Create.Main()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (WindowManager.Main === null) {
    WindowManager.Create.Main()
  }
})

ipcMain.on('ChannelTemplate', (e, data) => {
  fs.readFile(`${__dirname}/public/html/search_channel.html`, (err, HTML) => {
    if (err) {
      return console.error(err)
    } else {
      HTML = HTML.toString().replace(new RegExp(config.ChangeRegex.Channel, 'g'), data.Channel)
      e.sender.send('ChannelTemplate', {
        selector: config.Form.Search.BaseName_Channel + data.Channel,
        template: HTML
      })
    }
  })
})
ipcMain.on('ModalTemplate', (e, data) => {
  fs.readFile(`${__dirname}/public/html/modal_window.html`, (err, HTML) => {
    if (err) {
      return console.error(err)
    } else {
      HTML = HTML.toString().replace(new RegExp(config.ChangeRegex.Modal, 'g'), data.Modal)
      e.sender.send('ModalTemplate', {
        template: HTML
      })
      if (data.Reboot) {
        setTimeout(() => {
          app.relaunch()
          app.exit(0)
        }, 5000)
      }
    }
  })
})