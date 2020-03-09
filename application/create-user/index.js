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



class CreateUserApplication {
    /**
     * 
     * @param {Object} options
     * @param {Object} options.infra 
     * @param {Object} infra.db 
     */
    constructor(options) {
        this.db = options.infra.db
        this.clientGRPC = options.infra.clientGRPC
        this.userEntity = new UserEntity()
        this.commonEntity = new CommonEntity()
    }

    /**
     * 
     * @param {Object} userData
     * @param {Number} userData.ID
     * @param {String} userData.firstName
     * @param {String} userData.lastName
     * @param {String} userData.username
     * @param {Stirng} userData.password
     * @param {String} userData.address
     * @param {String} userData.email
     * @param {String} userData.phoneNumber
     * @param {String} userData.managerId
     * @param {String} userData.position
     * @param {String} useData.amount
     */
    async execute(userData) {
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            phoneNumber,
        } = userData


        if (!username) {
            throw new ErrorCustom(ErrorObject.RequiredUserName, "Username is required")
        }

        if (!password) {
            throw new ErrorCustom(ErrorObject.RequiredPassword, "Password is required")
        }

        if (!firstName) {
            throw new ErrorCustom(ErrorObject.RequireFirstName, "First name is required")
        }

        if (!lastName) {
            throw new ErrorCustom(ErrorObject.RequiredLastName, "Last name is required")
        }

        if (!email) {
            throw new ErrorCustom(ErrorObject.RequiredEmail, "Email is requireds")
        }

        if (!phoneNumber) {
            throw new ErrorCustom(ErrorObject.RequiredPhoneNumber, "Phone number is required")
        }

        if (!this.commonEntity.checkValidPhoneNumber(phoneNumber)) {
            throw new ErrorCustom(ErrorObject.PhoneNuberInvalid, "Phone number is invalid")
        }

        if (!this.commonEntity.checkValidEmail(email)) {
            throw new ErrorCustom(ErrorObject.EmailInvalid, "Email is invalid")
        }

        if (!this.userEntity.checkValidPassword(password)) {
            throw new ErrorCustom(ErrorObject.PasswordInvalid, "Password is invalid")
        }
        // const userByUserName = await this.db.userRepo.getUserByUserName(username)

        // if (userByUserName) {
        //     throw new ErrorCustom(ErrorObject.ExistUserWithUserNameInSystem, "Exist user with username in system")
        // }

        const code = this.commonEntity.generateCode()
        const fullName = this.userEntity.generateFullName(firstName, lastName)
        const passwordHash = this.userEntity.hashPassword(password)

        const user = await this.db.userRepo.createUser({
            username,
            password: passwordHash,
            fullName,
            firstName,
            lastName,
            email,
            phoneNumber,
            code,
        })
        const userObject = this.userEntity.getUserObject(user)

        try {
            const order = await this.clientGRPC.createOrder({
                userId: "1f8a206f-7085-43f4-8182-112461fcd3c4",
                productId: "cbe2b442-a298-41d7-b018-376960e44ada",
                amount:amount
            })
            console.log("Data order return", order)
        } catch (error) {
            throw new ErrorCustom(ErrorObject.HaveErrorWhenCreateOrderMethodOnOrderService, error.details || "Have error when call CreatOrder method on Order Service",error)
        }

        return userObject
    }
}

module.exports.CreateUserApplication = CreateUserApplication