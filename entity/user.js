const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
class UserEntity {
    constructor() {
        this.listPosition = ["DSA", "Telesales", "Outlet"]
    }

    /**
     * 
     * @param {String} firstName 
     * @param {String} lastName 
     * @returns {String} A string is firstName + lastName
     */
    generateFullName(firstName, lastName) {
        return firstName.trim() + ' ' + lastName.trim()
    }

    /**
     * 
     * @param {String} password 
     * @returns {Boolean} if password valid with condition return true else false
     */
    checkValidPassword(password) {
        return password.length >= 6 ? true : false
    }

    /**
     * 
     * @param {String} position 
     * @returns {Boolean} If postion have in system, return true else return false
     */
    checkValidPosition(position) {
        const index = this.listPosition.indexOf(position)
        return index !== -1 ? true : false
    }

    /**
     * 
     * @param {String} planTextPassword 
     * @param {String} hashPassword 
     * @returns {Boolean} If compare ok return true else false 
     */
    comparePassword(planTextPassword, hashPassword) {
        return bcrypt.compareSync(planTextPassword, hashPassword)
    }

    generateJWT(data) {
        return jwt.sign(data, process.env.SECERT_JWT || "SECERT_JWT", {
            expiresIn: 60 * 60
        });
    }

    /**
     * 
     * @param {String} planTextPassword 
     * @returns {String} Is string password after crypt 
     */
    hashPassword(planTextPassword) {
        return bcrypt.hashSync(planTextPassword, 10)
    }

    getUserObject(data) {
        return data ? {
            _id: data._id,
            username: data.username,
            firstName: data.firstName,
            password:data.password,
            lastName: data.lastName,
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            code: data.code,
        } : null
    }

    getProfileUser(data) {
        return {
            _id: data._id,
            ID: data.ID,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            position: data.position,
            codeDurationTime: data.codeDurationTime,
        }
    }
}

module.exports.UserEntity = UserEntity