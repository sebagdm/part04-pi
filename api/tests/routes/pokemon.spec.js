/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "pikachu developer",
  img: "http://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png",
  weight: 15,
  height: 4,
  hp: 80,
  attack: 65,
  defense: 70,
  special_attack: 75,
  special_defense: 80,
  speed: 85,
  types: [13, 17],
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se puede conectar a la base de datos:", err);
    })
  );
  describe("GET /pokemons", () => {
    it("should get 200", async () => {
      await agent.get("/pokemons?limit_call=5").expect(200);
    });
  });
  describe("GET /pokemons/:id", () => {
    it("Obtener un pokemon por su id correcto", async () => {
      const response = await agent.get("/pokemons/1");
      // expect(response.body).to.be.an("object");
      // console.log(response.body);
      expect(response.body.id).to.be.equal(1);
    });
    it("debe dar 404 con identificación incorrecta", async () => {
      const response = await agent.get("/pokemons/aaa");
      expect(response.status).to.be.equal(404);
    });
  });
  describe("POST /pokemons", () => {
    it("Tendría que crear un pokémon y devolverlo", async () => {
      const response = await agent.post("/pokemons").send(pokemon);
      expect(response.body.name).to.be.equal("pikachu developer");
    });
  });
});
