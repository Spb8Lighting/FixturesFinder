const db = require('./database.init')
    , config = require('./config')

/**
* Create the "LastSearch" Table and insert default values
*/
let Initialize = () => {
    return new Promise((resolve, reject) => {
        /* Create and fill the Database for Options */
        Create()
            .then(response => {
                // Create Answer
                return Count()
            })
            .then(response => {
                // Count Answer
                if (response.count > 1) {
                    Delete()
                        .then(response => {
                            // Delete Answer
                            return Create()
                        })
                        .then(response => {
                            // Create Answer
                            return Fill()
                        })
                        .then(response => {
                            // Fill Answer
                            return Get()
                        })
                        .then(response => {
                            // Get Answer
                            resolve(response)
                        })
                } else if (response.count == 0) {
                    Fill()
                        .then(response => {
                            // Fill Answer
                            return Get()
                        })
                        .then(response => {
                            // Get Answer
                            resolve(response)
                        })
                } else {
                    Get()
                        .then(response => {
                            // Get Answer
                            resolve(response)
                        })
                }
            })
    })
}
/**
* Returns "LastSearch" Table count rows
*/
let Count = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.LastSearch}\``
        db.get(sql, (err, response) => err ? reject(err.message) : resolve(response))
    })
}

/**
* Create "LastSearch" Table
*/
let Create = () => {
    return new Promise((resolve, reject) => {
        let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.LastSearch}\` ( \`${config.Form.Search.DMXChannelCount}\` INTEGER, \`${config.Form.Search.DMXChannelCount_Max}\` INTEGER, \`${config.Form.Search.Manufacturer}\` TEXT, \`${config.Form.Search.FixtureName}\` TEXT, \`${config.Form.Search.DMXChart_Channel}\` TEXT, \`${config.Form.Search.DMXChart_Slot}\` TEXT )`
        db.run(sql, err => err ? reject(err.message) : resolve(sql))
    })
}

/**
* Empty "LastSearch" Table
*/
let Delete = () => {
    return new Promise((resolve, reject) => {
        let sql = `DROP TABLE \`${config.Database.LastSearch}\``
        db.run(sql, err => err ? reject(err.message) : resolve(sql))
    })
}

/**
* Restore "LastSearch" Table to default (empty)
*/
let Reset = () => {
    return new Promise((resolve, reject) => {
        Delete()
            .then(response => {
                return Create()
            })
            .then(response => {
                resolve(response)
            })
    })
}
/**
* Fill with default "LastSearch"
*/
let Fill = () => {
    return new Promise((resolve, reject) => {
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
        db.run(sql, param, err => err ? reject(err.message) : resolve(sql))
    })
}

/**
* Get options from "LastSearch Table"
*/
let Get = (callback = false) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT \`${config.Form.Search.DMXChannelCount}\`, \`${config.Form.Search.DMXChannelCount_Max}\`, \`${config.Form.Search.Manufacturer}\`, \`${config.Form.Search.FixtureName}\`, \`${config.Form.Search.DMXChart_Channel}\`, \`${config.Form.Search.DMXChart_Slot}\` FROM \`${config.Database.LastSearch}\``
        db.get(sql, (err, response) => {
            if(err) {
                reject(err.message)
            } else {
                response[config.Form.Search.DMXChart_Channel] = JSON.parse(response[config.Form.Search.DMXChart_Channel])
                response[config.Form.Search.DMXChart_Slot] = JSON.parse(response[config.Form.Search.DMXChart_Slot])
                resolve(response)
            }
        })
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