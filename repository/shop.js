const { Shop } = require('../model/shop');

exports.findOne = (where, opt = {}) => {
    return Shop.findOne({
      where,
      ...opt
    });
  };

exports.findAll = (where, opt = {}) => {
    return Shop.findAll({
      where,
      ...opt
    });
  };

exports.delete = (where, opt) => {
    return Shop.destroy({
      where,
      ...opt
    });
  };

exports.update = async (data, where, trx) => {
    return Shop.update(data, {
        where,
        transaction: trx
      });
  };

  exports.create = async (data, options) => {
    return Order.create(data, options);
  };

module.exports = exports;
