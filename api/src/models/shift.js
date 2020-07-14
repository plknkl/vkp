const shift = (sequelize, DataTypes) => {
  const Shift = sequelize.define('shift', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  })

  Shift.associate = models => {
    Shift.hasMany(models.Job)
    Shift.belongsTo(models.Shop)
  }

  return Shift
}

export default shift
