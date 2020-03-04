const grpc = require('grpc')
const {
    CreateUserApplication,
    ErrorObject
} = require('../../../../../application')
const {
    dataGateway,
    grpcClient
} = require('../../../../../infrastructure')
const {
    ErrorMap
} = require('../../../common/error-map')
const errorMapping = {
    [ErrorObject.RequiredFirstName]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.ExistUserWithIDInSystem]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredAddress]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredPosition]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredTimeDurationCode]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredLastName]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredPhoneNumber]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.EmailInvalid]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredEmail]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.PositionInvalid]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.PhoneNuberInvalid]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.NoIDMustBeNumber]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredID]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.PasswordInvalid]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredPassword]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.RequiredUserName]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.ExistUserWithUserNameInSystem]: grpc.status.INVALID_ARGUMENT,
    [ErrorObject.HaveErrorWhenCreateOrderMethodOnOrderService]: grpc.status.INVALID_ARGUMENT
}
const createUserHandller = async (call, callback) => {
    try {
        const body = call.request
        const intersect = new CreateUserApplication({
            infra: {
                db: dataGateway(),
                clientGRPC: grpcClient()
            }
        })
        const rs = await intersect.execute({
            ID: body.ID,
            username: body.username,
            password: body.password,
            address: body.address,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            managerId: body.managerId,
            position: body.position,
        });
        console.log(rs)
        return callback(null, rs)
    } catch (error) {
        console.log(error)
        console.log(ErrorMap(error, errorMapping, "Internal server when create user"))
        return callback(ErrorMap(error, errorMapping, "Internal server when create user"), null)

    }
}

module.exports.createUserHandller = createUserHandller