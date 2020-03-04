const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
module.exports.loadProto = (filePath) => {
  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: false,
    oneofs: true,
  };

  const protoDefinition = protoLoader.loadSync(filePath, options);
  return grpc.loadPackageDefinition(protoDefinition);
};
