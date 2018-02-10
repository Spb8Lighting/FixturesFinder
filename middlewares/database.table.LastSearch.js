let db = require('./database.init')
    , config = require('./config')

/**
* Create the "LastSearch" Table and insert default values
*/
let Initialize = (callback = false) => {
    db.serialize(() => {
        /* Create and fill the Database for Options */
        Create()
        let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.LastSearch}\``
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
                }
                /* After check of Database, initialize interface */
                Get(callback)
            }
        })
    })
}

/**
* Create "LastSearch" Table
* @returns {void}
*/
let Create = () => {
    let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.LastSearch}\` ( \`${config.Form.Search.DMXChannelCount}\` INTEGER, \`${config.Form.Search.DMXChannelCount_Max}\` INTEGER, \`${config.Form.Search.Manufacturer}\` TEXT, \`${config.Form.Search.FixtureName}\` TEXT, \`${config.Form.Search.DMXChart_Channel}\` TEXT, \`${config.Form.Search.DMXChart_Slot}\` TEXT )`
    return db.run(sql)
}

/**
* Empty "LastSearch" Table
* @returns {void}
*/
let Delete = () => {
    let sql = `DROP TABLE \`${config.Database.LastSearch}\``
    return db.run(sql)
}

/**
* Restore "LastSearch" Table to default (empty)
*/
let Reset = () => {
    Delete()
    Create()
}
/**
* Fill with default "LastSearch"
* @returns {void}
*/
let Fill = () => {
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
    return db.run(sql, param)
}

/**
* Get options from "LastSearch Table"
*/
let Get = (callback = false) => {
    let sql = `SELECT \`${config.Form.Search.DMXChannelCount}\`, \`${config.Form.Search.DMXChannelCount_Max}\`, \`${config.Form.Search.Manufacturer}\`, \`${config.Form.Search.FixtureName}\`, \`${config.Form.Search.DMXChart_Channel}\`, \`${config.Form.Search.DMXChart_Slot}\` FROM \`${config.Database.LastSearch}\``

    db.get(sql, (err, data) => {
        if (err) {
            return console.error(err.message)
        } else {
            global.DB.LastSearch = data
            global.DB.LastSearch[config.Form.Search.DMXChart_Channel] = JSON.parse(global.DB.LastSearch[config.Form.Search.DMXChart_Channel])
            global.DB.LastSearch[config.Form.Search.DMXChart_Slot] = JSON.parse(global.DB.LastSearch[config.Form.Search.DMXChart_Slot])
            if (typeof callback === 'function') {
                callback()
            }
        }
    })
}

let Update = {
    /**
    * Run Update SQL in "LastSearch Table"
    * @param {string} sql
    * @param {{ DMXChannelCount: Int, DMXChannelCount_Max: Int, Manufacturer : String, FixtureName : String, DMXChart_Channel : Object, DMXChart_Slot : Object }} param
    * @returns {void}
    */
    Run: (sql, param) => {
        return db.run(sql, param, err => err ? console.error(err.message) : Get())
    },
    /**
    * Update All in "LastSearch Table"
    * @param {{ DMXChannelCount: Int, DMXChannelCount_Max: Int, Manufacturer : String, FixtureName : String, DMXChart_Channel : Object, DMXChart_Slot : Object }} data
    * @returns {void}
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
        return Update.Run(sql, param)
    }
}

module.exports = {
    Initialize: Initialize,
    Update: Update
}