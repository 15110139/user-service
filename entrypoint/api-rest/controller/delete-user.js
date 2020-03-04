const {
    ErrorObject,
    DeletetUserApplication
} = require("../../../application");
const {
    ErrorMap
} = require('./common/error-map')
const {
    dataGateway
} = require("../../../infrastructure");
const HttpCode = require("http-status-codes");
const errorMapping = {
    [ErrorObject.RequiredUserId]: HttpCode.BAD_REQUEST,
    [ErrorObject.NotFoundUserWithUserId]: HttpCode.NOT_FOUND
};

const deleteUserController = async (req, res) => {
    try {
        const intersect = new DeletetUserApplication({
            infra: {
                db: dataGateway()
            }
        });
        const userId = req.params.userId
        await intersect.execute(userId);
        res.type("json");
        return res.status(200).send();
    } catch (error) {
        const errorMap = ErrorMap(
            error,
            errorMapping,
            "Internal error when delete user"
        );
        console.log(error)
        return res.status(errorMap.status).send({
            message: error.message
        });
    }
};

module.exports.deleteUserController = deleteUserController;