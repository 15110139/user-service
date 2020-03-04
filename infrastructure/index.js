const {
    MongodbDataGateway,
    InitConnectionMongodb
} = require('./data-gateway/mongodb')


const {
  GrpcClientService
} = require('./client-grpc')

const configMongodb = {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    dbName: process.env.MONGODB_DB_NAME || 'user-service'
}




const configClientGRPC = {
    grpcServerHostOrderService:process.env.GRPC_SERVER_HOST_ORDER_SERVICE || `0.0.0.0:53001`
}


async function initConectionDB() {
    return await InitConnectionMongodb(configMongodb.host, configMongodb.port, configMongodb.dbName)
}

initConectionDB()



function grpcClient(){
    return new GrpcClientService(configClientGRPC)
}

function dataGateway() {
    return new MongodbDataGateway()
}

module.exports = {
    dataGateway,
    initConectionDB,
    grpcClient
}
