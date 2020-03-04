async function fullLoanRequest(fullDataRequest) {
    const { requestId,partnerCode,workingAddress,addressReceivingLetter,detailContact,numberDependents,companyPhone,otherHouseType,proposalId,jobTitle,loanAmount,loanTenor,permanentAddress,methodIncome,bankCode,relation1,relation1PhoneNumber,relation1Name,relation2,relation2PhoneNumber,relation2Name,bankCustomerName,bankName,otherContact,accountNumber,branchName,bankProvince,occupation,disbursementMethod,loanPurpose,yearOfStay,totalMonthlyExpenses,marriedStatus,houseType,workingDistrict,workingWard,companyName,workingProvince,typeContract,monthlyIncome,dateIncome,frequencyIncome,fromDate,toDate ,installmentAmount,temProvince,temDistrict,temWard,temAddress,permanentProvince,permanentDistrict,permanentWard} = fullDataRequest
    try {
        await this.updateApiKey()
        return await this.api().post('/loanServices/v1/fullLoanRequest',{
            request_id:requestId,
            partner_code:partnerCode,
            proposal_id:proposalId,
            loan_amount:loanAmount,
            loan_tenor:loanTenor,
            installment_amount:installmentAmount,
            tem_province:temProvince,
            tem_district:temDistrict,
            tem_ward:temWard,
            tem_address:temAddress,
            permanent_province:permanentProvince,
            permanent_district:permanentDistrict,
            permanent_ward:permanentWard,
            permanent_address:permanentAddress,
            occupation:occupation,
            type_contract:typeContract,
            from_date:fromDate,
            to_date:toDate,
            method_income:methodIncome,
            frequency_income:frequencyIncome,
            date_income:dateIncome,
            monthly_income:monthlyIncome,
            total_monthly_expenses:totalMonthlyExpenses,
            job_title:jobTitle,
            company_name:companyName,
            working_province:workingProvince,
            working_district:workingDistrict,
            working_ward:workingWard,
            working_address:workingAddress,
            company_phone:companyPhone,
            married_status:marriedStatus,
            house_type:houseType,
            other_house_type:otherHouseType,
            number_dependents:numberDependents,
            year_of_stay:yearOfStay,
            loan_purpose:loanPurpose,
            disbursement_method:disbursementMethod,
            bank_code:bankCode,
            bank_name:bankName,
            branch_name:branchName,
            bank_province:bankProvince,
            account_number:accountNumber,
            bank_customer_name:bankCustomerName,
            other_contact:otherContact,
            detail_contact:detailContact,
            address_receiving_letter:addressReceivingLetter,
            relation_1:relation1,
            relation_1_name:relation1Name,
            relation_1_phone_number:relation1PhoneNumber,
            relation_2:relation2,
            relation_2_name:relation2Name,
            relation_2_phone_number:relation2PhoneNumber
        })
    } catch (error) {
        throw error
    }
}

module.exports.fullLoanRequest = fullLoanRequest


