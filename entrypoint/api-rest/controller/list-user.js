const {
    ListUserApplication,
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
    [ErrorObject.PageMustBeNumber]: HttpCode.BAD_REQUEST,
    [ErrorObject.LimitMustBeNumber]: HttpCode.BAD_REQUEST
};

const listUserController = async (req, res) => {
    try {
        const intersect = new ListUserApplication({
            infra: {
                db: dataGateway()
            }
        });
        const {
            limit,
            page
        } = req.query
        const rs = await intersect.execute(page, limit);
        res.type("json");
        return res.status(200).send(rs);
    } catch (error) {
        const errorMap = ErrorMap(
            error,
            errorMapping,
            "Internal error when get list user"
        );
        console.log(error)
        return res.status(errorMap.status).send({
            message: error.message
        });
    }
};

module.exports.listUserController = listUserController;