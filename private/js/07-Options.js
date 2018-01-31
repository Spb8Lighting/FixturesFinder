let $OptionsSel = {
    ResetButton: document.getElementById(config.Form.Option.Form + config.Form.Button.Reset),
    Form: document.getElementById(config.Form.Option.Form),
    SearchMode: document.getElementById(config.Form.Option.SearchMode),
    DisplayMode: document.getElementById(config.Form.Option.DisplayMode),
    ParameterList: document.getElementById(config.Form.Option.ParameterList)
}
let RunOption = {
    /**
     * Reset the DMX Count value to 1
     * @returns {void}
     */
    Reset: () => {
        Table.Options.Reset()
        $OptionsSel.ResetButton.blur()
        return this
    },
    Update: {
        /**
         * Prepare data for a "Options Table" Update All
         * @returns {void}
         */
        All: () => {
            let data = {
                SearchMode: $OptionsSel.SearchMode.value,
                DisplayMode: $OptionsSel.DisplayMode.value,
                ParameterList: $OptionsSel.ParameterList.value
            }
            Table.Options.Update.All(data)
            return this
        },
        /**
         * Prepare data to update SearchMode in "Options Table"
         * @returns {void}
         */
        SearchMode: () => {
            Table.Options.Update.SearchMode({ SearchMode: $OptionsSel.SearchMode.value })
            return this
        },
        /**
         * Prepare data to update DisplayMode in "Options Table"
         * @returns {void}
         */
        DisplayMode: () => {
            Table.Options.Update.DisplayMode({ DisplayMode: $OptionsSel.DisplayMode.value })
            return this
        },
        /**
        * Prepare data to update ParameterList in "Options Table"
        * @returns {void}
        */
        ParameterList: () => {
            Table.Options.Update.ParameterList({ ParameterList: $OptionsSel.ParameterList.value })
            return this
        }
    },
    /**
     * Select the options based on DB Content
     * @returns {void}
     */
    Reselect: () => {
        $OptionsSel.SearchMode.querySelector('option[value="' + DBOption.SearchMode + '"]').selected = true
        $OptionsSel.SearchMode.setAttribute('data-option', DBOption.SearchMode)
        $OptionsSel.DisplayMode.querySelector('option[value="' + DBOption.DisplayMode + '"]').selected = true
        $OptionsSel.DisplayMode.setAttribute('data-option', DBOption.DisplayMode)
        $OptionsSel.ParameterList.querySelector('option[value="' + DBOption.ParameterList + '"]').selected = true
        $OptionsSel.ParameterList.setAttribute('data-option', DBOption.ParameterList)
        return this
    }
}

$OptionsSel.Form.addEventListener('change', RunOption.Update.All, {passive: true})
$OptionsSel.ResetButton.addEventListener('click', RunOption.Reset, {passive: true})

/* Other Criteria */

// Search Mode
AddSelectListener($OptionsSel.SearchMode, RunOption.Update.SearchMode)

// Display Mode
AddSelectListener($OptionsSel.DisplayMode, RunOption.Update.DisplayMode)

// Parameter List
AddSelectListener($OptionsSel.ParameterList, RunOption.Update.ParameterList)