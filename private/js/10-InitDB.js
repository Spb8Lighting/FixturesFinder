const sqlite3 = require('sqlite3').verbose()
,   db = new sqlite3.Database('./public/db/db.sqlite3', err => {
    if(err) {
        return console.error(err.message)
    } else {
        console.info('Database Option connection alive')
    }
})