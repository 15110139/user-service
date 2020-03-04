const grpc = require("grpc");
const { OrderService } = require("./provider/order-service");
const { createOrder } = require("./methods/order/create-order");

let GrpcClientOrderService;

class GrpcClientService {
  /**
   * @param {Object} options
   * @param {String} options.grpcServerHostOrderService
   */
  constructor(options) {
    this.options = options;
    this.loadSingletonProviders();
    this.clientOrderService = GrpcClientOrderService;
  }

  loadSingletonProviders() {
    const self = this;
    if (!GrpcClientOrderService) {
        GrpcClientOrderService = new OrderService(self.options.grpcServerHostOrderService, grpc.credentials.createInsecure());
    }
  }
}

GrpcClientService.prototype.createOrder = createOrder;

module.exports.GrpcClientService = GrpcClientService;
