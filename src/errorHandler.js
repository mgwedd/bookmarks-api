const { NODE_ENV } = require( './config' )
const logger = require( './logger' )

function errorHandler( error, req, res, next ) {
  let response
  if ( NODE_ENV === 'production' ) {
    response = { error : { message : 'Server Error' } }
  } else {
    console.error( error )
    response = { message : error.message, error }
  }
  res.status( 500 ).json( response )
}

module.exports = errorHandler 
