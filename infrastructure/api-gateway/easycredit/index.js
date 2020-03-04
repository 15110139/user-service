const axios = require('axios')
const https = require('https')
const request = require("request");
const {
    getOpt
} = require('./method/get-opt')
const {
    requestUploadDocument
} = require('./method/request-upload-document')
const {
    selectOffer
} = require('./method/sellect-offer')
const {
    fullLoanRequest
} = require('./method/full-loan-request')

const {
    loanRequest
} = require('./method/loan-request')
class ApiEasyCredit {
    /**
     * 
     * @param {String} url 
     */
    constructor({
        url,
        clientId,
        clientSecret,
        urlAuth
    }) {
        this.url = url
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.urlAuth = urlAuth
        this.currentToken = {
            apiKey: null,
            expiresIn: null,
            scope: null,
        }

    }
    async getApiKey() {
        await this.getObjectToken(this.clientId, this.clientSecret, this.urlAuth)
    }
    setCurrentToken(accessToken, tokenType, expiresIn, scope) {
        this.currentToken.apiKey = `Bearer ${accessToken}`
        this.currentToken.expiresIn = Date.now() + expiresIn * 1000
        this.currentToken.scope = scope
        console.log(this.currentToken)
    }

    async getObjectToken(clientId, clientSecret, url) {
        try {
            let buff = new Buffer(`${clientId}:${clientSecret}`);
            let base64data = buff.toString('base64');
            const options = {
                method: 'POST',
                rejectUnauthorized: false,
                url,
                headers: {
                    authorization: 'Basic ' + base64data
                }
            };
            const call = new Promise((resolve, reject) => {
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);

                    return resolve(JSON.parse(body));
                });
            })
            const data = await call
            this.setCurrentToken(data.access_token, data.token_type, data.expires_in, data.scope)
        } catch (error) {

            throw error
        }
    }
    api() {
        return axios.create({
            baseURL: this.url,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: this.currentToken.apiKey
            }
        })
    }

    async updateApiKey() {
        if (!this.currentToken.apiKey || Number(this.currentToken.expireTime) - 500 <= Date.now()) {
            await this.getApiKey()
        }
    }

}

ApiEasyCredit.prototype.requestUploadDocument = requestUploadDocument
ApiEasyCredit.prototype.getOpt = getOpt
ApiEasyCredit.prototype.selectOffer = selectOffer
ApiEasyCredit.prototype.fullLoanRequest = fullLoanRequest
ApiEasyCredit.prototype.loanRequest = loanRequest


module.exports.ApiEasyCredit = ApiEasyCredit