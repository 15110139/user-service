const {
  CreateUserApplication,
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
  [ErrorObject.RequiredFirstName]: HttpCode.BAD_REQUEST,
  [ErrorObject.ExistUserWithIDInSystem]: HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredAddress]: HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredPosition]: HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredTimeDurationCode]: HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredLastName]: HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredPhoneNumber]: HttpCode.BAD_REQUEST,
  [ErrorObject.EmailInvalid]: HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredEmail]: HttpCode.BAD_REQUEST,
  [ErrorObject.PositionInvalid]:HttpCode.BAD_REQUEST,
  [ErrorObject.PhoneNuberInvalid]:HttpCode.BAD_REQUEST,
  [ErrorObject.NoIDMustBeNumber]:HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredID]:HttpCode.BAD_REQUEST,
  [ErrorObject.PasswordInvalid]:HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredPassword]:HttpCode.BAD_REQUEST,
  [ErrorObject.RequiredUserName]:HttpCode.BAD_REQUEST,
  [ErrorObject.ExistUserWithUserNameInSystem]:HttpCode.BAD_REQUEST
};

const createUserController = async (req, res) => {
  try {
    const intersect = new CreateUserApplication({
      infra: {
        db: dataGateway()
      }
    });
    const body = req.body;
    const rs = await intersect.execute({
      ID: body.ID,
      username:body.username,
      password:body.password,
      address: body.address,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      managerId: body.managerId,
      position: body.position,
      codeDurationTime: body.codeDurationTime
    });
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

module.exports.createUserController = createUserController;