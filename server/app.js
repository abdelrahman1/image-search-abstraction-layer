import express from "express"
import bodyParse from "body-parser"
import logger from "morgan"
import path from "path"
import imgSearchRoutes from "./api/routes/imgsearch"
import { catch404, handleError } from "./api/helpers/error"

/* App Init */
const app = express()

/* Middleware */
//set static folder
app.use(express.static(path.join(__dirname, "../public")))

//logger
if (process.env.NODE_ENV === "dev") app.use(logger("dev"))

//routes
app.get("/", (req, res, next) => {
  res.sendFile('index.html')
})

app.use('/api/imgsearch/',imgSearchRoutes)

//catch 404 && handleError
app.use(catch404, handleError)

export default app
