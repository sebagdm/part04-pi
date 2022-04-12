const { Pokemon, Types } = require("../db.js");

async function crearPokemon(req, res) {
  try {
    const {
      name,
      img,
      weight,
      height,
      hp,
      attack,
      defense,
      special_attack,
      special_defense,
      speed,
      types,
    } = req.body;
    let pokemonExist = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (pokemonExist) return res.status(418).json({ msg: "Pokemon existente" });

    const pokeCreated = await Pokemon.create({
      name,
      img,
      weight: parseInt(weight),
      height: parseInt(height),
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
      special_attack: parseInt(special_attack),
      special_defense: parseInt(special_defense),
      speed: parseInt(speed),
    });
    await pokeCreated.setTypes(types);
    const id = pokeCreated.id;

    const result = await Pokemon.findByPk(id, {
      include: [
        {
          model: Types,
          attributes: ["en", "es"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Ocurrio un error mientras se creaba tu pokemon. Verifica los campos.",
    });
  }
}

module.exports = crearPokemon;
