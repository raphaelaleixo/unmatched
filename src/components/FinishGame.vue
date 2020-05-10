<template>
  <v-container style="height:100%">
    <v-row class="finished" style="height:100%" align="center" justify="center">
      <v-col cols="12" lg="5">
        <h2 class="display-2 base--text text-center mb-2">
          Game over!
        </h2>
        <h3 class="display-1 white--text text-center mb-6">
          {{ t("You guessed") }} {{ game && game.points }} / 13
          {{ t("words") }}!
        </h3>
        <div class="d-flex flex-wrap justify-center mb-4">
          <v-btn
            class="mx-4 mb-2 mb-lg-0"
            type="submit"
            color="grey lighten-5"
            large
            rounded
            to="/join"
            >{{ t("Join game") }}</v-btn
          >
          <v-btn
            class="mx-4 mb-2 mb-lg-0"
            @click.prevent="createNewGame"
            type="submit"
            large
            rounded
            color="base"
            >{{ t("Play again") }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    game: {
      type: Object
    }
  },
  locales: {
    pt_br: {
      "You guessed": "Vocês acertaram",
      words: "palavras",
      "Join game": "Entrar num jogo",
      "Play again": "Jogar novamente"
    }
  },
  methods: {
    async createNewGame() {
      const game = await this.$store.dispatch(
        "createGame",
        this.$translate.lang
      );
      this.$router.push("/game/" + game.gameId);
    }
  },
  mounted() {
    this.$store.dispatch("finishGame", {
      game: this.game && this.game.gamekey
    });
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
