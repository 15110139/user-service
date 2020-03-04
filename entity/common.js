const shortId = require("shortid")
const validator = require('validator');
const bcrypt = require('bcrypt');

class CommonEntity {
    /**
     * 
     * @param {Number} number
     * @returns {Boolean} If string need check is number return true else false 
     */
    checkNumber(number) {
        return validator.isNumeric(number)
    }

    /**
     * @returns {String} A string random
     */
    generateCode() {
        return shortId.generate()
    }

    /**
     * 
     * @param {String} email
     * @returns {Boolean} If valid email, return true else return false 
     */
    checkValidEmail(email) {
        return validator.isEmail(email)
    }



    /**
     * 
     * @param {String} phoneNumber 
     * @returns {Boolean} If phone number vaild, return true else return false
     */

    checkValidPhoneNumber(phoneNumber) {
        return validator.isMobilePhone(phoneNumber, 'vi-VN')
    }
}

module.exports.CommonEntity = CommonEntity