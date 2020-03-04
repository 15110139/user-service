const grpc = require("grpc");

const {
  userService
} = require("./service/user");


class GRPCServer {
  constructor(options) {
    this.port = options.port || 53000;
    this.logger = console
  }

  start() {
    this.server = new grpc.Server();
    this.loadServices();
    this.listen();
  }

  listen() {
    try {
      this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure());
      this.server.start();
      this.logger.info(`Server started at port ${this.port}`);
    } catch (error) {
      this.logger.error("Error on starting server");
      this.logger.error(error);
    }
  }

  loadServices() {
    try {
      // [userService].forEach((service) => {
      //   console.log(service)
      //   const serviceHandlers = {};
      //   Object.keys(service.handlers).forEach((handlerName) => {
      //     let handler = service.handlers[handlerName];
      //     serviceHandlers[handlerName] = handler;
      //   });
      //   this.server.addService(service.service, serviceHandlers);
      // });
      this.server.addService(userService.service,userService.handlers)
    } catch (error) {
      this.logger.error("Error during loading services");
      this.logger.error(error);
    }
  }
};

new GRPCServer({
  port: process.env.ENTRYPOINT_GRPC_PORT,
}).start();