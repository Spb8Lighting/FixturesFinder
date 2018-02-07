let AllDivs = document.querySelectorAll('#maincontent>div')

$aLink.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault()
        let PageName = elem.getAttribute('href')
        $aLink.forEach(elem => {                                                // Remove .active on links
            if (elem.getAttribute('href') == PageName) {
                elem.classList.add('active')
            } else {
                elem.classList.remove('active')
            }
        })
        AllDivs.forEach(elem => {            // Show only the wanted content
            if (elem.getAttribute('id') == PageName) {
                elem.classList.remove('hide')
            } else {
                elem.classList.add('hide')
            }
        })
        $h1.innerHTML = `Fixtures Finder/${PageName} - v${config.Version}`      // Update Title
        elem.blur()                 // Remove :active on link
    }, { passive: false })
})