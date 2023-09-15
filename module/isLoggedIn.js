const jwt = require('jsonwebtoken');

const isLoggedIn = async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).render('login', { error: 'please login first!' });
  }
  
    const { id } = jwt.verify(token, 'mynameispulkitupadhyayfromharda');
    console.log( "id id id hai bhai"+ id)
    // req.id = id;
    next();
    // Handle token verification error
    return res.status(401).render('login', { error: 'Invalid token, please login again!' });
  }

module.exports = isLoggedIn;
