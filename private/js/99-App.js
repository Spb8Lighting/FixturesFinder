/* Initialize the page content*/
Table.Options.Initialize(DMXChannelSearch.AddChannelSearch)

/* General Function */
//TO BE UPDATED TO TAKE CARE ABOUT DYNAMIC SELECT ADD/REMOVE
document.querySelectorAll('select').forEach( elem => {
    elem.addEventListener('change', e => {
        elem.setAttribute('data-option', elem.querySelector('option:selected').getAttribute('value'))
    })
})