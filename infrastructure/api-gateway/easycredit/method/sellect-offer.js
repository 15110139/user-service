async function selectOffer(selectOfferData) {
    const {
        requestId,
        partnerCode,
        proposalId,
        offerId,
        offerAmount,
        offerInterestRate,
        offerTenor,
        offerInsuranceType,
        offerInsuranceAmount
    } = selectOfferData
    try {
        await this.updateApiKey()
        return await this.api.post('/loanServices/v1/selectOffer', {
            request_id: requestId,
            partner_code: partnerCode,
            proposal_id: proposalId,
            offer_id: offerId,
            offer_amount: offerAmount,
            offer_interest_rate: offerInterestRate,
            offer_tenor: offerTenor,
            offer_insurance_type: offerInsuranceType,
            offer_insurance_amount: offerInsuranceAmount
        })
    } catch (error) {
        throw error
    }
}

module.exports.selectOffer = selectOffer