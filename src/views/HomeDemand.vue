<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="9">
        <v-card style="margin-top:1em;" id="step3-patient-need">
          <v-card-title class="title d-print-none" style="color:white;background-color:#0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">{{ $t('step1_title') }}</span>
            {{ $t('How much oxygen does my ward/facility consume per day?') }}
          </v-card-title>
          <v-card-text class="d-print-none" style = "margin-top: 1em;">
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
          <usage-table-editable show-date v-if="entermode3 === 0"/>
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

    <v-row class="d-print-none">
      <v-col cols = "12" sm="9">
        <v-card style="margin-top:1em;" id="step3-patient-need">
          <v-card-title class="title" style="color:white;background-color:#0a182a;">
            <span class="font-weight-bold" style="font-size:1.5rem; padding-right:5px;">{{ $t('step2_title') }}</span>
            {{ $t("How do I want to forecast?") }}
          </v-card-title>
          <v-card-text style = "margin-top: 1em;">
            <v-btn-toggle
              active-class = "v-btn--active-teal"
              mandatory
              borderless
              style = "width: 100%;"
              v-model = "demandmode"
            >
              <div style="width:50%; min-height:44px; height: auto; display:flex; flex-wrap:wrap;">
                <v-btn class="multiline" tile large color="grey" dark style="width:100%; min-height:44px; height: auto;">
                  {{ $t("Model for Me with Step 1 Data and Time Interval") }}
                </v-btn>
              </div>
              <v-tooltip v-if="entermode3 === 1" top max-width="60vw">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    style="width:50%; min-height:44px; height: auto; display:flex; flex-wrap:wrap; cursor: not-allowed;"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-btn
                      class="multiline"
                      tile
                      large
                      color="grey"
                      disabled
                      style="width:100%;"
                    >
                      {{ $t("Allow Me to Enter Daily Data") }}
                    </v-btn>
                  </div>
                </template>
                <span>{{ $t("Option only available") }}</span>
              </v-tooltip>
              <v-btn
                v-else
                class="multiline"
                tile
                large
                color="grey"
                dark
                style="width:50%; min-height:44px; height: auto;"
              >
                {{ $t("Allow Me to Enter Daily Data") }}
              </v-btn>
            </v-btn-toggle>
            <days-demand v-if="demandmode === 0"/>
            <div
              v-else-if="demandmode === 1"
              style = "margin: 0 8px;"
            >
              <usage-table-editable v-if="demandmode === 0"/>
              <v-row>
                <v-col cols="12">
                  <DemandHistoryTable />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <DemandHistoryChart />
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
<v-row id="demand-table-upload-fields" v-if="showUploadFields && demandmode">
  <v-col
    cols="12"
    sm="6"
    md="3"
  >
    <v-select
      :items="countries"
      label="Country"
      v-model="country"
    ></v-select>
  </v-col>
  <v-col
    cols="12"
    sm="6"
    md="2"
  >
    <v-text-field
      label="Facility ID"
      v-model="facility"
    ></v-text-field></v-col>
    
    <v-col    cols="12"
    sm="6"
    md="2"><v-text-field
      label="Facility ID (again)"
      v-model="facility2"
    ></v-text-field></v-col>
      <v-col
    cols="12"
    sm="6"
    md="2"
  >
    <v-text-field
      label="PIN"
      v-model="pin"
    ></v-text-field></v-col>
  <v-col
    cols="12"
    sm="6"
    md="3"
  >
  <v-btn tile x-large outlined @click="upload">
  {{ $t("Upload") }}
</v-btn></v-col>
</v-row>
    <v-row class="justify-center d-print-none">
      <v-btn tile x-large outlined @click="print">
        <icon-print />
        {{ $t('Print') }}
      </v-btn>
      <v-btn tile x-large outlined @click="download">
        <icon-save />
        {{ $t("Save") }}
      </v-btn>
      <v-btn v-if="demandmode" tile x-large outlined @click="showUploadFields = !showUploadFields">
        <icon-upload />
        {{ $t("Save to cloud") }}
      </v-btn>
    </v-row>

  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { csv } from 'd3-fetch';
// @ is an alias to /src

import UsageTable from '@/components/UsageTable.vue'
import UsageTableEditable from '@/components/UsageTableEditable.vue'
import Inpatients from '@/components/Inpatients.vue'
import Proportion from '@/components/Proportion.vue'
import DemandHistoryTable from '@/components/DemandHistoryTable.vue'
import DemandHistoryChart from '@/components/DemandHistoryChart.vue'

import SummaryStatistics from '@/components/SummaryStatisticsDemand.vue'
import SourceHelper from '@/components/SourceHelper4.vue'
import CylinderHelper from '@/components/CylinderHelper.vue'

import DaysDemand from '@/components/DaysDemand.vue'

import IconPrint from '@/components/IconPrint.vue'
import IconSave from '@/components/IconSave.vue'
import IconUpload from '@/components/IconUpload.vue'

const download_csv = function(arr) {
  var str = '';
  arr.forEach(rw => {
    let line = '';
    line = rw.join(",");
    str += line + '\r\n';
  });
  var blob = new Blob([str], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'oxygen_demand_history.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default {
  name: 'HomeDemand',

  components: {
    CylinderHelper,
    UsageTable,
    UsageTableEditable,
    DemandHistoryTable,
    DemandHistoryChart,
    Inpatients,
    Proportion,
    SummaryStatistics,
    SourceHelper,
    DaysDemand,
    IconPrint,
    IconSave,
    IconUpload
  },

  data: () => ({
    supply_type: null,
    expanded_source: [],
    supply_type_plant: null,
    supply_type_liquid: null,
    supply_type_concentrator: null,
    showUploadFields: false,
    countries: ['Ecuador', 'Vietnam', 'US'],
    country: '',
    facility: '',
    facility2: '',
    pin: ''
  }),

  computed: {
    ...mapFields([
      'selected_plant_demand',
      'selected_concentrator_demand',
      'selected_liquid_demand',
      'selected_cylinder_demand',
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
      'supply_types',
      'cylinder_types',
      'cylinder_type',

      'amount_plant_demand',
      'unit_plant_demand',
      'period_plant_demand',
      'days_demand',

      'demandmode',

      'patient_table_history',
    ]),
    formattedCsv(arr){
      var str = '';
      arr.forEach(rw => {
        let line = '';
        line = rw.join(",");
        str += line + '\r\n';
      });
    return str
    }

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
    supply_type_plant: function() {
      if(this.supply_type_plant !== null) {
        this.amount_plant_demand = this.supply_type_plant.cbh
        this.unit_plant_demand = "cubic meters"
        this.period_plant_demand = "per hour"
      }
    },
    entermode3: function() {
      if(this.entermode3 === 1) {
        this.demandmode = 0;
      }
    },
  },

  methods: {
    get_supply_types: function(source) {
      let types = this.supply_types ? this.supply_types.filter((d) => d.Manufacturer !== '') : []
      if(types.length === 0) {
        return types
      }
      if(source === "plant") {
        return types.filter( d => d["Oxygen supply type"] === "PSA Plant" || d["Oxygen supply type"] === "VSA Plant" || d["Oxygen supply type"] === "")
      }
      if(source === "concentrator") {
        return types.filter( d => d["Oxygen supply type"] === "Portable PSA" || d["Oxygen supply type"] === "")
      }
      if(source === "liquid") {
        return types.filter( d => d["Oxygen supply type"] === "Liquid Oxygen" || d["Oxygen supply type"] === "")
      }
    },
    print: function() {window.print()},
    download: function() {
      let export_dat = [["date", "device", "rate", "leak", "bias", "fio2", "rr", "expiratory", "liters", "patients"].map(x => this.$t(x))]

      Object.entries(this.patient_table_history).forEach( d => {
        if(Array.isArray(d[1]) && d[1].length > 0) {
          d[1].forEach(rw => {
            let dt = d[0]
            let row = [dt]
            const fields = ["device", "rate", "leak", "bias", "fio2", "rr", "expiratory", "liters", "patients"]
            fields.forEach( (ky) => {
              row.push(rw[ky])
            })
            export_dat.push(row)
          })
        }
      })
      download_csv(export_dat)
    },
    upload: function() {
      let export_dat = [["date", "device", "rate", "leak", "bias", "fio2", "rr", "expiratory", "liters", "patients"].map(x => this.$t(x))]

      Object.entries(this.patient_table_history).forEach( d => {
        if(Array.isArray(d[1]) && d[1].length > 0) {
          d[1].forEach(rw => {
            let dt = d[0]
            let row = [dt]
            const fields = ["date", "device", "rate", "leak", "bias", "fio2", "rr", "expiratory", "liters", "patients"]
            fields.forEach( (ky) => {
              row.push(rw[ky])
            })
            export_dat.push(row)
          })
        }
      })

      var postBody = ''

      export_dat.forEach(rw => {
        let line = ''
        line = rw.join(",")
        postBody += line + '~~'
      })

      const requestOptions = {
          method: 'POST'
        }
    const postUrl ='https://clstest3.ucsf.edu/nexus/api/o2/o2-server.php?country=' + this.country.toLowerCase() + '&facility=' + this.facility + '&facility2=' + this.facility2 + '&pin=' + this.pin + '&id=2bedc362-89a5-4879-87c1-875fd46e051f&payload=' + postBody
      fetch(postUrl, requestOptions)
      .then(async response => {
          const data = await response.json()
          console.log(data, this.postUrl, postBody)
      })
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