const {
    ErrorCustom
} = require('../common/error-custom')
const {
    ErrorObject
} = require('../common/error-object')


const {
    UserEntity
} = require('../../entity/user')



class GetUserApplication {
    /**
     * 
     * @param {Object} options
     * @param {Object} options.infra 
     * @param {Object} infra.db 
     */
    constructor(options) {
        this.db = options.infra.db
        this.userEntity = new UserEntity()
    }

    /**
     * 
     * @param {String} userId 
     */
    async execute(userId) {

        if(!userId){
            throw new ErrorCustom(ErrorObject.RequiredUserId, "User id is required")
        }

        const user = await this.db.userRepo.getUser(userId)

        if (!user) {
            throw new ErrorCustom(ErrorObject.NotFoundUserWithUserId, "Not found user with user id")
        }
        const userObject = this.userEntity.getUserObject(user)
        return userObject
    }
}

module.exports.GetUserApplication = GetUserApplication