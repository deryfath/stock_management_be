const { list, findById, register, login, logout, update, remove } = require('../service/user');

exports.list = async (req, res) => {

    try {
        const result = await list()
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.findById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await findById(id)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

exports.register = async (req, res) => {
    const { body } = req; 

    try {
        const result = await register(body)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.update = async (req, res) => {
    const { body } = req; 

    try {
        const result = await update(body)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.remove = async (req, res) => {
    const { body } = req; 

    try {
        const result = await remove(body)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.login = async (req, res) => {
    const { body } = req; 

    try {
        const result = await login(body)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.logout = async (req, res) => {
    const { body } = req; 

    try {
        const result = await logout(body)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };
  
  module.exports = exports;