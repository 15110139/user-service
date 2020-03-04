const {
    UserModel
} = require("../../model/user");
async function getUserByUserName(username) {
    return await UserModel.findOne({
        username,
        isDelete: false
    });
}
module.exports.getUserByUserName = getUserByUserName