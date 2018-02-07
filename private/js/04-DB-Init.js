const sqlite3 = require('sqlite3').verbose()
    // Define the Database location following if it is in the build or inside dev environment
    , dblocation = process.env.NODE_ENV ? `${__dirname}/../../db.sqlite3` : `${__dirname}/../../../db.sqlite3`
    // Run SQLIte database connection
    , db = new sqlite3.Database(dblocation, err => err ? console.error(err.message) : true)