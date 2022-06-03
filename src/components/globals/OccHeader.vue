<template>
<div>
    <v-app-bar class="d-print-none elevation-0">
      <v-container>
      <v-row class="justify-space-between align-tio"><div class="align-center d-flex">
      <img src="@/assets/occ-logo.png" width="32" height="32"/>
       <v-btn value="formulas" to="/formulas" text small class="text-capitalize">
            {{ $t('About') }}
          </v-btn>
          </div>
          
      <LocaleSelector />
          
      </v-row>
      </v-container>
    </v-app-bar>
    <v-container>
    <h1 class="text-h1 primary--text">What Would You Like to Calculate?</h1>
    <button-routes class = "d-none d-md-flex" />
    </v-container>
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