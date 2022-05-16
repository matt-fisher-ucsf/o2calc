<template>
  <v-text-field
    v-bind:value = "value"
    v-bind:label = "label"
    v-on:input = "$emit('input', $event)"
    class = "mt-0 pt-0"
    hide-details
    single-line
    type="number"
  ></v-text-field>
</template>

<script>
export default {
  name: 'InputNumeric',
  props: ['value', 'label']
}
</script>