<template>
  <v-row class="d-flex justify-center align-center" style="height:75vh;">
    <v-col cols="8" class="headline">
      This is a collaborative project of the
      <a href="https://anesthesia.ucsf.edu/" target="_blank" rel="noopener noreferrer">
        UCSF Anesthesia Division of Global Health Equity
      </a>
      and the 
      <a href="http://www.anesthesiaug.org/" target="_blank" rel="noopener noreferrer">
        Association of Ansthesiologists of Uganda
      </a>
      in partnership with the Department of Anesthesia at Makerere University.
      <br/><br/>
      For questions or comments please contact
      <a href="mailto:globalanesthesia@ucsf.edu">globalanesthesia@ucsf.edu</a>.
    </v-col>
  </v-row>
</template>

<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    let name = to.name.toLowerCase()
    next(vm => {
      vm.$store.commit('changeCalculator', name)
    })
  }
}
</script>