<template>
  <div v-on:click.stop class="viewer-wrapper" style="height:90vh; overflow:hidden; width: 100%; max-width: 600px;">
    <v-zoomer style="border: solid 1px silver;">
      <img
        src="../assets/Oxygen-Source-Type.jpg"
        style="object-fit: contain; width: 100%; height: 100%;"
      >
    </v-zoomer>
  </div>
</template>

<script>
import VueZoomer from 'vue-zoomer'
import Vue from 'vue'
Vue.use(VueZoomer)

export default {

  name: 'SourceHelper',

  data () {
    return {}
  },

}
</script>
