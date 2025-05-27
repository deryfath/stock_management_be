const { Product } = require('../model/product');

exports.findOne = (where, opt = {}) => {
    return Product.findOne({
      where,
      ...opt
    });
  };

exports.findAll = (where, opt = {}) => {
    return Product.findAll({
      where,
      ...opt
    });
  };

  exports.findAndCountAll = (where, opt = {}) => {
    return Product.findAndCountAll({
      where,
      ...opt
    });
  };

  exports.create = async (data, options) => {
    return Product.create(data, options);
  };

exports.update = async (data, where, trx) => {
    return Product.update(data, {
        where,
        transaction: trx
      });
  };

  exports.delete = (where, opt) => {
    return Product.destroy({
      where,
      ...opt
    });
  };
module.exports = exports;
