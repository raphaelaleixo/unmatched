<template>
  <v-row
    class="send-clue"
    style="height:100%"
    direction="column"
    justify="center"
  >
    <v-col cols="12" lg="4">
      <div>
        <v-card-text>
          <div class="text-center white--text">The word to guess is</div>
          <h2 class="display-2 white--text text-center mb-6">
            {{ game.words[game.round] }}
          </h2>
          <form @submit.prevent="sendClue">
            <v-text-field
              class="mb-4"
              width="100%"
              v-model="clue"
              :label="t('Your clue')"
              solo
              hide-details="auto"
              required
            />
            <v-btn
              class="mb-4 mx-auto"
              rounded
              type="submit"
              x-large
              color="base"
              >{{ t("Send clue") }}</v-btn
            >
          </form>
        </v-card-text>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    clue: ""
  }),
  props: {
    game: {
      type: Object,
      required: true
    },
    player: {
      type: Object,
      required: true
    }
  },
  locales: {
    pt_br: {
      "the murderer": "o assassino",
      "a detective": "um detetive",
      "Your are": "Você é",
      close: "fechar",
      Role: "Papel",
      "Pass turn": "Passar",
      Solve: "Solucionar",
      "Solve the crime": "Solucione o crime",
      "Who is the murderer?": "Quem é o assassino?",
      "Select the mean of murder:": "Selecione a causa de morte",
      "Select the key evidence:": "Selecione a evidência principal",
      "Send guess": "Mandar palpite"
    }
  },
  computed: {
    disableActions() {
      return (
        (this.game.passedTurns && this.game.passedTurns[this.player.index]) ||
        (this.game.guesses && !!this.game.guesses[this.player.index])
      );
    },
    playerRole() {
      if (this.player.index === this.game.murderer) {
        return this.t("the murderer");
      } else {
        return this.t("a detective");
      }
    },
    players() {
      return Object.keys(this.game.players)
        .map(item => this.game.players[item])
        .filter(
          item =>
            item.index !== this.game.detective &&
            item.index !== this.player.index
        );
    },
    selectedPlayer() {
      return this.players.find(item => item.index === this.guess.player);
    }
  },
  methods: {
    async sendClue() {
      await this.$store.dispatch("sendClue", {
        game: this.game.gamekey,
        player: this.player,
        clue: this.clue
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.send-clue {
  .display-2 {
    font-family: "Knewave" !important;
    text-transform: uppercase;
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
