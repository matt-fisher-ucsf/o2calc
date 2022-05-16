<template>
  <v-container fluid>
    <v-row>
      <!--stepper-input /-->
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6">
            <cylinder-duration/>
          </v-col>
          <v-col cols="12" sm="6">
            <flow-rate/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <pressure-current/>
          </v-col>
          <v-col cols="12" sm="6">
            <pressure-safe/>
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="12" class="d-sm-none">
        <summary-statistics-duration />
      </v-col>
      <v-col sm="3" class="d-none d-sm-flex statistic-container" justify="center">
        <summary-statistics-duration />
      </v-col>
    </v-row>
    <v-row justify="center" style="margin:0;">
      <v-col md="6">
        <v-img
          alt="cylinder size reference graphic"
          src="@/assets/cylinder_sizes.png"
          style="width:100%;"
        />
      </v-col>
      <v-col md="6">
        <img
          alt="oxygen flow rate table graphic"
          src="@/assets/oxygen_flow_rate_table.png"
          style="width:100%;"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CylinderDuration from '@/components/CylinderDuration.vue'
import PressureSafe from '@/components/PressureSafe.vue'
import PressureCurrent from '@/components/PressureCurrent.vue'
import FlowRate from '@/components/FlowRate.vue'
import SummaryStatisticsDuration from '@/components/SummaryStatisticsDuration.vue'

export default {
  name: 'HomeDuration',

  components: {
    CylinderDuration,
    PressureSafe,
    PressureCurrent,
    FlowRate,
    SummaryStatisticsDuration,
  },

  data: () => ({
  }),

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