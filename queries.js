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
  // pool.query('SELECT * FROM speedbumps ORDER BY id ASC', (error, results) => {
  pool.query('SELECT ST_X(location), ST_Y(location) FROM speedbumps', (error, results) => {
    if (error) {
      throw error
    }
    response.json(results.rows)
  })
}


// const postBumps = (request, response) => {
//   // pool.query('SELECT * FROM speedbumps ORDER BY id ASC', (error, results) => {
//   pool.query('INSERT INTO speedbumps(id, lat, lon) VALUES(3, 9, 6) RETURNING *', (error, results) => {
//     if (error) {
//       throw error
//     }
//     console.log(results)
//     // response.status(200).json(results.rows)
//   })
// }

module.exports = {
  getBumps,
  // postBumps,
}

//Queries:
// SELECT ST_X(locations), ST_Y(locations) FROM speedbumps;
// UPDATE your_table SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);
// insert into speedbumps (geom) values ('SRID=4326;POINT(-3.485002 51.400919)');