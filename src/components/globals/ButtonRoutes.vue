<template>
  <v-row id="button-routes">
    <v-tabs
      v-model="calculator"
      mandatory
      fixed-tabs
    >
      <v-tab value="demand" to="/demand">
        <span>{{ $t('O₂ Demand') }}</span>
      </v-tab>
      
      <v-tab value="supply" to="/supply">
        <span>{{ $t('O₂ Supply & Demand') }}</span>
      </v-tab>

      <v-tab value="imputation" to="/imputation">
        <span style="text-transform:none;">{{ $t('SpO₂ to PaO₂') }}</span>
      </v-tab>

      <v-tab value="duration" to="/duration">
        <span>{{ $t('Cylinder Duration') }}</span>
      </v-tab>

      <v-tab value="cylinder" to="/cylinder">
        <span>{{ $t('Cylinder Size') }}</span>
      </v-tab>

      <!-- <v-tab value="formulas" to="/formulas">
        <span>{{ $t('About') }}</span>
      </v-tab> -->

    </v-tabs>

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
  </v-row>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'ButtonRoutes',
    computed: {
      ...mapFields([
        'calculator',
        'locale',
        'locales'
      ])
    },

  }
</script>
<style>
#button-routes .v-tab {
  background-color: var(--v-primary-lighten5);
}
#button-routes .v-tab--active,
#button-routes  .v-tab:before,
#button-routes .v-tabs-slider{
  background-color: var(--v-accent-base);
}

#button-routes .v-tab span {
  text-transform: capitalize;
}
</style>