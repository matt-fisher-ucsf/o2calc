<template>
  <div>
    <div class="statistic">
      <v-card
        class="orange d-flex flex-column justify-center"
        style="background-color: #f48024 !important;"
        dark
      >
        <v-card-title class="subtitle-1">
          {{ $t('Liters available in cylinder at current pressure') }}
        </v-card-title>
        <svg width="100%" height="100%" :viewBox="calcViewbox(remaining_quantity_duration)">
          <text x="50%" y="50%" text-anchor="middle"> {{ numberToString(remaining_quantity_duration) }} </text>
        </svg>
      </v-card>
    </div>
    <div class="statistic">
      <v-card
        class="green  d-flex flex-column justify-center"
        style="background-color: #90bd31 !important;"
        dark
      >
        <v-card-title class="subtitle-1" style="padding-bottom:0px;">
          {{ $t('Supply will last') }}
        </v-card-title>
        <v-card-subtitle style="margin-top: -1.75em;">
            <span :class = "inhours ? 'text--disabled' : 'font-weight-bold'">{{ $t('minutes') }}</span>
            <v-switch dense hide-details v-model="inhours" style="display:inline-block;"></v-switch>
            <span :class = "inhours ? 'font-weight-bold' : 'text--disabled'">{{ $t('hours') }}</span>
        </v-card-subtitle>
        <svg width="100%" height="100%" :viewBox="calcViewbox(remaining_time_duration)">
          <text x="50%" y="50%" text-anchor="middle"> {{ inhours ? numberToString(remaining_time_duration/60) : numberToString(remaining_time_duration) }} </text>
        </svg>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';

export default {
  name: "SummaryStatisticsDuration",

  methods: {
    numberToString: (x) => (
      isNaN(x) ?
        '--' :
        x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
    ),
    calcViewbox: function(x) {
      return isNaN(x) || typeof(x) === "undefined" ?
        "0 0 40 25" :
        "0 0 " + this.numberToString(x).length * 10 + " 25"
    }
  },

  data: () => ({}),

  computed: {
    ...mapFields([
      'usage',
      'source',
      'inhours',
    ]),
    ...mapGetters([
      'tanksperday_duration',
      'remaining_quantity_duration',
      'remaining_time_duration'
    ])
  },
}
</script>

<style scoped>
  .statistic {height: 10em; width: 100%; margin-bottom: 10px;}
  .statistic > .v-card {height: 100%;}
  .statistic >>> text {
    fill: rgba(255, 255, 255, 0.7);
  }
</style>
