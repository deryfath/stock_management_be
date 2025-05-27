
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      warehouseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      },
    },
      {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'product'
      }
    );
  
module.exports = { Product };
  