const { UserModel } = require("../../model/user");
async function createUser(user) {
  return await UserModel.create(user);
}

module.exports.createUser = createUser;
