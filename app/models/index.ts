import dbConfig from "../config/db.config"

// import Sequelize from 'sequelize';
import { Dialect, Sequelize } from 'sequelize'

const dbName = dbConfig.DB as string;
const dbUser = dbConfig.USER as string;
const dbPassword = dbConfig.PASSWORD as string;
const dbHost = dbConfig.HOST as string;

const sequelizeConnection =  new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost || 'localhost',
  dialect: 'postgres'
})

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeConnection;

db.computers = require("./zscaler.model")(sequelizeConnection, Sequelize);
db.policy = require("./zscaler.model.policy")(sequelizeConnection, Sequelize);
db.group = require("./zscaler.model.group")(sequelizeConnection, Sequelize);

export default db;