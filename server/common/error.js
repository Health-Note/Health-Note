
class CustomError extends Error {
    constructor(name = 'InternalError', status = 500, ...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.name = name
        this.status = status
    }
}

module.exports = CustomError
