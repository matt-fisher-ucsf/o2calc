<template>
  <div>
    <div class="statistic">
      <v-card
        class="accent"
        light
      >
        <v-card-title class="d-flex subtitle-1">{{ $t('Consumption per Day') }} ({{ $t('liters') }})</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(numberToString(usage) + ' L')">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(usage) + ' L' }} </text>
        </svg>
      </v-card>
    </div>

    <div class="statistic">
      <v-card
        class="accent"
        light
      >
        <v-card-title class="d-flex subtitle-1">{{ $t('Consumption per Day') }} ({{ $t('cubic meters') }})</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(numberToString(usage / 1000) + ' m³')">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(usage / 1000) + ' m³' }} </text>
        </svg>
      </v-card>
    </div>

    <div class="statistic">
      <v-card
        class="accent"
        light
      >
        <v-card-title class="d-flex subtitle-1">{{ $t('Consumption per') }} {{numberToString(days_demand)}} {{days_demand > 1 ? $t('days') : $t('day')}} ({{ $t('liters') }})</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(numberToString(usage * days_demand) + ' L')">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(usage * days_demand) + ' L' }} </text>
        </svg>
      </v-card>
    </div>

    <div class="statistic">
      <v-card
        class="accent"
        light
      >
        <v-card-title class="d-flex subtitle-1">{{ $t('Consumption per') }} {{numberToString(days_demand)}} {{days_demand > 1 ? $t('days') : $t('day')}} ({{ $t('cubic meters') }})</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(numberToString(usage * days_demand / 1000) + ' m³')">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(usage * days_demand / 1000) + ' m³' }} </text>
        </svg>
      </v-card>
    </div>

  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: "SummaryStatisticsDemand",

  methods: {
    numberToString: (x) => (
      isNaN(x) ?
        '--' :
        x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
    ),
    calcViewbox: function(x) {
      return isNaN(x) || typeof(x) === "undefined" ?
        "0 0 40 50" :
        "0 0 " + this.numberToString(x).length * 10 + " 50"
    }
  },

  data: () => ({}),

  computed: {
    ...mapFields([
      'usage',
      'days_demand',
    ]),
  },
}
</script>

<style scoped>
  .statistic {height: 7em; width: 100%; min-width: 250px; margin-bottom: 10px;}
  .statistic > .v-card {height: 100%;}
  .statistic >>> svg {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .statistic >>> text {
    fill: rgba(0,0,0,1);
  }

  .subtitle-1 {
    padding: 5px;
  }
</style>
