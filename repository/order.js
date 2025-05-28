const { Order } = require('../model/order');

exports.findOne = (where, opt = {}) => {
    return Order.findOne({
      where,
      ...opt
    });
  };

exports.findAll = (where, opt = {}) => {
    return Order.findAll({
      where,
      ...opt
    });
  };

exports.delete = (where, opt) => {
    return Order.destroy({
      where,
      ...opt
    });
  };

exports.update = async (data, where, trx) => {
    return Order.update(data, {
        where,
        transaction: trx
      });
  };

  exports.create = async (data, options) => {
    return Order.create(data, options);
  };

module.exports = exports;
