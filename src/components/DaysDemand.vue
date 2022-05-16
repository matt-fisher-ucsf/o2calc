<template>
  <div style="display:flex; padding-bottom:0.5em;">
    <v-subheader style="text-align:left; width:35%; height:auto; padding-right:0px; padding-left:8px;">
      {{ $t('Number of days') }} (1-100)
    </v-subheader>
    <v-slider
      v-model = "days_demand"
      v-on:input = "$emit('input', $event)"
      class="align-center"
      :max = "max"
      :min = "min"
      hide-details
      color = "#178ccb"
      thumb-color = "#178ccb"
    >
      <template v-slot:append>
        <v-text-field
          v-model = "days_demand"
          v-on:input = "$emit('input', +$event)"
          class="mt-0 pt-0 right"
          single-line
          type="number"
          style="width: 80px;"
          :max="max"
          :min="min"
          :rules="rules.value"
        ></v-text-field>
      </template>
    </v-slider>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'DaysDemand',

  data: () => ({
    min: 1,
    max: 100,
    rules: {
      value: [
        val => {return val >= 1 && val <= 100 || `Amount should be between 1 and 100`}
      ],
    }
  }),

  computed: {
    ...mapFields([
      'days_demand'
    ])
  },
}
</script>