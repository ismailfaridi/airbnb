// Async Wrapper (writing try-catch elegantly)
function wrapAsync(func) {
  return function (req, res, next) {
    func(req, res, next).catch((err) => next(err)); // call error-handling middleware
  };
}

module.exports = wrapAsync;