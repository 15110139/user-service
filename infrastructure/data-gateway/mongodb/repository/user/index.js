const { createUser } = require("./create-user");
const { getUser } = require("./get-user");
const { updateUserInfo } = require('./update-user-info')
const { deleteUser } = require('./delete-user')
const { listUser } = require('./list-user')
const { getUserByID } = require('./get-user-by-ID')
const { getUserByUserName } = require('./get-user-by-username')
class UserRepository {
  constructor() {}
}

UserRepository.prototype.createUser = createUser;
UserRepository.prototype.getUser = getUser
UserRepository.prototype.updateUserInfo = updateUserInfo
UserRepository.prototype.listUser = listUser
UserRepository.prototype.deleteUser = deleteUser
UserRepository.prototype.getUserByID = getUserByID
UserRepository.prototype.getUserByUserName = getUserByUserName

module.exports.UserRepository = UserRepository;
