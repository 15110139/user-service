const path = require("path");

const { createUserHandller } = require("./handler/create-user-handller");
const { loadProto } = require("../../common/load-proto");

const protoFile = path.join(__dirname,  "../../../../", "protobuf/user.proto");
const proto = loadProto(protoFile);
const service  = proto.user_service.UserService.service;

module.exports.userService = {
  service,
  handlers: {
    CreateUser: createUserHandller,
  },
};
