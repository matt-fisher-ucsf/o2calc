<template>
  <v-card style="height:100%;">
    <v-card-text>
      <p style="text-align:left;">{{ $t('Enter your default safe residual pressure') }}</p>
      <v-text-field
        v-model = "pressure_safe_amount"
        v-on:input = "$emit('input', +$event)"
        class="mt-0 pt-0 right"
        style="display:inline-block; width:90px;"
        single-line
        type="number"
        :max=400
        :min=0
        :rules="rules.value"
      ></v-text-field>
      <v-select
        v-model = "pressure_safe_unit"
        solo
        style = "display:inline-block; width: 80px;"
        class = "caption"
        :items = "pressure_unit_types"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'PressureSafe',

  components: {

  },

  data: () => ({
    rules: {
      value: [
        val => {return val >= 0 || `Amount should be 0 or more`},
      ],
    },
    unit_types: ['PSA','Kpa','bars'],
  }),

  computed: {
    ...mapFields([
      'pressure_safe_amount',
      'pressure_safe_unit',
      'pressure_unit_types'
    ]),
  }
}
</script>
