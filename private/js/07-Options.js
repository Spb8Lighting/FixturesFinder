let $OptionsSel = {
    ResetButton :     document.getElementById(config.Form.Option.Form + config.Form.Button.Reset),
    Form :            document.getElementById(config.Form.Option.Form),
    SearchMode :      document.getElementById(config.Form.Option.SearchMode),
    DisplayMode :     document.getElementById(config.Form.Option.DisplayMode),
    ParameterList :   document.getElementById(config.Form.Option.ParameterList)
}
let RunOption = {
    /**
     * Reset the DMX Count value to 1
     * @returns {void}
     */
    Reset : () => {
        Table.Options.Reset()
        $OptionsSel.ResetButton.blur()
        return this
    },
    /**
     * Set value on 3 digits by adding 0 in front of the value
     * @returns {void}
     */
    Update : () => {
        let data = {
            SearchMode : $OptionsSel.SearchMode.value,
            DisplayMode : $OptionsSel.DisplayMode.value,
            ParameterList : $OptionsSel.ParameterList.value
        }
        Table.Options.Update(data)
        return this
    },
    /**
     * Select the options based on DB Content
     * @returns {void}
     */
    Reselect : () => {
        $OptionsSel.SearchMode.querySelector('option[value="' + DBOption.SearchMode + '"]').selected = true
        $OptionsSel.DisplayMode.querySelector('option[value="' + DBOption.DisplayMode + '"]').selected = true
        $OptionsSel.ParameterList.querySelector('option[value="' + DBOption.ParameterList + '"]').selected = true
        return this
    }
}

$OptionsSel.Form.addEventListener('change', e => {
    e.preventDefault()
    RunOption.Update()
})
$OptionsSel.ResetButton.addEventListener('click', e => {
    e.preventDefault()
    RunOption.Reset()
})