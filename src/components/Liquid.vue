<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="grey lighten-2">
      <span style="font-weight:bold;">{{ $t('Liquid (VIE)') }}</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card>
        <v-card-text>
          <span style="text-align:left;" v-html="$t('step2_liquid_supply')"></span>
          <div style="display: inline-block;">
            <v-text-field
              class="right"
              style="display:inline-block; width:90px;"
              v-model = "amount_liquid"
              v-on:input = "$emit('input', $event)"
              type="number"
              inputmode="numeric"
              min="0"
              :rules="rules.value"
            ></v-text-field>
            <v-select
              v-model="unit_liquid"
              solo
              style="display:inline-block; width: 150px;"
              class="caption"
              :items="unit_types"
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
          <v-alert
            v-model="alert"
            dense
            border="left"
            type="warning"
          >
            {{ alertmsg }}
          </v-alert>
          <v-divider style="margin-bottom: 1em; border-width: 2px 0 0 0;"/>
          <leakage v-model="leakage_liquid" />
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Leakage from '@/components/Leakage.vue'

export default {
  name: 'Liquid',

  components: {
    Leakage
  },

  data: () => ({
    rules: {
      value: [
        val => {return val >= 0 || `Amount should be 0 or more`},
      ],
    },
    unit_types: ['liters','gallons'],
  }),

  computed: {
    alertmsg: function() {
      let msg = ""

      if(
        this.supply_type_liquid !== null &&
        (
          this.unit_liquid !== "liters"
        )
      ) {
        msg = "You selected " + this.supply_type_liquid.Manufacturer + " " + this.supply_type_liquid.Model + " with default supply of "
        msg = msg + this.supply_type_liquid.lpm + " Liters.  If you would like to use a different unit, "
        msg = msg + "please make sure to change the supply amount to reflect your new units.  This will not auto-convert."
      }
      return msg
    },
    alert: function() {
      return this.alertmsg !== ""
    },
    ...mapFields([
      'amount_liquid',
      'unit_liquid',
      'leakage_liquid',
      'supply_type_liquid',
    ]),
  }
}
</script>
