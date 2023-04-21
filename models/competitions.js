'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competitions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Competitions.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    expand: DataTypes.STRING,
    competitionId: DataTypes.STRING,
    status:DataTypes.STRING,
    submitingDeadline:DataTypes.STRING,
    resultDeadline:DataTypes.STRING,
    signupLink:DataTypes.STRING,
    awards:DataTypes.STRING,
    referee:DataTypes.STRING,
    organizers:DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Competitions',
  });
  return Competitions;
};