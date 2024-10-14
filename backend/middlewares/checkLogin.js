require('dotenv').config();
const SECRETKEY = process.env.SECRETKEY;

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Log in is required." });
  }

  try {
    const decoded = jwt.verify(token, SECRETKEY)
    req.id = decoded.id;
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = checkLogin;