/*
const sqlite3 = require('sqlite3').verbose()
, db = new sqlite3.Database(':memory:')

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)")
    let stmt = db.prepare("INSERT INTO lorem VALUES (?)")
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i)
    }
    stmt.finalize()
    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        let item = document.createElement("li")
        item.textContent = `${row.id}: ${row.info}`
        $MainContent.appendChild(item)
    })
})
db.close()
*/