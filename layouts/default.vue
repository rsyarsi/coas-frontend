<template>
  <v-app id="default" :dark="isDark">
    <SeoHead />
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped" -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :dark="isDark"
      fixed
      app
      floating
      styles="height: calc(100% - 2rem); top: 0px; max-height: calc(100% - 0px)"
    >
      <!-- src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&h=987&q=80" -->
      <!-- class="rounded ml-3 mt-4" -->
      <!-- class="no-border elevation-2 rounded ml-3 mt-4" -->
      <nuxt-link to="/" class="no-underline success--text">
        <v-flex
          align-self-center
          class="text-center justify-center align-center"
          style="height: 33px"
        >
          <!-- <h4 :class="`${miniVariant ? 'subtitle-2' : ''} my-6`" v-text="title" -->
          <h4 class="my-6" v-text="title"
        /></v-flex>
      </nuxt-link>
      <!-- <v-container fluid class="accent darken-2">
        <v-row>
          <v-col cols="3">
            <v-avatar
              color="primary"
              size="35"
              v-html="title.substring(0, 1)"
            ></v-avatar>
          </v-col>
          <v-col cols="9">
            <h5>John Doe</h5>
            <h6>Web Administrator</h6>
          </v-col>
        </v-row>
      </v-container> -->
      <v-list :dark="isDark">
        <slot v-for="(item, i) in items">
          <v-list-group
            v-if="item.items && item.items.length && item.to === null"
            :key="`${item.title}-key-${i + 1}`"
            v-model="item.active"
            :prepend-icon="item.icon"
            :color="isDark ? 'warning' : 'accent-1'"
            :value="false"
            :ripple="false"
          >
            <template v-if="item.items" v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="child in item.items"
              :key="child.title"
              :to="child.to"
            >
              <v-list-item-action>
                <v-icon center dense>
                  {{ child.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.title"
            :to="item.to"
            exact
            :ripple="false"
          >
            <v-list-item-action>
              <v-icon center>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </slot>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar
      :clipped-left="clipped" 
      elevate-on-scroll -->
    <v-app-bar
      :color="isDark ? 'default' : 'white'"
      :dark="isDark"
      elevation="8"
      app
      class="px-4"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon
        :class="drawer ? '' : 'menu-toggle'"
        @click.stop="drawer = !drawer"
      />
      <v-btn
        small
        icon
        :class="drawer ? '' : 'd-none'"
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn small icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn small icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-col
        align-self="center"
        :cols="searchLength ? '7' : '3'"
        :sm="searchLength ? '3' : '2'"
        :lg="searchLength ? '2' : '1'"
      >
        <v-text-field
          v-model="search"
          :full-width="true"
          :hide-details="true"
          :height="`100%`"
          :placeholder="searchLength ? 'Search' : ''"
          name="search"
          prepend-inner-icon="mdi-magnify"
          maxlength="20"
          dense
          solo
          flat
          @focus="searchFocus"
          @focusout="searchFocus"
        >
        </v-text-field>
      </v-col>
      <v-btn small icon @click.stop="setTheme">
        <!-- <v-btn icon @click.stop="handledarkmode"> -->
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer"> -->
      <!-- <v-btn icon @click.stop="setProfileMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <v-menu transition="slide-y-transition" bottom top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list class="pl-2 pr-4">
          <!-- <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item> -->
          <v-list-item :to="`/sign-in`">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="`/profile`">
            <v-list-item-icon>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Profile </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Setting </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      fab
      light
      fixed
      bottom
      right
      small
      color="error"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-overlay v-if="$nuxt.isOffline" :value="overlay" z-index="1000">
      <v-banner color="warning" single-line @click:icon="alert">
        <v-icon slot="icon" color="light" size="36">
          mdi-wifi-strength-alert-outline
        </v-icon>
        <span class="white--text"
          >Unable to verify your Internet connection</span
        >
        <template v-slot:actions>
          <v-btn
            class="white--text"
            color="warning"
            text
            flat
            fab
            @click="overlay = !overlay"
          >
            <v-icon> mdi-window-close </v-icon>
          </v-btn>
        </template>
      </v-banner></v-overlay
    >
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import global from '~/constants/global'
import SeoHead from '~/components/SeoHead'

export default {
  name: 'LayoutDefault',
  components: { SeoHead },
  data() {
    return {
      title: 'Coas',
      company: global.company,
      // clipped: false,
      // fixed: false,
      drawer: false,
      overlay: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-database',
          title: 'Master Data',
          to: null,
          items: [
            {
              icon: 'mdi-calendar',
              title: 'Tahun',
              to: '/master-data/tahun'
            },
            {
              icon: 'mdi-text-box',
              title: 'Semester',
              to: '#'
            },
            {
              icon: 'mdi-account-group-outline',
              title: 'Grup Spesialis (ASM)',
              to: '#'
            },
            {
              icon: 'mdi-account',
              title: 'Spesialis (POLIKLINIK)',
              to: '#'
            },
            {
              icon: 'mdi-text-box-multiple',
              title: 'Grup Penilaian',
              to: '#'
            },
            {
              icon: 'mdi-text',
              title: 'Detail Penilaian',
              to: '#'
            },
            {
              icon: 'mdi-doctor',
              title: 'Dosen',
              to: '#'
            },
            {
              icon: 'mdi-account-school-outline',
              title: 'Koas / Mahasiswa/i',
              to: '#'
            }
          ]
        },
        {
          icon: 'mdi-account-group',
          title: 'Master User',
          to: null,
          items: [
            {
              icon: 'mdi-import',
              title: 'Input Data',
              to: '#'
            },
            {
              icon: 'mdi-export',
              title: 'Export Data',
              to: '#'
            }
          ]
        },
        {
          icon: 'mdi-account-school-outline',
          title: 'Mahasiswa/i',
          to: null,
          items: [
            {
              icon: 'mdi-import',
              title: 'Input Assesment',
              to: '/transaction/patientlists'
            },
            {
              icon: 'mdi-export',
              title: 'Export Assesment',
              to: '#'
            }
          ]
        },
        {
          icon: 'mdi-doctor',
          title: 'Dosen',
          to: null,
          items: [
            {
              icon: 'mdi-import',
              title: 'Input Penilaian',
              to: '/transaction/lectures/patientlists'
            },
            {
              icon: 'mdi-export',
              title: 'Penillaian Pilih Semester',
              to: '/transaction/lectures/assesment/selectsemesteryear'
            },
            {
              icon: 'mdi-export',
              title: 'Penillaian Group',
              to: '/transaction/lectures/assesment/selectgroup'
            },
            {
              icon: 'mdi-export',
              title: 'Penillaian Detail',
              to: '/transaction/lectures/assesment/selectdetail'
            }
          ]
        }
      ],
      miniVariant: false,
      right: true,
      fab: true,
      darkmode: false,
      searchLength: false,
      search: ''
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$vuetify.theme.isDark ? 'theme--dark' : 'theme--light'
      }
    }
  },
  computed: {
    ...mapState({ isDark: (state) => state.core.theme.isDark })
  },
  created() {
    const {
      $isServer,
      $store: { commit }
    } = this
    // Execute initial stores
    if (!$isServer) {
      commit('core/INITIALIZE_STORE')
    }
  },
  methods: {
    setTheme() {
      const {
        $vuetify,
        $store: { dispatch }
      } = this
      $vuetify.theme.dark = !$vuetify.theme.isDark
      const nuxtify = JSON.parse(localStorage.getItem('nuxtify') || 'null')
      dispatch('core/setDark', {
        ...nuxtify,
        isDark: $vuetify.theme.dark
      })
    },
    searchFocus() {
      this.searchLength = !this.searchLength
      this.search = ''
    },
    // setProfileMenu() {
    // return console.log('setProfileMenu')
    // },
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop() {
      const { $vuetify } = this
      $vuetify.goTo(0)
    }
  }
}
</script>

<!-- Styles -->
<!-- <style lang="scss">
@import '~/assets/scss/theme';
</style> -->
