<template>
  <v-app id="app" v-resize="onResize">
    <v-navigation-drawer
      app
      v-model="drawer"
      style="max-width:70vw;"
      class="d-print-none"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="calculator"
        >
          <v-list-item value="objective" to="/objective" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Navigation') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="demand" to="/demand" @click = "hideDrawer">
            <v-list-item-title>{{ $t('O₂ Demand') }}</v-list-item-title>
          </v-list-item>
          
          <v-list-item value="supply" to="/supply" @click = "hideDrawer">
            <v-list-item-title>{{ $t('O₂ Supply & Demand') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="imputation" to="/imputation" @click = "hideDrawer">
            <v-list-item-title>{{ $t('SpO₂ to PaO₂') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="duration" to="/duration" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Cylinder Duration') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="cylinder" to="/cylinder" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Cylinder Size') }}</v-list-item-title>
          </v-list-item>

          <!--v-list-item value="device" to="/device" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Device') }}</v-list-item-title>
          </v-list-item-->

          <v-list-item value="formulas" to="/formulas" @click = "hideDrawer">
            <v-list-item-title>{{ $t('About') }}</v-list-item-title>
          </v-list-item>
          <!--v-list-item style="display:none;" value="formulas" to="/formulas" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Formulas') }}</v-list-item-title>
          </v-list-item-->
        </v-list-item-group>
      </v-list>
      <v-divider />
      <v-select
        :items="locales"
        item-text = "language"
        item-value = "abbreviation"
        v-model="locale"
        label="Language"
        dense
        style="padding: 10px;"
      ></v-select>
    </v-navigation-drawer>
    <v-app-bar app class="d-print-none">
      <v-app-bar-nav-icon class = "d-md-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <button-routes class = "d-none d-md-flex" />
    </v-app-bar>
    <v-content>
      <router-view />
      <v-container fluid :style="calculator==='supply' ? 'margin-bottom:8rem;margin-top:4rem;' : 'margin-bottom:0px;margin-top:2rem;'" class="grey lighten-2 disclaimer">
        <div class="font-weight-bold" style="padding:1em;">
         {{ $t('Disclaimer') }} & <a href="https://opencriticalcare.org/privacy-policy/" target="_blank">{{ $t('Privacy Policy') }}</a>
        </div>
        <v-row justify="center">
          <v-col cols="10" style = "font-size:10px; padding-top: 0px;">
            {{ $t('disclaimer') }}
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <div style="display:flex; flex-wrap:wrap; justify-content:center; align-items:center; max-width:550px;">
            <img
              style="width: 120px; height: 36px;"
              alt="logo for UCSF Department of Anesthesia and Perioperative Care"
              src="./assets/ADGHElogo.png"
            />
            <img
              style="height:38.4px;"
              alt="logo for Association of Anesthesiologists of Uganda"
              src="./assets/AAU-logo.png"
            />
            <img
              style="height:36.8px;"
              alt="logo for World Federataion for Societies of Anaesthesiologists"
              src="./assets/wfsa-logo.png"
            />
            <img
              style="height:32px;"
              alt="logo for Open Critical Care"
              src="./assets/occ-logo.png"
            />
            <img
              style="height:48px;padding-right:5px;padding-left:5px;"
              alt="logo for Liverpool School of Tropical Medicine"
              src="./assets/lstm-logo.png"
            />
            <img
              style="height:40px;padding-right:5px;"
              alt="logo for USAID"
              src="./assets/usaid-logo.png"
            />
            <img
              style="height: 24px;"
              alt="logo for Sustaining Technical and Analytic Resources"
              src="./assets/star-logo.png"
            />
          </div>
        </v-row>
      </v-container>

      <div class="d-none d-print-block float-right">oxygencalculator.org</div>
    </v-content>

    <v-footer app class="grey lighten-2 d-print-none" style="z-index:4; overflow-y:auto; width:100vw;">
      <summary-text v-if="calculator === 'supply'" />
      <v-btn
        class = "fixed-bottom-right d-print-none"
        style = "font-size: 70%;"
        to = "./formulas"
        v-if="calculator !== 'formulas'"
        tile
      >
        {{ $t('Formulas and Assumptions') }}
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import store from './store';
import { mapFields } from 'vuex-map-fields';

import SummaryText from '@/components/SummaryText.vue'
import ButtonRoutes from '@/components/ButtonRoutes.vue'

export default {
  name: 'App',

  store: store,

  components: {
    SummaryText,
    ButtonRoutes,
  },

  data: () => ({
    panel: 0,
    drawer: false,
  }),

  computed: {
    ...mapFields([
      'calculator',
      'locale',
      'locales'
    ])
  },

  mounted: function() {
    // add Vietnamese to locales if it does not exist to overcome local storage saved before Vietnamese available
    if(this.locales.filter(d => d.abbreviation === 'vn').length === 0) {
      this.$store.commit(
        'addLocale',
        {
          abbreviation: 'vn',
          language: 'Vietnamese',
        }
      );
    }
  },

  methods: {
    hideDrawer() {
      this.drawer = false
    },
    onResize() {
      if(window.innerWidth > 960) {this.hideDrawer()}
    }
  },

  watch: {
    locale: {
      handler: function(val) {
        this.$i18n.locale = val;
        /*
        if(val === 'vn') {
          this.$vuetify.rtl = true;
        } else {
          this.$vuetify.rtl = false;
        }
        */
      },
      immediate: true,
    }
  },

}
</script>

<style scoped>
  footer .v-expansion-panel-header {
    min-height: 1.5em;
  }
  footer button.v-expansion-panel-header {
    padding: 0;
  }

  footer .v-expansion-panel-header > span {
    flex: none;
  }

  .fixed-bottom-right {
    position: fixed;
    bottom: 5rem;
    right: 12px;
  }
</style>

<style>
  @media print {
    html, body {height: 99%;}
    body {
      transform: scale(0.80) translateY(-85px);
      transform-origin: top left;
      -webkit-print-color-adjust: exact;
    }

    .v-card {
      box-shadow: none !important;
    }
  }

  @page {
    margin: 1cm;
    float: none;
    size: landscape;
  }

  footer .v-expansion-panel-header div.v-expansion-panel-header__icon {
    margin-left: 0;
  }
  .v-text-field.right input {
    text-align:right;
  }
  .v-card__title {
    word-break: break-word;
  }
  .v-btn.multiline {
    word-break: break-word;
    white-space: normal;
    opacity: 0.7 !important;
  }
  .v-btn.multiline:not(.v-btn--round).v-size--large {
    padding: 0px;
  }
  .v-btn.multiline:hover {
    background-color: #178ccb !important;
    opacity: 0.7 !important;
  }
  .v-btn.multiline span {
    flex: 1 1 auto;
    padding: 10px;
  }
  .v-overflow-btn.heightauto .v-select__slot {
    height:auto;
  }
  .theme--light.v-btn-toggle:not(.v-btn-toggle--group) button.v-btn.multiline:not(.v-btn--active-teal) {
    border: 0 !important;
    margin: 3px !important;
  }
  .v-application button.grey.v-btn--active-teal {
    background-color: #178ccb !important;
    color: white !important;
    opacity: 1 !important;
  }
</style>
