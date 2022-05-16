<template>
  <v-container fluid>
    <v-row>
      <!--stepper-input /-->
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6">
            <device-types/>
          </v-col>
          <v-col cols="12" sm="6">
            <flow-rate/>
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="12" class="d-sm-none">
        <summary-statistics-device />
      </v-col>
      <v-col sm="3" class="d-none d-sm-flex statistic-container" justify="center">
        <summary-statistics-device />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DeviceTypes from '@/components/DeviceTypes.vue'
import FlowRate from '@/components/FlowRateDevice.vue'
import SummaryStatisticsDevice from '@/components/SummaryStatisticsDevice.vue'

import { mapFields } from 'vuex-map-fields';

export default {
  name: 'HomeDevice',

  components: {
    DeviceTypes,
    FlowRate,
    SummaryStatisticsDevice,
  },

  data: () => ({
  }),

  computed: {
    ...mapFields([
      'device_type',
      'device_types_flow_rate',
      'flow_rate_device',
    ]),
  },

  watch: {
    device_type: function(device) {
      this.flow_rate_device = this.device_types_flow_rate[device]
    }
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