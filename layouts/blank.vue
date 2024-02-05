<template>
  <v-app
    id="blank"
    :dark="isDark"
    style="
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: scroll;
    "
    ><SeoHead />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import SeoHead from '~/components/SeoHead'

export default {
  name: 'LayoutBlank',
  components: { SeoHead },
  data() {
    return {
      title: 'Coas'
    }
  },
  computed: {
    ...mapState({ isDark: (state) => state.core.theme.isDark })
  }
}
</script>

<!-- Styles -->
<!-- <style lang="scss" scoped>
@import '~/assets/scss/theme';
</style> -->
