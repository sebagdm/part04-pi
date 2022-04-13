const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getPkRouter,
  searchPkIdRouter,
  getPkmTypesRouter,
  getLocalPkmRouter,
  createPkmRouter,
  createTypeRouter,
} = require("../controllers/index");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPkRouter);
router.get("/pokemons/local", getLocalPkmRouter);
router.get("/pokemons/:id", searchPkIdRouter);
router.get("/types", getPkmTypesRouter);
router.post("/pokemons", createPkmRouter);
router.post("/newtype", createTypeRouter);
module.exports = router;
