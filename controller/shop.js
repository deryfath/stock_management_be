const { list, add, update, remove } = require('../service/shop');

  exports.index = async (req, res) => {

    try {
        const result = await list()
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.add = async (req, res) => {
    const { body } = req; 

    try {
        const result = await add(body)
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


  exports.delete = async (req, res) => {
      const { body } = req; 
  
      try {
          const result = await remove(body)
          res.json(result);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    };
  
  module.exports = exports;