const config = require('./config')

/**
* List Parameters
*/
let Initialize = () => {
    return new Promise((resolve, reject) => {
        let SelectReturn = {}
        SelectReturn.Full = global.DB.SearchParameter
        SelectReturn.Restricted = global.DB.SearchParameter
        SelectReturn.Restricted.sort((a, b) => {
            return a.order - b.order
        })
        SelectReturn.Restricted =  SelectReturn.Restricted.filter(el => el.order !== null)
        // Default Select to Restricted list
        SelectReturn.Options = SelectReturn.Restricted
        resolve(SelectReturn)
    })
}

/**
* Based on DBOption, set the "Select Options"
*/
let CheckOptions = () => {
    return new Promise((resolve, reject) => {
        let TMP = 0
        switch (global.DB.Options[config.Form.Option.ParameterList]) {
            case config.Form.Option.ParameterList_Full:
                TMP = global.DB.SearchParameter.Full
                break
            case config.Form.Option.ParameterList_Common:
            default:
                TMP = global.DB.SearchParameter.Restricted
                break
        }
        if (TMP != global.DB.SearchParameter.Options.length) {
            global.DB.SearchParameter.Options = TMP
            let SelectDMXChannel = document.querySelectorAll(`select[name^="${config.Form.Search.BaseName_Channel}"]`)
            if (SelectDMXChannel) {
                SelectDMXChannel.forEach(Select => Select.closest('div').remove())
                global.DB.DMXChannelCount = 0
                resolve('Please Initialize Again')
            } else {
                resolve('Check Options - Nothing to perform')
            }
        } else {
            resolve('Check Options - Nothing to perform')
        }
    })
}

module.exports = {
    Initialize: Initialize,
    CheckOptions: CheckOptions
}