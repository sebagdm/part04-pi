const { Types } = require("../db.js");

async function crearTipo(req, res, next) {
  try {
    const { en, es } = req.body;
    let type = {
      en,
      es,
    };
    const newType = await Types.findOrCreate({ where: type });
    res.status(200).json(newType);
  } catch (error) {
    next(error);
  }
}

module.exports = crearTipo;
