<template>
  <v-card style="margin-bottom:2em;">
    <v-card-title class="title">3. Enter Patient Need</v-card-title>
    <v-card-subtitle style="text-align:left;">
      In this table, when you enter the number of patients, select the oxygen delivery device,
      and enter the flow rate, the <span>consumption per day</span> and
      <span>supply in days</span> will be calculated.
    </v-card-subtitle>
    <v-card-text>
      <div style="position:relative; height:auto;">
        <div class="wrapper-jexcel" style="max-width: 100vw; overflow-x:auto;">
          <div class="spreadsheet" ref="spreadsheet">
          </div>
          <v-btn
            fab absolute depressed bottom left small dark color="indigo"
            @click="spreadsheet.insertRow()"
          >
            <icon-plus />
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import jexcelStyle from "jexcel/dist/jexcel.css" //eslint-disable-line no-unused-vars
import jexcel from "jexcel"
import IconPlus from '@/components/IconPlus.vue'

export default {
  name: "UsageSheet",

  components: {
    IconPlus
  },

  data: function() {
    let thisvue = this;
    return {
      jExcelOptions: {
        data: [
          [null, null, null, "=A1 * C1 * 60 * 24"],
          [null, null, null, "=A2 * C2 * 60 * 24"]
        ],
        minDimensions: [4,2],
        contextMenu: false,
        allowInsertColumn: false,
        oninsertrow: function(instance, row) {
          let formula = '=A' + (row+1) + '*C' + (row+1) + '*60*24'
          instance.jexcel.setValue('D' + (row + 1), formula, true )
        },
        onafterchanges: function(instance) {
          thisvue.$emit('update-data', instance.jexcel.getData())
        },
        ondeleterow: function(instance) {
          thisvue.$emit('update-data', instance.jexcel.getData())
        },
        columns: [
          { type: "text", title: "# Patients", width: "100px" },
          {
            type: "dropdown",
            options: { type:'picker' },
            title: "Delivery Device",
            width: "250px",
            source: [
              "Ventilator", "NC", "Facemask", "Face mask with reservoir", "High Flow Nasal Cannula 50%",
              "High Flow Nasal Cannula 100 %", "Anesthesia machine", "CPAP", "BiPAP"
            ]
          },
          {
            type: "numeric",
            title: "Flow Rate (liters per minute)",
            width: "140px",
            //mask: "$ #.##,00",
            //decimal: "."
          },
          {
            type: "numeric",
            title: "Liters per Day",
            width: "110px",
            mask: "#,##.",
            //decimal: ","
            readOnly: true
          },
        ]
      }
    }
  },

  mounted: function() {
    const spreadsheet = jexcel(this.$refs["spreadsheet"], this.jExcelOptions)
    spreadsheet.hideIndex()
    Object.assign(this, {spreadsheet}) // tucks all methods under jExcelObj object in component instance
  },

  beforeDestroy: function() {
    this.spreadsheet.destroy()
  }
}
</script>

<style scoped>
  .spreadsheet >>> table.jexcel tr {height: 2em;}
</style>
