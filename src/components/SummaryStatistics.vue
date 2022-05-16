<template>
  <div>
    <div class="statistic">
      <v-card
        class="red"
        style="background-color: #ec1848 !important;"
        dark
      >
        <v-card-title class="d-flex subtitle-1">{{ $t('stat_usage') }}</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(numberToString(usage))">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(usage) }} </text>
        </svg>
      </v-card>
    </div>
    <div v-if="selected_plant && generator_supply==='Oxygen cylinders'" class="statistic">
      <v-card
        class="purple"
        style="background-color: #716fb2 !important;"
        dark
      >
        <v-card-title class="d-flex subtitle-1">{{ cylinder_type_shortened + ' ' + $t('stat_tanks_day') }}</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(numberToString(tanksperday))">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(tanksperday) }} </text>
        </svg>
      </v-card>
    </div>
    <div class="statistic">
      <v-card
        class="orange"
        style="background-color: #f48024 !important;"
        dark
      >
        <v-card-title class="subtitle-1">{{ $t('stat_supply') }}</v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(supply_fixed)">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(supply_fixed) }} </text>
        </svg>
      </v-card>
    </div>
    <div class="statistic">
      <v-card
        class="orange"
        style="background-color: #f48024 !important;"
        dark
      >
        <v-card-title
          class="subtitle-1"> {{ $t('stat_supply2') }}
        </v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(supply_infinite)">
          <text x="50%" y="90%" text-anchor="middle"> {{ numberToString(supply_infinite) }} </text>
        </svg>
      </v-card>
    </div>
    <div class="statistic">
      <v-card
        class="green "
        style="background-color: #90bd31 !important;"
        dark
      >
        <svg width="100%" height="100%" :viewBox="calcViewbox(indays ? remaining : remaining*24)">
          <text x="50%" y="90%" text-anchor="middle"> {{ indays ? numberToString(remaining) : numberToString(remaining*24) }} </text>
        </svg>
        <v-card-title class="subtitle-1" style="padding-bottom:0px;">
          {{ $t('stat_supply_time') }}
        </v-card-title>
        <v-card-subtitle style="margin-top: -1.75em;">
            <span :class = "indays ? 'text--disabled' : 'font-weight-bold'"> {{ $t('stat_supply_time_hour') }}</span>
            <v-switch dense hide-details v-model="indays" style="display:inline-block;"></v-switch>
            <span :class = "indays ? 'font-weight-bold' : 'text--disabled'">{{ $t('stat_supply_time_day') }}</span>
        </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';

export default {
  name: "SummaryStatistics",

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
      'source',
      'selected_plant',
      'selected_concentrator',
      'generator_supply',
      'indays',
    ]),
    ...mapGetters([
      'cylinder_type_shortened',
      'tanksperday',
      'supply_fixed',
      'supply_infinite',
      'remaining',
    ])
  },
}
</script>

<style scoped>
  .statistic {height: 7em; width: 100%; margin-bottom: 10px;}
  .statistic > .v-card {height: 100%;}
  .statistic >>> svg {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .statistic >>> text {
    fill: rgba(255, 255, 255, 0.7);
  }

  .subtitle-1 {
    padding: 5px;
  }
</style>
