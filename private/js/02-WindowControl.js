const $btn = {
    min: document.getElementById(config.WindowButtons.min),
    max: document.getElementById(config.WindowButtons.max),
    close: document.getElementById(config.WindowButtons.close)
}
    , Icon = {
        max: `<svg viewBox="0 0 20 20">
<path d="M 1 1 V19 H19 V1 H1 z M19 19 H1 V4 H19 V19 z" />
</svg>`,
        min: `<svg viewBox="0 0 20 20">
<path d="M7 1 V11 H19 V1 H7 z  M19 11 H7 V3 H19 V11 z"/>
<path d="M12 12 L12 19 L1 19 L1 9 L6 9 L6 9 L1 9 L1 19 L12 19 L12 19z" />
<rect x="1" y="9" width="4.5" height="2" />
</svg>`
    }
    , remote = electron.remote
    , MainWindow = remote.getCurrentWindow()

/* Detect Window size change and adapt the icons */
MainWindow.on('maximize', () => $btn.max.innerHTML = Icon.min)
MainWindow.on('unmaximize', () => $btn.max.innerHTML = Icon.max)

$btn.min.addEventListener('click', () => {
    MainWindow.minimize()
}, { passive: true })

$btn.max.addEventListener('click', () => {
    if (!MainWindow.isMaximized()) {
        MainWindow.maximize()
    } else {
        MainWindow.unmaximize()
    }
}, { passive: true })

$btn.close.addEventListener('click', () => {
    Table.Close()
    MainWindow.close()
}, { passive: true })