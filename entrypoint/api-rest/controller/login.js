const {
    LoginApplication,
    ErrorObject
} = require("../../../application");
const {
    ErrorMap
} = require('./common/error-map')
const {
    dataGateway
} = require("../../../infrastructure");
const HttpCode = require("http-status-codes");
const errorMapping = {
    [ErrorObject.NotFoundUserWithUserName]: HttpCode.BAD_REQUEST,
    [ErrorObject.RequiredUserId]: HttpCode.BAD_REQUEST,
    [ErrorObject.RequiredUserName]: HttpCode.BAD_REQUEST,
    [ErrorObject.RequiredPassword]: HttpCode.BAD_REQUEST,
    [ErrorObject.IncorrectPassword]: HttpCode.UNAUTHORIZED,

};

const loginController = async (req, res) => {
    try {
        const intersect = new LoginApplication({
            infra: {
                db: dataGateway()
            }
        });
        const body = req.body
        const rs = await intersect.execute(
            body.username,
            body.password
        );
        res.type("json");
        return res.status(200).send(rs);
    } catch (error) {
        const errorMap = ErrorMap(
            error,
            errorMapping,
            "Internal error when login"
        );
        console.log(error)
        return res.status(errorMap.status).send({
            message: error.message
        });
    }
};

module.exports.loginController = loginController;