const {
    CreateLoanRequestApplication,
    ErrorObject
} = require("../../../application");
const {
    ErrorMap
} = require('./common/error-map')
const {
    dataGateway,
    apiGateway
} = require("../../../infrastructure");
const HttpCode = require("http-status-codes");
const errorMapping = {
    [ErrorObject.RequiredFirstName]: HttpCode.BAD_REQUEST,

};

const createLoanRequestController = async (req, res) => {
    try {
        const intersect = new CreateLoanRequestApplication({
            infra: {
                db: dataGateway(),
                api: apiGateway()
            }
        });
        const body = req.body;
        const rs = await intersect.execute({...body});
        res.type("json");
        return res.status(201).send(rs);
    } catch (error) {
        const errorMap = ErrorMap(
            error,
            errorMapping,
            "Internal error when create user"
        );
        console.log(error)
        return res.status(errorMap.status).send({
            message: error.message
        });
    }
};

module.exports.createLoanRequestController = createLoanRequestController;