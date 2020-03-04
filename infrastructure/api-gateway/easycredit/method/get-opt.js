/**
 * 
 * @typedef {Object} Message 
 * @property {String} smsId
 * @property {String} phoneNumber
 */

/**
 * 
 * @param {String} partner_code 
 * @param {Array.<Message>} messsage 
 */
async function getOpt(partnerCode, messsage) {
    try {
        const coverMessage = messsage.map(el => {
            return {
                sms_id: el.smsId,
                phone_number: el.phoneNumber
            }
        })

        await this.updateApiKey()
        const data = await this.api.post('/smsServices/v1/sendMessages', {
            partner_code: partnerCode,
            messsage: coverMessage
        })
        if (data.status !== 200) {
            throw data.body
        } else {
            return data.body
        }
    } catch (error) {
        throw error
    }
}

module.exports.getOpt = getOpt