import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

import { Userhandler } from './api/routes/usershandler'
import { Orderhandler } from "./api/routes/ordershandler";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

Userhandler(app);
Orderhandler(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
