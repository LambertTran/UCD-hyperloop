/** check if there exists an user **/

function VerifyAuthentication(req,res,next){
  if (req.user){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = VerifyAuthentication;