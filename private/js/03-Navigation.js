$aLink.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault()
        let PageName = elem.getAttribute('href')
        //ipcRenderer.send('pageChange', {page : elem.getAttribute('href')})		// Request new page content
        $aLink.forEach(elem => {                                                // Remove .active on links
            if(elem.getAttribute('href') == PageName) {
                elem.classList.add('active')
            } else {
                elem.classList.remove('active')
            }
        })
        document.querySelectorAll('#maincontent>div').forEach(elem => {            // Show only the wanted content
            if(elem.getAttribute('id') == PageName) {
                elem.classList.remove('hide')
            } else {
                elem.classList.add('hide')
            }
        })
        $h1.innerHTML = `Fixtures Finder/${PageName} - v${config.Version}`      // Update Title
        document.activeElement && document.activeElement.blur() 				// Remove :active on link
    })
})