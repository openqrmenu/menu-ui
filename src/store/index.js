import { createStore } from 'vuex'
import { getMenuCards, addMenuCard, getMenuStore } from '../utils/api'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      isloggedin: false,
      isauthchecked: false,
      menus: [],
      menustore: {}
    }
  },
  mutations: {
    setLoggedIn(state, payload)
    {
        state.isloggedin = payload
    },
    setAuthCheck(state, payload)
    {
        state.isauthchecked = payload
    },
    addMenu(state, payload)
    {
        state.menus.push(payload)
    },
    setMenuCards(state, payload)
    {
      state.menus = payload;
    },
    setMenuCard(state, payload)
    {
      const index = state.menus.findIndex(item => item._id === payload.id)
      if (index !== -1)
        state.menus[index] = payload
    },
    deleteMenu(state, payload)
    {
        console.log('Delete Menu '+ payload)
        const index = state.menus.findIndex(item => item._id === payload)
        console.log('Found  Menu Index '+ JSON.stringify(index))
        if (index !== -1)
            state.menus.splice(index, 1)
    },
    setMenuStore(state, payload)
    {
      state.menustore = payload;
    }
  },
  getters: {
    menuCount(state) {
        return state.menus.length
    },
    getMenu(state)
    {
        return state.menus
    },
    getMenuForId: (state) => (id) => 
    {
      return state.menus.find(item => item._id === id)
    },
    getLoggedIn(state) {
      return state.isloggedin
    },
    getAuthCheck(state) {
      return state.isauthchecked
    },
    getMenuStore(state) {
      return state.menustore;
    }
  },
  actions: {
    async refreshMenuCards(context) {
      getMenuCards().then(function (response) {
        // handle success
        context.commit("setMenuCards", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
    },
    async addNewMenuCard(context, payload) {
      addMenuCard(payload).then(function (response) {
        // handle success
        context.commit("addMenu", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
    },
    async getCurrentMenu(context, payload) {
      getMenuStore(payload).then(function (response) {
        // handle success
        context.commit("setMenuStore", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
    },

  }
})


export default store;