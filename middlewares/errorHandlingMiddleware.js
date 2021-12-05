const errorHandlingMiddleware = (error, req, res, next) => {
  if (error.message === "no users found in db") {
    return res.json({ error: error.message });
  }

  //   If i dont know how to handle -> pass error to default express error handler
  next(error);
};

module.exports = errorHandlingMiddleware;
