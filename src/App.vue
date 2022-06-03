<template>
<v-app id="open-critical-care">
  <OccHeader />
  <v-container>
    <v-content>
      <router-view />
    </v-content>
  </v-container>
  <OccFooter />
  </v-app>
</template>

<script>
import store from './store';
import { mapFields } from 'vuex-map-fields';

import OccHeader from '@/components/globals/OccHeader.vue'
import OccFooter from '@/components/globals/OccFooter.vue'

export default {
  name: 'App',
  store: store,
  components: {
    OccHeader,
    OccFooter
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
  methods: {
    hideDrawer() {
      this.drawer = false
    },
    onResize() {
      if(window.innerWidth > 960) {this.hideDrawer()}
    }
  },
}
</script>

<style lang="scss">
#open-critical-care {
  margin: auto;
    font-family: Roboto, sans !important;
}

.container {
  max-width: 1208px;
}
#open-critical-care .title {
    font-family: Roboto, sans !important;
}
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
