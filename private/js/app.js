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
$Listener.SELECTChange($Sel.Options.SearchMode, $App.Options.Update.SearchMode)
// Display Mode
$Listener.SELECTChange($Sel.Options.DisplayMode, $App.Options.Update.DisplayMode)
// Parameter List
$Listener.SELECTChange($Sel.Options.ParameterList, $App.Options.Update.ParameterList)




/* ###################################### */
/* RUN now! */
/* ###################################### */

/* Initialize the page content*/
$DB.SearchParameter.Initialize(
    $DB.Options.Initialize(
        $DB.LastSearch.Initialize(
            $App.Search.Initialize
        )
    )
)

//$DB.SearchParameter.Fill(ParamDMX)