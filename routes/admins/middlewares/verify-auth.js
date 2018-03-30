/**
 * Check if user is admin or not. 
 * When user login as an admin
 *  -> req.user exists in req (passportJS takes care of this step)
 * All we need to do is checking if that user exist
 */

function VerifyAuthentication(req,res,next){
  if (req.user){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = VerifyAuthentication;