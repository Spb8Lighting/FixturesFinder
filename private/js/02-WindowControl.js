$btn.min.addEventListener('click', e => {
    e.preventDefault()
    let window = remote.getCurrentWindow()
    window.minimize()
})

$btn.max.addEventListener('click', e => {
    e.preventDefault()
    let window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
        window.maximize()
        $btn.max.innerHTML = Icon.min
    } else {
        window.unmaximize()
        $btn.max.innerHTML = Icon.max
    }
})

$btn.close.addEventListener('click', e => {
    e.preventDefault()
    let window = remote.getCurrentWindow()
    Table.Close()
    window.close()
})