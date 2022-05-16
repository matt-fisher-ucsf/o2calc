import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const cylinder_lookup = {
  'Size C': 170,
  'Size D': 340,
  'Size E': 680,
  'Size F': 1360,
  'Size G': 4100,
  'Size H': 6600,
  'Size J': 6800,
  'Size K': 7100,
  '7500L': 7500,
}

const cylinder_constant_lookup = {
  'Size C': 0.085,
  'Size D': 0.17,
  'Size E': 0.34,
  'Size F': 0.68,
  'Size G': 1.7,
  'Size H': 0,
  'Size J': 3.40,
  'Size K': 3.55,
  '7500L': 0,
}

const apply_leakage = leakage => supply => supply * (1 - leakage/100)

const calculate_supply_plant = (state) => {
  let supply = 0

  if(state.selected_plant) {
    // plant default is cubic meters per hour so we keep period and unit state different
    let multiplier = ( (state.period_plant === 'per day') ? 1 : 60 * 24 ) * Math.min(state.time_plant,24) / 24

    switch (state.period_plant) {
      case 'per day':
        multiplier = 1 * Math.min(state.time_plant,24) / 24
        break
      case 'per hour':
        multiplier = 24 * Math.min(state.time_plant,24) / 24
        break
      case 'per minute':
        multiplier = 60 * 24 * Math.min(state.time_plant,24) / 24
        break
    }

    if(state.unit_plant === 'liters') {
      supply = state.amount_plant * multiplier
    }
    if(state.unit_plant === 'gallons') {
      supply = state.amount_plant * 3.79 * multiplier
    }
    if(state.unit_plant === 'cubic meters') {
      supply = state.amount_plant * 1000 * multiplier
    }
  }

  return apply_leakage(state.leakage_plant)(supply) * state.num_plants
}

const calculate_supply_concentrator = (state) => {
  let supply = 0
  let multiplier = ( (state.period_concentrator === 'per day') ? 1 : 60 * 24 ) * Math.min(state.time_concentrator,24) / 24

  if(state.selected_concentrator) {
    switch (state.period_concentrator) {
      case 'per day':
        multiplier = 1 * Math.min(state.time_concentrator,24) / 24
        break
      case 'per hour':
        multiplier = 24 * Math.min(state.time_concentrator,24) / 24
        break
      case 'per minute':
        multiplier = 60 * 24 * Math.min(state.time_concentrator,24) / 24
        break
    }

    if(state.unit_concentrator === 'liters') {
      supply = state.amount_concentrator * multiplier * state.num_concentrators
    }
    if(state.unit_concentrator === 'gallons') {
      supply = state.amount_concentrator * 3.79 * multiplier * state.num_concentrators
    }
    if(state.unit_concentrator === 'cubic meters') {
      supply = state.amount_concentrator * 1000 * multiplier * state.num_concentrators
    }
  }

  return supply
}

const calculate_supply_liquid = (state) => {
  let supply = 0

  if(state.selected_liquid) {

    if(state.unit_liquid === 'liters') {
      supply = state.amount_liquid * 861
    }
    if(state.unit_liquid === 'gallons') {
      supply = state.amount_liquid * 3.7854 * 861
    }
    if(state.unit === 'inches') {
      supply = state.amount_liquid * 10 * 861
    }
    if(state.unit === 'centimeters') {
      supply = state.amount_liquid * 0.393 * 10 * 861
    }

  }

  return apply_leakage(state.leakage_liquid)(supply)
}

const calculate_supply_cylinder = (state) => {
  let supply = 0

  if(state.selected_cylinder) {
    supply = cylinder_lookup[state.cylinder_type.slice(0,6)] * state.numtanks
  }

  return apply_leakage(state.leakage_cylinder)(supply)
}

const calculate_supply_fixed = (state) => {
  let supply_liquid = 0,
      supply_cylinder = 0;

  supply_liquid = calculate_supply_liquid(state)
  supply_cylinder = calculate_supply_cylinder(state)

  return supply_liquid + supply_cylinder
}

const calculate_supply_infinite = (state) => {
  let supply_plant = 0,
      supply_concentrator = 0;

  supply_plant = calculate_supply_plant(state)
  supply_concentrator = calculate_supply_concentrator(state)

  return supply_plant + supply_concentrator
}

const convert_pressure = function(amount, unit) {

  // convert unit into psi if Kpa or bars
  if(unit === "Kpa") {
    amount = amount / 6.89476
  }
  if(unit === "bars") {
    amount = amount / .0689476
  }

  return amount
}

export default new Vuex.Store({
  strict: true,
  state: {
    locale: "en",
    locales: [
      {abbreviation: "en", language: "English"},
      {abbreviation: "es", language: "Español"},
      {abbreviation: "fr", language: "Français"},
      {abbreviation: "vn", language: "Vietnamese"},
    ],
    stepinput: "1",
    showoverlay: false,
    showoverlay_cylinder: false,
    selected_plant: false,
    selected_concentrator: false,
    selected_liquid: false,
    selected_cylinder: false,
    selected_plant_demand: true,
    selected_concentrator_demand: true,
    selected_liquid_demand: true,
    selected_cylinder_demand: true,
    sources: ['Oxygen Plant (PSA)', 'Oxygen Cylinders', 'Portable Oxygen Concentrator (PSA)', 'Liquid Oxygen (VIE)'],
    source: 'Oxygen Plant (PSA)',
    usage: 0,
    amount: 0,
    amount_plant: 0,
    amount_concentrator: 0,
    amount_liquid: 0,
    unit: 'liters',
    unit_plant: 'cubic meters',
    unit_concentrator: 'liters',
    unit_liquid:  'liters',
    period: 'per day',
    period_plant: 'per hour',
    period_concentrator: 'per minute',
    time: 12,
    time_plant: 12,
    time_concentrator: 24,
    generator_supply: 'Oxygen cylinders',
    cylinder_types: [
      'Size C Tank (36cm; 170 L)','Size D Tank (49cm; 340 L)','Size E Tank (680L)',
      'Size F Tank (1 meter; 1360L)','Size G Tank(1.5 meter; 3400L)','Size H Tank (1.5 meter; 6600L)',
      'Size J Tank (1.45 meter; 6800L)', '7500L'
    ],
    cylinder_type: 'Size H Tank (1.5 meter; 6600L)',
    numtanks: 0,
    leakage: 0,
    leakage_plant: 0,
    leakage_liquid: 0,
    leakage_cylinder: 0,
    num_plants: 1,
    num_concentrators: 1,
    entermode3: 0,
    num_inpatients: 50,
    distribution: 2,
    indays: true,
    supply_types: null,
    supply_type_plant: null,
    supply_type_liquid: null,
    supply_type_concentrator: null,
    supply_show_demand: true,
    ventilator_devices: null,

    // calculator choice
    calculator: 'supply',

    // demand
    amount_plant_demand: 0,
    unit_plant_demand: 'cubic meters',
    period_plant_demand: 'per hour',
    days_demand: 1,
    demandmode: 0,
    demandsnackbar: false,
    demandsnackbartext: '',

    // imputation state
    spo2: 0,
    fio2: 21,

    // duration state
    cylinder_types_duration: [
      'Size C Tank (36cm; 170 L)',
      'Size D Tank (49cm; 340 L)',
      'Size E Tank (680L)',
      'Size F Tank (1 meter; 1360L)',
      'Size G Tank(1.5 meter; 3400L)',
      //'Size H Tank (1.5 meter; 6600L)',
      'Size J Tank (1.45 meter; 6800L)',
      'Size K Tank (1.5 meter; 7100L)',
      // '7500L'
    ],
    cylinder_type_duration: 'Size E Tank (680L)',
    flow_rate: 0,
    inhours: true,
    pressure_safe_amount: 200,
    pressure_safe_unit: 'PSI',
    pressure_current_amount: 2000,
    pressure_current_unit: 'PSI',
    pressure_unit_types: ['PSI','Kpa','bars'],
    usage_duration: 0,
    // device state
    flow_rate_device: 0,
    device_types: ['Nasal Cannula','Facemask','Face mask with reservoir','Ventilator','High Flow Nasal Cannula','CPAP or NIPPV'],
    device_type: 'Nasal Cannula',
    device_types_flow_rate: {
      'Nasal Cannula': 3,
      'Facemask': 8,
      'Face mask with reservoir': 15,
      'Ventilator': 18,
      'High Flow Nasal Cannula': 40,
      'CPAP or NIPPV': 20
    },
    patient_table_editable: [
      {
        "device": "Nasal Cannula",
        "rate": 3,
        "leak": null,
        "bias": null,
        "fio2": null,
        "rr": null,
        "expiratory": null,
        "liters": 4320,
        "patients": 0
      }
    ],
    patient_table_history: {},
    // impact state
    impact_patients: 28,
    impact_spo2_default: 94,
    impact_spo2_modeled: 94,
  },
  mutations: {
    addLocale: function(state, payload) { // payload should be {abbreviation: '', language: ''}
      if(state.locales.filter( d => d.abbreviation === payload.abbreviation ).length === 0) {
        // if does not exist then add payload 
        state.locales.push(payload)
      }
    },
    changeCalculator: function(state, name) {
      state.calculator = name
    },
    changeAmount: function(state, amount) {
      state.amount = amount
    },
    changeAmountPlant: function(state, amount) {
      state.amount_plant = amount
    },
    changeAmountConcentrator: function(state, amount) {
      state.amount_concentrator = amount
    },
    changeAmountLiquid: function(state, amount) {
      state.amount_liquid = amount
    },
    changeUnit: function(state, unit) {
      state.unit = unit
    },
    changeUnitPlant: function(state, unit) {
      state.unit_plant = unit
    },
    changeUnitConcentrator: function(state, unit) {
      state.unit_concentrator = unit
    },
    changeUnitLiquid: function(state, unit) {
      state.unit_liquid = unit
    },
    changePeriodPlant: function(state, period) {
      state.period_plant = period
    },
    changeLocale: function(state, locale) {
      if(locale && state.locales.map(d=>d.abbreviation).indexOf(locale) > -1) {
        state.locale = locale
      }
    },
    changePatientTable: function(state, tbl) {
      state.patient_table_editable = tbl
    },
    storePatientTableHistory: function(state, vals) {
      Vue.set(
        state.patient_table_history,
        vals.date,
        vals.tbl
      )
    },
    removePatientTableHistory: function(state, date) {
      state.patient_table_history[date] = null
    },
    updateField
  },
  getters: {
    cylinder_type_shortened: (state, getters) => {
      state && getters
      if(state.cylinder_type.indexOf('Size') > -1) {
        return state.cylinder_type.slice(5,6)
      } else {
        return state.cylinder_type
      }
    },
    tanksperday: (state, getters) => {
      state && getters
      return state.usage / cylinder_lookup[state.cylinder_type.slice(0,6)]
    },
    supply_fixed: (state) => calculate_supply_fixed(state),
    supply_infinite: (state) => calculate_supply_infinite(state),
    remaining: (state, getters) => {
      return state.usage - getters.supply_infinite > 0 ? getters.supply_fixed / ( state.usage - getters.supply_infinite ) : Infinity
    },
    // getters for imputation
    imputed: (state, getters) => {
      state && getters
      const s = state.spo2 / 100
      const frac = 11700 / ( (1/s) - 1 )
      const inner = Math.pow( Math.pow(50,3) + Math.pow(frac,2), 1/2 )
      const left = Math.pow(frac + inner, 1/3)
      // if taking cube root of a negative number then JavaScript will give NaN
      //   so if negative we address by taking the cube root of the absolute value and multiplying by -1
      const right = frac - inner < 1 ? -1 * Math.pow(Math.abs(frac - inner), 1/3) : Math.pow(frac - inner, 1/3)
      return left - right
    },
    pfratio: (state, getters) => {
      state && getters
      return getters.imputed / (state.fio2/100)
    },
    sfratio: (state, getters) => {
      state && getters
      return state.spo2 / (state.fio2/100)
    },
    // getters for duration
    tanksperday_duration: (state, getters) => {
      state && getters
      return state.usage_duration / cylinder_lookup[state.cylinder_type_duration.slice(0,6)]
    },
    remaining_quantity_duration: (state) => {
      let pressure_current_amount = convert_pressure(state.pressure_current_amount, state.pressure_current_unit)
      let pressure_safe_amount = convert_pressure(state.pressure_safe_amount, state.pressure_safe_unit)

      return cylinder_constant_lookup[state.cylinder_type_duration.slice(0,6)] * (pressure_current_amount - pressure_safe_amount)
    },
    remaining_time_duration: (state) => {
      let pressure_current_amount = convert_pressure(state.pressure_current_amount, state.pressure_current_unit)
      let pressure_safe_amount = convert_pressure(state.pressure_safe_amount, state.pressure_safe_unit)

      return cylinder_constant_lookup[state.cylinder_type_duration.slice(0,6)] * (pressure_current_amount - pressure_safe_amount) / state.flow_rate
    },

    // helper function
    getField
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],
})
