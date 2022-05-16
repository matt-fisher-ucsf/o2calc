<template>
  <v-card style="height:100%;">
    <v-card-text>
      <p style="text-align:left;">{{ $t('Select your tank size') }}</p>
      <v-select
        v-model="cylinder_type_duration"
        solo
        style="display:inline-block; width: 250px;"
        class="caption"
        :items="cylinder_types_duration"
      >
        <template v-slot:selection="data">
          <!-- HTML that describe how select should render items when the select is open -->
          {{ $t(data.item) }}
        </template>
        <template v-slot:item="data">
          <!-- HTML that describe how select should render items when the select is open -->
          {{ $t(data.item) }}
        </template>
      </v-select>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'CylinderDuration',

  components: {
  },

  data: () => ({
    rules: {
      value: [
        val => {return val >= 0 || `Amount should be 0 or more`},
      ],
    },
  }),

  computed: {
    ...mapFields([
      'cylinder_types_duration',
      'cylinder_type_duration',
    ]),
  }
}
</script>
