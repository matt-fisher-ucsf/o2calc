<template>
  <v-card style="height:100%;">
    <v-card-text>
      <p style="text-align:left;">{{ $t('Select flow rate (LPM)') }}</p>
      <v-text-field
        v-model = "flow_rate_device"
        v-on:input = "$emit('input', +$event)"
        class="mt-0 pt-0 right"
        single-line
        type="number"
        style="width: 80px;"
        :min=0
        :rules="rules.value"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'FlowRateDevice',

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
      'flow_rate_device'
    ]),
  }
}
</script>
