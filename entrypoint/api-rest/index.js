const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

const {router} = require('./router')

async function application() {
    const port = process.env.SERVICE_PORT || 33000
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/v1', router)

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })

}
async function bootstrap() {
    try {
        await application()
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

bootstrap()