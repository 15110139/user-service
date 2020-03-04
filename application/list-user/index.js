const {
    CommonEntity
} = require('../../entity')
const {
    ErrorCustom
} = require('../common/error-custom')
const {
    ErrorObject
} = require('../common/error-object')



class ListUserApplication {
    /**
     * 
     * @param {Object} options
     * @param {Object} options.infra 
     * @param {Object} infra.db 
     */
    constructor(options) {
        this.db = options.infra.db
        this.commonEntity = new CommonEntity()
    }
    /**
     * 
     * @param {String} page 
     * @param {String} limit 
     */
    async execute(page = '1', limit = '10') {

        if (!this.commonEntity.checkNumber(page)) {
            throw new ErrorCustom(ErrorObject.PageMustBeNumber, "Page must be number")
        }

        if (!this.commonEntity.checkNumber(limit)) {
            throw new ErrorCustom(ErrorObject.LimitMustBeNumber, "Limit must be number")
        }

        const limitNumber = parseInt(limit)
        const pageNumber = parseInt(page)
        if (limitNumber <= 0 || limitNumber > 50) {
            throw new ErrorCustom(ErrorObject.LimitInvalid, "Limit invalid")
        }

        if (pageNumber <= 0) {
            throw new ErrorCustom(ErrorObject.PageInvalid, "Page invalid")
        }

        const rs = await this.db.userRepo.listUser(pageNumber, limitNumber)

        return rs

    }

}

module.exports.ListUserApplication = ListUserApplication