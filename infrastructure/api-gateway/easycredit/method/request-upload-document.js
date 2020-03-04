/**
 * 
 * @typedef {Object} Document
 * @property {String} docType
 * @property {String} docName
 */

/**
 * @typedef {Object} DocBundle
 * @property {String} bundleId
 * @property {Array.<Document>} listDocument
 */

/**
 * @param {Object} uploadDocumentData
 * @param {String} uploadDocumentData.requestId
 * @param {String} uploadDocumentData.partnerCode
 * @param {String} uploadDocumentData.proposalId
 * @param {String} uploadDocumentData.contractNumber
 * @property {Array.<DocBundle>} updateApiKey
 */
async function requestUploadDocument(uploadDocumentData) {
    const {
        requestId,
        partnerCode,
        proposalId,
        contractNumber,
        docBundle
    } = uploadDocumentData
    try {
        // cover data follow camelcase
        const mapDocBundle = docBundle.map(el => {
            return {
                bundle_id: el.bundleId,
                list_document: el.listDocument.map(el => {
                    return {
                        doc_type: el.docType,
                        doc_name: el.docName
                    }
                })
            }
        })
        await this.updateApiKey()
        return await this.api.post('/loanServices/v1/uploadDocument', {
            request_id: requestId,
            partner_code: partnerCode,
            proposal_id: proposalId,
            contract_number: contractNumber,
            doc_bundle: mapDocBundle
        })
    } catch (error) {
        throw error
    }
}

module.exports.requestUploadDocument = requestUploadDocument