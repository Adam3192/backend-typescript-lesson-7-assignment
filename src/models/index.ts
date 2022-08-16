import { Sequelize } from "sequelize";
import { JobFactory } from "./Job";

const dbName = 'myOrmDb';
const username = 'sqluser';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

JobFactory(sequelize);

export const db = sequelize;