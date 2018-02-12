const db = require('./database.init')
    , config = require('./config')

/**
* Create the "SearchParameter" Table and insert default values
*/
let Initialize = () => {
    return new Promise((resolve, reject) => {
        /* Create and fill the Database for Options */
        Create().then(response => {
            // Create() Answer
            return Count().then(response => {
                // Count() Answer
                if (response.count == 0) {
                    return Fill(require('./temporary-until-ingestion.ParameterDMX')).then(response => {
                        // Fill() Answer
                        return Get().then(response => {
                            // Get Answer
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
* Returns "SearchParameter" Table count rows
*/
let Count = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.SearchParameter}\``
        db.get(sql, (err, response) => err ? reject(err.message) : resolve(response))
    })
}
/**
* Create "SearchParameter" Table
*/
let Create = () => {
    return new Promise((resolve, reject) => {
        let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\` INTEGER, \`${config.Form.Search.SearchParameter_value}\` TEXT UNIQUE)`
        db.run(sql, err => err ? reject(err.message) : resolve(sql))
    })
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
    return new Promise((resolve, reject) => {
        let placeholders = data.map(el => `(${(el.order) ? el.order : null}, '${el.value}')`).join(', ')
            , sql = `INSERT OR IGNORE INTO \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\`) VALUES ${placeholders}`
        db.run(sql, err => err ? reject(err.message) : resolve())
    })
}
/**
* Get "SearchParameter Table"
*/
let Get = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT \`rowid\`, \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\` FROM \`${config.Database.SearchParameter}\` ORDER BY \`${config.Form.Search.SearchParameter_value}\``
        db.all(sql, (err, response) => err ? reject(err.message) : resolve(response))
    })
}
module.exports = {
    Initialize: Initialize
}
