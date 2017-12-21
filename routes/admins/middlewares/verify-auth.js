/** check if user is authenticated or not **/

function VerifyAuthentication(req,res,next){
  if (req.user){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = VerifyAuthentication;