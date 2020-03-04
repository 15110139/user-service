async function loanRequest(loanRequestData) {
    const {
        requestId,
        customerName,
        phoneNumber,
        partnerCode,
        dateOfBirth,
        identityCardId,
        issueDate,
        issuePlace,
        temProvince,
        gender,
        employmentType,
        productType,
        loanAmount,
        loanTenor,
        email,
        otpCode,
        dsaAgentCode,
        imageSelfie,
        imageIdCard,
        saleChannel
    } = loanRequestData
    try {
        console.log(this.currentToken.apiKey)
        await this.updateApiKey()
        return await this.api().post('/loanServices/v1/loanRequest', {
            request_id: requestId,
            customer_name: customerName,
            phone_number: phoneNumber,
            partner_code: partnerCode,
            date_of_birth: dateOfBirth,
            identity_card_id: identityCardId,
            issue_date: issueDate,
            issue_place: issuePlace,
            tem_province: temProvince,
            gender,
            email,
            employment_type: employmentType,
            product_type: productType,
            loan_amount: loanAmount,
            loan_tenor: loanTenor,
            otp_code: otpCode,
            sale_channel: saleChannel,
            dsa_agent_code: dsaAgentCode,
            image_selfie: imageSelfie,
            image_id_card: imageIdCard,
        })
    } catch (error) {
        throw error
    }
}

module.exports.loanRequest = loanRequest