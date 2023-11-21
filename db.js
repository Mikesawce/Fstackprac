const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const dbString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: dbString
})

module.exports = pool