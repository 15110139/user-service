/**
 *
 * @param {Object} orderData
 * @param {String} orderData.userId
 * @param {Nunber} orderData.amount
 * @param {String} orderData.productId
 */
async function createOrder(orderData) {
  const listHost = await this.getListHost("orderService");
  
  const listGetDataNode = listHost.map( async el => {
    return await this.getDataHost("orderService",el)
  })
  const dataGetList = await Promise.all(listGetDataNode)

  let listHostHealthy = []

  dataGetList.forEach(el=>{
    if(el.status==="SERVING"){
      listHostHealthy.push(el.hostName)
    }
  })
  console.log("listHostHealthy",listHostHealthy)
  const serviceHostPick = this.pickHostService(listHostHealthy);
  console.log("serviceHostPick",serviceHostPick)
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
