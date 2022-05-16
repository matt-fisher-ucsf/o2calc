<template>
  <div>
    <formulas-english v-if="locale !== 'vn'"/>
    <formulas-vietnamese v-if="locale === 'vn'"/>
  </div>
</template>

<script>
import FormulasEnglish from '@/components/FormulasEnglish.vue'
import FormulasVietnamese from '@/components/FormulasVietnamese.vue'
import { mapFields } from 'vuex-map-fields';
import { mdiPdfBox } from '@mdi/js'

export default {
  name: 'Formulas',

  components: {
    FormulasEnglish,
    FormulasVietnamese,
  },

  data: () => ({
    mdiPdfBox
  }),

  computed: {
    ...mapFields([
      'locale',
    ]),
  },

  beforeRouteEnter: (to, from, next) => {
    let name = to.name.toLowerCase()
    let lang = to.query.lang
    next(vm => {
      if(typeof name !== 'undefined') {
        vm.$store.commit('changeCalculator', name)
      }
      vm.$store.commit('changeLocale', lang)
    })
  }
}
</script>
