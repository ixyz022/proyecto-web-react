import * as fs from 'fs';
import * as path from 'path';
//const Sequelize = require('sequelize')
import { Sequelize, DataTypes } from 'sequelize';

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/db.config.js')[env]
const db: any = {}

//import foo = require('foo');
//require('foo');
//import foo from 'foo';

let sequelize: any

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname).filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)

    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db