const jwt = require('jsonwebtoken');

const fetchuser = async (req, res, next) => {
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!token) {
    return res.status(401).json({ error: "No token, access denied" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
