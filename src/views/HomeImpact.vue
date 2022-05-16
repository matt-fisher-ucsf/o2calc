<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <v-card style="margin-bottom:1em;">
          <v-card-title class="title">
            Step 1
          </v-card-title>
          <v-card-text>
            <p style="text-align:left;">Total # patients on nasal cannula</p>
            <v-slider
              v-model = "impact_patients"
              v-on:input = "$emit('input', $event)"
              class="align-center"
              :max=100
              :min=0
              hide-details
              thumb-label
              color="#178ccb"
              thumb-color="#178ccb"
            >
              <template v-slot:append>
                <v-text-field
                  v-model = "impact_patients"
                  v-on:input = "$emit('input', +$event)"
                  class="mt-0 pt-0 right"
                  single-line
                  type="number"
                  style="width: 80px;"
                  :max=100
                  :min=0
                  :rules="rules.patients"
                ></v-text-field>
              </template>
            </v-slider>

            <p style="text-align:left;">Default SpO₂ goal (default 94%)</p>
            <v-slider
              v-model = "impact_spo2_default"
              v-on:input = "$emit('input', $event)"
              class="align-center"
              :max=98
              :min=90
              ticks="always"
              tick-size="4"
              :tick-labels="ticksLabels"
              thumb-label
              color="#178ccb"
              thumb-color="#178ccb"
            >
            </v-slider>
          </v-card-text>
        </v-card>
        <v-card style="margin-bottom:1em;">
          <v-card-title class="title">
            Step 2
          </v-card-title>
          <v-card-text>
            <p style="text-align:left;">Modeled SpO₂ goal (default 94%)</p>
            <v-slider
              v-model = "impact_spo2_modeled"
              v-on:input = "$emit('input', $event)"
              class="align-center"
              :max=98
              :min=90
              ticks="always"
              tick-size="4"
              :tick-labels="ticksLabels"
              thumb-label
              color="#178ccb"
              thumb-color="#178ccb"
            >
            </v-slider>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card style="margin-bottom:1em; background-color: #ec1848 !important;" color="red" dark>
          <v-card-title class="title">
            {{ $t('sa_imputed_po') }}
          </v-card-title>
          <v-card-text class = "ratio text-center">
            {{ Math.round(imputed) }} mmHg
          </v-card-text>
        </v-card>
        <v-card style="margin-bottom:1em; background-color: #f48024 !important;" color="orange" dark>
          <v-card-title class="title">
            {{ $t('sa_imputed_pf') }}
          </v-card-title>
          <v-card-text class="ratio text-center">
            {{ Math.round(pfratio) }}
          </v-card-text>
        </v-card>
        <v-card style="margin-bottom:1em; background-color: #90bd31 !important;" color="teal" dark>
          <v-card-title class="title">
            {{ $t("sa_sf") }}
          </v-card-title>
          <v-card-text class="ratio text-center">
            {{ Math.round(sfratio) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';
// @ is an alias to /src

export default {
  name: 'HomeImpact',
  components: { },
  data: () => ({
    rules: {
      patients: [
        val => {
          if( val >= 0 && val <= 100 ) {
            return true
          }
          if( val < 0 || val > 100 ) {
            return "Patients should be between 0 and 100"
          }
        },
      ],
      value: [
        val => {return val >= 21 && val <= 100 || `Amount should be between 21 and 100. Below 21 corresponds to ambient air.`},
      ],
    },
    ticksLabels: ['90','','92','','94','','96','','98']
  }),
  computed: {
    ...mapFields([
      'impact_patients',
      'impact_spo2_default',
      'impact_spo2_modeled',
    ]),
    ...mapGetters([
      'imputed',
      'pfratio',
      'sfratio',
    ])
  },

  beforeRouteEnter: (to, from, next) => {
    let name = to.name.toLowerCase()
    let lang = to.query.lang
    next(vm => {
      if(typeof name !== 'undefined') {
        vm.$store.commit('changeCalculator', name)
      }
      vm.$store.commit('changeLocale', lang)
    })
  }
}
</script>

<style>
  .v-text-field.right input {
    text-align: right;
  }
  .v-card__text.ratio {
    font-size: 2rem;
    line-height: 2rem;
    margin-top: -0.5em;
  }
  .v-card__title {
    word-break: break-word;
  }
</style>
