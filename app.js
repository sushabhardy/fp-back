import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './route/index.js'
import { checkAuth } from './middleware/index.js'

/**
 * Init libraries
 */
dotenv.config()
const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * To verify jwt in requests
 */
if (process.env.CHECK_AUTH === '1') {
  app.use(checkAuth)
}

/**
 * Register routes
 */
app.use('/', router)

/**
 * Orphan Error Handlers
 */
app.use('*', (req, res, next) =>
  next(new Error('Invalid Request.'))
)

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  const statusCode = error.code || 500
  res
    .status(statusCode)
    .json({ statusCode: statusCode, message: error.message, success: false, error: true })
})

/**
 * Initialize App listener
 */
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
