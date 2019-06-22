
const { API_TOKEN } = require('./config')
const logger = require('./logger')

function tokenAuth(req, res, next) {
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    logger.error(`Unauthorized request to path: ${req.path}. API TOKEN: ${API_TOKEN} and AUTH TOKEN: ${authToken}`)
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
}

module.exports = tokenAuth