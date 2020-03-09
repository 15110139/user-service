const {
  MongodbDataGateway,
  InitConnectionMongodb
} = require("./data-gateway/mongodb");

const { GrpcClientService } = require("./client-grpc");

const configMongodb = {
  host: process.env.MONGODB_HOST || "localhost",
  port: process.env.MONGODB_PORT || 27017,
  dbName: process.env.MONGODB_DB_NAME || "user-service"
};

const configClientGRPC = {
  grpcServerHostOrderService: process.env.GRPC_SERVER_HOST_ORDER_SERVICE,
  zookeeperHost: process.env.ZOOKEEPER_HOST || "0.0.0.0:2181"
};

async function initConectionDB() {
  return await InitConnectionMongodb(
    configMongodb.host,
    configMongodb.port,
    configMongodb.dbName
  );
}

initConectionDB();

let grpcClientIntance;

function grpcClient() {
  if (!grpcClientIntance) {
    grpcClientIntance = new GrpcClientService(configClientGRPC);
    return grpcClientIntance;
  }
  return grpcClientIntance
}

function dataGateway() {
  return new MongodbDataGateway();
}

module.exports = {
  dataGateway,
  initConectionDB,
  grpcClient
};
