const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const User = mongoose.Schema({
    ID: {
        type: String
    },
    username: {
        type: String,
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    code: {
        type: String
    },
    managerId: {
        type: String
    },
    position: {
        type: String,
        default: "Telesales"
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    codeDurationTime: {
        type: String
    }
}, {
    timestamps: true
})
User.plugin(mongoosePaginate)
const UserModel = mongoose.model('users', User)
module.exports.UserModel = UserModel