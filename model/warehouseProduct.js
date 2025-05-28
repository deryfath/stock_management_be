
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WarehouseProduct = sequelize.define('warehouseProduct', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      warehouseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
      {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'warehouse_product'
      }
    );
  
module.exports = { WarehouseProduct };
  