<template>
  <v-footer class="primary dark d-print-none" style="">
    
       <v-container :style="calculator==='supply' ? 'margin-bottom:8rem;margin-top:4rem;' : 'margin-bottom:0px;margin-top:2rem;'" class="white--text disclaimer">
        <v-row justify="center">
          <v-col cols="6">
            <section class="footer-links">
              <FooterLinks />
            </section>
            <section class="disclaimer caption">
            {{ $t('disclaimer') }}
            </section>
          </v-col>
<v-col cols="5" offset="1">
  <section class="footer-supporters mb-4">
              Supporters
            </section>
            <v-row class="supporter-logos">
              <v-col cols="4">
              <figure class="text-center">
            <img
              style="height: 24px;"
              alt="logo for Sustaining Technical and Analytic Resources"
              src="@/assets/star-logo.png"
            /></figure ></v-col>
             <v-col cols="4"><figure class="text-center">
                        <img
              style="height:40px;padding-right:5px;"
              alt="logo for USAID"
              src="@/assets/usaid-logo.png"
            /></figure></v-col>
             <v-col cols="4"><figure class="text-center">
                        <img
              style="height: 44px;"
              alt="logo for Lifebox"
              src="@/assets/lifebox-logo.png"
            /></figure></v-col>
             <v-col cols="4"><figure class="text-center">
                        <img
              style="height:36.8px;"
              alt="logo for World Federataion for Societies of Anaesthesiologists"
              src="@/assets/wfsa-logo.png"
            /></figure></v-col>
             <v-col cols="4"><figure class="text-center">
                        <img
              style="height: 40px;"
              alt="logo for AriadneLabs"
              src="@/assets/ariadne-logo.png"
            /></figure></v-col>
          </v-row>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-btn
        class = "fixed-bottom-right d-print-none primary dark"
        style = "font-size: 70%;"
        to = "./formulas"
        v-if="calculator !== 'formulas'"
        tile
      >
        {{ $t('Formulas and Assumptions') }}
      </v-btn> -->
    </v-footer>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FooterLinks from '@/components/globals/FooterLinks.vue'

export default {
  name: 'OccFooter',
  components: {
    FooterLinks
  },
  computed: {
    ...mapFields([
      'calculator',
      'locale',
      'locales'
    ])
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