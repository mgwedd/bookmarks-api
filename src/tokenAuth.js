
const { API_TOKEN } = require('./config')
const logger = require('./logger')

function tokenAuth(req, res, next) {
  const authToken = req.get('Authorization')
  logger.error(`Unauthorized request to path: ${req.path}`)
  console.log('API :', API_TOKEN, 'AUTH :', authToken)
  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
}

module.exports = tokenAuth