<template>
  <v-col md="5" sm="12">
    <v-stepper non-linear v-model="stepinput">
      <v-stepper-header>
        <v-stepper-step editable step="1">Select Source</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">Enter Supply</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="3">Enter Patient Need</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card style="margin-bottom:1em;">
            <v-card-title class="title grey" style="color:white;">
              1. Select Oxygen Source (
              <a v-on:click="showoverlay = true" style="color:#178ccb;">not sure?</a>
              )
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="source"
                :items="sources"
                label="Select facility's most common source of oxygen"
              ></v-select>
            </v-card-text>
          </v-card>
          <v-btn
            color="primary"
            @click="stepinput = 2"
          >
            Continue
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <liquid v-if="source === 'Liquid Oxygen (VIE)'" />
          <concentrator v-else-if="source === 'Oxygen Plant (PSA)'" />
          <cylinder v-else-if="source === 'Oxygen Cylinders'" />
          <v-btn
            color="primary"
            @click="stepinput = 3"
            style = "margin-top: 1em;"
          >
            Continue
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
            <usage-table />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-col>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
// @ is an alias to /src
import Liquid from '@/components/Liquid.vue'
import Concentrator from '@/components/Concentrator.vue'
import Cylinder from '@/components/Cylinder.vue'
//import UsageSheet from '@/components/UsageSheet.vue'
import UsageTable from '@/components/UsageTable.vue'

export default {
  name: "StepperInput",

  components: {
    Liquid,
    Concentrator,
    Cylinder,
    UsageTable,
    //UsageSheet,
   },

  data: () => ({}),

  computed: {
    ...mapFields([
      'stepinput',
      'sources',
      'source',
      'usage',
      'showoverlay',
    ])
  },
}
</script>