require("dotenv").config();
// const { BASE_URL, BASE_URL_LIMIT, BASE_URL_TYPE } = process.env;
// const axios = require("axios");

// const api = axios.default;
const { Pokemon, Types } = require("../db.js");

async function obtenerLocalPokemons(req, res) {
  try {
    let results = [];
    const localPokes = await Pokemon.findAll({
      attributes: ["id", "name", "img"],
      include: [
        {
          model: Types,
          attributes: ["en", "es"],
          through: { attributes: [] },
        },
      ],
    });

    await Promise.all(localPokes).then((data) => {
      results = data;
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({
      msg: "Algo no está bien por estos lados",
    });
  }
}

module.exports = obtenerLocalPokemons;
