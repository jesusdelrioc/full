const state = {
  config: null,
  msg: null
};

const getters = {
  getConfig: state => state.config,
  getMsg: state => state.msg
};

const mutations = {
  setConfig(state, config) {
      state.config = config;
    },
  setMsg(state, msg) {
      state.msg = msg;
    }
};

const actions = {
async loadConfig(context){
  const axios = require("axios");
  const dockerConfig=require("../../../docker/app.json");
  const localConfig=require("../../../docker/app.json");

  context.commit('setMsg', process.env.VUE_APP_ENV_DESC);
  const getPromise=await new Promise(function(resolve, reject) {

    if (process.env.VUE_IG_FOR == "docker") {
      context.commit('setConfig', dockerConfig);
      resolve(dockerConfig);
    } else {
      var loc = location.origin;
      let options = {
        headers: {Accept: "application/json"}
      };

      //Loading config from onpremise webserver
      axios.get(loc + "/api/conf?f=Fullgreen/lmes-fullgreen--front/app",options)
        .then(response => {
          if (response.status == 200) {
            context.commit('setConfig', response.data);
            resolve(response.data);
          }
        })
        .catch(err => { // eslint-disable-next-line
          console.log("Error loading config" + JSON.stringify(err));  // eslint-disable-next-line
          console.log("Try Loading config " + process.env.NODE_ENV);
  
          //Loading config from local file
          try {
            // For NODE_ENV == "local" it is necesary conf file .env.local
            context.commit('setConfig', localConfig);
            resolve(localConfig);
          } catch (exc) { // eslint-disable-next-line
            console.log("Error loading Environment config" + JSON.stringify(exc));
            reject("Error loading Environment config" + JSON.stringify(exc));
          }
        });
      }
    });

  return getPromise;
  }
};

export default {
    state,
    mutations,
    actions,
    getters
}
