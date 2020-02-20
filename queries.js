require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASS,
    port: process.env.DBPORT,
})

const getBumps = (request, response) => {
    pool.query('SELECT * FROM speedbumps ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log('success')
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    getBumps,
}