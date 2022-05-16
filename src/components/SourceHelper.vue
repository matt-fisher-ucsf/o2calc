<template>
  <div v-on:click.stop class="viewer-wrapper" style="height:80vh; overflow:hidden;">
    <viewer
     :options="options"
      @inited="inited"
      class="viewer" ref="viewer"
      style = "height:100%;"
    >
      <template>
        <div>
          <img src = "../assets/Oxygen-Source-Type.jpg" style="width: 100%; max-width: 600px;">
        </div>
      </template>
    </viewer>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
/*
Viewer.setDefaults({
  zIndexInline: 2017
})
*/

export default {
  name: 'SourceHelper',

  data () {
    return {
      options: {
        inline: true,
        button: false,
        navbar: false,
        title: false,
        toolbar: false,
        tooltip: false,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: false,
        fullscreen: false,
        keyboard: true,
        url: 'data-source'
      },
    }
  },
  computed: {
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
  }
}
</script>
