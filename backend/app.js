import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/router.js'

dotenv.config()
const app = express()

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connection established...')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.static('./public'))
app.use(bodyParser.json({ extended: true }))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(router)

app.listen(4000, () => {
  console.log('server running at http://localhost:4000')
})
