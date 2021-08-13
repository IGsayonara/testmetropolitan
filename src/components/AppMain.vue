<template lang="pug">
  .container
    .filter-wrap
      label Filter
        select(@change="setColorToShow")
          option(
            v-for="option in getOptions"
            :value="option"
          ) {{ option }}
    .flex-wrap
      .flex-item(
        v-for="art in getArts"
        :key="art.objectID"
        :style="{background: art.color}"
      )
        img(
          :src="art.primaryImageSmall"
         )
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {
  name: "AppMain",
  computed: {
    ...mapGetters(["getArts", "getAvailableColors"]),
    getOptions() {
      return ["Default", ...this.getAvailableColors]
    }
  },
  mounted() {
    this.initArts()
  },
  methods: {
    ...mapActions(["initArts", "changeColorToShow"]),
    setColorToShow(e){
      this.changeColorToShow(e.target.value)
    }
  }
}
</script>

<style scoped lang="sass">
.container
  max-width: 1200px
  margin: auto

.flex-wrap
  display: flex
  justify-content: center
  flex-wrap: wrap
  .flex-item
    border: 2px solid black
    width: calc(20% - 10px)
    margin: 5px
    padding: 10px
    height: 200px
    justify-content: center
    @media (max-width: 992px)
      width: calc(100% / 3 - 10px)
    img
      width: 100%
      height: 100%
      object-fit: cover

label
  display: flex
  flex-direction: column
  justify-content: space-between
  padding: 10px
  height: 60px
</style>
