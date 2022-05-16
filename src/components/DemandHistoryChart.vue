<template>
  <apexchart type="line" height="350" :options="chartOptions" :series="patient_chart_series"></apexchart>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

const numberToString = (x) => (
  isNaN(x) ?
    x :
    x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
)

export default {

  name: 'DemandHistoryChart',

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
  },

  data: function() {
    return {
      chartOptions: {
        chart: {
          width: '100%',
          height: 500,
          fontFamily: 'inherit',
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        // colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return numberToString(value);
          }
        },
        stroke: {
          // curve: 'stepline' // step applies after instead of before which can be confusing
          curve: 'straight',
        },
        title: {
          text: this.$t('Daily Oxygen Demand by Device'),
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          title: {
            text: 'Oxygen Demand'
          },
          labels: {
            formatter: function (value) {
              return numberToString(value);
            }
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
    }
  },

  computed: {
    ...mapFields([
      'patient_table_history',
      'locale',
    ]),
    patient_table_summary: function() {
      let history = this.patient_table_history
      let summary = []

      summary = Object.keys(history)
        .sort((a,b) => {return (new Date(a)) > (new Date(b)) ? 1 : -1})
        .map( (ky) => {
          if(history[ky].length === 0) { return null}          
          let row = {}
          let device = ''
          const devices = new Set()
          row.date = new Date(ky)
          row.Total = this.sumTable(history[ky])
          history[ky].forEach(d => {
            device = [
              "Nasal Cannula", "Facemask", "Face mask with reservoir",
              "Ventilator", "High Flow Nasal Cannula", "CPAP or NIPPV"
            ].indexOf(d.device) === -1 ? 'Other' : d.device
            row[device] = (row[device] ? row[device] : 0) + this.calcTotalFlow(d)
            devices.add(device)
          })

          return row
        })
        .filter( d => d)
      return summary
    },
    patient_chart_series: function() {
      return [
          "Nasal Cannula", "Facemask", "Face mask with reservoir",
          "Ventilator", "High Flow Nasal Cannula", "CPAP or NIPPV",
          "Other","Total"
        ].map( device => ({
          name: device,
          data: this.patient_table_summary.map( d => ({
            y: d[device] ? d[device] : 0,
            x: d.date
          }))
        })).filter( d => d.data.some( data => data.y > 0) )
    }
  },

  watch: {
    locale: {
      handler: function() {
        this.chartOptions = {...this.chartOptions, ...{
          title: {
            text: this.$t('Daily Oxygen Demand by Device'),
            align: 'left'
          },
          yaxis: {
            title: {
              text: this.$t('Oxygen Demand')
            },
            labels: {
              formatter: function (value) {
                return numberToString(value);
              }
            },
          }
        }};
      },
      immediate: true,
    }
  }

}
</script>