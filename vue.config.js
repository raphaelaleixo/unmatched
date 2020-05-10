module.exports = {
  pwa: {
    name: "Unmatched",
    themeColor: "#5f6c7b",
    msTileColor: "#ffd803 ",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    iconPaths: {
      favicon32: "./favicon-32x32.png",
      favicon16: "./favicon-16x16.png",
      appleTouchIcon: "./apple-touch-icon.png",
      maskIcon: "./safari-pinned-tab.svg",
      msTileImage: "./mstile-144x144.png"
    },
    workboxOptions: {
      exclude: [/\.css.map$/, ".htaccess"]
    },
    manifestOptions: {
      icons: [
        {
          src: "./android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    }
  },
  transpileDependencies: ["vuetify"]
};
