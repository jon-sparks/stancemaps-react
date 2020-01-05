const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'speedbumps',
    password: 'admin',
    port: 5432,
})

const getBumps = (request, response) => {
    pool.query('SELECT * FROM speedbumps ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    getBumps,
}