let db = require('./database.init')
    , config = require('./config')
    , $App = {
        SelectOptions: require('./app.SelectOptions')
    }
    , TMPDatas = require('./temporary-until-ingestion.ParameterDMX')

/**
* Create the "SearchParameter" Table and insert default values
*/
let Initialize = (callback = false) => {
    db.serialize(() => {
        /* Create and fill the Database for Options */
        Create()
        let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.SearchParameter}\``
        db.get(sql, (err, row) => {
            if (err) {
                return console.error(err.message)
            } else {
                if (row.count == 0) {
                    Fill(TMPDatas)
                }
                /* After check of Database, initialize interface */
                Get(callback)
            }
        })
    })
}
/**
* Create "SearchParameter" Table
* @returns {void}
*/
let Create = () => {
    let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\` INTEGER, \`${config.Form.Search.SearchParameter_value}\` TEXT UNIQUE)`
    return db.run(sql)
}

/**
* Empty "SearchParameter" Table
* @returns {void}
*/
let Delete = () => {
    let sql = `DROP TABLE \`${config.Database.SearchParameter}\``
    return db.run(sql)
}
/**
* Restore "SearchParameter" Table to default (empty)
*/
let Reset = () => {
    Delete()
    Create()
}
/**
* Fill "SearchParameter"
* @returns {void}
*/
let Fill = (data = false) => {
    let placeholders = data.map(el => `(${(el.order) ? el.order : null}, '${el.value}')`).join(', ')
        , sql = `INSERT OR IGNORE INTO \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\`) VALUES ${placeholders}`
    return db.run(sql)
}
/**
* Get "SearchParameter Table"
*/
let Get = (callback = false) => {
    let sql = `SELECT \`rowid\`, \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\` FROM \`${config.Database.SearchParameter}\` ORDER BY \`${config.Form.Search.SearchParameter_value}\``

    db.all(sql, (err, datas) => {
        if (err) {
            return console.error(err.message)
        } else {
            global.DB.SearchParameter = datas
            $App.SelectOptions.Initialize()
            if (typeof callback === 'function') {
                callback()
            }
        }
    })
}
module.exports = {
    Initialize: Initialize
}
