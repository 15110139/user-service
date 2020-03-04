class ErrorCustom extends Error {
    /**
     * @param {Object} errorObject 
     * @param {String} message 
     * @param {Object} error 
     */
    constructor(errorObject, message, error) {
        super(message)
        this.name = errorObject
        if (error && error.stack) {
            let trace = ""
            trace += this.stack.split("\n")[0]
            trace += `\n${this.stack.split("\n")[1]}`
            trace += `\n${error.stack}`
            this.stack = trace
        }
    }
}

module.exports.ErrorCustom = ErrorCustom