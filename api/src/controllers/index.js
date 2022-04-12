const getPkRouter = require("./obtenerPokemons");
const searchPkId = require("./buscarPokeId");
const getPkmTypes = require("./obtenerTiposPokemons");
const getLocalPkm = require("./obtenerLocalPokemons");
const createPkm = require("./crearPokemon");
const createType = require("./crearTipo");

module.exports = {
  getPkRouter,
  searchPkId,
  getPkmTypes,
  getLocalPkm,
  createPkm,
  createType,
};
