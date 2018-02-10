const config = require('./config')

module.exports = {
    Status: {
        SearchInitialize: false
    },
    Timer: {
        Form: false,
        LastSearch: false,
        Adjust: false
    },
    Form: document.getElementById(config.Form.Search.Form),
    DMXChannelCount: document.getElementById(config.Form.Search.DMXChannelCount),
    DMXChannelCount_Btn_Add: document.getElementById(config.Form.Search.DMXChannelCount_Btn_Add),
    DMXChannelCount_Btn_Rem: document.getElementById(config.Form.Search.DMXChannelCount_Btn_Rem),
    FieldSet: document.getElementById(config.Form.Search.DMXChannelCount).closest('fieldset'),
    DMXChannelCount_Max: document.getElementById(config.Form.Search.DMXChannelCount_Max),
    DMXChannelCount_Max_Div: document.getElementById(config.Form.Search.DMXChannelCount_Max).closest('div'),
    DMXChannelCount_Max_Label: document.querySelector('label[for="' + config.Form.Search.DMXChannelCount_Max + '"]'),
    Manufacturer: document.getElementById(config.Form.Search.Manufacturer),
    FixtureName: document.getElementById(config.Form.Search.FixtureName),
    Button: {
        Reset: document.getElementById(config.Form.Search.Form + config.Form.Button.Reset),
        QuickSearch: document.getElementById(config.Form.Search.Form + config.Form.Button.Submit)
    }
}