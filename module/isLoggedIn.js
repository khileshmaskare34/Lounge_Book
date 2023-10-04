const jwt = require('jsonwebtoken');

const isLoggedIn = async function (req, res, next) {
  const token = req.cookies.Token;
  if(token){
    jwt.verify(token, "mynameispulkitupadhyayfromharda", (err, decodedToken)=>{
      if(err){
        console.log(err.message);
        res.redirect('/login');
      }
      else{
        console.log(decodedToken);
        next();
      }
    });
    // return res.status(401).render('login', { error: 'please login first!' });
  }
  else{
    res.redirect('/login');
  }
 
}

module.exports = { isLoggedIn };
