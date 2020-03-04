const {
    UserModel
} = require('../../model/user')
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 */
async function listUser(page, limit) {
    return await UserModel.paginate({
        isDelete: false
    }, {
        page,
        limit
    })
}
module.exports.listUser = listUser