import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from "cors";

import { Userhandler } from './api/routes/usershandler';
import { Orderhandler } from './api/routes/ordershandler';
import {Producthandler} from './api/routes/productsHandler';
import { DashboardHandler } from './api/routes/dashboardHandler';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsoption =  {
    origin : "*"
}
app.use(cors(corsoption));

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

Userhandler(app);
Orderhandler(app);
Producthandler(app);
DashboardHandler(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app ;
