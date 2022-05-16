<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <v-card style="margin-bottom:1em;">
          <v-card-title class="title">
            {{ $t('sa_saturation') }}
          </v-card-title>
          <v-card-text>
            <v-slider
              v-model = "spo2"
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
                  v-model = "spo2"
                  v-on:input = "$emit('input', +$event)"
                  class="mt-0 pt-0 right"
                  single-line
                  type="number"
                  style="width: 80px;"
                  :max=100
                  :min=0
                  suffix = "%"
                  :rules="rules.sf"
                ></v-text-field>
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
        <v-card style="margin-bottom:1em;">
          <v-card-title class="title">
            {{ $t('sa_fraction') }}
          </v-card-title>
          <v-card-text>
            <v-slider
              v-model = "fio2"
              v-on:input = "$emit('input', $event)"
              class="align-center"
              :max=100
              :min=21
              hide-details
              thumb-label
              color="#178ccb"
              thumb-color="#178ccb"
            >
              <template v-slot:append>
                <v-text-field
                  v-model = "fio2"
                  v-on:input = "$emit('input', +$event)"
                  class="mt-0 pt-0 right"
                  single-line
                  type="number"
                  style="width: 80px;"
                  :max=100
                  :min=21
                  suffix = "%"
                  :rules="rules.value"
                ></v-text-field>
              </template>
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
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <p style="font-size:75%;">
          i.  The non-linear equation utilized by this calculator is derived in 
          <a href="https://pubmed.ncbi.nlm.nih.gov/26836924/" target="_blank">Brown et al Chest 2016</a>.
        </p>
        <img
          style="width: 300px;"
          alt="non-linear equation derived in Brown et al Chest 2015"
          src="../assets/brown_etal_nonlinear_equation.png"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';
// @ is an alias to /src

export default {
  name: 'HomeImputation',
  components: { },
  data: () => ({

    rules: {
      sf: [
        val => {
          if( val >= 0 && val <= 97 ) {
            return true
          }
          if( val < 0 || val > 100 ) {
            return "SpO₂ should be between 0 and 100"
          }
          if( val > 97 && val <= 100 ) {
            return `Imputation is inaccurate when SpO₂ is ≥97%, though PaO₂ ≥91 mmHg
            can be assumed. For ARDS patients, consider reducing FiO₂ given PaO₂ is above goal.`
          }
        },
      ],
      value: [
        val => {return val >= 21 && val <= 100 || `Amount should be between 21 and 100. Below 21 corresponds to ambient air.`},
      ],
    },
  }),
  computed: {
    ...mapFields([
      'spo2',
      'fio2'
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
