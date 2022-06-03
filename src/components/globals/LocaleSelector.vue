<template>
  <v-btn-toggle id="locale-selector" :items="locales" v-model="locale" label="Language" mandatory group dense>
    <v-btn v-for="locale in locales" :key="locale.abbreviation" text plain small class="text-capitalize ma-0" :value="locale.abbreviation">{{ locale.language }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
  import store from '@/store';
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    store: store,
    computed: {
      ...mapFields([
        'locale',
        'locales'
      ])
    },
    mounted: function () {
      // add Vietnamese to locales if it does not exist to overcome local storage saved before Vietnamese available
      if (this.locales.filter(d => d.abbreviation === 'vn').length === 0) {
        this.$store.commit(
          'addLocale', {
            abbreviation: 'vn',
            language: 'Vietnamese',
          }
        );
      }
    },
    watch: {
      locale: {
        handler: function (val) {
          this.$root.$i18n.locale = val;
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

<style>
#locale-selector .v-btn--active::before {
  opacity: 0;
}

#locale-selector .v-btn--active {
  font-weight: 700;
}

#locale-selector button + button {
  border-left: solid 1px var(--v-primary-base);
}
</style>