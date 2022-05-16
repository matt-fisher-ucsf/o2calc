<template>
  <div style="display:flex;">
    <v-subheader style="text-align:left; width:35%; height:auto; padding-right:0px; padding-left:8px;">
      {{ $t('step3_ward_hypoxemia') }}
    </v-subheader>
    <v-slider
      v-model = "distribution"
      v-on:input = "$emit('input', $event)"
      class="align-center small-ticks"
      :max = "max"
      :min = "min"
      tick-size = 4
      :tick-labels = ticks_labels[locale]
      step = 1
      hide-details
      color = "#178ccb"
      thumb-color = "#178ccb"
    >
    </v-slider>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Proportion',

  data: () => ({
    min: 0,
    max: 4,
    ticks_labels: {
      en: ['Less Severe','','','','More Severe'],
      es: ['Menos severa','','','','Más severa'],
      vn: ['Ít nghiêm trọng','','','','Rất nghiêm trọng'],
    }
  }),

  computed: {
    ...mapFields([
      'distribution',
      'locale'
    ])
  },
}
</script>

<style>
  .v-input__slider.small-ticks .v-slider__tick-label {
    font-size: 0.7rem;
  }
</style>