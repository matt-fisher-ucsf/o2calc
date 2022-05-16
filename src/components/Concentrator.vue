<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="grey lighten-2">
      <span style="font-weight:bold;">{{ $t('Portable Oxygen Concentrator') }}</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card>
        <v-card-text>
          <span style="text-align:left;">{{ $t('step3_concentrator_volume') }}</span>
          <div style="display: inline-block;">
            <v-text-field
              class="right"
              style="display:inline-block; width:80px;"
              v-model = "amount_concentrator"
              v-on:input = "$emit('input', $event)"
              type="number"
              inputmode="numeric"
              min="0"
              :rules="rules.value"
            ></v-text-field>
            <v-select
              v-model="unit_concentrator"
              solo
              style="display:inline-block; width: 120px;"
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
            <v-select
              v-model="period_concentrator"
              solo
              style="display:inline-block; width: 120px;"
              class="caption"
              :items="period_types"
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
          <span style="text-align:left;">{{ $t('step3_concentrator_hours') }}</span>
          <div style="display: inline-block;">
            <v-text-field
              class="right"
              style="display:inline-block; width:150px;"
              v-model = "time_concentrator"
              v-on:input = "$emit('input', $event)"
              type="number"
              inputmode="numeric"
              :suffix="$t('hours/day')"
              min="0"
              max="24"
              :rules="rules.time"
            ></v-text-field>
          </div>
          <v-divider style="margin-bottom: 1em; border-width: 2px 0 0 0;"/>
          <div style="display: flex; flex-wrap: wrap;">
            <span style="text-align:left; align-self:center;">{{ $t('step3_concentrator_number') }}</span>
            <div style="display: flex; flex-grow:0.9;">
              <v-slider
                v-model = "num_concentrators"
                v-on:input = "$emit('input', $event)"
                class="align-center"
                max = 100
                min = 0
                hide-details
                color = "#178ccb"
                thumb-color = "#178ccb"
                style = "min-width: 200px;"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model = "num_concentrators"
                    v-on:input = "$emit('input', +$event)"
                    class="mt-0 pt-0 right"
                    single-line
                    type="number"
                    style="width: 80px;"
                    min="0"
                    :rules="rules.concentrator"
                  ></v-text-field>
                </template>
              </v-slider>
            </div>
          </div>
          <v-divider style="margin-bottom: 1em; border-width: 2px 0 0 0;"/>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Concentrator',

  components: {

  },

  data: () => ({
    rules: {
      value: [
        val => {return val >= 0 || `Amount should be 0 or more`}
      ],
      time: [
        val => {return (val >= 0 && val <=24) || `Amount should be between 0 and 24`}
      ],
      concentrator: [
        val => {return (val >= 0) || `Amount should be greater than 0`}
      ],
    },
    unit_types: ['liters','gallons','cubic meters'],
    period_types: ['per minute'],
  }),

  computed: {
    alertmsg: function() {
      let msg = ""

      if(
        this.supply_type_concentrator !== null &&
        (
          //this.amount_plant !== this.supply_type_concentrator.cbh ||
          this.unit_concentrator !== "liters" ||
          this.period_concentrator !== "per minute"
        )
      ) {
        msg = "You selected " + this.supply_type_concentrator.Manufacturer + " " + this.supply_type_concentrator.Model + " with default supply of "
        msg = msg + this.supply_type_concentrator.lpm + " Liters per minute.  If you would like to use a different unit or period, "
        msg = msg + "please make sure to change the supply amount to reflect your new units or time period.  This will not auto-convert."
      }
      return msg
    },
    alert: function() {
      return this.alertmsg !== ""
    },
    ...mapFields([
      'amount_concentrator',
      'unit_concentrator',
      'period_concentrator',
      'time_concentrator',
      'num_concentrators',
      'supply_type_concentrator',
    ]),
  }
}
</script>
