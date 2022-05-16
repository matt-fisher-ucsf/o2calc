<template>
  <div class = "summary-text">
    <!--p style="padding: 8px;">
      {{ $t('Your') }}
      {{ $t(source) }} {{source === "Oxygen Cylinders" ? 'have capacity for' : $t('produces')}}
      {{numberToString(supply_fixed)}}
      {{source === 'Liquid Oxygen (VIE)' || source === 'Oxygen Cylinders'  ? 'L' : $t('L/day') }}
      {{$t('which is')}}
      <span class="font-weight-bold">{{supply_fixed > usage ? $t('adequate') : $t('inadequate')}}</span>
      {{$t('and')}}
      {{supply_fixed > usage ? $t('more') : $t('less')}}
      {{$t('than the')}}
      {{numberToString(usage)}} {{$t('liters per day')}} (L/d) {{$t('oxygen required')}},
      {{$t('and will last')}} {{ indays ? numberToString(remaining) : numberToString(remaining*24) }}
      {{ indays ? $t('days') : $t('hours') }}.
    </p-->
    <p style="padding: 8px;">
      {{$t('Your fixed supply is')}} {{numberToString(supply_fixed)}} L, {{$t('and generated supply is')}}
      {{numberToString(supply_infinite)}} L/day.
      <span v-if = "supply_infinite > 0 && supply_infinite > usage">{{$t('Generated supply exceeds oxygen required.')}}</span>
      <span v-if = "supply_infinite > 0 && supply_infinite < usage && supply_fixed === 0">{{$t('Generated supply is inadequate for required oxygen')}}.</span>
      <span v-if = "supply_infinite > 0 && supply_infinite < usage && supply_fixed > 0">{{$t('Generated supply is inadequate for required oxygen')}}, {{$t('and fixed supply will last')}} {{indays ? numberToString(remaining) : numberToString(remaining*24)}} {{indays ? $t('days') : $t('hours')}}.</span>
      <span v-if = "supply_infinite === 0 && supply_fixed > 0">{{$t('Fixed supply will last')}} {{indays ? numberToString(remaining) : numberToString(remaining*24)}} {{indays ? $t('days') : $t('hours')}}.</span>
    </p>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';

export default {
  name: "SummaryText",

  methods: {
    numberToString: (x) => (
      isNaN(x) ?
        '--' :
        x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
    ),
  },

  data: () => ({}), 
  
  computed: {
    ...mapFields([
      'usage',
      'source',
      'generator_supply',
      'indays'
    ]),
    ...mapGetters([
      'tanksperday',
      'supply_fixed',
      'supply_infinite',
      'remaining',
    ])
  }
}
</script>

<style scoped>
  .summary-text {
    font-size: 1.3rem;
    background-color: #18a3ac;
    color: white;
    margin-top: -6px;
    margin-right: -16px;
    margin-left: -16px;
    width: 100vw;
    text-align: center;
    border-bottom: 4px solid white;
  }
</style>