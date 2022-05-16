<template>
  <v-container fluid>
    <v-row>
      <!--stepper-input /-->
      <v-col cols="12" md="9">
        <v-card style="margin-bottom:1em;">
          <v-card-title class="title" style="color:white;background-color:#0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">{{ $t('step1_title') }}</span>
            <span>{{ $t('step1_description') }}</span>
            <span style="white-space:pre;"> (<a v-on:click="showoverlay = true" style="color:#178ccb;">{{ $t('step1_unsure') }}</a>)</span>
          </v-card-title>
          <v-card-text>
            <multi-source />
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="title" style="color:white; background-color: #0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">{{ $t('step2_title') }}</span>
            {{ $t('step2_description') }}
          </v-card-title>
          <v-expansion-panels multiple focusable v-model="expanded_source">
            <plant v-if="selected_plant === true" />
            <concentrator v-if="selected_concentrator === true" />
            <liquid v-if="selected_liquid === true" />
            <cylinder v-if="selected_cylinder === true" />
          </v-expansion-panels>
        </v-card>

        <v-card style="margin-top:1em;" id="step3-patient-need" v-show="!supply_show_demand">
          <v-card-title class="title" style="color:white;background-color:#0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">
              Would you like to estimate how long this supply will last based on your needs?
            </span>
          </v-card-title>
          <v-card-text>
            <v-btn block @click="supply_show_demand=true">
              Calculate Demand
            </v-btn>
          </v-card-text> 
        </v-card>

        <v-card style="margin-top:1em;" id="step3-patient-need" v-show="supply_show_demand">
          <v-card-title class="title" style="color:white;background-color:#0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">{{ $t('step3_title') }}</span>
            {{ $t('step3_description') }}
          </v-card-title>
          <v-card-text style = "margin-top: 1em;">
            <v-btn-toggle
              active-class = "v-btn--active-teal"
              mandatory
              borderless
              style = "width: 100%;"
              v-model = "entermode3"
            >
              <v-btn class="multiline" tile large color="grey" dark style="width:50%; min-height:44px; height: auto;">
                {{ $t('step3_manual') }}
              </v-btn>
              <div style="width:50%; min-height:44px; height: auto; display:flex; flex-wrap:wrap;">
                <v-btn class="multiline" tile large color="grey" dark style="width:100%; min-height:44px; height: auto;" v-html="$t('demand_table_estimate')">
                </v-btn>
              </div>
            </v-btn-toggle>
          </v-card-text>
          <usage-table-editable :show-date = "false" v-if="entermode3 === 0" />
          <div
            v-else-if="entermode3 === 1"
            style = "margin: 0 8px;"
          >
            <inpatients />
            <proportion />
            <usage-table />
          </div>
        </v-card>
      </v-col>
      <v-col sm="12" class="d-md-none">
        <summary-statistics />
      </v-col>
      <v-col md="3" class="d-none d-md-flex statistic-container" justify="center">
        <summary-statistics />
      </v-col>
      <v-overlay :value="showoverlay" v-on:click.native="showoverlay = false">
        <v-btn
          icon
          @click="showoverlay = false"
        >
          x
        </v-btn>
        <source-helper />
      </v-overlay>
      <v-overlay :value="showoverlay_cylinder" v-on:click.native="showoverlay_cylinder = false">
        <v-btn
          icon
          @click="showoverlay_cylinder = false"
        >
          x
        </v-btn>
        <cylinder-helper />
      </v-overlay>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { csv } from 'd3-fetch';
// @ is an alias to /src

import MultiSource from '@/components/MultiSource.vue'
import Liquid from '@/components/Liquid.vue'
import Plant from '@/components/Plant.vue'
import Cylinder from '@/components/Cylinder.vue'
import Concentrator from '@/components/Concentrator.vue'

import UsageTable from '@/components/UsageTable.vue'
import UsageTableEditable from '@/components/UsageTableEditable.vue'
import Inpatients from '@/components/Inpatients.vue'
import Proportion from '@/components/Proportion.vue'

import SummaryStatistics from '@/components/SummaryStatistics.vue'
import SourceHelper from '@/components/SourceHelper4.vue'
import CylinderHelper from '@/components/CylinderHelper.vue'

export default {
  name: 'HomeSupply',

  components: {
    MultiSource,
    Liquid,
    Plant,
    Cylinder,
    CylinderHelper,
    Concentrator,
    UsageTable,
    UsageTableEditable,
    Inpatients,
    Proportion,
    SummaryStatistics,
    SourceHelper,
  },

  data: () => ({
    supply_type: null,
    expanded_source: []
  }),

  computed: {
    ...mapFields([
      'selected_plant',
      'selected_concentrator',
      'selected_liquid',
      'selected_cylinder',
      'entermode3',
      'showoverlay',
      'showoverlay_cylinder',
      'sources',
      'source',
      'usage',
      'distribution',
      'period',
      'leakage',
      'supply_types',
      'supply_show_demand',
      'calculator'
    ])
  },

  watch: {
    source: function() {
      if(this.source === 'Portable Oxygen Concentrator (PSA)') {
        // change to per minute default for concentrator
        this.period = 'per minute'
        // set leakage to 0 with concentrator since we will not include this input
        this.leakage = 0
      }
    },
    supply_type: function() {
      if(this.supply_type !== null) {
        if(this.source === "Portable Oxygen Concentrator (PSA)") {
          this.$store.commit('changeAmount', this.supply_type.lpm)
          this.$store.commit('changeUnit', "liters")
        }
        if(this.source === "Liquid Oxygen (VIE)") {
          this.$store.commit('changeAmount', this.supply_type.lpm)
          this.$store.commit('changeUnit', "liters")
        }
      }
    },
  },

  methods: {
    get_supply_types: function() {
      let types = this.supply_types ? this.supply_types.filter((d) => d.Manufacturer !== '') : []
      if(types.length === 0) {
        return types
      }
      if(this.source === "Oxygen Plant (PSA)") {
        return types.filter( d => d["Oxygen supply type"] === "PSA Plant" || d["Oxygen supply type"] === "")
      }
      if(this.source === "Portable Oxygen Concentrator (PSA)") {
        return types.filter( d => d["Oxygen supply type"] === "Portable PSA" || d["Oxygen supply type"] === "")
      }
      if(this.source === "Liquid Oxygen (VIE)") {
        return types.filter( d => d["Oxygen supply type"] === "Liquid Oxygen" || d["Oxygen supply type"] === "")
      }
    }
  },

  mounted: function() {
    let instance = this;
    csv('./supply_types.csv')
      .then( (result) => {
        instance.supply_types = result
      })
      .finally(function(e) {e})
  },

  beforeRouteEnter: (to, from, next) => {
    let name = to.name.toLowerCase()
    let lang = to.query.lang
    next(vm => {
      vm.$store.commit('changeCalculator', name)
      vm.$store.commit('changeLocale', lang)
    })
  }
}
</script>

<style scoped>
  .statistic-container {
    max-height: 85vh;
    position: -webkit-sticky;
    position: sticky;
    top: 4rem;
  }
</style>