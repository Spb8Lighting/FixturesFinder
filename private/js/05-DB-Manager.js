/* Define Return Object */
let DBSearch
    , DBLastSearch
    , DBOption
    , DBAdmin

let Table = {
    /**
     * "LastSearch" Table getters and setters
     */
    LastSearch: {
        /**
        * Create the "LastSearch" Table and insert default values
        * @returns {void}
        */
        Initialize: (callback = false) => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                Table.LastSearch.Create()
                let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.LastSearch}\``
                db.get(sql, (err, row) => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        if (row.count > 1) {
                            Table.LastSearch.Delete()
                            Table.LastSearch.Create()
                            Table.LastSearch.Fill()
                        } else if (row.count == 0) {
                            Table.LastSearch.Fill()
                        }
                        /* After check of Database, initialize interface */
                        Table.LastSearch.Get(callback)
                    }
                })
            })
            return this
        },
        /**
        * Create "LastSearch" Table
        * @returns {void}
        */
        Create: () => {
            let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.LastSearch}\` ( \`${config.Form.Search.DMXChannelCount}\` INTEGER, \`${config.Form.Search.DMXChannelCount_Max}\` INTEGER, \`${config.Form.Search.Manufacturer}\` TEXT, \`${config.Form.Search.FixtureName}\` TEXT, \`${config.Form.Search.DMXChart_Channel}\` TEXT, \`${config.Form.Search.DMXChart_Slot}\` TEXT )`
            db.run(sql)
            return this
        },
        /**
        * Empty "LastSearch" Table
        * @returns {void}
        */
        Delete: () => {
            let sql = `DROP TABLE \`${config.Database.LastSearch}\``
            db.run(sql)
            return this
        },
        /**
        * Restore "LastSearch" Table to default (empty)
        */
        Reset: () => {
            Table.LastSearch.Delete()
            Table.LastSearch.Create()
        },
        /**
        * Fill with default "LastSearch"
        * @returns {void}
        */
        Fill: () => {
            /* Reset the options to its default */
            let sql = `INSERT INTO \`${config.Database.LastSearch}\` ( \`${config.Form.Search.DMXChannelCount}\`, \`${config.Form.Search.DMXChannelCount_Max}\`, \`${config.Form.Search.Manufacturer}\`, \`${config.Form.Search.FixtureName}\`, \`${config.Form.Search.DMXChart_Channel}\`, \`${config.Form.Search.DMXChart_Slot}\`) VALUES ($DMXChannelCount, $DMXChannelCount_Max, $Manufacturer, $FixtureName, $DMXChart_Channel, $DMXChart_Slot)`
                , param = {
                    $DMXChannelCount: 1,
                    $DMXChannelCount_Max: 0,
                    $Manufacturer: config.Default.All.toLowerCase(),
                    $FixtureName: config.Default.All.toLowerCase(),
                    $DMXChart_Channel: JSON.stringify([{ 1: config.Default.Any.toLowerCase() }]),
                    $DMXChart_Slot: JSON.stringify([{}])
                }
            db.run(sql, param)
            return this
        },
        /**
        * Get options from "LastSearch Table"
        */
        Get: (callback = false) => {
            let sql = `SELECT \`${config.Form.Search.DMXChannelCount}\`, \`${config.Form.Search.DMXChannelCount_Max}\`, \`${config.Form.Search.Manufacturer}\`, \`${config.Form.Search.FixtureName}\`, \`${config.Form.Search.DMXChart_Channel}\`, \`${config.Form.Search.DMXChart_Slot}\` FROM \`${config.Database.LastSearch}\``

            db.get(sql, (err, data) => {
                if (err) {
                    return console.error(err.message)
                } else {
                    DBLastSearch = data
                    DBLastSearch[config.Form.Search.DMXChart_Channel] = JSON.parse(DBLastSearch[config.Form.Search.DMXChart_Channel])
                    DBLastSearch[config.Form.Search.DMXChart_Slot] = JSON.parse(DBLastSearch[config.Form.Search.DMXChart_Slot])
                    if (typeof callback === 'function') {
                        callback()
                    }
                }
            })
        },
        Update: {
            /**
           * Run Update SQL in "LastSearch Table"
           * @param {string} sql
           * @param {{ DMXChannelCount: Int, DMXChannelCount_Max: Int, Manufacturer : String, FixtureName : String, DMXChart_Channel : Object, DMXChart_Slot : Object }} param
           */
            Run: (sql, param) => {
                db.run(sql, param, err => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        Table.LastSearch.Get()
                    }
                })
            },
            /**
           * Update All in "LastSearch Table"
           * @param {{ DMXChannelCount: Int, DMXChannelCount_Max: Int, Manufacturer : String, FixtureName : String, DMXChart_Channel : Object, DMXChart_Slot : Object }} data
           */
            All: data => {
                let sql = `UPDATE \`${config.Database.LastSearch}\` SET \`${config.Form.Search.DMXChannelCount}\` = $DMXChannelCount, \`${config.Form.Search.DMXChannelCount_Max}\` = $DMXChannelCount_Max, \`${config.Form.Search.Manufacturer}\` = $Manufacturer, \`${config.Form.Search.FixtureName}\` = $FixtureName, \`${config.Form.Search.DMXChart_Channel}\` = $DMXChart_Channel, \`${config.Form.Search.DMXChart_Slot}\` = $DMXChart_Slot`
                    , param = {
                        $DMXChannelCount: parseInt(data.DMXChannelCount),
                        $DMXChannelCount_Max: parseInt(data.DMXChannelCount_Max),
                        $Manufacturer: data.Manufacturer.toLowerCase(),
                        $FixtureName: data.FixtureName.toLowerCase(),
                        $DMXChart_Channel: JSON.stringify(data.DMXChart_Channel),
                        $DMXChart_Slot: JSON.stringify(data.DMXChart_Slot)
                    }
                Table.LastSearch.Update.Run(sql, param)
            }
        }
    },
    /**
    * "Options" Table getters and setters
    */
    Options: {
        /**
        * Create the "Options" Table and insert default values
        * @returns {void}
        */
        Initialize: (callback = false) => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                Table.Options.Create()
                let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.Options}\``
                db.get(sql, (err, row) => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        if (row.count > 1) {
                            Table.Options.Delete()
                            Table.Options.Create()
                            Table.Options.Fill()
                        } else if (row.count == 0) {
                            Table.Options.Fill()
                            //ipcRenderer.send('ModalTemplate', { Reboot : true, Modal : `${config.productName} needs to be reloaded, please wait ...` })
                        }
                        /* After check of Database, initialize interface */
                        Table.Options.Get(callback)
                    }
                })
            })
            return this
        },
        /**
        * Create "Options" Table
        * @returns {void}
        */
        Create: () => {
            let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\` TEXT, \`${config.Form.Option.DisplayMode}\` TEXT, \`${config.Form.Option.ParameterList}\` TEXT )`
            db.run(sql)
            return this
        },
        /**
        * Empty "Options" Table
        * @returns {void}
        */
        Delete: () => {
            let sql = `DROP TABLE \`${config.Database.Options}\``
            db.run(sql)
            return this
        },
        /**
        * Restore defaults Options in "Options" Table
        */
        Reset: () => {
            Table.Options.Update.All({
                SearchMode: config.Form.Option.SearchMode_OrderExact,
                DisplayMode: config.Form.Option.DisplayMode_Full,
                ParameterList: config.Form.Option.ParameterList_Common
            })
        },
        /**
        * Fill with default "Options Table"
        * @returns {void}
        */
        Fill: () => {
            /* Reset the options to its default */
            let sql = `INSERT INTO \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\`) VALUES ($SearchMode, $DisplayMode, $ParameterList)`
                , param = {
                    $SearchMode: config.Form.Option.SearchMode_OrderExact,
                    $DisplayMode: config.Form.Option.DisplayMode_Full,
                    $ParameterList: config.Form.Option.ParameterList_Common
                }
            db.run(sql, param)
            return this
        },
        /**
        * Get options from "Options Table"
        * @returns {void}
        */
        Get: (callback = false) => {
            let sql = `SELECT \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\` FROM \`${config.Database.Options}\``

            db.get(sql, (err, data) => {
                if (err) {
                    return console.error(err.message)
                } else {
                    DBOption = data
                    DMXChannelMax.CheckDisplay()
                    SelectOptions.CheckOptions()
                    RunOption.Reselect()
                    if (typeof callback === 'function') {
                        callback()
                    }
                }
            })
            return this
        },
        Update: {
            /**
           * Run Update SQL in "Options Table"
           * @param {string} sql
           * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} param
           * @returns {void}
           */
            Run: (sql, param) => {
                db.run(sql, param, err => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        Table.Options.Get()
                    }
                })
                return this
            },
            /**
           * Update All in "Options Table"
           * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} data
           * @returns {void}
           */
            All: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode, \`${config.Form.Option.DisplayMode}\` = $DisplayMode, \`${config.Form.Option.ParameterList}\` = $ParameterList`
                    , param = {
                        $SearchMode: data.SearchMode,
                        $DisplayMode: data.DisplayMode,
                        $ParameterList: data.ParameterList
                    }
                Table.Options.Update.Run(sql, param)
                return this
            },
            /**
            * Update SearchMode in "Options Table"
            * @param {{ SearchMode: String }} data
            * @returns {void}
            */
            SearchMode: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode`
                    , param = {
                        $SearchMode: data.SearchMode,
                    }
                Table.Options.Update.Run(sql, param)
                return this
            },
            /**
            * Update DisplayMode in "Options Table"
            * @param {{ DisplayMode: String }} data
            * @returns {void}
            */
            DisplayMode: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.DisplayMode}\` = $DisplayMode`
                    , param = {
                        $DisplayMode: data.DisplayMode,
                    }
                Table.Options.Update.Run(sql, param)
                return this
            },
            /**
            * Update ParameterList in "Options Table"
            * @param {{ ParameterList: String }} data
            * @returns {void}
            */
            ParameterList: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.ParameterList}\` = $ParameterList`
                    , param = {
                        $ParameterList: data.ParameterList,
                    }
                Table.Options.Update.Run(sql, param)
                return this
            }
        }
    },
    /**
    * Close Database
    * @returns {void}
    */
    Close: () => {
        db.close(err => {
            if (err) {
                return console.error(err.message)
            } else {
                //console.info('Database connection closed')
            }
        })
        return this
    }
}