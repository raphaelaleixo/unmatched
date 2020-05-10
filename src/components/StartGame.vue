<template>
  <v-container style="height:100%">
    <v-row class="finished" style="height:100%" align="center" justify="center">
      <v-col cols="12" lg="4">
        <h2 class="display-2 base--text text-center mb-2">
          {{ t("The game will start soon!") }}
        </h2>
        <h3 class="display-1 white--text text-center mb-6">
          {{ t("Waiting for other players...") }}
        </h3>
      </v-col>
    </v-row>
    <v-progress-linear
      indeterminate
      absolute
      bottom
      rounded
      color="base"
    ></v-progress-linear>
  </v-container>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  locales: {
    pt_br: {
      "The game will start soon!": "O jogo começará em breve!",
      "Waiting for other players...": "Esperando por outros jogadores..."
    }
  },
  mounted() {
    this.$translate.setLang(this.game.lang);
  }
};
</script>

<style lang="scss" scoped>
.finished {
  .display-1 {
    font-family: "Knewave" !important;
    font-size: 1.5em !important;
    line-height: 1;
    text-transform: uppercase;
  }
  .display-2 {
    font-family: "Knewave" !important;
    text-transform: uppercase;
    line-height: 1;
  }
  .player-name {
    text-align: center;
    width: 100%;
  }
}
</style>
