<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="grey lighten-2">
      <span style="font-weight:bold;">{{ $t('Oxygen Cylinders') }}</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card>
        <v-card-text>
          <span style="text-align:left;">{{ $t('step2_cylinder_size') }}</span>
          <span style="white-space:pre;"> (<a v-on:click="showoverlay_cylinder = true" style="color:#178ccb;">{{ $t('step1_unsure') }}</a>)</span>
          <div style="display: inline-block;">
            <v-select
              v-model="cylinder_type"
              solo
              style="display:inline-block; width: 250px;"
              class="caption"
              :items="cylinder_types"
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
          </div>
          <v-divider style="margin-bottom: 1em; border-width: 2px 0 0 0;"/>
          <span style="text-align:left;">{{ $t('step2_cylinder_number') }}</span>
          <div style="display: inline-block;">
            <v-text-field
              class="right"
              style="display:inline-block; width:90px;"
              v-model = "numtanks"
              v-on:input = "$emit('input', $event)"
              type="number"
              inputmode="numeric"
              min="0"
              :rules="rules.value"
            ></v-text-field>
          </div>
          <v-divider style="margin-bottom: 1em; border-width: 2px 0 0 0;"/>
          <leakage v-model="leakage_cylinder" />
          <v-divider style="margin-bottom: 1em; border-width: 2px 0 0 0;"/>
          <p class="caption">
            * {{ $t('step2_plant_footnote') }}
          </p>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Leakage from '@/components/Leakage.vue'

export default {
  name: 'Cylinder',

  components: {
    Leakage
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
      'cylinder_types',
      'cylinder_type',
      'numtanks',
      'leakage_cylinder',
      'showoverlay_cylinder'
    ]),
  }
}
</script>
