import { verbose } from 'sqlite3'

const sql = verbose()
const DBSOURCE = 'db.sqlite'

const db = new sql.Database(DBSOURCE, err => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err: any) => {
        if (err) {
          console.log({ err })
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
          db.run(insert, ['admin', 'admin@example.com', 'admin123456'])
          db.run(insert, ['user', 'user@example.com', 'user123456'])
        }
      }
    )
  }
})
export default db
