<template>
  <v-btn-toggle :items="locales" v-model="locale" label="Language" mandatory group dense>
    <v-btn v-for="locale in locales" :key="locale.abbreviation" text small class="text-capitalize" :value="locale.abbreviation">{{ locale.language }}
    </v-btn>
  </v-btn-toggle>

      <!-- <v-select
      :items="locales"
      item-text = "language"
      item-value = "abbreviation"
      v-model="locale"
      label="Language"
      dense
      hide-details="true"
      class="align-self-center"
      style="margin-left:10px; flex-grow: 0;"
    ></v-select> -->
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

</style>