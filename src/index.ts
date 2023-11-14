import express, {Express, Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./config/connect";
import routes from "./routes";

dotenv.config();
const app: Express = express();
app.use(express.json()); //Pa que pueda devolver json
app.use(express.urlencoded({ extended: true })); //Pa traer info de la url
const port: number = parseInt(process.env.PORT || "") || 3000; //Saca las variables de entorno del archivo .env o usa el puerto 3000


db.then(() => {
    app.listen(port, () => {
        console.log(`[server] App listening at http://localhost:${port}`);
    });
})

routes(app);
//Endpoints

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello Pork!');
});