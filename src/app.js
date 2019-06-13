require( 'dotenv' ).config()
const express = require( 'express' )
const cors = require( 'cors' )
const helmet = require( 'helmet' )
const { NODE_ENV } = require('./config')
const morgan = require('morgan')
const errorHandler = require('./errorHandler')
const tokenAuth = require('./tokenAuth')
const bookmarksRouter = require('./bookmarksRouter')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(helmet())

app.use(cors())

app.use(tokenAuth)

app.use(bookmarksRouter)

app.use(errorHandler)

module.exports = app