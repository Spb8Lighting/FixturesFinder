$aLink.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault()
        ipcRenderer.send('pageChange', {page : elem.getAttribute('href')})		// Request new page content
        $aLink.forEach(elem => {												// Remove .active on links
            elem.classList.remove('active')
        })
        elem.classList.add('active')
        document.activeElement && document.activeElement.blur() 				// Remove :active on link
    })
})

ipcRenderer.on('pageChange', (e, data) => {
    $MainContent.innerHTML = data.page
    $h1.innerHTML = `Fixtures Finder/${data.PageName} - v${config.Version}`
})