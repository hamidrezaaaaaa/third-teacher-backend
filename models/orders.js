'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init({
    userId: DataTypes.STRING,
    productId: DataTypes.STRING,
    productName:DataTypes.STRING,
    orderDate: DataTypes.STRING,
    tag:DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};