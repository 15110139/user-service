const grpc = require("grpc");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");

const protoFilePath = path.join(__dirname, "../../../", "protobuf/order.proto");
const packageDefinition = protoLoader.loadSync(protoFilePath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
});

const OrderProtoDescriptor = grpc.loadPackageDefinition(packageDefinition);

module.exports.OrderService = OrderProtoDescriptor.order_service.OrderService;
