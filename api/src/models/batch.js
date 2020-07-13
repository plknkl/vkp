const batch = (sequelize, DataTypes) => {
  const Batch = sequelize.define('batch', {
    details: {
      type: DataTypes.JSON,
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
