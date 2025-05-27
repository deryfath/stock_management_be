const { Checkout } = require('../model/checkout');

exports.findOne = (where, opt = {}) => {
    return Checkout.findOne({
      where,
      ...opt
    });
  };

exports.findAll = (where, opt = {}) => {
    return Checkout.findAll({
      where,
      ...opt
    });
  };

exports.delete = (where, opt) => {
    return Checkout.destroy({
      where,
      ...opt
    });
  };

exports.update = async (data, where, trx) => {
    return Checkout.update(data, {
        where,
        transaction: trx
      });
  };

  exports.create = async (data, options) => {
    return Checkout.create(data, options);
  };

module.exports = exports;
