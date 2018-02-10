const electron = require('electron')
    , config = require('./config')
    , ipcRenderer = electron.ipcRenderer

let $Listener = require('./listener')
    , $Sel = {
        Search: require('./selectors.Search'),
        Options: require('./selectors.Options')
    }
    , $App = {
        Options: require('./app.Options'),
        SelectOptions: require('./app.SelectOptions')
    }
    , $DB = {
        LastSearch: require('./database.table.LastSearch'),
        Options: require('./database.table.Options')
    }

global.DB.DMXChannelCount = 0
/**
 * Initialize the form with last search content
 */
let Initialize = () => {
    clearTimeout($Sel.Search.Timer.LastSearch['DBSearch'])
    if (global.DB.LastSearch === undefined) {
        $Sel.Search.Timer.LastSearch['DBSearch'] = setTimeout(Initialize, 50)
    } else {
        // Restore previous search
        let event = new Event('change')
            , ManufacturerOption = $Sel.Search.Manufacturer.querySelector('option[value="' + global.DB.LastSearch[config.Form.Search.Manufacturer].toLowerCase() + '"]')
            , FixtureNameOption = $Sel.Search.FixtureName.querySelector('option[value="' + global.DB.LastSearch[config.Form.Search.FixtureName].toLowerCase() + '"]')

        // Restore previous DMX Channel Count then adjust the number of select to be displayed
        $Sel.Search.DMXChannelCount.value = global.DB.LastSearch[config.Form.Search.DMXChannelCount]
        AdjustChannelSearch()

        // Set Manufacturer
        if (global.DB.LastSearch[config.Form.Search.Manufacturer] != config.Default.All.toLowerCase() && ManufacturerOption) {
            ManufacturerOption.selected = true
            $Sel.Search.Manufacturer.dispatchEvent(event)
        }

        // Set FixtureName
        if (global.DB.LastSearch[config.Form.Search.FixtureName] != config.Default.All.toLowerCase() && FixtureNameOption) {
            FixtureNameOption.selected = true
            $Sel.Search.FixtureName.dispatchEvent(event)
        }

        //Reselect previous searchs values of DMX Channel
        Reselect()
    }
}
/**
 * Parse saved data and set the value
 * @param {Object} Data
 * @param {string} Default
 * @param {function} Callback
 */
let ParseSave = (Data, Default, Callback) => {
    for (let i = 0; i < Data.length; i++) {
        let obj = Data[i]
        for (let key in obj) {
            if (obj[key].toLowerCase() != Default.toLowerCase()) {
                Callback(key, obj[key])
            }
        }
    }
}
/**
 * Restore Previous Search
 */
let Reselect = () => {
    clearTimeout($Sel.Search.Timer.LastSearch['reselect'])
    if (!$Sel.Search.Status.SearchInitialize) {
        $Sel.Search.Timer.LastSearch['reselect'] = setTimeout(Reselect, 50)
    } else {
        ParseSave(global.DB.LastSearch[config.Form.Search.DMXChart_Channel], config.Default.Any, SetSelect)
        ParseSave(global.DB.LastSearch[config.Form.Search.DMXChart_Slot], config.Default.Infinity, SetInput)
    }
}
/**
 * Set Input value
 * @param {int} id
 * @param {string} value
 */
let SetInput = (id, value) => {
    clearTimeout($Sel.Search.Timer[id])
    let input = document.getElementById(config.Form.Search.BaseName_Wheel + id)
    if (input == null) {
        $Sel.Search.Timer[id] = setTimeout(() => SetInput(id, value), 50)
    } else {
        input.value = value.toLowerCase()
        input.dispatchEvent(new Event('change'))
    }
}
/**
 * Set Select value
 * @param {int} id
 * @param {string} value
 */
let SetSelect = (id, value) => {
    clearTimeout($Sel.Search.Timer[id])
    let select = document.getElementById(config.Form.Search.BaseName_Channel + id)
        , NbOption = select.querySelectorAll('option').length
    if (NbOption != (global.DB.SelectParameter.length + 1)) {
        $Sel.Search.Timer[id] = setTimeout(() => SetSelect(id, value), 50)
    } else {
        let OptionToSelect = select.querySelector('option[value="' + value.toLowerCase() + '"]')
        if (OptionToSelect) {
            OptionToSelect.selected = true
            select.dispatchEvent(new Event('change'))
        } else {
            let ActivePage = document.querySelector('aside a.active')
                , DIVParent = select.closest('div')
                , ErrorNotification = new Notification('Parameter display', {
                    body: `#${id} DMX Channel used "${value}" parameter which is not available with this option.
                        
                        Click this notification to restore previous option`
                })
            //Redirect to the Search Page if not already the case
            if (ActivePage.href.toLowerCase() != config.Page.Search.toLowerCase()) {
                document.querySelector(`a[href="${config.Page.Search}"]`).dispatchEvent(new Event('click'))
            }
            DIVParent.classList.add('error')
            ErrorNotification.onclick = () => {
                global.DB.Options.ParameterList = (global.DB.Options.ParameterList == config.Form.Option.ParameterList_Common) ? config.Form.Option.ParameterList_Full : config.Form.Option.ParameterList_Common
                $App.Options.Reselect()
                $App.Options.Update.ParameterList()
                DIVParent.classList.remove('error')
                ErrorNotification.close()
            }
            ErrorNotification.onclose = () => DIVParent.classList.remove('error')
            $Sel.Search.Timer[id] = setTimeout(() => DIVParent.classList.remove('error'), 5000)
        }
    }
}
/**
 * Reset the DMX Count value to 1
 */
let Reset = () => {
    let event = new Event('change')
        , select = document.getElementById(`${config.Form.Search.BaseName_Channel}1`)
    // Set the First Channel to "any"
    select.value = config.Default.Any.toLowerCase()
    // Reset to 1 the number of channels
    $Sel.Search.DMXChannelCount.value = '001'

    // Reset Manufacturer
    $Sel.Search.Manufacturer.querySelector('option[value="' + config.Default.All.toLowerCase() + '"]').selected = true
    // Reset Fixture Name
    $Sel.Search.FixtureName.querySelector('option[value="' + config.Default.All.toLowerCase() + '"]').selected = true

    //Fire change event on elements
    select.dispatchEvent(event)
    $Sel.Search.DMXChannelCount.dispatchEvent(event)
    $Sel.Search.Manufacturer.dispatchEvent(event)
    $Sel.Search.FixtureName.dispatchEvent(event)
    $Sel.Search.Form.dispatchEvent(event)
    $Sel.Search.Button.Reset.blur()
}
/**
 * Set value on 3 digits by adding 0 in front of the value
 * @param {int} val
 * @returns {string}
 */
let Format = val => ('000' + val).substr(-3)
/**
* Set DMX Channel Count Value
* @param {int|string} val
* @returns {void}
*/
let SetValue = val => {
    val = parseInt(val)
    // If value set is inside the DMX range value (1-512)
    if (val >= 1 && val <= 512) {
        global.DB.DMXChannelCount = val
        $Sel.Search.DMXChannelCount.value = Format(val)
    } else {
        $Sel.Search.DMXChannelCount.value = Format(global.DB.DMXChannelCount)
    }
    return this
}
/**
* Adjust the number of DMX Select in the form
* @param {Object} [event=false]
* @returns {void}
*/
let AdjustChannelSearch = (event = false) => {
    clearTimeout($Sel.Search.Timer.Adjust)
    if (global.DB.SelectParameter === undefined || global.DB.SelectParameter.length == 0) {
        $Sel.Search.Timer.Adjust = setTimeout(AdjustChannelSearch, 50)
    } else {
        $Sel.Search.Status.SearchInitialize = false
        if (event && typeof event !== 'function') {
            $Sel.Search.DMXChannelCount.blur()
        }
        let Result = parseInt($Sel.Search.DMXChannelCount.value) - global.DB.DMXChannelCount
        $Sel.Search.DMXChannelCount.value = global.DB.DMXChannelCount
        if (Result != 0 && Result > 0) {             // Positive Result
            for (let i = 0; i < Result; i++) {
                AddChannelSearch(event)
            }
            $Sel.Search.Status.SearchInitialize = true
        } else if (Result != 0 && Result < 0) {      // Negative Result
            for (let i = Result; i < 0; i++) {
                RemChannelSearch(event)
            }
            $Sel.Search.Status.SearchInitialize = true
        } else {
            $Sel.Search.Status.SearchInitialize = true
            return SetValue(global.DB.DMXChannelCount)
        }
    }
}
/**
* Add OPTIONS in a SELECT
* @param {Object} Select
* @returns {void}
*/
let AddChannelOptions = Select => {
    while (Select.hasChildNodes()) {
        Select.removeChild(Select.lastChild)
    }
    // Add first "Any option"
    let option = document.createElement('option')
    option.value = config.Default.Any.toLowerCase()
    option.text = config.Default.Any
    Select.add(option)
    // Add other options
    for (let i = 0; i < global.DB.SelectParameter.length; i++) {
        option = document.createElement('option')
        option.value = global.DB.SelectParameter[i].value.toLowerCase()
        option.text = global.DB.SelectParameter[i].value
        Select.add(option)
    }
}
/**
* Add 1 DMX Select in the form
* @param {Object} [event=false]
* @returns {void}
*/
let AddChannelSearch = (event = false) => {
    if (event && typeof event !== 'function') {
        $Sel.Search.DMXChannelCount_Btn_Add.blur()
    }
    let ChannelNumber = parseInt($Sel.Search.DMXChannelCount.value) + 1
    // If value set is inside the DMX range value (1-512)
    if (ChannelNumber >= 1 && ChannelNumber <= 512) {
        SetValue(ChannelNumber)
        let data = ipcRenderer.sendSync('ChannelTemplate', { Channel: ChannelNumber })
        // Add a new DMX Channel Search
        $Sel.Search.FieldSet.insertAdjacentHTML('beforeend', data.template)
        let Select = document.getElementById(data.selector)
        AddChannelOptions(Select)
        $Listener.SELECTChange(Select)
        if (event && typeof event !== 'function') {
            $Sel.Search.Form.dispatchEvent(new Event('change'))
        }
    } else {
        return this
    }
}
/**
 * Remove 1 DMX Select in the form
 * @param {Object} [event=false]
 * @returns {void}
 */
let RemChannelSearch = (event = false) => {
    if (event && typeof event !== 'function') {
        $Sel.Search.DMXChannelCount_Btn_Rem.blur()
    }
    let str = parseInt($Sel.Search.DMXChannelCount.value) - 1
    // If value set is inside the DMX range value (1>512)
    if (str >= 1 && str <= 512) {
        let ChildToRemove = document.getElementById(config.Form.Search.BaseName_Channel + parseInt($Sel.Search.DMXChannelCount.value))
        if (ChildToRemove) {
            let ParentToRemove = ChildToRemove.closest('div.channelfield.flex-container')
            ParentToRemove.remove()
        }
        SetValue(str)
        if (event && typeof event !== 'function') {
            $Sel.Search.Form.dispatchEvent(new Event('change'))
        }
    } else {
        return this
    }
}
let Update = {
    /**
     * Parse the selectors and return an array with the keys/values without the basename
     * @param {Object} Selectors
     * @param {string} Basename
     * @return {array}
     */
    ParseForm: (Selectors, Basename) => {
        let Table = []
        Selectors.forEach(select => {
            Table.push({
                [select.getAttribute('name').replace(Basename, '')]: select.value
            })
        })
        return Table
    },
    /**
     * Prepare data for a "LastSearch" Update All
     */
    All: () => {
        let Selectors = {
            SelectDMXChannel: document.querySelectorAll(`select[name^="${config.Form.Search.BaseName_Channel}"]`),
            InputDMXSlot: document.querySelectorAll(`input[name^="${config.Form.Search.BaseName_Wheel}"]`)
        },
            data = {
                DMXChannelCount: $Sel.Search.DMXChannelCount.value,
                DMXChannelCount_Max: $Sel.Search.DMXChannelCount_Max.value,
                Manufacturer: $Sel.Search.Manufacturer.value,
                FixtureName: $Sel.Search.FixtureName.value,
                DMXChart_Channel: Update.ParseForm(Selectors.SelectDMXChannel, config.Form.Search.BaseName_Channel),
                DMXChart_Slot: Update.ParseForm(Selectors.InputDMXSlot, config.Form.Search.BaseName_Wheel)
            }
        $DB.LastSearch.Update.All(data)
    }
}

module.exports = {
    Initialize: Initialize,
    AdjustChannelSearch: AdjustChannelSearch,
    AddChannelSearch: AddChannelSearch,
    RemChannelSearch: RemChannelSearch,
    Update: Update,
    Reset: Reset
}