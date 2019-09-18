// var redis = require('redis');
// var JWTR =  require('jwt-redis').default;
// var redisClient = redis.createClient();
// var jwtr = new JWTR(redisClient);
let jwt = require('jsonwebtoken');
exports.checkToken = function(req, res, next){
  console.log(req.headers)
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    console.log(token)
  }


  if (token) {
    let JWT_TOKEN="secret";
    // var legit = jwt.verify(token,JWT_TOKEN);
    //   console.log(legit)
    jwt.verify(token,JWT_TOKEN,function(err,decoded){
        
      if (err) {
          console.log(err+':Error');
          res.send('Token is not valid');
        // return res.json({
        //   success: false,
        //   message: 'Token is not valid'
        // });
      } else {
        console.log(decoded)
        req.decoded = decoded;

      }
    });
  } else {
      console.log('Err');
      res.send('Auth token is not supplied');
    // return res.json({
    //   success: false,
    //   message: 'Auth token is not supplied'
    // });
  }

};

// module.exports = {
//   checkToken: checkToken
// }