const {
    ErrorCustom
} = require('../common/error-custom')
const {
    ErrorObject
} = require('../common/error-object')


const {
    UserEntity,
    CommonEntity
} = require('../../entity')



class UpdateUserInfoApplication {
    /**
     * 
     * @param {Object} options
     * @param {Object} options.infra 
     * @param {Object} infra.db 
     */
    constructor(options) {
        this.db = options.infra.db
        this.userEntity = new UserEntity()
        this.commonEntity = new CommonEntity()
    }

    /**
     * 
     * @param {String} userId 
     * @param {Object} dataUpdate
     * @param {Number} dataUpdate.ID
     * @param {String} dataUpdate.firstName
     * @param {String} dataUpdate.lastName
     * @param {String} dataUpdate.email
     * @param {String} dataUpdate.address
     * @param {String} dataUpdate.phoneNumber
     * @param {String} dataUpdate.managerId
     * @param {String} dataUpdate.position
     * @param {String} dataUpdate.codeDurationTime
     */
    async execute(userId, dataUpdate) {
        const {
            ID,
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            managerId,
            position,
            codeDurationTime
        } = dataUpdate
        const userData = {

        }
        if (!userId || userId === '') {
            throw new ErrorCustom(ErrorObject.RequiredUserId, "User id is required")
        }
        const user = await this.db.userRepo.getUser(userId)

        if (!user) {
            throw new ErrorCustom(ErrorObject.NotFoundUserWithUserId, "Not found user with user id")
        }

        if (ID) {
            if (!this.commonEntity.checkNumber(ID)) {
                throw new ErrorCustom(ErrorObject.NoIDMustBeNumber, "No ID must be numer")
            }
            userData.ID = ID
        }

        if (firstName) {
            userData.firstName = firstName
        }

        if (lastName) {
            userData.lastName = lastName
        }

        if (email) {
            if (!this.commonEntity.checkValidEmail(email)) {
                throw new ErrorCustom(ErrorObject.EmailInvalid, "Email is invalid")
            }
            userData.email = email
        }

        if (address) {
            userData.address = address
        }



        if (phoneNumber) {
            if (!this.commonEntity.checkValidPhoneNumber(phoneNumber)) {
                throw new ErrorCustom(ErrorObject.PhoneNuberInvalid, "Phone number is invalid")
            }
            userData.phoneNumber = phoneNumber
        }

        if (position) {
            if (!this.userEntity.checkValidPosition(position)) {
                throw new ErrorCustom(ErrorObject.PositionInvalid, "Position is invalid")
            }
            userData.position = position
        }

        if (managerId) {
            const manager = await this.db.getUser(managerId)
            if (!manager) {
                throw new ErrorCustom(ErrorObject.NotFoundUserWithUserId, "Not found manager with mamager id")
            }
            if (manager.position === "Telesales") {
                throw new ErrorObject(ErrorObject.NotPermissionWithManagerId, "Not permission with manager id")
            }
            userData.managerId = managerId
        }

        if (codeDurationTime) {
            userData.codeDurationTime = codeDurationTime
        }


        if (firstName && lastName) {
            const fullName = this.userEntity.generateFullName(firstName, lastName)
            userData.fullName = fullName
        } else {
            if (firstName) {
                const fullName = this.userEntity.generateFullName(firstName, user.lastName)
                userData.fullName = fullName
            }
            if (lastName) {
                const fullName = this.userEntity.generateFullName(user.firstName, lastName)
                userData.fullName = fullName
            }

        }

        await this.db.userRepo.updateUserInfo(userId, userData)

    }
}

module.exports.UpdateUserInfoApplication = UpdateUserInfoApplication