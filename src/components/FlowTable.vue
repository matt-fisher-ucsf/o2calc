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
        :items="flow_data"
      >
        <template v-slot:header.device="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.flow1="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.flow2="{header}">
          {{ $t(header.text) }}
        </template>
        <template v-slot:header.flow3="{header}">
          {{ $t(header.text) }}
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
export default {
  name: 'FlowTable',
  data: () => ({
    headers: [
      {text: 'Device', value: 'device'},
      {text: 'Flow rate for minute ventilation 10LPM @Fi02 100%', value: 'flow1', align: 'end'},
      {text: 'Flow rate for minute ventilation 7.5 LPM and FiO2 100%', value: 'flow2', align: 'end'},
      {text: 'Flow rate for minute ventilation 7.5 LPM and FiO2 50%', value: 'flow3', align: 'end'},
    ],
    flow_data: [
      {
        device: 'Carefusion LTV 1200',
        flow1: 16,
        flow2: 12.6,
        flow3: 4.3
      },
      {
        device: 'Bellvista IMT Medical',
        flow2: 13.3
      },
      {
        device: 'Hamilton Medical C2',
        flow2: 15.8,
        flow3: 3.3
      },
      {
        device: 'Maquet Servo-i',
        flow2: 8.4,
        flow3: 4.3
      },
      {
        device: 'Air Liquide T75',
        flow2: 11.1,
        flow3: 3.5
      },
      {
        device: 'Viasys Vela',
        flow2: 15.5,
        flow3: 6.3
      },
      {
        device: 'Newport HT70',
        flow1: 14
      },
      {
        device: 'Hamilton T1',
        flow1: 9
      },
      {
        device: 'Impact EMV',
        flow1: 10
      },
      /*{
        device: 'FP Optiflow',
      },
      {
        device: 'Vapotherm High Flow Nasal Cannula'
      }*/
    ]
  })
}
</script>
