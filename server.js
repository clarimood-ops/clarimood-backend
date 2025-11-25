const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")

dotenv.config()

console.log("[DEBUG] Environment Variables:")
console.log("[DEBUG] DB_HOST:", process.env.DB_HOST)
console.log("[DEBUG] DB_NAME:", process.env.DB_NAME)
console.log("[DEBUG] DB_USER:", process.env.DB_USER)
console.log("[DEBUG] DB_PORT:", process.env.DB_PORT)
console.log("[DEBUG] JWT_SECRET:", process.env.JWT_SECRET ? "***SET***" : "NOT SET")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Clarimood API is running" })
})

// Routes
app.use("/api/auth", authRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Clarimood API is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})
