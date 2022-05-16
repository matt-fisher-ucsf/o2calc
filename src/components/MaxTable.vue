<template>
  <v-card>
    <v-card-title class="title">{{ $t('step3_max_max') }}</v-card-title>
    <v-card-subtitle style="text-align:left;">
      {{ $t('step3_max_description') }}
    </v-card-subtitle>
    <v-card-text>
      <v-data-table
        dense
        mobile-breakpoint="0"
        disable-filtering
        disable-pagination
        disable-sort
        :hide-default-footer="true"
        :headers="headers"
        :items="patient_table"
      >
        <template v-slot:header.device="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.rate="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.patients="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.liters="{header}">
          {{ $t(header.text) }}
        </template>

        <template v-slot:item.title="props">
          <div style="font-size:120%;" :class = "props.item.title === 'or' ? 'font-weight-bold' : ''">{{ props.item.title }}</div>
        </template>

        <template v-slot:item.device="{ item }">
          {{ $t(item.device) }}
        </template>

        <template v-slot:item.rate="props">
          <v-edit-dialog v-if="props.item.title !== 'or'"
            :return-value.sync="props.item.rate"
            large
            persistent
          >
            <div>{{ props.item.rate }} <icon-pencil/></div>
            <template v-slot:input>
              <div class="mt-4 subtitle">Edit Flow Rate (LPM)</div>
              <v-text-field
                class="right"
                style="display:inline-block; width:100px;"
                v-model="props.item.rate"
                type="number"
                inputmode="numeric"
                min="0"
                :rules="rules.value"
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        
        <template v-slot:item.liters="props">
          <div>{{ typeof(props.item.rate) !== 'undefined' ? props.item.rate * 24 * 60 : '' }}</div>
        </template>

        <template v-slot:item.patients="props">
          <div>{{ typeof(props.item.rate) !== 'undefined' ? numberToString((supply_fixed + supply_infinite) / (props.item.rate * 24 * 60), 0) : '' }}</div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex'
import IconPencil from '@/components/IconPencil'

export default {
  name: 'MaxTable',

  components: {
    IconPencil
  },

  methods: {
    numberToString: function(x, nmax) {
      nmax = (typeof(nmax) !== "undefined") ? nmax : 1
      return isNaN(x) ? x : x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: nmax})
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
          if(d.title !== 'or') {
            d.rate = +this.amount * multiplier
          }
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
                d.rate = 18;
                break;
              case 'High Flow Nasal Cannula':
                d.rate = 40;
                break;
              case 'CPAP or NIPPV':
                d.rate = 20;
                break;
            }
          })
        }
      }
    },
  },

  data: () => ({
    rules: {
      value: [
        val => {return val >= 0 || `Amount should be 0 or more`},
      ],
    },
    headers: [
      {text: '', value: 'title'},
      {text: 'Delivery Device', value: 'device'},
      {text: 'Flow Rate (LPM)', value: 'rate', align: 'end'},
      {text: 'Max # Patients managed on this device', value: 'patients', align: 'end', width: '120'},
      {text: 'Liters per Day', value: 'liters', align: 'end'},
    ],
    patient_table: [
      {
        title: '',
        device: 'Nasal Cannula',
        rate: 3,
        liters: 4320,
        patients: 159
      },
      {
        title: 'or'
      },
      {
        title: '',
        device: 'Facemask',
        rate: 8,
        liters: 11520,
        patients: 60
      },
      {
        title: 'or'
      },
      {
        title: '',
        device: 'Face mask with reservoir',
        rate: 15,
        liters: 21600,
        patients: 32
      },
      {
        title: 'or'
      },
      {
        title: '',
        device: 'Ventilator',
        rate: 18,
        liters: 25920,
        patients: 27
      },
      {
        title: 'or'
      },
      {
        title: '',
        device: 'High Flow Nasal Cannula',
        rate: 40,
        liters: 57600,
        patients: 12
      },
    ]
  }),

  computed: {
    ...mapFields([
      'source',
      'amount',
      'period'
    ]),
    ...mapGetters([
      'supply_fixed',
      'supply_infinite'
    ])
  },

  watch: {
    source: {
      handler: function() {
        let highflow_index
        if(this.source === 'Portable Oxygen Concentrator (PSA)') {
          if(typeof(highflow_index) === 'undefined') {
            // find high flow nasal cannula
            this.patient_table.forEach( (d,i) => {if(d.device === 'High Flow Nasal Cannula') {highflow_index = i}})
            // remove high flow nasal cannula
            this.patient_table.splice(highflow_index - 1, 2);
          }
        } else {
          // try to find high flow nasal cannula
          this.patient_table.forEach( (d,i) => {if(d.device === 'High Flow Nasal Cannula') {highflow_index = i}})
          // need to insert high flow nasal cannula back if it does not exist
          if(typeof(highflow_index) === 'undefined') {
            this.patient_table.splice(
              7,
              0,
              {
                title: 'or'
              },
              {
                title: '',
                device: 'High Flow Nasal Cannula',
                rate: 40,
                liters: 57600,
                patients: 12
              }
            )
          }
        }
        this.changeFlowRate(true)
      },
      immediate: true
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