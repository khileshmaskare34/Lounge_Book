const jwt = require('jsonwebtoken');

const isLoggedIn =  function(req, res, next){
    jwt.verify(
        req.cookies.Token,
        'mynameispulkitupadhyayfromharda',
        (err, authData) =>{
            if(err){
                res.send('not login')
            }
            else{
                next();
            }
        }
    )
}
module.exports = isLoggedIn;