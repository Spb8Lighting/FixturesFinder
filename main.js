const electron = require('electron')
, sqlite3 = require('sqlite3')
, ipcMain = electron.ipcMain
, app = electron.app
, BrowserWindow = electron.BrowserWindow
, ejs = require('ejs')
, ejse = require('ejs-electron')
, config = require('./config')

let mainWindow

ejse.data({'Page' : 'search', 'PageTitle' : `Fixtures Finder/Search - v${config.Version}`, 'config' : config}).options('debug', false)

function createWindow () {
  mainWindow = new BrowserWindow({
		width						: 800,
		minWidth				: 800,
		Height					: 600,
		minHeight				: 600,
		frame						: false,
		maximized				: false,
    center					: true,
		title						:	'Fixtures Finder',
		icon						: 'dist/img/favicon.ico',
		titleBarStyle		: 'customButtonsOnHover'
	})

  mainWindow.loadURL(`file://${__dirname}/views/index.ejs`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

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

ipcMain.on('pageChange', (e, data) => {
  let PageName = data.page
  ejs.renderFile(`${__dirname}/views/${data.page.toLowerCase()}.ejs`, {'config' : config},  (err, data) => {
    e.sender.send('pageChange', { PageName : PageName, page : data })
  })
})
