<template>
  <v-card style="height:100%;">
    <v-card-text>
      <p style="text-align:left;">{{ $t('Select device') }}</p>
      <v-select
        v-model="device_type"
        solo
        style="display:inline-block; width: 250px;"
        class="caption"
        :items="device_types"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'DeviceTypes',

  components: {
  },

  data: () => ({
    rules: {
      value: [
        val => {return val >= 0 || `Amount should be 0 or more`},
      ],
    },
  }),

  computed: {
    ...mapFields([
      'device_types',
      'device_type',
    ]),
  }
}
</script>
