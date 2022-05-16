<template>
  <v-icon dark>{{ svgPath }}</v-icon>
</template>

<script>
  import { mdiDownload } from '@mdi/js'

  export default {
    data: () => ({
      svgPath: mdiDownload
    }),
  }
</script>