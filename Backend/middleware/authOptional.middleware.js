const jwt = require('jsonwebtoken');

const fetchuserOptional = async (req, res, next) => {
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    req.user = null;
    next();
  }
};

module.exports = fetchuserOptional;
