const {ApiEasyCredit} = require('./easycredit/index')
class ApiGateway{
    /**
     * 
     * @param {Object} options
     * @param {Object} options.easyCredit
     * @param {String} options.easyCredit.url
     */
    constructor(options){
        this.easyCredit = new ApiEasyCredit(options.easyCredit)
    }
}

module.exports.ApiGateway = ApiGateway