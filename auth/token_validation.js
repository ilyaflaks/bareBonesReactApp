const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    //let token = req.get("authorization"); //uncomment this to test in Postman
    let token = req.cookies.jwtoken; //comment this out to test in Postman
    console.log("token validaion: ", token);
    if (token) {
      //  token = token.slice(7); //uncomment this to test in Postman. Removed the word "Bearer "
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access Denied! Unauthorized user",
      });
    }
  },
};
