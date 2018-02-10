const config = require('./config')

module.exports = {
    ResetButton: document.getElementById(config.Form.Option.Form + config.Form.Button.Reset),
    Form: document.getElementById(config.Form.Option.Form),
    SearchMode: document.getElementById(config.Form.Option.SearchMode),
    DisplayMode: document.getElementById(config.Form.Option.DisplayMode),
    ParameterList: document.getElementById(config.Form.Option.ParameterList)
}