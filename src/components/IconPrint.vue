<template>
  <v-icon dark>{{ svgPath }}</v-icon>
</template>

<script>
  import { mdiPrinter } from '@mdi/js'

  export default {
    data: () => ({
      svgPath: mdiPrinter
    }),
  }
</script>