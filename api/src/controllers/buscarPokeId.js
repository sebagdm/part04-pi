require("dotenv").config();
const { BASE_URL } = process.env;
const axios = require("axios");
const api = axios.default;
const { Pokemon, Types } = require("../db.js");
let pokemons = [];

async function buscarPokeId(req, res, next) {
  const { id } = req.params;

  if (!id) return res.sendStatus(404);
  // Regular expression para verificar la UUID
  const checkid =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUUID = checkid.test(String(id));

  try {
    if (isUUID) {
      const findPokeId = await Pokemon.findByPk(id, {
        include: [
          {
            model: Types,
            attributes: ["en", "es"],
            through: { attributes: [] },
          },
        ],
      });
      if (!findPokeId)
        return res.status(404).json({
          msg: "Pokemon no encontrado",
        });

      return res.status(200).json(findPokeId);
    } else {
      const pokeIndex = pokemons.findIndex((poke) => poke.id === id);
      const find = await api.get(`${BASE_URL}${id}`);

      let data = find.data;

      let pokemon = {
        id: data.id,
        name: data.name,
        img: data.sprites.other["official-artwork"]["front_default"],
        weight: data.weight,
        height: data.height,
      };

      for (let i = 0; i < data.stats.length; i++) {
        let name = data.stats[i].stat.name;
        name = name.replace("-", "_");
        let base = data.stats[i]["base_stat"];
        pokemon[name] = base;
      }

      if (pokeIndex === -1) {
        for (let i = 0; i < data.types.length; i++) {
          let en,
            es = "";
          let url = data.types[i].type.url;

          await api.get(url).then((response) => {
            const langES = response.data.names.find(
              (name) => name.language.name === "es"
            );
            const langEN = response.data.names.find(
              (name) => name.language.name === "en"
            );
            en = langEN.name;
            es = langES.name;

            data.types[i] = {
              en,
              es,
            };
          });
        }
        pokemon = {
          ...pokemon,
          types: data.types,
        };
      } else {
        pokemon = {
          ...pokemon,
          types: pokemons[pokeIndex].types,
        };
      }
      res.status(200).json(pokemon);
    }
  } catch (error) {
    next({ message: "Lo lamento, Pokemon No encontrado", status: 404 });
  }
}

module.exports = buscarPokeId;
