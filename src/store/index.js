import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arts: []
  },
  getters: {
    getArts(state){
      return state.arts
    }
  },
  actions: {
    async initArts({commit}){
      const search = await Vue.axios.get("https://collectionapi.metmuseum.org/public/collection/v1/search?q=European+drawings")
          .then(r => r.data.objectIDs)
      console.log(search)
      let arts = []
      let arr = search.slice(0, 100)
      arr = arr
          .map(id => {
            return new Vue.axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id)
          })
      for(let i = 0; i < 10; i++){
        let response = await Promise.allSettled(arr.slice(i*10, (i+1)*10))
            .then((r) => {
              return r
                  .filter(el => el.status === "fulfilled")
                  .map(el => el.value.data)
                  .filter(el => el.primaryImageSmall)
            })
        console.log(response)
        arts = [...arts, ...response]
        commit("SET_ARTS", arts)
      }

    },
  },
  mutations: {
    SET_ARTS(state, arts){
      state.arts = arts
    }
  },
})
