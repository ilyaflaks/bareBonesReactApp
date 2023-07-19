module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

//accepts a function as a param and returns that function with the catch block
//needed because async functions need "next" to complete
