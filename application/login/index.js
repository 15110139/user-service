const {
    CommonEntity,UserEntity
} = require('../../entity')
const {
    ErrorCustom
} = require('../common/error-custom')
const {
    ErrorObject
} = require('../common/error-object')



class LoginApplication {
    /**
     * 
     * @param {Object} options
     * @param {Object} options.infra 
     * @param {Object} infra.db 
     */
    constructor(options) {
        this.db = options.infra.db
        this.commonEntity = new CommonEntity()
        this.userEntity = new UserEntity()
    }
    /**
     * 
     * @param {String} username 
     * @param {String} password 
     */
    async execute(username, password) {

        if (!username) {
            throw new ErrorCustom(ErrorObject.RequiredUserName, "Username is required")
        }

        if (!password) {
            throw new ErrorCustom(ErrorObject.RequiredPassword, "Password is required")
        }

        if(!this.userEntity.checkValidPassword(password)){
            throw new ErrorCustom(ErrorObject.PasswordInvalid, "Password is invalid")
        }

        const user = await this.db.userRepo.getUserByUserName(username)

        if (!user) {
            throw new ErrorCustom(ErrorObject.NotFoundUserWithUserName, "Not found user with Username")
        }

        if (!this.userEntity.comparePassword(password, user.password)) {
            throw new ErrorCustom(ErrorObject.IncorrectPassword, "Inconrrect password")
        }

        const token = this.userEntity.generateJWT({userId:user._id})
        const profile = this.userEntity.getProfileUser(user)
        return {
            token,
            profile
        }

    }

}

module.exports.LoginApplication = LoginApplication