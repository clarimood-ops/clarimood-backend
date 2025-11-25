require("dotenv").config()
const { Pool } = require("pg")

const dbConfig = {
  host: String(process.env.DB_HOST || ""),
  port: Number.parseInt(process.env.DB_PORT || "5432", 10),
  database: String(process.env.DB_NAME || ""),
  user: String(process.env.DB_USER || ""),
  password: String(process.env.DB_PASSWORD || ""),
  ssl: {
    rejectUnauthorized: false,
  },
}

console.log("[DEBUG] Database Config:")
console.log("[DEBUG] DB_HOST:", dbConfig.host)
console.log("[DEBUG] DB_NAME:", dbConfig.database)
console.log("[DEBUG] DB_USER:", dbConfig.user)
console.log("[DEBUG] DB_PORT:", dbConfig.port)

if (!dbConfig.host || !dbConfig.database || !dbConfig.user || !dbConfig.password) {
  console.error("[ERROR] Missing required database configuration!")
  console.error("DB_HOST present:", !!dbConfig.host)
  console.error("DB_NAME present:", !!dbConfig.database)
  console.error("DB_USER present:", !!dbConfig.user)
  console.error("DB_PASSWORD present:", !!dbConfig.password)
  throw new Error("Database configuration is incomplete")
}

const pool = new Pool(dbConfig)

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database at:", dbConfig.host)
})

pool.on("error", (err) => {
  console.error("Database pool error:", err)
})

module.exports = pool
