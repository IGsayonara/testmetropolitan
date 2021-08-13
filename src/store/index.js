import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const availableColors = [
  "red", "green", "blue", "grey"
]

export default new Vuex.Store({
  state: {
    arts: [],
    availableColors,
    initAmount: 100,
    colorToShow: "Default"
  },
  getters: {
    getArts(state) {
      if(state.colorToShow === "Default") return state.arts
      return state.arts.filter(el => {
        return el.color === state.colorToShow
      })
    },

    getAvailableColors(state) {
      return state.availableColors
    }
  },
  actions: {
    async initArts({ commit, state }) {
      const params = {
        q: "European drawings",
        hasImages: true
      }
      const search = await Vue.axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/search",
          { params })
          .then(r => r.data.objectIDs)
          .catch(console.log)

      let amount = state.initAmount
      let arts = []
      let arr = search.slice(0, amount)
      arr = arr
          .map(id => {
            return new Vue.axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id)
          })

      for (let i = 0; i < amount / 10; i++) {
        let response = await Promise.allSettled(arr.slice(i * 10, (i + 1) * 10))
            .then((r) => {
              return r
                  .filter(el => el.status === "fulfilled")
                  .map(el => el.value.data)
                  .map(el => {
                    return { ...el, color: getRandomColor() }
                  })
                  .filter(el => el.primaryImageSmall)
            })
            .catch(console.log)

        arts = [...arts, ...response]
        commit("SET_ARTS", arts)
      }
    },
    changeColorToShow({ commit }, color) {
      commit("SET_COLOR_TO_SHOW", color)
    }
  },
  mutations: {
    SET_ARTS(state, arts) {
      state.arts = arts
    },
    SET_COLOR_TO_SHOW(state, color) {
      state.colorToShow = color
    }
  },
})


function getRandomColor() {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }
  let length = availableColors.length
  return availableColors[getRandomInt(length)]
}
