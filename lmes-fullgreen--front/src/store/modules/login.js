const state = {
    login: {
      logged: false
    }
};

const getters = {
    getLogin: state => state.login
};

const mutations = {
    setLogin(state, login) {
        state.login = login;
      }
};

// const actions = {
//   getLogin(context){

//   }
// };

export default {
    state,
    mutations,
    // actions,
    getters
}