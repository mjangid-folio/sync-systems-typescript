import express, { Application, Request, Response } from "express";
import db from "./app/models";
import cors from "cors";
import dotenv from 'dotenv';
import routes from './app/routes/zscaler.routes'
import routerPolicy from './app/routes/zscaler.policy.routes'


const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: "Welcome to sync systems application." });
});
 
app.use('/api/computers',routes)
app.use('/api/policies', routerPolicy)

// set port, listen for requests
dotenv.config()
const PORT = process.env.PORT || 4000;
try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
} catch (error) {
  console.log(`Error occurred: ${error.message}`);
}
