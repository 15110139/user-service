const mongoose = require('mongoose')
/**
 * 
 * @param {String} host 
 * @param {Number} port 
 * @param {String} dbName 
 */
async function InitConnectionMongodb(host, port, dbName) {
    try {
        console.log(`mongodb://${host}:${port}/${dbName}`)
        await mongoose.connect(`mongodb://${host}:${port}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
    } catch (error) {
        throw new Error('Connnect to MongoDB failure', error.stack)
    }
}

module.exports.InitConnectionMongodb = InitConnectionMongodb