const { Pool } = require('pg')
const dotenv = require('dotenv')

const dbString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: dbstring
})