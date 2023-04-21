'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Researchs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Researchs.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    summary: DataTypes.STRING,
    researchId: DataTypes.STRING,
    writer:DataTypes.STRING,
    publicationYear:DataTypes.STRING,
    pdf:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Researchs',
  });
  return Researchs;
};