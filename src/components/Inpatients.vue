<template>
  <div style="display:flex; padding-bottom:0.5em;">
    <v-subheader style="text-align:left; width:35%; height:auto; padding-right:0px; padding-left:8px;">
      {{ $t('step3_ward_inpatients') }}
    </v-subheader>
    <v-slider
      v-model = "num_inpatients"
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
          v-model = "num_inpatients"
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
  name: 'Inpatients',

  data: () => ({
    min: 0,
    max: 1000,
    rules: {
      value: [
        val => {return val >= 0 && val <= 1000 || `Amount should be between 0 and 1000`}
      ],
    }
  }),

  computed: {
    ...mapFields([
      'num_inpatients'
    ])
  },
}
</script>