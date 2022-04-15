//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT, BASE_URL_TYPE } = process.env;

const axios = require("axios");
const api = axios.default;
const { Types } = require("./src/db");

async function Adjutora() {
  const types = [];
  const pokeTypes = await api.get(`${BASE_URL_TYPE}`);
  const data = pokeTypes.data;
  let en,
    es = "";
  for (let i = 0; i < data.results.length; i++) {
    // data.results.map(async (type, i) => {
    const url = data.results[i].url;
    let tipo;
    await api.get(url).then((response) => {
      console.log(url);
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
}

async function preload() {
  console.log('Adjutora says: pre-carga de "/types" en DATABASE');
  await Adjutora();
  await console.log('Adjutora says: "/types" cargados en Base de datos');
}
preload();

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await server.listen(PORT, () => {
    console.log("listening in port:" + PORT); // eslint-disable-line no-console
  });
});
