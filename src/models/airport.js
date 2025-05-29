'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.model.belongsTo(models.City, {
        foreignkey:'cityID',
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      })  
    }
  }
  Airport.init({
    Name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    code: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Address: {
      type: DataTypes.STRING,
    },
    cityID: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};