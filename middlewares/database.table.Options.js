let db = require('./database.init')
    , config = require('./config')
    , $App = {
        Options: require('./app.Options'),
        DMXMaxChannel: require('./app.DMXMaxChannel'),
        SelectOptions: require('./app.SelectOptions')
    }

/**
* Create the "Options" Table and insert default values
*/
let Initialize = (callback = false) => {
    db.serialize(() => {
        /* Create and fill the Database for Options */
        Create()
        let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.Options}\``
        db.get(sql, (err, row) => {
            if (err) {
                return console.error(err.message)
            } else {
                if (row.count > 1) {
                    Delete()
                    Create()
                    Fill()
                } else if (row.count == 0) {
                    Fill()
                    //ipcRenderer.send('ModalTemplate', { Reboot : true, Modal : `${config.productName} needs to be reloaded, please wait ...` })
                }
                /* After check of Database, initialize interface */
                Get(callback)
            }
        })
    })
}

/**
* Create "Options" Table
* @returns {void}
*/
let Create = () => {
    let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\` TEXT, \`${config.Form.Option.DisplayMode}\` TEXT, \`${config.Form.Option.ParameterList}\` TEXT )`
    return db.run(sql)
}

/**
* Empty "Options" Table
* @returns {void}
*/
let Delete = () => {
    let sql = `DROP TABLE \`${config.Database.Options}\``
    return db.run(sql)
}
/**
* Restore defaults Options in "Options" Table
*/
let Reset = () => {
    Update.All({
        SearchMode: config.Form.Option.SearchMode_OrderExact,
        DisplayMode: config.Form.Option.DisplayMode_Full,
        ParameterList: config.Form.Option.ParameterList_Common
    })
}

/**
* Fill with default "Options Table"
* @returns {void}
*/
let Fill = () => {
    /* Reset the options to its default */
    let sql = `INSERT INTO \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\`) VALUES ($SearchMode, $DisplayMode, $ParameterList)`
        , param = {
            $SearchMode: config.Form.Option.SearchMode_OrderExact,
            $DisplayMode: config.Form.Option.DisplayMode_Full,
            $ParameterList: config.Form.Option.ParameterList_Common
        }
    return db.run(sql, param)
}

/**
* Get options from "Options Table"
*/
let Get = (callback = false) => {
    let sql = `SELECT \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\` FROM \`${config.Database.Options}\``

    db.get(sql, (err, data) => {
        if (err) {
            return console.error(err.message)
        } else {
            global.DB.Options = data
            $App.DMXMaxChannel.CheckDisplay()
            $App.SelectOptions.CheckOptions()
            $App.Options.Reselect()
            if (typeof callback === 'function') {
                callback()
            }
        }
    })
}

let Update = {
    /**
    * Run Update SQL in "Options Table"
    * @param {string} sql
    * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} param
    */
    Run: (sql, param) => {
        db.run(sql, param, err => {
            if (err) {
                return console.error(err.message)
            } else {
                Get()
            }
        })
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
        return Update.Run(sql, param)
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
        return Update.Run(sql, param)
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
        return Update.Run(sql, param)
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
        return Update.Run(sql, param)
    }
}

module.exports = {
    Initialize: Initialize,
    Update: Update,
    Reset: Reset
}