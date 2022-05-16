<template>
  <div class="justify-space-between" style="flex-grow: 1;">
    <v-btn-toggle
      v-model="calculator"
      borderless
      mandatory
    >
      <!--v-btn value="objective" to="/objective">
        <span>{{ $t('Navigation') }}</span>
      </v-btn-->

      <v-btn value="demand" to="/demand">
        <span>{{ $t('O₂ Demand') }}</span>
      </v-btn>
      
      <v-btn value="supply" to="/supply">
        <span>{{ $t('O₂ Supply & Demand') }}</span>
      </v-btn>

      <v-btn value="imputation" to="/imputation">
        <span style="text-transform:none;">{{ $t('SpO₂ to PaO₂') }}</span>
      </v-btn>

      <v-btn value="duration" to="/duration">
        <span>{{ $t('Cylinder Duration') }}</span>
      </v-btn>

      <v-btn value="cylinder" to="/cylinder">
        <span>{{ $t('Cylinder Size') }}</span>
      </v-btn>

      <v-btn value="formulas" to="/formulas">
        <span>{{ $t('About') }}</span>
      </v-btn>

      <!--v-btn value="device" to="/device">
        <span>{{ $t('Device') }}</span>
      </v-btn-->

      <!--v-btn style = "display:none;" value="formulas" to="/formulas">
        <span>{{ $t('Formulas') }}</span>
      </v-btn-->

    </v-btn-toggle>

    <v-select
      :items="locales"
      item-text = "language"
      item-value = "abbreviation"
      v-model="locale"
      label="Language"
      dense
      hide-details="true"
      class="align-self-center"
      style="margin-left:10px; flex-grow: 0;"
    ></v-select>
  </div>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'ButtonRoutes',
  
    components: {

    },

    data: () => ({}),

    computed: {
      ...mapFields([
        'calculator',
        'locale',
        'locales'
      ])
    }

  }
</script>
