// const jwt = require('jsonwebtoken');

// const isAuthenticated = (roles) => {
//   return (req, res, next) => {
//     if (
//       !req.headers.authorization ||
//       !req.headers.authorization.startsWith('Bearer')
//     )
//       return res.status(400).json({
//         success: false,
//         message: 'No auth credentials, unable to check if authenticated',
//       });

//     const token = req.headers.authorization.split(' ')[1];

//     if (!token)
//       return res.status(400).json({
//         success: false,
//         message: 'No token, unable to check if authenticated',
//       });
//     try {
//       const credentials = jwt.verify(token, process.env.SECRET_KEY);
//       const hasAccess = roles.includes(credentials.role);
//       if (!hasAccess)
//         return res.status(400).json({
//           success: false,
//           message: 'You are not authenticated',
//         });
//       next();
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: 'Error occured',
//         error: error.message,
//       });
//     }
//   };
// };

// module.exports = isAuthenticated;
const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not auth credentials found" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unable to access token", message: "Token not found!" });
  }

  try {
    const credentials = jwt.verify(token, process.env.JWT_SECRET);
    res.locals = credentials;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
