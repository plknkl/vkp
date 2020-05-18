const article = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  })

  return Article
}

export default article
