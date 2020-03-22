import Vue from "vue";
import Vuex from "vuex";



import config from './modules/config';
import login from './modules/login';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
    modules: {
        config, login
    }
});








/*

var conf = require("./services/config");
var data = require("./services/data");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cfg: null,
    revenues: null,
    options: null
    // token: null
  },
  getters: {
    cfg: state => state.cfg,
    revenues: state => state.revenues,
    options: state => state.options,
    // token: state => state.token
  },
  mutations: {
    setConfig(state, cfg) {
      state.cfg = cfg;
    },
    setRevenues(state, revenues) {
      state.revenues = revenues;
    },
    setOptions(state, options) {
      state.options = options;
    },
    // setToken(state, token) {
    //   state.token = token;
    // }
  },
  actions: {
    setConfig: (context, cfg) => {
      context.commit("setConfig", cfg);
    },
    getConfig: ({ commit, state }) => {
      var stateCfg = state.cfg;

      return new Promise((resolve, reject) => {
        if (stateCfg == null) {
          conf
            .getConfig()
            .then(cfg => {
              commit("setConfig", cfg);
              resolve(cfg);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          resolve(stateCfg);
        }
      });
    },
    setRevenues: (context, revenues) => {
      context.commit("setRevenues", revenues);
    },
    getRevenues: ({ commit, state }) => {
      var stateRevenues = state.revenues;

      return new Promise((resolve, reject) => {
        if (stateRevenues == null) {
          conf
            .getConfig()
            .then(revenues => {
              commit("setRevenues", revenues);
              resolve(revenues);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          resolve(stateRevenues);
        }
      });
    },
    setOptions: (context, options) => {
      context.commit("setOptions", options);
    },
    getConfig: ({ commit, state }) => {
      var stateCfg = state.cfg;

      return new Promise((resolve, reject) => {
        if (stateCfg == null) {
          conf
            .getConfig()
            .then(cfg => {
              commit("setConfig", cfg);
              resolve(cfg);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          resolve(stateCfg);
        }
      });
    },
    // setToken: (context, token) => {
    //   context.commit("setToken", token);
    // },
    // getToken: async ({ dispatch }) => {
    //   var response = await data.getToken();
    //   dispatch("setToken", response.token);

    //   return response.token;
    }
  }
});
*/