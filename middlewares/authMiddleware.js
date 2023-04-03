const jwt = require('jsonwebtoken');
const createError = require('./error');
const secret = 'furniture';

const verfyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return next(createError(402, 'Token Not Valid'));
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verfyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      return next(createError(403, 'You are not Authorised!'));
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verfyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return next(
        createError(403, 'You are not authorised to perform such an operation')
      );
    }
  });
};
module.exports = { verifyUser, verifyAdmin };
