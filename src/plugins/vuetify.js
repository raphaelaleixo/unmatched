import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#fff",
        base: "#ffd803",
        secondary: "#e3f6f5",
        accent: "#bae8e8",
        anchor: "#004643"
      }
    }
  }
});
