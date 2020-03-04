
/**
 * 
 * @param {Object} orderData 
 * @param {String} orderData.userId
 * @param {Nunber} orderData.amount
 * @param {String} orderData.productId
 */
 function createOrder(orderData) {
     return  new Promise((resolve, reject) => {
        this.clientOrderService.CreateOrder({
            userId: orderData.userId,
            amount: orderData.amount,
            productId: orderData.productId
        }, (error, result) => {
            console.log("error", JSON.stringify(error))
            if (error) return reject(error);
            return resolve(result);
        })
    })

}

module.exports.createOrder = createOrder