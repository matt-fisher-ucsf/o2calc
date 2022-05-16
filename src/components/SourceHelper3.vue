<template>
  <div v-on:click.stop class="viewer-wrapper" style="height:90vh; overflow:hidden; width: 100%; max-width: 600px;">
    <img-view imgUrl="Oxygen-Source-Type.jpg"></img-view>
  </div>
</template>

<script>
import imgView from 'vue-img-view'
import Vue from 'vue'

Vue.use(imgView)

export default {

  name: 'SourceHelper',

  data: () => ({}),

}
</script>
