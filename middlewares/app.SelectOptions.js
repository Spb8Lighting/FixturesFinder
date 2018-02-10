let config = require('./config')
    , $App = {
        Search: require('./app.Search')
    }
    , $DB = {
        SearchParameter: require('./database.table.SearchParameter'),
        Options: require('./database.table.Options')
    }

/**
* List Values
*/
let Values = {
    Options: false,
    Restricted: false,
    Full: false
}
/**
* List Parameters
*/
let Initialize = () => {
    Values.Full = global.DB.SearchParameter
    Values.Restricted = SetRestricted()
    Values.Options = Values.Restricted
    global.DB.SelectParameter = Values.Options
}

/**
* Based on DBOption, set the "Select Options"
*/
let CheckOptions = () => {
    let TMP = 0
    switch (global.DB.Options[config.Form.Option.ParameterList]) {
        case config.Form.Option.ParameterList_Full:
            TMP = Values.Full
            break
        case config.Form.Option.ParameterList_Common:
        default:
            TMP = Values.Restricted
            break
    }
    if (TMP.length != Values.Options.length) {
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