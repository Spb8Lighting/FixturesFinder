let config = require('./config')
    , $Sel = {
        Search: require('./selectors.Search')
    }

/**
* Following the DBOption status, will adjust the display status "Max DMX Channel"
*/
let CheckDisplay = () => {
    switch (global.DB.Options[config.Form.Option.SearchMode]) {
        case config.Form.Option.SearchMode_OrderExact:
        case config.Form.Option.SearchMode_UnOrderExact:
            Hide()
            break
        default:
            Show()
            break
    }
}
/**
* Show the "Max DMX Channel"
*/
let Show = () => {
    $Sel.Search.DMXChannelCount_Max_Label.classList.remove('hide')
    $Sel.Search.DMXChannelCount_Max_Div.classList.remove('hide')
}
/**
* Hide the "Max DMX Channel"
* @returns {void}
*/
let Hide = () => {
    $Sel.Search.DMXChannelCount_Max_Label.classList.add('hide')
    $Sel.Search.DMXChannelCount_Max_Div.classList.add('hide')
}

module.exports = {
    CheckDisplay: CheckDisplay
}