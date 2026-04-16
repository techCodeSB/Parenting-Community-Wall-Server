const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || "Something went wrong";


    res.status(status).json({ err: message })
}

module.exports = errorMiddleware;