const { Warehouse } = require('../model/warehouse');

exports.findOne = (where, opt = {}) => {
    return Warehouse.findOne({
      where,
      ...opt
    });
  };

exports.findAll = (where, opt = {}) => {
    return Warehouse.findAll({
      where,
      ...opt
    });
  };

  exports.findAndCountAll = (where, opt = {}) => {
    return Warehouse.findAndCountAll({
      where,
      ...opt
    });
  };

  exports.create = async (data, options) => {
    return Warehouse.create(data, options);
  };

exports.update = async (data, where, trx) => {
    return Warehouse.update(data, {
        where,
        transaction: trx
      });
  };

  exports.delete = (where, opt) => {
    return Warehouse.destroy({
      where,
      ...opt
    });
  };
module.exports = exports;
