const TokenAuth = require('./TokenAuth');

const tokenVerifyAuth = (req,res,next) => {
  const token = req.header('admin-auth');
  const newQuery = new TokenAuth({
    token: token,
  })

  newQuery.findByToken()
    .then(() => {
      req.token = token;
      next();
    })
    .catch((err) =>{
      res.status(400).send(err);
    })
}

module.exports = tokenVerifyAuth;