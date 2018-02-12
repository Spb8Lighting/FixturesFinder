let config = require('./config')
    , $Sel = {
        Options: require('./selectors.Options')
    }
    , $DB = {
        Options: require('./database.table.Options')
    }

/**
 * Reset the DMX Count value to 1
 */
let Reset = () => {
    $DB.Options.Reset()
    $Sel.Options.ResetButton.blur()
}
let Update = {
    /**
     * Prepare data for a "Options Table" Update All
     */
    All: () => {
        let data = {
            SearchMode: $Sel.Options.SearchMode.value,
            DisplayMode: $Sel.Options.DisplayMode.value,
            ParameterList: $Sel.Options.ParameterList.value
        }
        $DB.Options.Update.All(data)
    },
    /**
     * Prepare data to update SearchMode in "Options Table"
     */
    SearchMode: () => {
        $DB.Options.Update.SearchMode({ SearchMode: $Sel.Options.SearchMode.value })
    },
    /**
     * Prepare data to update DisplayMode in "Options Table"
     */
    DisplayMode: () => {
        $DB.Options.Update.DisplayMode({ DisplayMode: $Sel.Options.DisplayMode.value })
    },
    /**
    * Prepare data to update ParameterList in "Options Table"
    */
    ParameterList: () => {
        $DB.Options.Update.ParameterList({ ParameterList: $Sel.Options.ParameterList.value })
    }
}
/**
 * Select the options based on DB Content
 */
let Reselect = () => {
    return new Promise((resolve, reject) => {
        $Sel.Options.SearchMode.querySelector('option[value="' + global.DB.Options.SearchMode + '"]').selected = true
        $Sel.Options.SearchMode.setAttribute('data-option', global.DB.Options.SearchMode)
        $Sel.Options.DisplayMode.querySelector('option[value="' + global.DB.Options.DisplayMode + '"]').selected = true
        $Sel.Options.DisplayMode.setAttribute('data-option', global.DB.Options.DisplayMode)
        $Sel.Options.ParameterList.querySelector('option[value="' + global.DB.Options.ParameterList + '"]').selected = true
        $Sel.Options.ParameterList.setAttribute('data-option', global.DB.Options.ParameterList)
        resolve('Set the option for DB done')
    })
}

module.exports = {
    Update: Update,
    Reselect: Reselect
}