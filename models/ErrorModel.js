class ErrorModel extends Error{
    constructor(message, errorCode){
        super(message);
        this.code = errorCode;
    }
}

export default ErrorModel
// module.exports = ErrorModel;
