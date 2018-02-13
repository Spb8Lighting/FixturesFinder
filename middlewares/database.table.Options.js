let db = require('./database.init')
    , config = require('./config')

/**
* Create the "Options" Table and insert default values
*/
let Initialize = () => {
    return new Promise((resolve, reject) => {
        /* Create and fill the Database for Options */
        Create().then(response => {
            // Create Answer
            return Count().then(response => {
                // Count Answer
                if (response.count > 1) {
                    return Delete().then(response => {
                        // Delete Answer
                        return Create().then(response => {
                            // Create Answer
                            return Fill().then(response => {
                                // Fill Answer
                                return Get().then(response => {
                                    // Get Answer
                                    resolve(response)
                                })
                            })
                        })
                    })
                } else if (response.count == 0) {
                    return Fill().then(response => {
                        // Fill Answer
                        return Get().then(response => {
                            // Get Answer
                            //ipcRenderer.send('ModalTemplate', { Reboot : true, Modal : `${config.productName} needs to be reloaded, please wait ...` })
                            resolve(response)
                        })
                    })
                } else {
                    return Get().then(response => {
                        // Get Answer
                        resolve(response)
                    })
                }
            })
        })
    })
}
/**
* Returns "Options" Table count rows
*/
let Count = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.Options}\``
        db.get(sql, (err, response) => err ? reject(err.message) : resolve(response))
    })
}
/**
* Create "Options" Table
*/
let Create = () => {
    return new Promise((resolve, reject) => {
        let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\` TEXT, \`${config.Form.Option.DisplayMode}\` TEXT, \`${config.Form.Option.ParameterList}\` TEXT )`
        db.run(sql, err => err ? reject(err.message) : resolve(sql))
    })
}

/**
* Empty "Options" Table
*/
let Delete = () => {
    return new Promise((resolve, reject) => {
        let sql = `DROP TABLE \`${config.Database.Options}\``
        db.run(sql, err => err ? reject(err.message) : resolve(sql))
    })
}
/**
* Restore defaults Options in "Options" Table
*/
let Reset = () => {
    return new Promise((resolve, reject) => {
        return Update.All({
            SearchMode: config.Form.Option.SearchMode_OrderExact,
            DisplayMode: config.Form.Option.DisplayMode_Full,
            ParameterList: config.Form.Option.ParameterList_Common
        })
    })
}

/**
* Fill with default "Options Table"
*/
let Fill = () => {
    return new Promise((resolve, reject) => {
        /* Reset the options to its default */
        let sql = `INSERT INTO \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\`) VALUES ($SearchMode, $DisplayMode, $ParameterList)`
            , param = {
                $SearchMode: config.Form.Option.SearchMode_OrderExact,
                $DisplayMode: config.Form.Option.DisplayMode_Full,
                $ParameterList: config.Form.Option.ParameterList_Common
            }
        db.run(sql, param, err => err ? reject(err.message) : resolve(sql))
    })
}

/**
* Get options from "Options Table"
*/
let Get = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\` FROM \`${config.Database.Options}\``
        db.get(sql, (err, response) => err ? reject(err.message) : resolve(response))
    })
}

let Update = {
    /**
    * Run Update SQL in "Options Table"
    * @param {string} sql
    * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} param
    */
    Run: (sql, param) => {
        return new Promise((resolve, reject) => {
            return db.run(sql, param, (err, response) => err ? reject(err.message) : Get())
        })
    },
    /**
    * Update All in "Options Table"
    * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} data
    * @returns {void}
    */
    All: data => {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode, \`${config.Form.Option.DisplayMode}\` = $DisplayMode, \`${config.Form.Option.ParameterList}\` = $ParameterList`
                , param = {
                    $SearchMode: data.SearchMode,
                    $DisplayMode: data.DisplayMode,
                    $ParameterList: data.ParameterList
                }
            return Update.Run(sql, param)
        })
    },
    /**
    * Update SearchMode in "Options Table"
    * @param {{ SearchMode: String }} data
    * @returns {void}
    */
    SearchMode: data => {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode`
                , param = {
                    $SearchMode: data.SearchMode,
                }
            return Update.Run(sql, param)
        })
    },
    /**
    * Update DisplayMode in "Options Table"
    * @param {{ DisplayMode: String }} data
    * @returns {void}
    */
    DisplayMode: data => {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.DisplayMode}\` = $DisplayMode`
                , param = {
                    $DisplayMode: data.DisplayMode,
                }
            return Update.Run(sql, param)
        })
    },
    /**
    * Update ParameterList in "Options Table"
    * @param {{ ParameterList: String }} data
    * @returns {void}
    */
    ParameterList: data => {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.ParameterList}\` = $ParameterList`
                , param = {
                    $ParameterList: data.ParameterList,
                }
            return Update.Run(sql, param)
        })
    }
}

module.exports = {
    Initialize: Initialize,
    Update: Update,
    Reset: Reset
}