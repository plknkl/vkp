import models from './index'

const jobStatuses = [
  'ready',
  'processing',
  'interrupted',
  'finished'
]

const job = (sequelize, DataTypes) => {
  const Job = sequelize.define('job', {
    status: {
      type: DataTypes.ENUM(jobStatuses),
      allowNull: false,
      defaultValue: 'ready',
      set (value) {
        if (this.id) {
          models.Log.create({
            entityType: 'job',
            status: value,
            jobId: this.id
          })
        }
        this.setDataValue('status', value)
      },
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }

  })

  Job.associate = models => {
    Job.belongsTo(models.Actor)
    Job.belongsTo(models.Operation)
    Job.belongsTo(models.Batch)
    Job.belongsTo(models.Shift)
  }

  return Job
}

export default job
