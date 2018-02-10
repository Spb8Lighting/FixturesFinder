let config = require('./config')
    , $App = {
        Search: require('./app.Search')
    }

global.DB.SelectParameterVal = {}


/**
* List Parameters
*/
let Initialize = () => {
    global.DB.SelectParameterVal.Full = global.DB.SearchParameter
    global.DB.SelectParameterVal.Restricted = SetRestricted()
    global.DB.SelectParameterVal.Options = global.DB.SelectParameterVal.Restricted
    global.DB.SelectParameter = global.DB.SelectParameterVal.Options
}

/**
* Based on DBOption, set the "Select Options"
*/
let CheckOptions = () => {
    let TMP = []
    console.log(global.DB.Options[config.Form.Option.ParameterList])
    switch (global.DB.Options[config.Form.Option.ParameterList]) {
        case config.Form.Option.ParameterList_Full:
            TMP = global.DB.SelectParameterVal.Full
            break
        case config.Form.Option.ParameterList_Common:
        default:
            TMP = global.DB.SelectParameterVal.Restricted
            break
    }
    console.log(TMP)
    if (TMP.length != global.DB.SelectParameterVal.Options.length) {
        Values.Options = TMP
        global.DB.SelectParameter = TMP
        let SelectDMXChannel = document.querySelectorAll(`select[name^="${config.Form.Search.BaseName_Channel}"]`)
        if (SelectDMXChannel) {
            SelectDMXChannel.forEach(Select => Select.closest('div').remove())
            global.DB.DMXChannelCount = 0
            $App.Search.Initialize()
        }
    }
}
/**
* Set Restricted option values
* @returns {Object}
*/
let SetRestricted = () => {
    let TMP = global.DB.SearchParameter
    TMP.sort((a, b) => {
        return a.order - b.order
    })
    return TMP.filter(el => el.order !== null)
}

module.exports = {
    Initialize: Initialize,
    CheckOptions: CheckOptions
}