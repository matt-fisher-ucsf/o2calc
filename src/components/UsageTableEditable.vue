<template>
  <div>
    <v-dialog
      v-model="showdialog"
      max-width="80%"
      width="400"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t("Save") }}
        </v-card-title>

        <v-card-text>
          {{ dialogtext }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="updateTableFromHistory"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="savePatientTableHistory"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="demandsnackbar"
      :timeout="2000"
      right
    >
      {{ demandsnackbartext }}
    </v-snackbar>
    <v-card-text>
      <v-row v-if="showDate" style="align-items:center;">
        <v-col style = "max-width: 15em;">
          <v-menu
            ref="menu"
            v-model="datemenu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                :label="$t('Date of Demand')"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :events="Object.entries(patient_table_history).filter(d => Array.isArray(d[1]) && d[1].length > 0).map(d => d[0])"
              event-color="green lighten-1"
              no-title
              scrollable
            >
              <!--v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="datemenu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn-->
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-btn @click="savePatientTableHistory">{{ $t("Save") }}</v-btn>
        </v-col>
      </v-row>

      <v-data-table
        dense
        mobile-breakpoint="0"
        disable-filtering
        disable-pagination
        disable-sort
        :hide-default-footer="true"
        :headers="headers"
        :items="patient_table"
        class = "custom-header"
      >
        <template v-slot:footer>
          <v-row
            align="center"
            justify="space-around"
          >
            <v-btn color="cyan" dark @click="addRow">{{ $t("Add device") }}</v-btn>
          </v-row>
        </template>
        <template v-slot:header.patients="{header}">
          <span>
            {{ $t(header.text) }}
          </span>
        </template>
        <template v-slot:header.device="{header}">
          <span>
            {{ $t(header.text) }}
          </span>
        </template>
        <template v-slot:header.flow="{header}">
          <span>
            {{ $t(header.text) }}
          </span>
        </template>
        <template v-slot:header.rate="{header}">
          <span>
            {{ $t(header.text) }} <br/> {{ $t('per Device') }}
          </span>
        </template>
        <template v-slot:header.liters="{header}">
          <span>
            {{ $t(header.text) }} <br/> {{ $t('all Patients') }}
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small color="#ccc" @click="deleteRow(item)">{{ mdiDelete }}</v-icon>
        </template>
        <template v-slot:item.device="{ item }">
          <div style="display:flex;">
            <v-select
              style = "max-width: 250px; margin-bottom: 0.5em;"
              :items="defaults"
              item-value="item.text"
              v-model="item.device"
              hide-details
              dense
              @change="updateItem(item)"
            >
              <template v-slot:selection="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ $t(data.item.text) }}
              </template>
              <template v-slot:item="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ $t(data.item.text) }}
              </template>
              <template v-slot:append-outer>
                <v-tooltip v-if="item.device === 'UCL Ventura Mark II'" top max-width="60vw">
                  <template v-slot:activator="{ on, attrs }">
                    <a 
                      target="_blank"
                      href="https://www.ucl.ac.uk/healthcare-engineering/sites/healthcare-engineering/files/ucl_ventura_mark_ii_healthy_volunteer_tests_200420.pdf"
                    >
                      <v-icon
                        medium
                        color="warning"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ mdiInformationOutline }}
                      </v-icon>
                    </a>
                  </template>
                  <span>{{$t('ucl venturi tooltip')}}</span>
                </v-tooltip>
              </template>
            </v-select>
          </div>
          <span
            class="grey--text"
            style="font-size:90%;"
            v-if = 'item.device === "Ventilator" || item.device === "CPAP or NIPPV"'
          >
            @ {{item.rate}} (LPM) minute ventilation,
          </span>
          <span
            class="grey--text"
            style="font-size:90%;"
            v-if = 'item.device === "High Flow Nasal Cannula"'
          >
            @ {{item.rate}} (LPM) flow rate,
          </span>
          <span
            class="grey--text"
            style="font-size:90%;"
            v-if = 'item.device === "Ventilator" || item.device === "CPAP or NIPPV"'
          >
            {{item.bias}} (LPM) bias flow,
          </span>
          <span
            class="grey--text"
            style="font-size:90%;"
            v-if = 'item.device === "CPAP or NIPPV"'
          >
            Leak {{item.leak}} (LPM),
          </span>
          <span
            class="grey--text"
            style="font-size:90%;"
            v-if = 'item.device === "Ventilator" || item.device === "CPAP or NIPPV" || item.device === "High Flow Nasal Cannula"'
          >
            FiO₂ {{item.fio2}}
          </span>
        </template>
        <template v-slot:item.patients="props">
          <v-edit-dialog
            :return-value.sync="props.item.patients"
            large
            persistent
          >
            <div style = "width: 80px;">
              <div style="display:inline-block;width: 35px;">{{ props.item.patients }}</div>
              <div style="display:inline-block;width: 30px;font-size: 0.7rem;" class="grey--text"> {{` ${(props.item.patients / sum_patients * 100 || 0).toFixed(0)}%` }}</div>
              <icon-pencil/>
            </div>
            <template v-slot:input>
              <div class="mt-4 subtitle">Edit # Patients</div>
              <v-text-field
                class="right"
                style="display:inline-block; width:90px;"
                v-model="props.item.patients"
                type="number"
                inputmode="numeric"
                min="0"
                :rules="rules.value"
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.rate="{ item }">
          {{ numberToString(calcFlow(item)) }}
        </template>

        <template v-slot:item.flow="props">
          <v-edit-dialog
            :return-value.sync="props.item.rate"
            large
          >
            <div><icon-pencil/></div>
            <template v-slot:input>
              <div class="mt-4 subtitle">
                {{ props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV" ? "Edit Vent Parameters" : "Edit Flow Rate" }}
              </div>
              <div>
                <v-text-field
                  class="right"
                  style="display:inline-block; width:90px;"
                  v-model="props.item.rate"
                  type="number"
                  inputmode="numeric"
                  min="0"
                  :rules="rules.value"
                  :label='props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV" ? "Minute Ventilation" : "Flow Rate (LPM)"'
                ></v-text-field>
              </div>
              <div v-if = 'props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV"'>
                <v-text-field
                  class="right"
                  style="display:inline-block; width:90px;"
                  v-model = "props.item.bias"
                  type="number"
                  inputmode="numeric"
                  min="0"
                  :rules="rules.value"
                  label="Bias Flow"
                ></v-text-field>
              </div>
              <div v-if = 'props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV"'>
                <v-text-field
                  class="right"
                  style="display:inline-block; width:90px;"
                  v-model="props.item.leak"
                  type="number"
                  inputmode="numeric"
                  min="0"
                  :rules="rules.value"
                  label="Circuit Leak"
                ></v-text-field>
              </div>
              <div v-if = 'props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV" || props.item.device === "High Flow Nasal Cannula"'>
                <div class="sliderlabel">
                  FiO₂
                </div>
                <v-slider
                  v-model = "props.item.fio2"
                  v-on:input = "$emit('input', $event)"
                  class="align-center"
                  max = 1
                  min = 0.21
                  step = 0.01
                  hide-details
                  color = "#178ccb"
                  thumb-color = "#178ccb"
                  style = "min-width: 200px;"
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model = "props.item.fio2"
                      v-on:input = "$emit('input', +$event)"
                      class="mt-0 pt-0 right"
                      single-line
                      type="number"
                      style="width: 80px;"
                      max="1"
                      min="0"
                      step="0.1"
                      :rules="rules.fio2"
                    ></v-text-field>
                  </template>
                </v-slider>
              </div>
              <div v-if = 'props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV"'>
                <div class="sliderlabel">
                  RR
                </div>
                <v-slider
                  v-model = "props.item.rr"
                  v-on:input = "$emit('input', $event)"
                  class="align-center"
                  max = 60
                  min = 0
                  hide-details
                  color = "#178ccb"
                  thumb-color = "#178ccb"
                  style = "min-width: 200px;"
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model = "props.item.rr"
                      v-on:input = "$emit('input', +$event)"
                      class="mt-0 pt-0 right"
                      single-line
                      type="number"
                      style="width: 80px;"
                      max="60"
                      min="0"
                      :rules="rules.rr"
                    ></v-text-field>
                  </template>
                </v-slider>
              </div>
              <div v-if = 'props.item.device === "Ventilator" || props.item.device === "CPAP or NIPPV"'>
                <div class="sliderlabel">
                  Expiratory Time(s)
                </div>
                <v-slider
                  v-model = "props.item.expiratory"
                  v-on:input = "$emit('input', $event)"
                  class="align-center"
                  max = 5
                  min = 0
                  step = 0.1
                  hide-details
                  color = "#178ccb"
                  thumb-color = "#178ccb"
                  style = "min-width: 200px;"
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model = "props.item.expiratory"
                      v-on:input = "$emit('input', +$event)"
                      class="mt-0 pt-0 right"
                      single-line
                      type="number"
                      style="width: 80px;"
                      max="5"
                      min="0"
                      step="0.1"
                      :rules="rules.expiratory"
                    ></v-text-field>
                  </template>
                </v-slider>
              </div>
            </template>
          </v-edit-dialog>
        </template>
        
        <template v-slot:item.liters="props">
          <div>
            {{ calcTotalFlow(props.item) }}
          </div>
        </template>

      </v-data-table>
      <div v-if = "source === 'Portable Oxygen Concentrator (PSA)'" class="caption grey--text" style="margin-left: 10px;">
        *Only some ventilators and NIPPV devices can be operated with a low pressure oxygen input
        (e.g. a portable oxygen concentrator). When doing so, delivered FiO₂ will be significantly limited and not 100%.
      </div>
      <div class="caption grey--text" style="margin-left: 10px;">
        *{{ $t('step3_ward_footnote_cpap') }}<br/>
        *{{ $t('step3_ward_footnote_nippv') }}<br/>
        *{{ $t('step3_ward_footnote_sentence') }}<br/>
        <a href="https://opencriticalcare.org/faq/what-are-flow-triggering-and-bias-flow/" target="_blank">
          {{ $t("What is bias flow?") }}
        </a>
      </div>
      <div style="display:flex; justify-content:center;" class="d-print-none">
        <v-btn class="multiline" style="width:100%; min-height:44px; height: auto;" @click="showoverlay = !showoverlay" small>
          {{ $t('step3_show_device') }}
        </v-btn>
      </div>

    </v-card-text>
    <v-overlay :value="showoverlay" v-on:click.native="showoverlay = false">
      <v-btn
        icon
        @click="showoverlay = false"
      >
        x
      </v-btn>
      <flow-table style="max-width:100vw;" />
    </v-overlay>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import FlowTable from '@/components/FlowTable2.vue'
import IconPencil from '@/components/IconPencil'
import { mdiDelete, mdiInformationOutline } from '@mdi/js'


export default {
  name: 'UsageTableEditable',

  props: {
    showDate: Boolean,
  },

  components: {
    FlowTable,
    IconPencil,
  },

  methods: {
    numberToString: (x) => (
      isNaN(x) ?
        x :
        x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
    ),
    updateItem: function(item) {
      const device = this.defaults.find(d => d.device === item.device)
      if(typeof(device) !== "undefined") {
        Object.keys(item)
          .filter(ky => ky !== "patients")
          .forEach(ky =>  {
            item[ky] = device[ky]
          })
      }
    },
    addRow: function() {
      this.patient_table.push(
        Object.assign({},this.defaults[0])
      )
    },
    deleteRow (item) {
      const editedIndex = this.patient_table.indexOf(item)
      this.patient_table.splice(editedIndex, 1)
    },
    updatePatientTable: function(patients, severity) {
      let factor_cannula,
        factor_other,
        sum

      let table = this.patient_table

      if(
        (this.entermode3 === 1 && this.calculator === "supply") ||
        (this.entermode3 === 1 && this.calculator === "demand")
      ) {
        factor_cannula = 1 + ((2 - severity) * 0.25)
        factor_other = (1 - 0.6 * factor_cannula) / 0.4 
        table.forEach( d => {
          switch(d.device) {
            case 'Nasal Cannula':
              d.patients = Math.round(patients * .6 * factor_cannula);
              break;
            case 'Facemask':
              d.patients = Math.round(patients * 0.05 * factor_other);
              break;
            case 'Face mask with reservoir':
              d.patients = Math.round(
                patients * (this.source === 'Portable Oxygen Concentrator (PSA)' ? 0.20 : 0.05) * factor_other
              );
              break;
            case 'Ventilator':
              d.patients = Math.round(patients * 0.13 * factor_other);
              break;
            case 'High Flow Nasal Cannula':
              d.patients = Math.round(patients * 0.15 * factor_other);
              break;
            case 'CPAP or NIPPV':
              d.patients = Math.round(patients * 0.02 * factor_other);
              break;
          }
        })
        // resolve rounding difference
        sum = table.reduce((prev,curr) => curr.patients + prev, 0)
        if(sum !== patients && severity <= 2) {
          table.forEach( d => {
            switch(d.device) {
              case 'Nasal Cannula':
                d.patients = d.patients + patients - sum
                break;
            }
          })
        }
        if(sum !== patients && severity > 2) {
          table.forEach( d => {
            switch(d.device) {
              case 'Facemask':
                d.patients = d.patients + patients - sum
                break;
            }
          })
        }
      }
    },
    sumPatients: function() {
      return this.patient_table.reduce(function(prev, current) {return prev + parseInt(current.patients)}, 0)
    },
    changeFlowRate: function(initialize) {
      if(this.source === 'Portable Oxygen Concentrator (PSA)') {
        let multiplier = 1
        switch(this.period) {
          case 'per day':
            multiplier = 24 * 60;
            break;
          case 'per hour':
            multiplier = 60;
            break;
          case 'per minute':
            multiplier = 1;
            break;
        }
        this.patient_table.forEach((d) => {
          d.rate = +this.amount * multiplier
          switch(d.device) {
            case 'Nasal Cannula':
              d.rate = Math.min(3, +this.amount * multiplier);
              break;
            case 'Facemask':
              d.rate = Math.min(8, +this.amount * multiplier);
              break;
            case 'Face mask with reservoir':
              d.rate = Math.min(15, +this.amount * multiplier);
              break;
            case 'Ventilator':
              d.rate = Math.min(18, +this.amount * multiplier);
              break;
            case 'CPAP or NIPPV':
              d.rate = Math.min(20, +this.amount * multiplier);
              break;
          }
        })
      } else {
        if(initialize) {
          // reset default flow rate per device
          this.patient_table.forEach( d => {
            switch(d.device) {
              case 'Nasal Cannula':
                d.rate = 3;
                break;
              case 'Facemask':
                d.rate = 8;
                break;
              case 'Face mask with reservoir':
                d.rate = 15;
                break;
              case 'Ventilator':
                d.rate = 12;
                d.bias = 0;
                d.leak = 0;
                d.fio2 = 1;
                d.rr = 20;
                d.expiratory = 2;
                break;
              case 'High Flow Nasal Cannula':
                d.rate = 40;
                break;
              case 'CPAP or NIPPV':
                d.rate = 12;
                d.bias = 0;
                d.leak = 10;
                d.fio2 = 1;
                d.rr = 20;
                d.expiratory = 2;
                break;
            }
          })
        }
      }
    },
    calcFlow: function(item) {
      let ret = 0
      let rate = (+item.rate || 0)
      let bias = (+item.bias || 0)
      let leak = (+item.leak || 0)
      let rr = (+item.rr || 0)
      let expiratory = (+item.expiratory || 0)
      let fio2 = (+item.fio2 || 0.21)
      if(item.device === "Ventilator" || item.device === "CPAP or NIPPV") {
        // (Minute ventilation+(bias flow x RR x expiratory time/60)+leak)(FiO2-0.21)/0.79
        rate = (rate + (bias * rr * expiratory/60) + leak) * (fio2 - 0.21)/0.79
        ret = rate
      } else if(item.device === "High Flow Nasal Cannula") {
        // flow rate*(FiO2-0.21)/0.79
        rate = rate * (fio2 - 0.21)/0.79 
        ret = rate
      } else {
        if(typeof(rate) !== 'undefined') {
          ret = rate
        }
      }
      return ret
    },
    calcTotalFlow: function(item) {
      let ret = ''
      let flow = this.calcFlow(item)
      let patients = (+item.patients || 0)

      if(!isNaN(flow) && flow !== 0) {
        ret = this.numberToString(flow * 24 * 60 * patients)
      }

      return ret
    }, 
    patientTableHandler: function() {
      let data = this.patient_table

      let sum = data.reduce(function(prev,curr) {
        const patients = +curr.patients || 0
        let rate = +curr.rate || 0
        const bias = +curr.bias || 0
        const leak = +curr.leak || 0
        const rr = +curr.rr || 0
        const expiratory = +curr.expiratory || 0
        const fio2 = +curr.fio2 || 0.21
        let product = patients * rate * 24 * 60

        if(curr.device === "Ventilator" || curr.device === "CPAP or NIPPV") {
          // (Minute ventilation+(bias flow x RR x expiratory time/60)+leak)(FiO2-0.21)/0.79
          rate = (rate + (bias * rr * expiratory/60) + leak) * (fio2 - 0.21)/0.79
          product = patients * rate * 24 * 60
        }

        if(curr.device === "High Flow Nasal Cannula") {
          rate = rate * (fio2 - 0.21)/0.79
          product = patients * rate * 24 * 60
        }

        return prev + product
      }, 0)
      this.usage = sum

      this.$store.commit('changePatientTable', JSON.parse(JSON.stringify(this.patient_table)))
    },
    dateHandler: function(newdate, olddate) {
      if(olddate) {
        this.savedate = olddate
        this.dialogtext = "Save Data for " + olddate + "?"
        this.showdialog = true
      }
    },
    savePatientTableHistory: function() {
      this.$store.commit(
        'storePatientTableHistory',
        {
          tbl: JSON.parse(JSON.stringify(this.patient_table)),
          date: this.savedate
        }
      )
      this.demandsnackbartext = "Saved demand history for " + this.savedate + "."
      this.demandsnackbar = true

      this.updateTableFromHistory()
    },
    updateTableFromHistory: function() {
      this.showdialog = false

      if(this.patient_table_history[this.date]) {
        this.patient_table =  JSON.parse(JSON.stringify(this.patient_table_history[this.date]))
      } else {
        this.patientTableHandler()
      }
      this.savedate = this.date
    }
  },

  data: function() {
    return {
      showoverlay: false,
      showdialog: false,
      dialogtext: '',
      mdiDelete,
      mdiInformationOutline,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      savedate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      datemenu: false,
      rules: {
        value: [
          val => {return val >= 0 || `Amount should be 0 or more`},
        ],
        fio2: [
          val => {return (val >= 0.21 && val <=1) || `Amount should be between 0.21 and 1`}
        ],
        rr: [
          val => {return (val >= 0 && val <=60) || `Amount should be between 0 and 60`}
        ],
        expiratory: [
          val => {return (val >= 0 && val <=5) || `Amount should be between 0 and 5`}
        ],
      },
      patient_table: JSON.parse(JSON.stringify(this.$store.state.patient_table_editable)),
      headers: [
        {text: '', value: 'actions', sortable: false, width: '10px', align: 'center'},
        {text: '# Patients', value: 'patients', align: 'end', width: '50px'},
        {text: 'Delivery Device', value: 'device'},
        {text: 'Settings', value: 'flow', align: 'end'},
        {text: 'O₂ Consumption (LPM)', value: 'rate', align: 'end'},
        {text: 'O₂ Liters per Day', value: 'liters', align: 'end'},
      ],
      defaults: [
        {
            "text": "Nasal Cannula",
            "device": "Nasal Cannula",
            "rate": 3,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 4320,
            "patients": 0
        },
        {
            "text": "Facemask",
            "device": "Facemask",
            "rate": 8,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 11520,
            "patients": 0
        },
        {
            "text": "Face mask with reservoir",
            "device": "Face mask with reservoir",
            "rate": 15,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 21600,
            "patients": 0
        },
        {
            "text": "Ventilator",
            "device": "Ventilator",
            "rate": 12,
            "leak": 0,
            "bias": 0,
            "fio2": 1,
            "rr": 20,
            "expiratory": 2,
            "liters": 25920,
            "patients": 0
        },
        {
            "text": "High Flow Nasal Cannula",
            "device": "High Flow Nasal Cannula",
            "rate": 40,
            "leak": null,
            "bias": null,
            "fio2": 1,
            "rr": null,
            "expiratory": null,
            "liters": 57600,
            "patients": 0
        },
        {
            "text": "CPAP or NIPPV",
            "device": "CPAP or NIPPV",
            "rate": 12,
            "leak": 10,
            "bias": 0,
            "fio2": 1,
            "rr": 20,
            "expiratory": 2,
            "liters": 0,
            "patients": 0
        },
        {
          "divider": true
        },
        {
            "text": "Anesthesia Machine (with ventilator)",
            "device": "Anesthesia Machine (with ventilator)",
            "rate": 2,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 2880,
            "patients": 0
        },
        {
            "text": "Other",
            "device": "Other",
            "rate": 0,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 0,
            "patients": 0
        },
        {
            "text": "UCL Ventura Mark II",
            "device": "UCL Ventura Mark II",
            "rate": 42,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 60480,
            "patients": 0
        },
        {
            "text": "Venturi (\"entrainment\") Mask",
            "device": "Venturi (\"entrainment\") Mask",
            "rate": 12,
            "leak": null,
            "bias": null,
            "fio2": null,
            "rr": null,
            "expiratory": null,
            "liters": 17280,
            "patients": 0
        },
      ]
    }
  },

  computed: {
    ...mapFields([
      'demandsnackbar',
      'demandsnackbartext',
      'usage',
      'entermode3',
      'entermode3b',
      'num_inpatients',
      'distribution',
      'source',
      'amount',
      'period',
      'calculator',
      'patient_table_history',
    ]),
    sum_patients: function() {return this.sumPatients()}
  },

  watch: {
    patient_table: {
      deep: true,
      handler: function() {this.patientTableHandler()},
      immediate: true
    },
    date: {
      deep: false,
      handler: function(newdate, olddate) {
        this.dateHandler(newdate, olddate)
      },
    },
    amount: {
      handler: function() {this.changeFlowRate(false)},
      immediate: true
    },
    period: {
      handler: function() {this.changeFlowRate(false)},
      immediate: true
    },
  }
}
</script>

<style>
  .v-data-table td, .v-data-table th {
    padding: 0 4px;
  }
</style>

<style scoped>
  .sliderlabel {
    font-size: 75%;
    color: rgba(0, 0, 0, 0.6);
  }
  .custom-header.theme--light.v-data-table >>> thead tr:last-child th {
      border-bottom: 2px solid rgba(0, 0, 0, 0.25);
      font-size: 110%;
      vertical-align: bottom;
  }
</style>