
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShopWarehouse = sequelize.define('shopWarehouse', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      shopId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      warehouseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
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
        tableName: 'shop_warehouse'
      }
    );
  
module.exports = { ShopWarehouse };
  