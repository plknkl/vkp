const operationUnits = [
  'm2',
  'kg'
]

const operation = (sequelize, DataTypes) => {
  const Operation = sequelize.define('operation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    unit: {
      type: DataTypes.ENUM(operationUnits),
      allowNull: false,
      defaultValue: 'm2',
      validate: {
        notEmpty: true
      }
    }
  })

  Operation.associate = models => {
    Operation.hasMany(models.Actor)
  }

  return Operation
}

export default operation
