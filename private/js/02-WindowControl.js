$btn.min.addEventListener('click', () => {
    let window = remote.getCurrentWindow()
    window.minimize()
}, {passive: true})

$btn.max.addEventListener('click', () => {
    let window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
        window.maximize()
        $btn.max.innerHTML = Icon.min
    } else {
        window.unmaximize()
        $btn.max.innerHTML = Icon.max
    }
}, {passive: true})

$btn.close.addEventListener('click', () => {
    let window = remote.getCurrentWindow()
    Table.Close()
    window.close()
}, {passive: true})