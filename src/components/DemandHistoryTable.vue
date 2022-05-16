<template>
  <v-data-table
    dense
    mobile-breakpoint="0"
    disable-filtering
    disable-pagination
    disable-sort
    :hide-default-footer="true"
    :headers="headers_translated"
    :items="patient_table_summary"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small color="#ccc" @click="deleteDate(item)">{{ mdiDelete }}</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
//import IconPencil from '@/components/IconPencil'
import { mdiDelete } from '@mdi/js'

export default {

  name: 'DemandHistoryTable',

  methods: {
    sumTable: function(data) {
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
      return sum
    },
    numberToString: (x) => (
      isNaN(x) ?
        x :
        x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
    ),
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
      let ret = 0
      let flow = this.calcFlow(item)
      let patients = (+item.patients || 0)

      if(!isNaN(flow) && flow !== 0) {
        ret = flow * 24 * 60 * patients
      }

      return ret
    },
    deleteDate (item) {
      this.$store.commit(
        'storePatientTableHistory',
        {
          tbl: [],
          date: item.date
        }
      )
      this.demandsnackbartext = "Deleted demand history for " + item.date + '.'
      this.demandsnackbar = true
    },
  },

  data: function() {
    return {
      headers: [
        {text: '', value: 'actions', sortable: false, width: '10px', align: 'center'},
        {text: 'Date', value: 'date', width: '100px'},
        {text: 'Total', value: 'total', align: 'end', width: '100px'},
        {text: "Nasal Cannula", value: "Nasal Cannula", align: "end", width: "100px"},
        {text: "Facemask", value: "Facemask", align: "end", width: "100px"},
        {text: "Face mask with reservoir", value: "Face mask with reservoir", align: "end", width: "100px"},
        {text: "Ventilator", value: "Ventilator", align: "end", width: "100px"},
        {text: "High Flow Nasal Cannula", value: "High Flow Nasal Cannula", align: "end", width: "100px"},
        {text: "CPAP or NIPPV", value: "CPAP or NIPPV", align: "end", width: "100px"},
        {text: "Other", value: "Other", align: "end", width: "100px"},
      ],
      mdiDelete,
    }
  },

  computed: {
    ...mapFields([
      'demandsnackbar',
      'demandsnackbartext',
      'locale',
      'patient_table_history',
    ]),
    headers_translated: function() {
      const headers = this.headers
      const $t = this.$t.bind(this)
      return headers.map((header) => {
        let translated = Object.assign({}, header)
        translated.text = $t(header.text) ? $t(header.text) : header.text
        return translated
      })
    },
    patient_table_summary: function() {
      let history = this.patient_table_history
      let summary = []

      summary = Object.keys(history)
        .sort((a,b) => {return (new Date(a)) > (new Date(b)) ? 1 : -1})
        .map( ky => {
          if(history[ky].length === 0) { return null}
          let row = {}
          let device = ''
          const devices = new Set()
          row.date = ky
          row.total = this.numberToString(this.sumTable(history[ky]))
          history[ky].forEach(d => {
            device = [
              "Nasal Cannula", "Facemask", "Face mask with reservoir",
              "Ventilator", "High Flow Nasal Cannula", "CPAP or NIPPV"
            ].indexOf(d.device) === -1 ? 'Other' : d.device
            row[device] = (row[device] ? row[device] : 0) + this.calcTotalFlow(d)
            devices.add(device)
          })
          devices.forEach(d => {
            row[d] = this.numberToString(row[d])
          })
          return row
        })
        .filter( d => d)
      return summary
    },
  },

}
</script>