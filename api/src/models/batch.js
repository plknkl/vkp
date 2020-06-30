const batch = (sequelize, DataTypes) => {
  const Batch = sequelize.define('batch', {
    businessId: {
      type: DataTypes.INTEGER,
      unique: false,
      validate: {
        notEmpty: true
      }
    }
  })

  Batch.associate = models => {
    Batch.belongsTo(models.Article)
  }

  return Batch
}

export default batch
