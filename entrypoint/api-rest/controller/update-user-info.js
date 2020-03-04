const {
    ErrorObject,
    UpdateUserInfoApplication
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
    [ErrorObject.NotFoundUserWithUserId]: HttpCode.NOT_FOUND,
    [ErrorObject.PositionInvalid]: HttpCode.BAD_REQUEST,
    [ErrorObject.EmailInvalid]: HttpCode.BAD_REQUEST,
    [ErrorObject.PhoneNuberInvalid]: HttpCode.BAD_REQUEST,
    [ErrorObject.NoIDMustBeNumber]:HttpCode.BAD_REQUEST,
    [ErrorObject.NotPermissionWithManagerId]:HttpCode.BAD_REQUEST

};

const updateUserInfoController = async (req, res) => {
    try {
        const intersect = new UpdateUserInfoApplication({
            infra: {
                db: dataGateway()
            }
        });
        const userId = req.params.userId
        const body = req.body
        await intersect.execute(userId, {
            ID: body.ID,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            address: body.address,
            codeDurationTime: body.codeDurationTime,
            managerId: body.managerId,
            phoneNumber: body.phoneNumber,
            position: body.position
        });
        res.type("json");
        return res.status(200).send();
    } catch (error) {
        const errorMap = ErrorMap(
            error,
            errorMapping,
            "Internal error when update user info"
        );
        console.log(error)
        return res.status(errorMap.status).send({
            message: error.message
        });
    }
};

module.exports.updateUserInfoController = updateUserInfoController;