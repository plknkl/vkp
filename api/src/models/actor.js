import models from './index'

const actorStatuses = [
  'idle',
  'working',
  'broken',
  'maintenance'
]

const actor = (sequelize, DataTypes) => {
  const Actor = sequelize.define('actor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.ENUM(actorStatuses),
      set (value) {
        if (this.id) {
          models.Log.create({
            entityType: 'actor',
            status: value,
            actorId: this.id
          })
        }
        this.setDataValue('status', value)
      },
      allowNull: false,
      defaultValue: 'idle',
      validate: {
        notEmpty: true
      }
    }
  })

  Actor.associate = models => {
    Actor.belongsTo(models.Operation)
    Actor.hasMany(models.Job)
  }

  return Actor
}

export default actor
