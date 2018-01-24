require('require-rebuild')()

const electron =  require('electron')
, fs =            require('fs')
, sqlite3 =       require('sqlite3')
, ipcMain =       electron.ipcMain
, app =           electron.app
, BrowserWindow = electron.BrowserWindow
, config =        require('./config')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
		width						: 900,
		minWidth				: 900,
		Height					: 600,
		minHeight				: 600,
		frame						: false,
		maximized				: false,
    center					: true,
		title						:	'Fixtures Finder',
		icon						: 'dist/img/favicon.ico',
		titleBarStyle		: 'customButtonsOnHover'
	})

  mainWindow.loadURL(`file://${__dirname}/public/html/index.html`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('ChannelTemplate', (e, data) => {
  fs.readFile(`${__dirname}/public/html/search_channel.html`, (err, HTML) => {
    if (err) {
      return console.error(err)
    } else {
      HTML = HTML.toString().replace(new RegExp(config.ChangeRegex.Channel, 'g'), data.Channel)
      e.sender.send('ChannelTemplate', {
        selector : config.Form.Search.BaseName_Channel + data.Channel,
        template : HTML
      })
    }
  })
})
