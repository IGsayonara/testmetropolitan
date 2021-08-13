<template lang="pug">
  .container
    .filter-wrap
      label Filter
        select
          option(
            v-for="option in getOptions"
            :value="option"
          ) {{ option }}
    .flex-wrap
      .flex-item(
        v-for="art in getArts"
        :key="art.objectID"
      )
        img(:src="art.primaryImageSmall")
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {
  name: "AppMain",
  computed: {
    ...mapGetters(["getArts"]),
    getOptions() {
      return [
        "Default", "Red", "Green", "Blue", "Grey"
      ]
    }
  },
  mounted() {
    this.initArts()
  },
  methods: {
    ...mapActions(["initArts"]),
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
    width: 20%
    padding: 10px
    height: 200px
    justify-content: center
    @media (max-width: 992px)
      width: calc(100% / 3)
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
