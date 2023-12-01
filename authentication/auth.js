const jwt = require('jsonwebtoken');
function generateAuthToken(userId) {
  const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
  return token;
}
module.exports = { generateAuthToken };
