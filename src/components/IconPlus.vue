<template>
  <v-icon dark>{{ svgPath }}</v-icon>
</template>

<script>
  import { mdiPlus } from '@mdi/js'

  export default {
    data: () => ({
      svgPath: mdiPlus
    }),
  }
</script>