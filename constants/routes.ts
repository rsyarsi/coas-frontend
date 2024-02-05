const AUTH = {
  SIGNIN: {
    href: '/auth/signIn.vue',
    route: '/sign-in',
    url: '/sign-in'
  },
  FORGOTPASSWORD: {
    href: '/auth/forgotPassword.vue',
    route: '/forgot-password',
    url: '/forgot-password'
  }
}

const DASHBOARD = {
  HOME: {
    href: '/index.vue',
    route: '/',
    url: '/'
  },
  FORM: {
    href: '/forms.vue',
    route: '/forms',
    url: '/forms'
  },
  TYPOGRAPHY: {
    href: '/typography.vue',
    route: '/typography',
    url: '/typography'
  },
  TABLE: {
    href: '/tables.vue',
    route: '/tables',
    url: '/tables'
  },
  TABS: {
    href: '/tabs.vue',
    route: '/tabs',
    url: '/tabs'
  },
  FILTERS: {
    href: '/filters.vue',
    route: '/filters',
    url: '/filters'
  },
  CHART: {
    href: '/charts.vue',
    route: '/charts',
    url: '/charts'
  },
  PROFILE: {
    href: '/profile.vue',
    route: '/profile',
    url: '/profile'
  },
  SETTING: {
    href: '/settings.vue',
    route: '/user-settings',
    url: '/setting'
  },
  CARD: { href: '/cards.vue', route: '/cards', url: '/cards' },
  ICON: { href: '/icons.vue', route: '/icons', url: '/icons' },
  LANDING: { href: '/landing.vue', route: '/landing', url: '/landing' },
  PARAGRAPH: { href: '/paragraph.vue', route: '/paragraph', url: '/paragraph' },
  HEADING: { href: '/headings.vue', route: '/headings', url: '/headings' },

  MASTER_TAHUN: {
    href: '/masterData/tahun.vue',
    route: '/master-data/tahun',
    url: '/master-data/tahun'
  },
  MASTER_SEMESTER: {
    href: '/masterData/semester.vue',
    route: '/master-data/semester',
    url: '/master-data/semester'
  },
  MASTER_GRUP_SPESIALIS: {
    href: '/masterData/grup_spesialis.vue',
    route: '/master-data/grup_spesialis',
    url: '/master-data/grup_spesialis'
  },
  MASTER_SPESIALIS: {
    href: '/masterData/spesialis.vue',
    route: '/master-data/spesialis',
    url: '/master-data/spesialis'
  }
}

// const API = {
//   API_SALES: {
//     url: '/data-sales'
//     // route: ''
//   },
//   API_REVENUE: {
//     url: '/data-revenue'
//     // route: ''
//   },
//   API_CUSTOMER: {
//     url: '/data-customer'
//     // route: ''
//   },
//   API_PRODUCT: {
//     url: '/data-product'
//     // route: ''
//   },
//   API_CHANNEL: {
//     url: '/data-channel'
//     // route: ''
//   },
//   API_TIMELINE: {
//     url: '/data-channel'
//     // route: ''
//   }
// }

const API = {
  API: {
    href: '/api/v1',
    route: '/api/v1',
    url: '/api/v1'
  }
}

module.exports = { ...AUTH, ...DASHBOARD, ...API }
