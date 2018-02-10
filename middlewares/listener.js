const electron = require('electron')
    , config = require('./config')
    , ipcRenderer = electron.ipcRenderer

/**
* Attach a listener to input
* @param {Object} Selector
*/
let INPUTChangeANdClick = (Selector) => {
    Selector.addEventListener('click', Selector.select, { passive: true })
    Selector.addEventListener('change', () => {
        $SearchSel.Form.dispatchEvent(new Event('change'))
        Selector.blur()
    }, { passive: true })
}
/**
* Attach a listener for CSS coloring on new Select
* @param {Object} Selector
*/
let SELECTChange = (Selector, callback = false) => {
    Selector.addEventListener('change', () => {
        // Set the attribute data-option to allow background coloring
        let DataOptionValue = Selector.querySelector('option:checked').value
        Selector.setAttribute('data-option', DataOptionValue)
        Selector.closest('div').setAttribute('data-option', DataOptionValue)
        // Set some Selectors to allow to add or remove additionnal input for slot
        let DIVContainer = Selector.parentNode
            , SearchInput = DIVContainer.querySelector('input')
            , SelectorValue = Selector.value.toLowerCase()
        // Check if the DMX Channel is a Wheel
        if (config.Regex.Slot.test(SelectorValue)) {
            let SlotInfo = SelectorValue.match(config.Regex.Slot)
                , SlotInfoName = SlotInfo[1]
                , SlotNumber = (!SlotInfo[2]) ? 1 : SlotInfo[2]
                , Basename_Wheel = false
            switch (SlotInfoName) {
                case 'color':
                    Basename_Wheel = config.Form.Search.BaseName_Wheel_Color
                    break
                case 'animation':
                    Basename_Wheel = config.Form.Search.BaseName_Wheel_Anim
                    break
                case 'gobo':
                    Basename_Wheel = config.Form.Search.BaseName_Wheel_Gobo
                    break
            }
            // If Input for Slot already exists, remove it, else add the class to the DIV for next input
            if (SearchInput) {
                DIVContainer.removeChild(SearchInput)
            } else {
                DIVContainer.classList.add(config.SpecClass.Slot)
            }
            let InputSlodID = config.Form.Search.BaseName_Wheel + Basename_Wheel + SlotNumber
            //Request channel template Slot for Input
            data = ipcRenderer.sendSync('ChannelTemplateSlot', { Channel: InputSlodID })
            DIVContainer.insertAdjacentHTML('beforeend', data.template)
            //Add listener on added Slot input
            INPUTChangeANdClick(document.getElementById(InputSlodID))
        } else {
            // If there was an input in the DIV, remove it and remove the associated class
            if (SearchInput) {
                DIVContainer.removeChild(SearchInput)
                DIVContainer.classList.remove(config.SpecClass.Slot)
            }
        }
        Selector.blur()
        if (typeof callback === 'function') {
            callback()
        }
    }, { passive: true })
}

module.exports = {
    SELECTChange: SELECTChange
}