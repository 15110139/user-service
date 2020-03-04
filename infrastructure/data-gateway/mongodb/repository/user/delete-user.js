const {
    UserModel
} = require('../../model/user')
/**
 * 
 * @param {String} userId 
 */
async function deleteUser(userId) {
    return await UserModel.update({
        _id: userId
    }, {
        isDelete: true
    })
}

module.exports.deleteUser = deleteUser