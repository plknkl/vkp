import models from './index'

const shop = (sequelize, DataTypes) => {
  const Shop = sequelize.define('shop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
  })

  Shop.associate = models => {
    Shop.hasMany(models.Actor)
  }

  return Shop
}

export default shop
