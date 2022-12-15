const errorHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            res.status(err.status || 500).json({
                status: false,
                message: err.message || "Internal Server Error"
            })
            next(err);
        }
    }
}

module.exports = errorHandler;