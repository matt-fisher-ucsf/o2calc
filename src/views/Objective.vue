<template>
  <v-container>
    <v-row>
      <h2>What would you like to estimate?</h2>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3" @click="supply_show_demand = false">
        <v-card
          max-width="200px"
          style="height:100%;"
          to="/supply"
        >
          <v-card-title>
            How much oxygen can my source provide?
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <!--v-card
          max-width="200px"
          style="height:100%;"
        >
          <v-card-title>
            How much oxygen does my facility/ward need?
          </v-card-title>
        </v-card-->
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              max-width="200px"
              style="height:100%;"
            >
              <v-card-title>
                How much oxygen does my facility/ward need?
              </v-card-title>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#ccc"
                >
                  <v-btn>Coming soon...</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <!--v-card
          max-width="200px"
          style="height:100%;"
          to="/device"
        >
          <v-card-title>
            How much oxygen does my delivery device consume?
          </v-card-title>
        </v-card-->
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              max-width="200px"
              style="height:100%;"
            >
              <v-card-title>
                How much oxygen does my delivery device consume?
              </v-card-title>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#ccc"
                >
                  <v-btn>Coming soon...</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card
          max-width="200px"
          style="height:100%;"
          to="/duration"
        >
          <v-card-title>
            How long will an oxygen cylinder last?
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              max-width="200px"
              style="height:100%;"
            >
              <v-card-title>
                What infrastructure is needed to get from my O₂ source to the bedside?
              </v-card-title>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#ccc"
                >
                  <v-btn>Coming soon...</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <!--v-card
          max-width="200px"
          style="height:100%;"
        >
          <v-card-title>
            Is my oxygen supply adequate for my facility needs?
          </v-card-title>
        </v-card-->
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              max-width="200px"
              style="height:100%;"
            >
              <v-card-title>
                Is my oxygen supply adequate for my facility needs?
              </v-card-title>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#ccc"
                >
                  <v-btn>Coming soon...</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'Objective',

    data: () => ({}),

    computed: {
      ...mapFields([
        'supply_show_demand',
      ])
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