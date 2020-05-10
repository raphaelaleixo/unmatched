<template>
  <v-container class="lobby" style="height:100%">
    <v-row style="height:100%" justify="center" align="center" v-if="game">
      <v-col class="mt-10" cols="12" md="5" xl="4">
        <h2 class="display-2 primary--text text-center">
          {{ t("Game") }}
          <span class="base--text text-uppercase">{{ $route.params.id }}</span>
        </h2>
        <div class="d-flex mt-2 justify-center">
          <v-btn @click="copyText(location)" class="accent--text" text>{{
            t("Copy game url")
          }}</v-btn>
          <v-btn @click="overlay = true" class="accent--text" text>{{
            t("Show QR Code")
          }}</v-btn>
        </div>
        <div v-if="!entered">
          <form @submit.prevent="joinGame">
            <v-row>
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
              <v-col class="d-lg-flex" cols="12">
                <v-btn
                  class="mb-4 mx-auto"
                  color="base"
                  rounded
                  type="submit"
                  x-large
                  >{{ t("Enter game") }}</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </div>
        <div v-else>
          <p class="subtitle-1 my-4 text-center primary--text">
            {{ t("Waiting for players") }}. {{ playerCount }}
          </p>
          <lobby-players v-if="players" :game="game" :players="players" />
          <v-btn
            class="mt-4 mx-auto"
            color="base"
            rounded
            x-large
            :disabled="!players || players.length < 4"
            @click="startGame"
            >{{ t("Start game") }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{ t("URL Copied") }}
      <v-btn dark text @click="snackbar = false">
        {{ t("Close") }}
      </v-btn>
    </v-snackbar>
    <v-progress-linear
      v-if="players"
      indeterminate
      absolute
      bottom
      rounded
      color="base"
    ></v-progress-linear>
    <v-overlay :value="overlay" class="px-10 text-center">
      <qrcode
        :options="{
          size: 1000,
          background: '#fff',
          foreground: '#091619'
        }"
        :value="location"
      ></qrcode>
      <v-btn dark text color="primary" block @click="overlay = false">
        {{ t("Close") }}
      </v-btn>
    </v-overlay>
  </v-container>
</template>

<script>
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = 0;
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
  document.body.removeChild(textArea);
}
import LobbyPlayers from "./LobbyPlayers";
export default {
  name: "Home",
  locales: {
    pt_br: {
      "Lobby for room": "Lobby para a sala",
      "Your nickname": "Seu apelido",
      "Waiting for players": "Esperando pelos jogadores",
      "No players joined yet.": "Nenhum jogador entrou ainda.",
      "player joined.": "jogador entrou.",
      "players joined.": "jogadores entraram.",
      "URL Copied": "URL Copiada",
      "Enter your nickname:": "Escreva seu apelido",
      Close: "Fechar",
      "Show QR Code": "Mostrar QR Ccode",
      "Copy game url": "Copiar url do jogo ",
      "Join game": "Entrar em um jogo",
      "Enter game": "Entrar no jogo",
      "Start game": "Começar jogo"
    }
  },
  components: { LobbyPlayers },
  data: () => ({
    snackbar: false,
    active: 0,
    nickname: "",
    entered: false,
    overlay: false
  }),
  computed: {
    game() {
      return this.$store.state.game;
    },
    location() {
      return `${window.location.origin}/join?room=${this.game.gameId}&lang=${this.game.lang}`;
    },
    players() {
      if (!this.game || !this.game.players) return false;
      return Object.keys(this.game.players).map(
        item => this.game.players[item]
      );
    },
    playerCount() {
      if (!this.game || !this.game.players)
        return this.t("No players joined yet.");
      else if (this.players.length === 1)
        return `${this.players.length} ${this.t("player joined.")}`;
      else return `${this.players.length} ${this.t("players joined.")}`;
    }
  },
  methods: {
    changeDetective(evt) {
      this.active = evt;
    },
    async startGame() {
      const game = await this.$store.dispatch("startGame", {
        game: this.game.gamekey,
        players: this.players,
        lang: this.$translate.lang
      });
      if (game) {
        this.$router.push(
          `/game/${this.game.gameId}/player/${this.nickname
            .replace(/\s+/g, "-")
            .toLowerCase()}`
        );
      }
    },
    copyText(text) {
      copyTextToClipboard(text);
      this.snackbar = true;
    },
    async joinGame() {
      this.errorText = null;
      this.error = false;
      const player = await this.$store.dispatch("addPlayer", {
        nickname: this.nickname,
        slug: this.nickname.replace(/\s+/g, "-").toLowerCase(),
        gameId: this.game.gameId
      });
      if (player.error) {
        this.error = true;
        this.errorText = player.error;
      } else {
        this.entered = true;
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("loadGame", this.$route.params.id);
    this.$translate.setLang(this.game.lang);
  }
};
</script>
<style lang="scss" scoped>
canvas {
  max-width: 20em;
  background: #fff;
  padding: 2em;
}
.lobby {
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
