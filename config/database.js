require("dotenv").config()
const { Pool } = require("pg")

console.log("[DEBUG] Database Config:")
console.log("[DEBUG] DB_HOST:", process.env.DB_HOST)
console.log("[DEBUG] DB_NAME:", process.env.DB_NAME)
console.log("[DEBUG] DB_USER:", process.env.DB_USER)
console.log("[DEBUG] DB_PORT:", process.env.DB_PORT)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database")
})

pool.on("error", (err) => {
  console.error("Database pool error:", err)
})

module.exports = pool
