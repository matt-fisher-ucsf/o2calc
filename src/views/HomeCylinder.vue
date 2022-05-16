<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h4 v-html="$t('cylinder_size_purpose')" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <div class="first-container">
          <v-card>
            <v-card-text>
              <label>
                {{ $t("cylinder_height") }} (<a @click="showMoreInfo = true">{{ $t("more info") }}</a>)
              </label>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="cylinder_height"
                    :placeholder="$t('cylinder_height')"
                    type="number"
                    class="form-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="size_array"
                    v-model="cylinder_height_unit"
                    item-text="label"
                    item-value="id"
                    class="form-input"
                    @change="unitChanged(0)"
                  ></v-select>
                </v-col>
              </v-row>
              <div class="select_container">
                <v-radio-group v-model="radio_value">
                  <div>
                    <label>
                      <v-radio
                        class="label-small"
                        value="out"
                        :label="$t('cylinder_out')"
                      ></v-radio>
                    </label>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="cylinder_outer"
                          type="number"
                          class="form-input"
                          :disabled="radio_value !== 'out'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          :items="size_array"
                          v-model="cylinder_outer_unit"
                          item-text="label"
                          item-value="id"
                          class="form-input"
                          :disabled="radio_value !== 'out'"
                          @change="unitChanged(1)"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                  <p style="font-weight: bold">{{ $t('OR') }}</p>
                  <div>
                    <label>
                      <v-radio
                        class="label-small"
                        value="circumference"
                        :label="$t('cylinder_circumference')"
                      ></v-radio>
                    </label>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="cylinder_curcumference"
                          type="number"
                          class="form-input"
                          :disabled="radio_value !== 'circumference'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          :items="size_array"
                          v-model="cylinder_curcumference_unit"
                          item-text="label"
                          item-value="id"
                          class="form-input"
                          :disabled="radio_value !== 'circumference'"
                          @change="unitChanged(2)"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-radio-group>
              </div>
              <div>
                <label>
                  {{ $t("cylinder_wall") }}
                  (<a @click="showDialog = true">{{ $t("unsure") }}</a>)
                </label>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="cylinder_wall"
                      type="number"
                      class="form-input"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :items="size_array"
                      v-model="cylinder_wall_unit"
                      item-text="label"
                      item-value="id"
                      class="form-input"
                      @change="unitChanged(3)"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
              <div>
                <label>{{ $t("cylinder_pressure") }}</label>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="cylinder_pressure"
                      type="number"
                      class="form-input"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :items="unit_array"
                      v-model="cylinder_pressure_unit"
                      item-text="label"
                      item-value="id"
                      class="form-input"
                      @change="unitChanged(4)"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col>
        <div class="instruction_container">
          <v-card class="padding-25 instruction_image_container">
            <img
              :src="image_source"
              class="instruction_image"
              alt="diagram of oxygen cylinder with dimensions for calculator"
            />
          </v-card>
        </div>
      </v-col>
      <v-col class="third-container">
        <v-row>
          <v-col>
            <v-card class="md-green padding-25">
              <v-card-text class="card">
                <div class="card-title">{{ $t("oxygen_volume") }}</div>
                <div class="card-content">{{ numberToString(getOxygenVolume) }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="md-orange padding-25">
              <v-card-text class="card">
                <div class="card-title">{{ $t("water_volume") }}</div>
                <div class="card-content">{{ numberToString(getWaterVolume) }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="note-container">
      <v-col cols="9">
        <p>
          <b>{{ $t("note") }}</b
          >: {{ $t("note_content") }}
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ $t("Approximate height without valve ") }}(mm)
                  </th>
                  <th class="text-left">
                    {{ $t("Wall thickness steel ") }}(mm)
                  </th>
                  <th class="text-left">
                    {{ $t("Wall thickness aluminium ") }}(mm)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in table_data" :key="item.id">
                  <td>{{ item.height_value }}</td>
                  <td>{{ item.wall_thick_steel }}</td>
                  <td>{{ item.wall_thick_aluminium }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p>
            {{ $t("table_description") }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showMoreInfo" width="500">
      <v-card>
        <v-card-title />
        <v-card-text>
          <v-row>
            <div>
              {{ $t("cylinder_more_info") }}
            </div>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showMoreInfo = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  data() {
    return {
      size_image_source: "@/assets/size-estimator_en.png",
      SIZE_UNIT_CONVERSION_RATE: 0.0393701,
      KPA_RATE: 6.89476 / 10000,
      BAR_RATE: 0.0689476,
      cylinder_height1: 0,
      cylinder_height: 0,
      cylinder_height_unit: 0,
      cylinder_pressure: 0,
      cylinder_pressure_unit: 0,
      cylinder_wall: 0,
      cylinder_wall_unit: 0,
      cylinder_curcumference: 0,
      cylinder_curcumference_unit: 0,
      cylinder_outer: 0,
      cylinder_outer_unit: 0,

      prev_cylinder_pressure_unit: 0,

      radio_value: "out",
      rules: [(v) => v.length <= 25 || "Max 25 characters"],

      lpm: 0,
      size_array: [
        {
          label: "mm",
          id: 0,
        },
        {
          label: "Inches",
          id: 1,
        },
      ],
      unit_array: [
        {
          label: "PSI",
          id: 0,
        },
        {
          label: "Kpa",
          id: 1,
        },
        {
          label: "bars",
          id: 2,
        },
      ],
      showDialog: false,
      showMoreInfo: false,
      table_data: [
        {
          id: 1,
          height_value: 279,
          wall_thick_steel: 3.6,
          wall_thick_aluminium: 5.6,
        },
        {
          id: 2,
          height_value: 419,
          wall_thick_steel: 3.6,
          wall_thick_aluminium: 5.6,
        },
        {
          id: 3,
          height_value: 645,
          wall_thick_steel: 3.6,
          wall_thick_aluminium: 5.6,
        },
        {
          id: 4,
          height_value: 930,
          wall_thick_steel: 3.6,
          wall_thick_aluminium: 9.3,
        },
        {
          id: 5,
          height_value: 1320,
          wall_thick_steel: 4.2,
          wall_thick_aluminium: 9.3,
        },
        {
          id: 6,
          height_value: 1520,
          wall_thick_steel: 4.2,
          wall_thick_aluminium: 9.3,
        },
        {
          id: 7,
          height_value: 1320,
          wall_thick_steel: 4.2,
          wall_thick_aluminium: 9.3,
        },
        {
          id: 8,
          height_value: 1524,
          wall_thick_steel: 4.2,
          wall_thick_aluminium: 9.3,
        },
        {
          id: 9,
          height_value: 1313,
          wall_thick_steel: 4.2,
          wall_thick_aluminium: 9.3,
        },
        {
          id: 10,
          height_value: 1478,
          wall_thick_steel: 4.2,
          wall_thick_aluminium: 9.3,
        },
      ],
    };
  },
  computed: {
    getOxygenVolume() {
      let cylinder_value = 0;
      if (this.cylinder_pressure_unit == 0) {
        cylinder_value = this.cylinder_pressure;
      } else if (this.cylinder_pressure_unit == 1) {
        cylinder_value = (this.cylinder_pressure * 2000) / 1.4;
      } else if (this.cylinder_pressure_unit == 2) {
        cylinder_value = (this.cylinder_pressure * 2000) / 137.9;
      }

      let cylinderHeight = 0;
      let cylinderOuter = 0;
      let cylinderWall = 0;
      if (this.cylinder_height_unit == 0) {
        cylinderHeight = this.cylinder_height;
      } else {
        cylinderHeight = this.cylinder_height / this.SIZE_UNIT_CONVERSION_RATE;
      }
      if (this.cylinder_wall_unit == 0) {
        cylinderWall = this.cylinder_wall;
      } else {
        cylinderWall = this.cylinder_wall / this.SIZE_UNIT_CONVERSION_RATE;
      }

      if (this.radio_value == "out") {
        if (this.cylinder_outer_unit == 0) {
          cylinderOuter = this.cylinder_outer;
        } else {
          cylinderOuter = this.cylinder_outer / this.SIZE_UNIT_CONVERSION_RATE;
        }
      } else {
        if (this.cylinder_curcumference_unit == 0) {
          cylinderOuter = this.cylinder_curcumference / Math.PI;
        } else {
          cylinderOuter =
            this.cylinder_curcumference /
            Math.PI /
            this.SIZE_UNIT_CONVERSION_RATE;
        }
      }

      return (
        Math.round(
          (10000 *
            (cylinder_value / 2000) *
            (cylinder_value / 14.696) *
            Math.PI *
            Math.pow((cylinderOuter - 2 * cylinderWall) / 2, 2) *
            (cylinderHeight - cylinderWall)) /
            1000000
        ) / 10000
      );
    },
    getWaterVolume() {
      let cylinderHeight = 0;
      let cylinderOuter = 0;
      let cylinderWall = 0;
      if (this.cylinder_height_unit == 0) {
        cylinderHeight = this.cylinder_height;
      } else {
        cylinderHeight = this.cylinder_height / this.SIZE_UNIT_CONVERSION_RATE;
      }
      if (this.cylinder_wall_unit == 0) {
        cylinderWall = this.cylinder_wall;
      } else {
        cylinderWall = this.cylinder_wall / this.SIZE_UNIT_CONVERSION_RATE;
      }
      if (this.radio_value == "out") {
        if (this.cylinder_outer_unit == 0) {
          cylinderOuter = this.cylinder_outer;
        } else {
          cylinderOuter = this.cylinder_outer / this.SIZE_UNIT_CONVERSION_RATE;
        }
      } else {
        if (this.cylinder_curcumference_unit == 0) {
          cylinderOuter = this.cylinder_curcumference / Math.PI;
        } else {
          cylinderOuter =
            this.cylinder_curcumference /
            Math.PI /
            this.SIZE_UNIT_CONVERSION_RATE;
        }
      }

      return (
        Math.round(
          (10000 *
            Math.PI *
            Math.pow((cylinderOuter - 2 * cylinderWall) / 2, 2) *
            (cylinderHeight - cylinderWall)) /
            1000 /
            1000
        ) / 10000
      );
    },
    image_source() {
      let locale = this.locale
      locale = locale === "vn" || locale === "en" ? locale : "en"
      return require("../assets/size-estimator_" + locale + ".png")
    },
    ...mapFields([
      'locale',
    ]),
  },
  methods: {
    unitChanged(index) {
      if (index == 0) {
        if (this.cylinder_height_unit == 0) {
          this.cylinder_height =
            this.cylinder_height / this.SIZE_UNIT_CONVERSION_RATE;
        } else {
          this.cylinder_height =
            this.cylinder_height * this.SIZE_UNIT_CONVERSION_RATE;
        }
      } else if (index == 1) {
        if (this.cylinder_outer_unit == 0) {
          this.cylinder_outer =
            this.cylinder_outer / this.SIZE_UNIT_CONVERSION_RATE;
        } else {
          this.cylinder_outer =
            this.cylinder_outer * this.SIZE_UNIT_CONVERSION_RATE;
        }
      } else if (index == 2) {
        if (this.cylinder_curcumference_unit == 0) {
          this.cylinder_curcumference =
            this.cylinder_curcumference / this.SIZE_UNIT_CONVERSION_RATE;
        } else {
          this.cylinder_curcumference =
            this.cylinder_curcumference * this.SIZE_UNIT_CONVERSION_RATE;
        }
      } else if (index == 3) {
        if (this.cylinder_wall_unit == 0) {
          this.cylinder_wall =
            this.cylinder_wall / this.SIZE_UNIT_CONVERSION_RATE;
        } else {
          this.cylinder_wall =
            this.cylinder_wall * this.SIZE_UNIT_CONVERSION_RATE;
        }
      }
    },
    numberToString: (x) => (
      isNaN(x) ?
        '--' :
        x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})
    ),
  },

  beforeRouteEnter: (to, from, next) => {
    let name = to.name.toLowerCase()
    let lang = to.query.lang
    next(vm => {
      vm.$store.commit('changeCalculator', name)
      vm.$store.commit('changeLocale', lang)
    })
  }
};
</script>

<style scoped>
.container {
  padding: 15px;
}
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.card {
  color: white;
}
.card-title {
  font-size: 16px;
}
.card-content {
  font-size: 60px;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}
.md-card {
  min-height: 248px;
}
.md-layout-item {
  margin: 5px;
}
.md-layout {
  padding: 15px;
}
.container .md-layout {
  justify-content: center;
}
.md-orange {
  background-color: rgb(244, 128, 36) !important;
}
.md-green {
  background-color: rgb(144, 189, 49) !important;
}
.switch-elem {
  margin-left: 15px;
}
.md-dialog-container {
  transform: none;
}
.instruction_container {
  height: 100%;
  padding: 20px;
}
.instruction_image_container {
  text-align: center;
  height: 100%;
}
.instruction_image {
  height: 574px !important;
}
.third-container {
  max-width: none !important;
  min-width: auto !important;
  padding: 10px !important;
}
.container_style {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.select_container {
  border: 1px solid grey;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.md-radio {
  margin-bottom: 0px !important;
}
.note-container {
  padding: 20px;
}
.third-container .md-gutter,
.third-container .padding-25 {
  max-height: 160px;
  min-height: 160px;
  margin-top: 10px;
}
.first-container {
  padding: 20px;
  height: 100%;
}
.v-input {
  width: 100%;
}
.v-input--radio-group {
  width: 100%;
}
.label-small >>> .v-label {
  font-size: 0.875rem;
}
</style>
