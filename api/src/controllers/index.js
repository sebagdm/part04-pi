const getPkRouter = require("./obtenerPokemons");
const searchPkIdRouter = require("./buscarPokeId");
const getPkmTypesRouter = require("./obtenerTiposPokemons");
const getLocalPkmRouter = require("./obtenerLocalPokemons");
const createPkmRouter = require("./crearPokemon");
const createTypeRouter = require("./crearTipo");

module.exports = {
  getPkRouter,
  searchPkIdRouter,
  getPkmTypesRouter,
  getLocalPkmRouter,
  createPkmRouter,
  createTypeRouter,
};
