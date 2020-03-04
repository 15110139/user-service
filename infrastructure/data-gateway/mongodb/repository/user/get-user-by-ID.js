const {
    UserModel
} = require("../../model/user");
/**
 *
 * @param {String} ID
 * @returns {(Object|null)} return a user object when find or null when not find by ID 
 */
async function getUserByID(ID) {
    return await UserModel.findOne({
        ID,
        isDelete: false
    });
}
module.exports.getUserByID = getUserByID;