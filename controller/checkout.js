const { checkoutList, submit, add } = require('../service/checkout');

exports.list = async (req, res) => {
  const { query } = req;

    try {

        const result = await checkoutList(query)
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

  exports.submit = async (req, res) => {
    const { body } = req; 

    try {
        const result = await submit(body)
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };
  
  module.exports = exports;