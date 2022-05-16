<template>
  <v-row style="max-height: 90vh; overflow-y: auto; margin: 0;">
    <v-col style = "max-width: 700px;">
      <v-data-table
        dense
        mobile-breakpoint="0"
        disable-filtering
        disable-pagination
        disable-sort
        :hide-default-footer="true"
        :headers="headers"
        :items="ventilator_devices"
        :fixed-header="true"
        :calculate-width="false"
        height="50vh"
      >
        <template v-slot:header.Brand="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.Model="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.Flow="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.Note="{header}">
          {{ $t(header.text) }}
        </template>

        <template v-slot:item.Note="{ item }">
          <span v-html="item.Note"></span>
        </template>
      </v-data-table>
      <v-col style="background-color: white; color: black;">
        <p class="caption">
          {{ $t('device_table_caption1') }}
        </p>
        <p class="caption">
          {{ $t('device_table_caption2') }}
        </p>
      </v-col>
    </v-col>
  </v-row>  
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { csv } from 'd3-fetch';
import linkifyHtml from 'linkifyjs/html';

export default {
  name: 'FlowTable',
  data: () => ({
    headers: [
      {text: 'Brand', value: 'Brand'},
      {text: 'Model', value: 'Model'},
      {text: 'Bias Flow (L/min)', value: 'Flow', align: 'end', width: '100px'},
      {text: 'Note', value: 'Note', width: '200px'},
    ],
  }),

  computed: {
    ...mapFields([
      'ventilator_devices',
    ])
  },

  mounted: function() {
    let instance = this;
    csv('./ventilator_devices.csv')
      .then( (result) => {
        // change urls to anchor tag with linkifyjs
        result.forEach(d => {
          d.Note = linkifyHtml(
            d.Note,
            {
              format: () => {
                return 'website/manual'
              },
              target: '_blank',
            }
          )
        })
        instance.ventilator_devices = result
      })
      .finally(function(e) {e})
  },
}
</script>
