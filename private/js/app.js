/* ###################################### */
/* Standard config */
/* ###################################### */

const electron = require('electron')
    , config = require('../../middlewares/config')
    , ipcRenderer = electron.ipcRenderer

global.DB = {}

ipcRenderer.on('ModalTemplate', (e, data) => {
    document.body.insertAdjacentHTML('beforeend', data.template)
})




/* ###################################### */
/* Window management */
/* ###################################### */

// Integrate Window Control (Minimize, Maximize, Close)
const WindowControl = require('../../middlewares/window.control')
    // Make Navigation alive
    , WindowNavigation = require('../../middlewares/window.navigation')





/* ###################################### */
/* Database */
/* ###################################### */

/* Define Database Setter & Getters */
let $DB = {
    SearchParameter: require('../../middlewares/database.table.SearchParameter'),
    Options: require('../../middlewares/database.table.Options'),
    LastSearch: require('../../middlewares/database.table.LastSearch')
}





/* ###################################### */
/* Page Selectors */
/* ###################################### */

let $Sel = {
    Search: require('../../middlewares/selectors.Search'),
    Options: require('../../middlewares/selectors.Options')
}
    , $Listener = require('../../middlewares/listener')





/* ###################################### */
/* Load needed Application */
/* ###################################### */
let $App = {
    DMXMaxChannel: require('../../middlewares/app.DMXMaxChannel'),
    SelectOptions: require('../../middlewares/app.SelectOptions'),
    Search: require('../../middlewares/app.Search'),
    Options: require('../../middlewares/app.Options')
}





/* ###################################### */
/* Page Search */
/* ###################################### */

/* Getters */
$Sel.Search.Form.addEventListener('change', e => {
    clearTimeout($Sel.Search.Timer.Form)
    $Sel.Search.Timer.Form = setTimeout($App.Search.Update.All, 50)
}, { passive: true })

/* Buttons */
// Reset
$Sel.Search.Button.Reset.addEventListener('click', $App.Search.Reset, { passive: true })

/* DMX Channel Count */
$Sel.Search.DMXChannelCount.addEventListener('click', $Sel.Search.DMXChannelCount.select, { passive: true })
$Sel.Search.DMXChannelCount.addEventListener('change', $App.Search.AdjustChannelSearch, { passive: true })

// Button +
$Sel.Search.DMXChannelCount_Btn_Add.addEventListener('click', $App.Search.AddChannelSearch, { passive: true })
// Button -
$Sel.Search.DMXChannelCount_Btn_Rem.addEventListener('click', $App.Search.RemChannelSearch, { passive: true })

// Manufacturer
$Listener.SELECTChange($Sel.Search.Manufacturer)

// Fixture Name
$Listener.SELECTChange($Sel.Search.FixtureName)





/* ###################################### */
/* Page Option */
/* ###################################### */

// Form Change => Save Options
$Sel.Options.Form.addEventListener('change', $App.Options.Update.All, { passive: true })

// Reset Button => Reset Options
$Sel.Options.ResetButton.addEventListener('click', $App.Options.Reset, { passive: true })

// Search Mode
$Listener.SELECTChange($Sel.Options.SearchMode, () => {
    $App.Options.Update.SearchMode()
    $DB.Options.Initialize()
        .then(response => {
            global.DB.Options = response
            return $App.DMXMaxChannel.CheckDisplay()
        })
})
// Display Mode
$Listener.SELECTChange($Sel.Options.DisplayMode, $App.Options.Update.DisplayMode)
// Parameter List
$Listener.SELECTChange($Sel.Options.ParameterList, () => {
    $App.Options.Update.ParameterList()
    $DB.Options.Initialize()
        .then(response => {
            global.DB.Options = response
            return $App.SelectOptions.CheckOptions()
                .then(response => {
                    return $App.Search.Initialize()
                })
        })
})




/* ###################################### */
/* RUN now! */
/* ###################################### */

/* Initialize the page content*/
$DB.SearchParameter.Initialize().then(response => {
    // Get SearchParameter answer
    global.DB.SearchParameter = response
    console.log('Database Select Parameter Ready', global.DB.SearchParameter)
    return $App.SelectOptions.Initialize()
        .then(response => {
            global.DB.SearchParameter = response
            console.log('Parameter for Select Ready', global.DB.SearchParameter)
            return $DB.Options.Initialize()
                .then(response => {
                    global.DB.Options = response
                    console.log('Database Options Ready', global.DB.Options)
                    return $App.Options.Reselect()
                        .then(response => {
                            console.log('Restore previous options', response)
                            return $App.DMXMaxChannel.CheckDisplay()
                                .then(response => {
                                    console.log('Restore DMXMaxChannel visibility compare to option', response)
                                    return $DB.LastSearch.Initialize()
                                        .then(response => {
                                            global.DB.LastSearch = response
                                            console.log('Database LastSearch Ready', global.DB.LastSearch)
                                            return $App.Search.Initialize()
                                                .then(response => {
                                                    console.log('Rebuild the search form', response)
                                                    return $App.SelectOptions.CheckOptions()
                                                        .then(response => {
                                                            console.log('Restore Select Content', response)
                                                            if (response == 'Please Initialize Again') {
                                                                return $App.Search.Initialize()
                                                            } else {
                                                                resolve(response)
                                                            }
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })
}).catch(e => {
    console.error(e)
})

//$DB.SearchParameter.Fill(ParamDMX)