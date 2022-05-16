<template>
  <v-container fluid>
    <v-row>
      <!--stepper-input /-->
      <v-col cols="12" sm="9">
        <v-card style="margin-bottom:1em;">
          <v-card-title class="title" style="color:white;background-color:#0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">{{ $t('step1_title') }}</span>
            <span>{{ $t('step1_description') }}</span>
            <span style="white-space:pre;"> (<a v-on:click="showoverlay = true" style="color:#178ccb;">{{ $t('step1_unsure') }}</a>)</span>
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="source"
              :items="sources"
              :label="$t('step1_source')"
            >
              <template v-slot:selection="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ $t(data.item) }}
              </template>
              <template v-slot:item="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ $t(data.item) }}
              </template>
            </v-select>
            <v-select
              v-model="supply_type"
              v-if="source !== 'Oxygen Cylinders'"
              :items="supply_types ? get_supply_types() : []"
              :label="$t('Select manufacturer and model')"
            >
              <template v-slot:selection="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
              <template v-slot:item="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
            </v-select>
          </v-card-text>
        </v-card>
        <liquid v-if="source === 'Liquid Oxygen (VIE)'" />
        <plant v-else-if="source === 'Oxygen Plant (PSA)'" />
        <cylinder v-else-if="source === 'Oxygen Cylinders'" />
        <concentrator v-else-if="source === 'Portable Oxygen Concentrator (PSA)'" />
        <v-card style="margin-top:1em;" id="step3-patient-need">
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
              <div style="width:50%; min-height:44px; height: auto; display:flex; flex-wrap:wrap;">
                <v-btn class="multiline" tile large color="grey" dark style="width:100%; min-height:44px; height: auto;" v-html="$t('step3_estimate')">
                </v-btn>
                <v-overflow-btn
                  v-model = "entermode3b"
                  v-if="entermode3 === 0"
                  class = "heightauto"
                  style = "width: 100%; padding:0; margin:0; font-size:14px;"
                  block
                  :items="entermode3b_options"
                  label=""
                  target="#step3-patient-need"
                >
                  <template v-slot:selection="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    {{ $t(data.item) }}
                  </template>
                  <template v-slot:item="data">
                    <!-- HTML that describe how select should render items when the select is closed -->
                    {{ $t(data.item) }}
                  </template>
                </v-overflow-btn>
              </div>
              <v-btn class="multiline" tile large color="grey" dark style="width:50%; min-height:44px; height: auto;">
                {{ $t('step3_manual') }}
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
          <usage-table v-if="entermode3 === 1"/>
          <max-table v-else-if="entermode3 === 0 && entermode3b === 'Max # of patients by device type'"/>
          <div
            v-else-if="entermode3 === 0 && entermode3b === 'Modeled Ward Scenario'"
            style = "margin: 0 8px;"
          >
            <inpatients />
            <proportion />
            <usage-table />
          </div>
        </v-card>
      </v-col>
      <v-col xs="12" class="d-sm-none">
        <summary-statistics />
      </v-col>
      <v-col sm="3" class="d-none d-sm-flex statistic-container" justify="center">
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

import Liquid from '@/components/Liquid.vue'
import Plant from '@/components/Plant.vue'
import Cylinder from '@/components/Cylinder.vue'
import Concentrator from '@/components/Concentrator.vue'
//import UsageSheet from '@/components/UsageSheet.vue'
import UsageTable from '@/components/UsageTable.vue'
import Inpatients from '@/components/Inpatients.vue'
import Proportion from '@/components/Proportion.vue'
/*
import StepperInput from '@/components/StepperInput.vue'
*/
import MaxTable from '@/components/MaxTable.vue'
import SummaryStatistics from '@/components/SummaryStatistics.vue'
import SourceHelper from '@/components/SourceHelper4.vue'
import CylinderHelper from '@/components/CylinderHelper.vue'

export default {
  name: 'HomeSupply',

  components: {
    //StepperInput,
    Liquid,
    Plant,
    Cylinder,
    CylinderHelper,
    Concentrator,
    //UsageSheet,
    UsageTable,
    Inpatients,
    Proportion,
    MaxTable,
    SummaryStatistics,
    SourceHelper,
  },

  data: () => ({
    supply_type: null,
  }),

  computed: {
    ...mapFields([
      'entermode3',
      'entermode3b',
      'entermode3b_options',
      'showoverlay',
      'showoverlay_cylinder',
      'sources',
      'source',
      'usage',
      'distribution',
      'period',
      'leakage',
      'supply_types'
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
        if(this.source === "Oxygen Plant (PSA)") {
          this.$store.commit('changeAmount', this.supply_type.cbh)
          this.$store.commit('changeUnitPlant', "cubic meters")
          this.$store.commit('changePeriodPlant', "per hour")
        }
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
    entermode3: function() {
      if(this.entermode3 === 0 && this.entermode3b === 'Max # of patients by device type') {
        this.usage = 0;
      }
    },
    entermode3b: function() {
      if(this.entermode3 === 0 && this.entermode3b === 'Max # of patients by device type') {
        this.usage = 0;
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
      .finally(function(e) {console.log(e)})
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