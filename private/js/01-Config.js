const electron = require('electron')
    , config = require('../../middlewares/config')
    , ipcRenderer = electron.ipcRenderer
    , RunMode = (process.env.NODE_ENV !== undefined) ? false : true
    , $aLink = document.querySelectorAll('aside a')
    , $h1 = document.querySelector('h1>span')
    , $MainContent = document.getElementById('maincontent')
    , SlotClass = 'wheelfield'

ipcRenderer.on('ModalTemplate', (e, data) => {
    document.body.insertAdjacentHTML('beforeend', data.template)
})