const {
    GetUserApplication,
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
    [ErrorObject.NotFoundUserWithUserId]: HttpCode.NOT_FOUND,
    [ErrorObject.RequiredUserId]:HttpCode.BAD_REQUEST
  };
  
  const getUserController = async (req, res) => {
    try {
      const intersect = new GetUserApplication({
        infra: {
          db: dataGateway()
        }
      });
      const userId = req.params.userId
      const rs = await intersect.execute(userId);
      res.type("json");
      return res.status(200).send(rs);
    } catch (error) {
      const errorMap = ErrorMap(
        error,
        errorMapping,
        "Internal error when get user"
      );
      console.log(error)
      return res.status(errorMap.status).send({
        message: error.message
      });
    }
  };
  
  module.exports.getUserController = getUserController;