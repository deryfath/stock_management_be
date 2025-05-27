const { User } = require('../model/user');

exports.findOne = (where, opt = {}) => {
    return User.findOne({
      where,
      ...opt
    });
  };

  exports.findAll = (where, opt = {}) => {
    return User.findAll({
      where,
      ...opt
    });
  };

  // create
exports.create = async (data, options) => {
  return User.create(data, options);
};

exports.update = (payload, where, trx = null) => {
  return User.update(payload, { where, transaction: trx });
};

exports.delete = (where, opt) => {
  return User.destroy({
    where,
    ...opt
  });
};

module.exports = exports;
