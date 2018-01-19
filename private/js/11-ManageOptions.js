let TableOptions = {
    /**
     * Create the "Options" Table and insert default values
     */
    Initialize : () => {
        db.Options.serialize(() => {
            /* Create and fill the Database for Options */
            db.Options.run('CREATE TABLE `' + config.Database.Options + '` ( `' + config.OptionForm.SearchMode + '` TEXT, `' + config.OptionForm.DisplayMode + '` TEXT, `' + config.OptionForm.ParameterList + '` TEXT )')
            db.Options.run('INSERT INTO `' + config.Database.Options + '` ( `' + config.OptionForm.SearchMode + '`, `' + config.OptionForm.DisplayMode + '`, `' + config.OptionForm.ParameterList + '`) VALUES ($SearchMode, $DisplayMode, $ParameterList)', {
                $SearchMode : config.OptionForm.SearchMode_OrderExact,
                $DisplayMode : config.OptionForm.DisplayMode_Full,
                $ParameterList : config.OptionForm.ParameterList_Common
            })
        })
        return this
    },
    /**
     * Restore defaults Options in "Options" Table
     */
    Reset : () => {
        ManageOptions.Update([config.OptionForm.SearchMode_OrderExact, config.OptionForm.DisplayMode_Full, config.OptionForm.ParameterList_Common])
        db.Options.serialize(() => {
            /* Reset the options to its default */
            db.Options.run('UPDATE `' + config.Database.Options + '` SET `' + config.OptionForm.SearchMode + '` = $SearchMode, `' + config.OptionForm.DisplayMode + '` = $DisplayMode, `' + config.OptionForm.ParameterList + '` = $ParameterList', {
                $SearchMode : config.OptionForm.SearchMode_OrderExact,
                $DisplayMode : config.OptionForm.DisplayMode_Full,
                $ParameterList : config.OptionForm.ParameterList_Common
            })
        })
        return this
    },
    /**
     * Update "Options Table" > "Search Mode", "DisplayMode", "ParameterList"
     * @param {array} params => "Search Mode", "DisplayMode", "ParameterList"
     */
    Update : (params) => {
        db.Options.serialize(() => {
            /* Reset the options to its default */
            db.Options.run('UPDATE `' + config.Database.Options + '` SET `' + config.OptionForm.SearchMode + '` = $SearchMode, `' + config.OptionForm.DisplayMode + '` = $DisplayMode, `' + config.OptionForm.ParameterList + '` = $ParameterList', {
                $SearchMode : config.OptionForm.SearchMode_OrderExact,
                $DisplayMode : config.OptionForm.DisplayMode_Full,
                $ParameterList : config.OptionForm.ParameterList_Common
            })
        })
        return this
    },
     /**
     * Close "Options Table"
     */
    Close : () => {
        db.Options.close(err => {
            if(err) {
                return console.error(err.message)
            } else {
                console.info('Database connection closed')
            }
        })
        return this
    }
}