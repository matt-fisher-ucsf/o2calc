<template>
  <div style="display:flex; flex-wrap: wrap;">
    <span style="text-align:left; align-self:center;">{{ $t('leakage') }}</span>
    <div style="display: flex; flex-grow:0.9;">
      <v-slider
        v-model = "leakage"
        v-on:input = "$emit('input', $event)"
        class="align-center"
        :max = "max"
        :min = "min"
        hide-details
        color = "#178ccb"
        thumb-color = "#178ccb"
        style = "min-width: 200px;"
      >
        <template v-slot:append>
          <v-text-field
            v-model = "leakage"
            v-on:input = "$emit('input', +$event)"
            class="mt-0 pt-0 right"
            single-line
            type="number"
            style="width: 80px;"
            :max="max"
            :min="min"
            suffix = "%"
            :rules="rules.value"
          ></v-text-field>
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Leakage',

  data: () => ({
    leakage: 0,
    min: 0,
    max: 100,
    rules: {
      value: [
        val => {return val >= 0 && val <= 100 || `Amount should be between 0 and 100`}
      ],
    }
  }),

}
</script>