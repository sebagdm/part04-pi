require("dotenv").config();
const { BASE_URL_TYPE } = process.env;

const axios = require("axios");
const api = axios.default;
const { Types } = require("../db.js");

async function obtenerTiposPokemons(req, res) {
  try {
    let resultsOnDB = [];
    const localTypes = await Types.findAll();

    await Promise.all(localTypes).then((data) => {
      resultsOnDB = data;
    });

    if (resultsOnDB.length > 0) {
      return res.status(200).json(resultsOnDB);
    } else {
      const types = [];
      const pokeTypes = await api.get(`${BASE_URL_TYPE}`);
      const data = pokeTypes.data;

      let en,
        es = "";

      for (let i = 0; i < data.results.length; i++) {
        const url = data.results[i].url;
        let tipo;
        await api.get(url).then((response) => {
          let data = response.data;
          let id = i + 1;

          let langEN = data.names.find((name) => name.language.name === "en");
          let langES = data.names.find((name) => name.language.name === "es");
          en = langEN.name;

          if (langES) {
            es = langES.name;
          } else {
            es = en;
          }

          tipo = {
            id,
            en,
            es,
          };
        });
        console.log(tipo);
        const creado = await Types.findOrCreate({
          where: {
            id: tipo.id,
            en: tipo.en,
            es: tipo.es,
          },
        });
        types.push(creado[0]);
      }

      res.status(200).json(types);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}

module.exports = obtenerTiposPokemons;
