import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      isloggedin: false,
      isauthchecked: false,
      menus: [
        {
            id: 0,
            name: "Chipotle",
            updated: "December 23, 2023",
            count: 5
        },
        {
            id: 1,
            name: "Asia Cafe",
            updated: "December 23, 2023",
            count: 5
        },
        {
            id: 2,
            name: "Salt & Pepper",
            updated: "December 23, 2023",
            count: 6
        },
        {
            id: 3,
            name: "New Sitara Cuisine",
            updated: "December 23, 2023",
            count: 8
        },
        {
            id: 4,
            name: "Shake Shack",
            updated: "December 23, 2023",
            count: 9
        }
        ]
    
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
    deleteMenu(state, payload)
    {
        console.log('Delete Menu '+ payload)
        const index = state.menus.findIndex(item => item.id === payload)
        console.log('Found  Menu Index '+ JSON.stringify(index))
        if (index !== -1)
            state.menus.splice(index, 1)
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
    getLoggedIn(state) {
      return state.isloggedin
    },
    getAuthCheck(state) {
      return state.isauthchecked
    }
    

  }
})


export default store;