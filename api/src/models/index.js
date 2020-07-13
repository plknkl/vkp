import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'postgres',
    dialect: 'postgres'
  }
)

const models = {
  Article: sequelize.import('./article'),
  Actor: sequelize.import('./actor'),
  Batch: sequelize.import('./batch'),
  Operation: sequelize.import('./operation'),
  Shift: sequelize.import('./shift'),
  Shop: sequelize.import('./shop'),
  Job: sequelize.import('./job'),
  Log: sequelize.import('./log')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
