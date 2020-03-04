const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const LoanRequest = mongoose.Schema({
    requestId: {
        type: String
    },
    customerName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    identityCardId: {
        type: String
    },
    issueDate: {
        type: String
    },
    issuePlace: {
        type: String
    },
    temProvince: {
        type: String
    },
    gender: {
        type: String
    },
    employmentType: {
        type: String
    },
    productType: {
        type: String
    },
    email: {
        type: String
    },
    otpCode: {
        type: String
    },
    dsaAgentCode: {
        type: String
    },
    imageSelfie: {
        type: String
    },
    imageIdCard: {
        type: String
    },
    proposalId: {
        type: String
    },
    partnerCode: {
        type: String
    },
    loanAmount: {
        type: Number
    },
    loanTenor: {
        type: Number
    },
    installmentAmount: {
        type: Number
    },
    temProvince: {
        type: String
    },
    temDistrict: {
        type: String
    },
    temWard: {
        type: String
    },
    temAddress: {
        type: String
    },
    permanentProvince: {
        type: String
    },
    permanentDistrict: {
        type: String
    },
    permanentWard: {
        type: String
    },
    permanentAddress: {
        type: String
    },
    occupation: {
        type: String
    },
    methodIncome: {
        type: String
    },
    frequencyIncome: {
        type: String
    },
    dateIncome: {
        type: Number
    },
    monthlyIncome: {
        type: Number
    },

    otherIncome: {
        type: Number
    },
    totalMonthlyExpenses: {
        type: Number
    },
    jobTitle: {
        type: String
    },
    companyName: {
        type: String
    },
    workingProvince: {
        type: String
    },
    workingDistrict: {
        type: String
    },
    workingWard: {
        type: String
    },
    workingAddress: {
        type: String
    },
    companyPhone: {
        type: String
    },
    marriedStatus: {
        type: String
    },
    houseType: {
        type: String
    },
    numberDependents: {
        type: Number
    },
    yearOfStay: {
        type: Number
    },
    loanPurpose: {
        type: String
    },
    disbursementMethod: {
        type: String
    },
    addressReceivingLetter: {
        type: String
    },
    relation2: {
        type: String
    },
    relation1Name: {
        type: String
    },
    relation1PhoneNumber: {
        type: String
    },
    relation2: {
        type: String
    },
    relation2Name: {
        type: String
    },
    relation2PhoneNumber: {
        type: String
    },
    typeContract: {
        type: String
    },
    fromDate: {
        type: String
    },
    toDate: {
        type: String
    },
    otherHouseType: {
        type: String
    },
    bankCode: {
        type: String
    },
    bankName: {
        type: String
    },
    branchCode: {
        type: String
    },
    branchName: {
        type: String
    },
    bankProvince: {
        type: String
    },
    accountNumber: {
        type: String
    },
    bankCustomerName: {
        type: String
    },
    otherContact: {
        type: String
    },
    detailContact: {
        type: String
    },
    isDelete: {
        type: Boolean,
        defaut: false
    },
    status: {
        type: String,
        defaut: "WAITTING"
    },
    sendTo: {
        type: String,
        defaut:null
    }
}, {
    timestamps: true
})

LoanRequest.plugin(mongoosePaginate)
const LoanRequestModel = mongoose.model('loan-request', LoanRequest)
module.exports.LoanRequestModel = LoanRequestModel