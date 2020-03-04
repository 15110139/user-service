const { UserModel } = require("../../model/user");
/**
 *
 * @param {String} userId
 */
async function getUser(userId) {
  return await UserModel.findOne({
    _id: userId,
    isDelete: false
  });
}
module.exports.getUser = getUser;
