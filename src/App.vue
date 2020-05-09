<template>
  <v-app>
    <v-content>
      <transition name="page">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    links: [
      {
        title: "About this project",
        url:
          "https://medium.com/@raphaelaleixo/creating-codewords-a-real-time-multiplayer-boardgame-on-the-web-ca051071e75"
      },
      {
        title: "How to play",
        url:
          "https://medium.com/@raphaelaleixo/creating-codewords-a-real-time-multiplayer-boardgame-on-the-web-ca051071e75"
      }
    ]
  })
};
</script>

<style lang="scss">
.v-application {
  &.theme--light {
    background: url("https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")
      no-repeat fixed top center !important;
    background-size: cover;
    color: $black;
    position: relative;
    .v-btn {
      font-weight: bolder;
    }
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.3;
    }
  }
}
</style>
