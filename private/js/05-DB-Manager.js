let DBSearch
, DBOption
, DBAdmin
, Table = {
    /**
    * "Options" Table getters and setters
    */
    Options : {
        /**
        * Create the "Options" Table and insert default values
        * @returns {void}
        */
        Initialize : (callback = false) => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                Table.Options.Create()
                let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.Options}\``
                db.get(sql, (err, row) => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        if(row.count > 1) {
                            Table.Options.Delete()
                            Table.Options.Create()
                            Table.Options.Fill()
                        } else if(row.count == 0) {
                            Table.Options.Fill()
                        }
                    }
                })
                /* After check of Database, initialize interface */
                Table.Options.Get(callback)
            })
            return this
        },
         /**
        * Create "Options" Table
        * @returns {void}
        */
        Create : () => {
            let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\` TEXT, \`${config.Form.Option.DisplayMode}\` TEXT, \`${config.Form.Option.ParameterList}\` TEXT )`
            db.run(sql)
            return this
        },
         /**
        * Empty "Options" Table
        * @returns {void}
        */
        Delete : () => {
            let sql = `DROP TABLE \`${config.Database.Options}\``
            db.run(sql)
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
            /* Reset the options to its default */
            let sql = `INSERT INTO \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\`) VALUES ($SearchMode, $DisplayMode, $ParameterList)`
            , param = {
                $SearchMode : config.Form.Option.SearchMode_OrderExact,
                $DisplayMode : config.Form.Option.DisplayMode_Full,
                $ParameterList : config.Form.Option.ParameterList_Common
            }

            db.run(sql, param)
            return this
        },
        /**
        * Get options from "Options Table"
        * @returns {void}
        */
        Get : (callback = false) => {
            let sql = `SELECT \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\` FROM \`${config.Database.Options}\``

            db.get(sql, (err, data) => {
                if (err) {
                    return console.error(err.message)
                } else {
                    DBOption = data
                    DMXChannelMax.CheckDisplay()
                    SelectOptions.CheckOptions()
                    RunOption.Reselect()
                    if(typeof callback === 'function') {
                        callback()
                    }
                }
            })
            return this
        },
        /**
        * Update "Options Table"
        * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} data
        * @returns {void}
        */
        Update : data => {
            let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode, \`${config.Form.Option.DisplayMode}\` = $DisplayMode, \`${config.Form.Option.ParameterList}\` = $ParameterList`
            , param = {
                $SearchMode : data.SearchMode,
                $DisplayMode : data.DisplayMode,
                $ParameterList : data.ParameterList
            }

            db.run(sql, param, err => {
                if(err) {
                    return console.error(err.message)
                } else {
                    Table.Options.Get()
                }
            })
            return this
        }
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
                //console.info('Database connection closed')
            }
        })
        return this
    }
}