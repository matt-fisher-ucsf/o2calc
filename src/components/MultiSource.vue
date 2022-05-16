<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <v-card
        max-width="200px"
        :class="selected_plant?'selected':'unselected'"
        @click="selected_plant = !selected_plant"
        style="height:100%;"
      >
        <div
            style="position: absolute; top: -5px; right: 0;"
            v-on:click.stop.prevent
        >
          <v-checkbox
            v-model="selected_plant"
            hide-details
          ></v-checkbox>
        </div>
        <div style="display:flex; width:100%; justify-content:center;">
          <img alt="image of oxygen plant" src="@/assets/plant.png" style="height:120px;"/>
        </div>

        <v-card-title style="text-align:center; min-height: 4em; padding-top: 0; padding-bottom: 0;">{{$t('Oxygen Plant (PSA)')}}</v-card-title>

        <v-card-text>
          <v-row v-if="selected_plant" v-on:click.stop.prevent>
            <v-select
              v-model="supply_type_plant"
              :items="supply_types ? get_supply_types('plant') : []"
              :label="$t('Select manufacturer and model')"
            >
              <template v-slot:selection="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
              <template v-slot:item="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
            </v-select>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card
        max-width="200px"
        :class="selected_concentrator?'selected':'unselected'"
        @click="selected_concentrator = !selected_concentrator"
        style="height:100%;"
      >
        <div
            style="position: absolute; top: -5px; right: 0;"
            v-on:click.stop.prevent
        >
          <v-checkbox
            v-model="selected_concentrator"
            hide-details
          ></v-checkbox>
        </div>
        <div style="display:flex; width:100%; justify-content:center;">
          <img alt="image of portable oxygen concentrator" src="@/assets/concentrator.png" style="height:120px;"/>
        </div>

        <v-card-title style="text-align:center; min-height: 4em; padding-top: 0; padding-bottom: 0;">
          {{ $t('Portable Oxygen Concentrator (PSA)') }}
        </v-card-title>

        <v-card-text>
          <v-row v-if="selected_concentrator" v-on:click.stop.prevent>
            <v-select
              v-model="supply_type_concentrator"
              :items="supply_types ? get_supply_types('concentrator') : []"
              :label="$t('Select manufacturer and model')"
            >
              <template v-slot:selection="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
              <template v-slot:item="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
            </v-select>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card
        max-width="200px"
        :class="selected_liquid?'selected':'unselected'"
        @click="selected_liquid = !selected_liquid"
        style="height:100%;"
      >
        <div
            style="position: absolute; top: -5px; right: 0;"
            v-on:click.stop.prevent
        >
          <v-checkbox
            v-model="selected_liquid"
            hide-details
          ></v-checkbox>
        </div>
        <div style="display:flex; width:100%; justify-content:center;">
          <img alt="image of liquid oxygen vie" src="@/assets/liquid.png" style="height:120px;"/>
        </div>

        <v-card-title style="text-align:center; min-height: 4em; padding-top: 0; padding-bottom: 0;">
          {{ $t('Liquid Oxygen (VIE)') }}
        </v-card-title>

        <v-card-text>
          <v-row v-if="selected_liquid" v-on:click.stop.prevent>
            <v-select
              v-model="supply_type_liquid"
              :items="supply_types ? get_supply_types('liquid') : []"
              :label="$t('Select manufacturer and model')"
            >
              <template v-slot:selection="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
              <template v-slot:item="data">
                <!-- HTML that describe how select should render items when the select is open -->
                {{ data.item['Manufacturer'] + ' ' + data.item['Model'] }}
              </template>
            </v-select>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card
        max-width="200px"
        :class="selected_cylinder?'selected':'unselected'"
        @click="selected_cylinder = !selected_cylinder"
        style="height:100%;"
      >
        <div
            style="position: absolute; top: -5px; right: 0;"
            v-on:click.stop.prevent
        >
          <v-checkbox
            v-model="selected_cylinder"
            hide-details
          ></v-checkbox>
        </div>
        <div style="display:flex; width:100%; justify-content:center;">
          <img alt="image of oxygen cylinders" src="@/assets/cylinder.png" style="height:120px;"/>
        </div>

        <v-card-title style="text-align:center; min-height: 4em; padding-top: 0; padding-bottom: 0;">
          {{ $t('Oxygen Cylinders') }}
        </v-card-title>

        <v-card-text>
          <v-row v-if="selected_cylinder" v-on:click.stop.prevent>
            <span style="text-align:left;">{{ $t('step2_cylinder_size') }}</span>
            <span style="white-space:pre;"> (<a v-on:click.stop.prevent="showoverlay_cylinder = true" style="color:#178ccb;">{{ $t('step1_unsure') }}</a>)</span>
            <div style="display: inline-block;">
              <v-select
                v-model="cylinder_type"
                solo
                style="display:inline-block; width: 100%;"
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
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {

  data: () => ({
  }),
  
  computed: {
    ...mapFields([
      'selected_plant',
      'selected_concentrator',
      'selected_liquid',
      'selected_cylinder',
      'showoverlay_cylinder',
      'sources',
      'source',
      'cylinder_types',
      'cylinder_type',
      'supply_types',
      'supply_type_plant',
      'supply_type_liquid',
      'supply_type_concentrator',
    ])
  },

  methods: {
    get_supply_types: function(source) {
      let types = this.supply_types ? this.supply_types.filter((d) => d.Manufacturer !== '') : []
      if(types.length === 0) {
        return types
      }
      if(source === "plant") {
        return types.filter( d => d["Oxygen supply type"] === "PSA Plant" || d["Oxygen supply type"] === "VSA Plant" || d["Oxygen supply type"] === "")
      }
      if(source === "concentrator") {
        return types.filter( d => d["Oxygen supply type"] === "Portable PSA" || d["Oxygen supply type"] === "")
      }
      if(source === "liquid") {
        return types.filter( d => d["Oxygen supply type"] === "Liquid Oxygen" || d["Oxygen supply type"] === "")
      }
    }
  },

  watch: {
    supply_type_plant: function() {
      if(this.supply_type !== null) {
        this.$store.commit('changeAmountPlant', this.supply_type_plant.cbh)
        this.$store.commit('changeUnitPlant', "cubic meters")
        this.$store.commit('changePeriodPlant', "per hour")
      }
    },
    supply_type_concentrator: function() {
      if(this.supply_type !== null) {
        this.$store.commit('changeAmountConcentrator', this.supply_type_concentrator.lpm)
        this.$store.commit('changeUnitConcentrator', "liters")
      }
    },
    supply_type_liquid: function() {
      if(this.supply_type !== null) {
        this.$store.commit('changeAmountLiquid', this.supply_type_liquid.lpm)
        this.$store.commit('changeUnitLiquid', "liters")
      }
    }
  }
}
</script>

<style scoped>
  .v-card.selected {
    border-color: blue;
    border-width: 3px;
    border-style: solid;
    opacity: 1;
    margin: 5px;
  }
  .v-card.unselected:hover {
    opacity: 1;
  }
  .v-card.unselected {
    border-color: transparent;
    border-width: 3px;
    border-style: solid;
    opacity: 0.6;
    margin: 5px;
  }

  .v-card__text {
    padding-bottom: 0;
  }
</style>
