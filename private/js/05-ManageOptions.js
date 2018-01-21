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
                Table.Options.Create()
                db.get('SELECT COUNT(*) AS `count` FROM `' + config.Database.Options + '`', (err, row) => {
                    if (err) {
                        return console.error(err.message);
                    } else {
                        if(row.count > 1) {
                            console.log('Empty and Fill')
                            Table.Options.Delete()
                            Table.Options.Create()
                            Table.Options.Fill()
                        } else if(row.count == 0) {
                            console.log('Fill')
                            Table.Options.Fill()
                        }
                    }
                })
            })
            return this
        },
         /**
        * Create "Options" Table
        * @returns {void}
        */
        Create : () => {
            db.run('CREATE TABLE IF NOT EXISTS `' + config.Database.Options + '` ( `' + config.Form.Option.SearchMode + '` TEXT, `' + config.Form.Option.DisplayMode + '` TEXT, `' + config.Form.Option.ParameterList + '` TEXT )')
            return this
        },
         /**
        * Empty "Options" Table
        * @returns {void}
        */
        Delete : () => {
            db.run('DROP TABLE `' + config.Database.Options + '`')
            return this
        },
        /**
        * Restore defaults Options in "Options" Table
        */
        Reset : () => {
            Table.Options.Update({
                SearchMode : config.Form.Option.SearchMode_OrderExact,
                DisplayMode : config.Form.Option.DisplayMode_Full,
                ParameterList : config.Form.Option.ParameterList_Common
            })
        },
        /**
        * Fill with default "Options Table"
        * @returns {void}
        */
        Fill : () => {
            db.serialize(() => {
                /* Reset the options to its default */
                db.run('INSERT INTO `' + config.Database.Options + '` ( `' + config.Form.Option.SearchMode + '`, `' + config.Form.Option.DisplayMode + '`, `' + config.Form.Option.ParameterList + '`) VALUES ($SearchMode, $DisplayMode, $ParameterList)', {
                    $SearchMode : config.Form.Option.SearchMode_OrderExact,
                    $DisplayMode : config.Form.Option.DisplayMode_Full,
                    $ParameterList : config.Form.Option.ParameterList_Common
                })
            })
            return this
        },
        /**
        * Update "Options Table"
        * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} data
        * @returns {void}
        */
        Update : (data) => {
            db.serialize(() => {
                /* Reset the options to its default */
                db.Options.run('UPDATE `' + config.Database.Options + '` SET `' + config.Form.Option.SearchMode + '` = $SearchMode, `' + config.Form.Option.DisplayMode + '` = $DisplayMode, `' + config.Form.Option.ParameterList + '` = $ParameterList', {
                    $SearchMode : data.SearchMode,
                    $DisplayMode : data.DisplayMode,
                    $ParameterList : data.ParameterList
                })
            })
            return this
        },
    },
    /**
    * Close Database
    * @returns {void}
    */
    Close : () => {
        db.close(err => {
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