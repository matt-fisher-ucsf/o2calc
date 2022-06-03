<template>
  <v-icon dark>{{ svgPath }}</v-icon>
</template>

<script>
  import { mdiCloudUpload } from '@mdi/js'

  export default {
    data: () => ({
      svgPath: mdiCloudUpload
    }),
  }
</script>