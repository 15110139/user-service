const {
    SentRequestLoanEasyCreditApplication,
    ErrorObject
} = require("../../../application");
const {
    ErrorMap
} = require('./common/error-map')
const {
    apiGateway,
    dataGateway
} = require("../../../infrastructure");
const HttpCode = require("http-status-codes");
const errorMapping = {
    [ErrorObject.RequiredLoanRequestId]: HttpCode.BAD_REQUEST,
    [ErrorObject.NotFoundLoanRequestWithLoanRequestId]:HttpCode.NOT_FOUND,
    [ErrorObject.LoanRequestIsProcessed]:HttpCode.BAD_REQUEST,
    [ErrorObject.HaveErrorWhenCallApiEasyCredit]:HttpCode.BAD_GATEWAY
};

const sentRequestLoanEasyCreditController = async (req, res) => {
    try {
        const intersect = new SentRequestLoanEasyCreditApplication({
            infra: {
                db: dataGateway(),
                api: apiGateway()
            }
        });
        const loanRequestId = req.params.loanRequestId
        const rs = await intersect.execute(loanRequestId);
        res.type("json");
        return res.status(200).send(rs);
    } catch (error) {
        const errorMap = ErrorMap(
            error,
            errorMapping,
            "Internal error when send loan request to easy credit"
        );
        console.log(error)
        return res.status(errorMap.status).send({
            message: error.message
        });
    }
};

module.exports.sentRequestLoanEasyCreditController = sentRequestLoanEasyCreditController;