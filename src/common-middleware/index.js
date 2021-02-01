const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

exports.requireSignin = (req, res, next) => {
  // check header or url parameters or post parameters for token
  let token =
    req.body.token || req.query.token || req.headers[`x-access-token`];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, decoded) => {
      if (err) {
        const error = new Error(`You are not authenticated!`);
        error.status = 401;
        return next(err);
      } else {
        // if everything is good, save to request for use in other routes
        req._user = decoded;

        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    let err = new Error(`No token provided!`);
    err.status = 403;
    return next(err);
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req._user.role !== "admin") {
    return res.status(400).json({ message: "Only admin can do this" });
  }
  next();
};
