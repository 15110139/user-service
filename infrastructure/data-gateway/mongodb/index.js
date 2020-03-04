const {
    UserRepository
} = require('./repository/user')

const {
    InitConnectionMongodb
} = require('./connection')
class MongodbDataGateway {
    constructor() {
        this.userRepo = new UserRepository()
    }
}
module.exports.MongodbDataGateway = MongodbDataGateway
module.exports.InitConnectionMongodb =  InitConnectionMongodb