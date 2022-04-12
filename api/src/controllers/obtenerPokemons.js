require("dotenv").config();
const { BASE_URL, BASE_URL_LIMIT } = process.env;
const axios = require("axios");
// const Sequelize = require("sequelize");
const api = axios.default;
const { Pokemon, Types } = require("../db.js");

let pokemons = [];
const limit = 40;

async function obtenerPokemons(req, res) {
  let { name } = req.query;

  if (name) {
    name = name.trim().replace("%20", " ");
    let dataLocal = [];
    let apiResult = [];
    const seekPoke = await Pokemon.findAll({
      where: {
        name: name,
      },
      include: [
        {
          model: Types,
          attributes: ["en", "es"],
          through: { attributes: [] },
        },
      ],
    });

    await Promise.all(seekPoke).then((data) => {
      dataLocal = data;
    });

    try {
      const pokedata = await api.get(`${BASE_URL}${name.toLowerCase()}`);

      for (let i = 0; i < pokedata.data.types.length; i++) {
        let en,
          es = "";
        let url = pokedata.data.types[i].type.url;

        await api.get(url).then((response) => {
          const langES = response.data.names.find(
            (name) => name.language.name === "es"
          );
          const langEN = response.data.names.find(
            (name) => name.language.name === "en"
          );
          en = langEN.name;
          es = langES.name;

          pokedata.data.types[i] = {
            en,
            es,
          };
        });
      }

      let specimen = {
        id: pokedata.data.id,
        name: pokedata.data.name,
        img: pokedata.data.sprites.other["official-artwork"]["front_default"],
        weight: pokedata.data.weight,
        height: pokedata.data.height,
        types: pokedata.data.types,
      };

      for (let i = 0; i < pokedata.data.stats.length; i++) {
        let name = pokedata.data.stats[i].stat.name;
        name = name.replace("-", "_");
        let base = pokedata.data.stats[i]["base_stat"];

        specimen[name] = base;
      }

      apiResult.push(specimen);
    } catch (error) {
      console.log(error.message);
      apiResult = [];
    }

    if (apiResult.length === 0 && dataLocal.length === 0)
      return res.status(404).json({
        msg: "¡No logramos atrapar ese pokemón!",
      });
    res.status(200).json([apiResult, dataLocal]);
  } else {
    try {
      let { limit_call } = req.query;
      if (!limit_call) limit_call = limit;
      let localPokemons = [];
      const localPokes = await Pokemon.findAll({
        attributes: ["id", "name", "img", "attack"],
        include: [
          {
            model: Types,
            attributes: ["en", "es"],
            through: { attributes: [] },
          },
        ],
      });

      await Promise.all(localPokes).then((data) => {
        localPokemons = data;
      });

      if (pokemons.length > 0 && pokemons.length === limit_call)
        return res.status(200).json([pokemons, localPokemons]);

      const search = await api.get(`${BASE_URL_LIMIT}${limit_call}`);
      const pokes = search.data;

      pokemons = [];

      for (let i = 0; i < pokes.results.length; i++) {
        const pokemon = pokes.results[i];
        let pos = i + 1;

        console.log("pokemon " + pos + " of " + pokes.results.length + ":");
        console.log("Obteniendo data", pokemon.name);
        console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");

        const pokedata = await api.get(pokemon.url);

        for (let i = 0; i < pokedata.data.types.length; i++) {
          let en,
            es = "";
          let url = pokedata.data.types[i].type.url;
          base = pokedata.data.types[i]["base_stat"];
          await api.get(url).then((response) => {
            const langES = response.data.names.find(
              (name) => name.language.name === "es"
            );
            const langEN = response.data.names.find(
              (name) => name.language.name === "en"
            );
            en = langEN.name;
            es = langES.name;

            pokedata.data.types[i] = {
              en,
              es,
            };
          });
        }

        let specimen = {
          id: pokedata.data.id,
          name: pokedata.data.name,
          img: pokedata.data.sprites.other["official-artwork"]["front_default"],
          types: pokedata.data.types,
          attack: pokedata.data.stats[1].base_stat,
        };
        pokemons.push(specimen);
      }

      res.status(200).json([pokemons, localPokemons]);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "Algo no salió como esperabas",
      });
    }
  }
}

module.exports = obtenerPokemons;
