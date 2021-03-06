const grpc = require("grpc");
const loadbalance = require("loadbalance");
const zookeeper = require("node-zookeeper-client");

const { OrderService } = require("./provider/order-service");
const { createOrder } = require("./methods/order/create-order");

class GrpcClientService {
  /**
   * @param {Object} options
   * @param {String} options.grpcServerHostOrderService
   * @param {String} options.zookeeperHost
   */
  constructor(options) {
    this.options = options;
    this.listHost = [];
    this.zookeeperClient = zookeeper.createClient(options.zookeeperHost);
    this.conntionZookeeper();
  }
  conntionZookeeper() {
    this.zookeeperClient.connect();
  }
  async getListHost(hostListName) {
    try {
      const getListHost = new Promise((resolve, reject) => {
        this.zookeeperClient.getChildren(
          `/listService/${hostListName}`,
          (error, children, stats) => {
            if (error) {
              reject(error);
            }
            resolve(children);
          }
        );
      });
      const listHost = await getListHost;
      return listHost
    } catch (error) {
      console.log(error);
      throw new Error(
        "Have some error get list children with Zookeeper server"
      );
    }
  }

  pickHostService(listHost) {
    if (JSON.stringify(this.listHost) !== listHost) {
      this.listHost = listHost;
    }
    const engine = new loadbalance.RandomEngine(this.listHost);
    return engine.pick();
  }

  async getDataHost(hostListName, hostName) {
    try {
      const getData = new Promise((resolve, reject) => {
        this.zookeeperClient.getData(
          `/listService/${hostListName}/${hostName}`,
          null,
          function(error, data, stat) {
            if (error) {
              reject(error);
            }
            resolve(JSON.parse(data.toString("utf8")));
          }
        );
      });
      const data = await getData;
      return { hostName, ...data };
    } catch (error) {
      console.log(error);
      throw new Error("Have some errror when get data node on Zookeeper service")
    }
  }

  loadClientServiceOder(serviceHostPick) {
    return new OrderService(serviceHostPick, grpc.credentials.createInsecure());
  }
}

GrpcClientService.prototype.createOrder = createOrder;

module.exports.GrpcClientService = GrpcClientService;
