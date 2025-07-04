import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { VColorInput } from "vuetify/labs/VColorInput";
import { VDateInput } from "vuetify/labs/VDateInput";
import colors from "vuetify/util/colors";

export default createVuetify({
  components: {
    VColorInput,
    VDateInput,
    ...components,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: colors.blue.base,
          secondary: colors.blue.lighten5,
          accent: colors.blue.accent3,
          error: colors.red.accent2,
          info: colors.blue.lighten4,
          success: colors.green.base,
          warning: colors.amber.base,
        },
      },
      dark: {
        colors: {
          primary: colors.blue.darken2,
          secondary: colors.blue.darken4,
          accent: colors.blue.accent4,
          error: colors.red.darken4,
          info: colors.blue.darken4,
          success: colors.green.darken3,
          warning: colors.amber.darken3,
        },
      },
    },
  },
});
