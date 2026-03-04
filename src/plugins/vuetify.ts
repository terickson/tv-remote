import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VBtn: {
      style: 'min-width: 48px; min-height: 48px;',
    },
  },
})
