<template>
<div>
    <v-app-bar class="d-print-none elevation-0">
      <v-container>
      <v-row class="justify-space-between align-tio"><div class="align-center d-flex">
        <a href="/">
      <img src="@/assets/occ-logo.png" width="32" height="32"/></a>
       <v-btn value="formulas" to="/formulas" text small class="text-capitalize ml-1">
            {{ $t('About') }}
          </v-btn>
          </div>
          <div class="d-flex align-center">
      <LocaleSelector />
      <div id="powered-by" class="caption ml-6 secondary white--text pa-2"><span>Powered by <strong>Open Critical Care</strong></span></div>
      </div>
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
#powered-by {
  border-radius: 0 0 6px 6px;
}
</style>