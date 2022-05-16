<template>
<div>
      <!-- <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="calculator"
        >
          <v-list-item value="objective" to="/objective" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Navigation') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="demand" to="/demand" @click = "hideDrawer">
            <v-list-item-title>{{ $t('O₂ Demand') }}</v-list-item-title>
          </v-list-item>
          
          <v-list-item value="supply" to="/supply" @click = "hideDrawer">
            <v-list-item-title>{{ $t('O₂ Supply & Demand') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="imputation" to="/imputation" @click = "hideDrawer">
            <v-list-item-title>{{ $t('SpO₂ to PaO₂') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="duration" to="/duration" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Cylinder Duration') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="cylinder" to="/cylinder" @click = "hideDrawer">
            <v-list-item-title>{{ $t('Cylinder Size') }}</v-list-item-title>
          </v-list-item>

          <v-list-item value="formulas" to="/formulas" @click = "hideDrawer">
            <v-list-item-title>{{ $t('About') }}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      <v-divider />
      -->
    <v-app-bar class="d-print-none elevation-0">
      <v-row class="justify-space-between">
      <img src="@/assets/occ-logo.png" width="32" height="32"/>
      <LocaleSelector />
      </v-row>
    </v-app-bar>
    <h1 class="text-h1 primary--text">What Would You Like to Calculate?</h1>
    <button-routes class = "d-none d-md-flex" />
    </div>
</template>

<script>
import ButtonRoutes from '@/components/globals/ButtonRoutes.vue'
import LocaleSelector from '@/components/globals/LocaleSelector.vue'

export default {
components: {
  ButtonRoutes,
  LocaleSelector
}
}
</script>

<style>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: transparent !important;
}
</style>