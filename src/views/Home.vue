<template>
  <v-container style="height:100%">
    <v-row style="height:100%" align="center">
      <v-col class="text-center" cols="12">
        <img src="~@/assets/logo.svg" max-width="360" class="mt-6" contain />
        <p class="credits primary--text mb-8">
          {{ t("A web-version of Ludovic Roudy and Bruno Sautter's") }}
          <strong>Just One</strong>.
        </p>
        <div class="d-lg-flex justify-center mb-4">
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
            >{{ t("Create new game") }}</v-btn
          >
        </div>
        <div class="d-lg-flex justify-center mt-4">
          <v-btn
            text
            class="mr-2 mb-1 mb-lg-0"
            href="https://medium.com/@raphaelaleixo/krimi-how-to-play-87839028f5ef"
            type="submit"
            target="_blank"
            color="primary"
            >{{ t("How to play") }}</v-btn
          >
          <v-btn
            text
            class="mr-2 mb-1 mb-lg-0"
            href="https://github.com/raphaelaleixo/krimi"
            type="submit"
            target="_blank"
            color="primary"
            >{{ t("About this project") }}</v-btn
          >
          <v-btn
            text
            class="mr-2 mb-1 mb-lg-0"
            @click.prevent="changeLocale"
            type="submit"
            color="primary"
            >{{ t("Versão em português") }}</v-btn
          >
        </div>
        <img
          src="~@/assets/ludoratory.svg"
          max-width="136"
          class="mt-8"
          contain
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    async createNewGame() {
      const game = await this.$store.dispatch(
        "createGame",
        this.$translate.lang
      );
      this.$router.push("/game/" + game.gameId);
    },
    changeLocale() {
      if (this.$translate.lang !== "pt_br") {
        this.$translate.setLang("pt_br");
      } else this.$translate.setLang("en");
    }
  },
  locales: {
    pt_br: {
      "A game of": "Um jogo de",
      deduction: "investigações",
      deception: "intrigas",
      "In the game, players take on the roles of investigators attempting to solve a murder case – but there's a twist. The killer is one of the investigators! Find out who among you can cut through deception to find the truth and who is capable of getting away with murder!":
        "Neste jogo, os jogadores terão o papel de investigadores tentando resolver um caso de assassinato - mas existe um porém. O assassino é um dos investigadores! Descubra quem de vocês pode se livrar das intrigas e achar a verdade e quem é capaz de se safar desta acusação!",
      "About this project": "Sobre este projeto",
      "How to play": "Como jogar",
      "Join game": "Entrar em um jogo",
      "Create new game": "Criar novo jogo",
      "Versão em português": "English version",
      "A web-version of Ludovic Roudy and Bruno Sautter's":
        "Uma versão web do jogo de Ludovic Roudy e Bruno Sautter,"
    }
  }
};
</script>

<style lang="scss">
.v-btn--rounded {
  font-family: "Knewave";
  font-size: 1.25em !important;
}
</style>
