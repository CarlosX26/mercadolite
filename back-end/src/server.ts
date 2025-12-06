import app from "./app"
import AppDataSource from "./data-source"
import "dotenv/config"

const PORT = process.env.PORT || 3000

;(async () => {
  await AppDataSource.initialize()
    .then((res) => console.log("database connected"))
    .catch((err) => console.log("database connection failure❌", err))

  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}🚀`)
  })
})()
