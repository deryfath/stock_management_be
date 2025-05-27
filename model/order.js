
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('order', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      shopId: {
        type: DataTypes.INTEGER,
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
        tableName: 'order'
      }
    );
  
module.exports = { Order };
  