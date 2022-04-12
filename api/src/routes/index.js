const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getPkRouter,
  searchPkId,
  getPkmTypes,
  getLocalPkm,
  createPkm,
  createType,
} = require("../controllers/index");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPkRouter);
router.get("/pokemons/local", getLocalPkm);
router.get("/pokemons/:id", searchPkId);
router.get("/types", getPkmTypes);
router.post("/pokemons", createPkm);
router.post("/newtype", createType);
module.exports = router;
