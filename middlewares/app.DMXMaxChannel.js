const config = require('./config')
    , $Sel = {
        Search: require('./selectors.Search')
    }

/**
* Following the DBOption status, will adjust the display status "Max DMX Channel"
*/
let CheckDisplay = () => {
    return new Promise((resolve, reject) => {
        switch (global.DB.Options[config.Form.Option.SearchMode]) {
            case config.Form.Option.SearchMode_OrderExact:
            case config.Form.Option.SearchMode_UnOrderExact:
                Hide().then(response => resolve(response))
                break
            default:
                Show().then(response => resolve(response))
                break
        }
    })
}
/**
* Show the "Max DMX Channel"
*/
let Show = () => {
    return new Promise((resolve, reject) => {
        $Sel.Search.DMXChannelCount_Max_Label.classList.remove('hide')
        $Sel.Search.DMXChannelCount_Max_Div.classList.remove('hide')
        resolve('Show')
    })
}
/**
* Hide the "Max DMX Channel"
*/
let Hide = () => {
    return new Promise((resolve, reject) => {
        $Sel.Search.DMXChannelCount_Max_Label.classList.add('hide')
        $Sel.Search.DMXChannelCount_Max_Div.classList.add('hide')
        resolve('Hide')
    })
}

module.exports = {
    CheckDisplay: CheckDisplay
}