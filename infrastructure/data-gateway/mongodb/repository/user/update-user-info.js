const {
    UserModel
} = require('../../model/user')
/**
 * 
 * @param {Object} user 
 * @param {String} userId
 */
async function updateUserInfo(userId, user) {
    return await UserModel.updateOne({
        _id: userId
    }, {
        ...user
    })
}
module.exports.updateUserInfo = updateUserInfo