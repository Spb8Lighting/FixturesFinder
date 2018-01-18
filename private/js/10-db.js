const sqlite3 = require('sqlite3').verbose()
, db = new sqlite3.Database('./public/db/test.sqlite', err => {
    if(err) {
        return console.error(err.message)
    } else {
        console.info('Database connection alive')
    }
})

db.createFunction('REGEXP', 2, smDbFunctions.regexp)

let smDbFunctions = {
    regexp : {
        onFunctionCall: val => {
            let res = new RegExp(val.getString(0))
            if(val.getString(1).match(res)) {
                return 1
            } else {
                return 0
            }
        }
    }
}

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)")
    let stmt = db.prepare("INSERT INTO lorem VALUES (?)")
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i)
    }
    stmt.finalize()
})
db.close(err => {
    if(err) {
        return console.error(err.message)
    } else {
        console.info('Database connection closed')
    }
})