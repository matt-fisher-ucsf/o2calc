<template>
  <v-icon x-small color="#ccc">{{ svgPath }}</v-icon>
</template>

<script>
  import { mdiPencil } from '@mdi/js'

  export default {
    data: () => ({
      svgPath: mdiPencil
    }),
  }
</script>