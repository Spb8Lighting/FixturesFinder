const electron = require('electron')
    , db = require('./database.init')
    , config = require('./config')
    , remote = electron.remote
    , MainWindow = remote.getCurrentWindow()

const btn = {
    min: document.getElementById(config.WindowButtons.min),
    max: document.getElementById(config.WindowButtons.max),
    close: document.getElementById(config.WindowButtons.close)
}

// Minimize icon
btn.min.addEventListener('click', () => {
    MainWindow.minimize()
    btn.min.blur()
})

// Maximize icon
btn.max.addEventListener('click', () => {
    !MainWindow.isMaximized() ? MainWindow.maximize() : MainWindow.unmaximize()
    btn.max.blur()
})

/* Detect Window size change and adapt the icons */
MainWindow.on('maximize', () => btn.max.innerHTML = config.WindowButtonsImg.restore)
MainWindow.on('unmaximize', () => btn.max.innerHTML = config.WindowButtonsImg.max)

// Close icon
btn.close.addEventListener('click', () => db.close(err => err ? console.error(err.message) : MainWindow.close()))

module.exports = false