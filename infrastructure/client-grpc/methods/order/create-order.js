/**
 *
 * @param {Object} orderData
 * @param {String} orderData.userId
 * @param {Nunber} orderData.amount
 * @param {String} orderData.productId
 */
async function createOrder(orderData) {
  const listHost = await this.getListHost("orderService");
  const serviceHostPick = this.pickHostService(listHost);
  console.log(serviceHostPick)
  return new Promise((resolve, reject) => {
     this.loadClientServiceOder(serviceHostPick).CreateOrder(
      {
        userId: orderData.userId,
        amount: orderData.amount,
        productId: orderData.productId
      },
      (error, result) => {
        console.log("error", JSON.stringify(error));
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

module.exports.createOrder = createOrder;
