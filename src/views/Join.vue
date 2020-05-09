<template>
  <v-container class="join" style="height:100%">
    <v-row style="height:100%" align="center" justify="center">
      <v-alert type="error" dismissible v-model="error">
        {{ errorText }}
      </v-alert>
      <v-col class="mt-6" cols="12" lg="4">
        <h2 class="display-2 text-center base--text ">
          {{ t("Join game") }}
        </h2>
        <p class="subtitle-1 text-center primary--text mt-2 mb-4">
          {{ t("Enter a game code and a nickname to join a game:") }}
        </p>
        <form @submit.prevent="joinGame">
          <v-row>
            <v-col cols="12">
              <v-text-field
                width="100%"
                v-model="gameId"
                :label="t('Game code')"
                solo
                hide-details="auto"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                width="100%"
                v-model="nickname"
                :label="t('Your nickname')"
                hide-details="auto"
                solo
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex justify-center" justify="center" cols="12">
              <v-btn class="mr-4 mb-4 mb-lg-0" rounded x-large to="/">
                <v-icon class="anchor--text">mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn class="mb-4" rounded type="submit" x-large color="base">{{
                t("Enter game")
              }}</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  locales: {
    pt_br: {
      "Enter a game code and a nickname to join a game:":
        "Digite o código do jogo e um apelido para entrar:",
      "Your nickname": "Seu apelido",
      "Game code": "Código do jogo",
      "Join game": "Entrar em um jogo",
      "Enter game": "Entrar no jogo"
    }
  },
  data: () => ({
    nickname: "",
    gameId: "",
    error: false,
    errorText: null
  }),
  methods: {
    async joinGame() {
      this.errorText = null;
      this.error = false;
      const player = await this.$store.dispatch("addPlayer", {
        nickname: this.nickname,
        slug: this.nickname.replace(/\s+/g, "-").toLowerCase(),
        gameId: this.gameId.toLowerCase()
      });
      if (player.error) {
        this.error = true;
        this.errorText = player.error;
      } else {
        this.$router.push(
          `/game/${this.gameId.toLowerCase()}/player/${player.slug}`
        );
      }
    }
  },
  mounted() {
    if (this.$route.query.room) {
      this.gameId = this.$route.query.room;
    }
  }
};
</script>
<style lang="scss" scoped>
.join {
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
  .v-btn {
    display: flex;
  }
  .v-text-field {
    font-weight: bolder;
    text-transform: uppercase;
    ::v-deep {
      input {
        text-transform: uppercase;
        text-align: center;
      }
      label {
        text-transform: uppercase;
        left: 50% !important;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
