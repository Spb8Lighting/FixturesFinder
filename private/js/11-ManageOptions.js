let Table = {
    /**
    * "Options" Table getters and setters
    */
    Options : {
        /**
        * Create the "Options" Table and insert default values
        * @returns {void}
        */
        Initialize : () => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                db.run('CREATE TABLE `' + config.Database.Options + '` ( `' + config.OptionForm.SearchMode + '` TEXT, `' + config.OptionForm.DisplayMode + '` TEXT, `' + config.OptionForm.ParameterList + '` TEXT )')
                db.run('INSERT INTO `' + config.Database.Options + '` ( `' + config.OptionForm.SearchMode + '`, `' + config.OptionForm.DisplayMode + '`, `' + config.OptionForm.ParameterList + '`) VALUES ($SearchMode, $DisplayMode, $ParameterList)', {
                    $SearchMode : config.OptionForm.SearchMode_OrderExact,
                    $DisplayMode : config.OptionForm.DisplayMode_Full,
                    $ParameterList : config.OptionForm.ParameterList_Common
                })
            })
            return this
        },
        /**
        * Restore defaults Options in "Options" Table
        * @returns {void}
        */
        Reset : () => {
            Table.Options.Update({
                SearchMode : config.OptionForm.SearchMode_OrderExact,
                DisplayMode : config.OptionForm.DisplayMode_Full,
                ParameterList : config.OptionForm.ParameterList_Common
            })
        },
        /**
        * Update "Options Table"
        * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} data
        * @returns {void}
        */
        Update : (data) => {
            db.serialize(() => {
                /* Reset the options to its default */
                db.Options.run('UPDATE `' + config.Database.Options + '` SET `' + config.OptionForm.SearchMode + '` = $SearchMode, `' + config.OptionForm.DisplayMode + '` = $DisplayMode, `' + config.OptionForm.ParameterList + '` = $ParameterList', {
                    $SearchMode : data.SearchMode,
                    $DisplayMode : data.DisplayMode,
                    $ParameterList : data.ParameterList
                })
            })
            return this
        }
    },
    /**
    * Close Database
    * @returns {void}
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

Table.Options.Initialize()