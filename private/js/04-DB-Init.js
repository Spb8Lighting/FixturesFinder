const sqlite3 = require('sqlite3').verbose()
const dblocation = process.env.NODE_ENV ? `${__dirname}/../../db.sqlite3` : `${__dirname}/../../../db.sqlite3`
    , db = new sqlite3.Database(dblocation, err => {
        if (err) {
            return console.error(err.message)
        } else {
            //console.info('Database Option connection alive')
        }
    })