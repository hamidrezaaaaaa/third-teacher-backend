'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Members.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    image: DataTypes.STRING,
    education: DataTypes.STRING,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};