<template>
  <v-row
    class="make-guess"
    style="height:100%"
    direction="column"
    justify="center"
  >
    <v-col cols="12" md="6">
      <h2 class="display-1 base--text text-center" v-if="!game.validClues">
        {{ t("Wait for other players' clues") }}
      </h2>
      <div v-else-if="game.validClues && !game.guess">
        <v-card-text>
          <div class="d-flex flex-wrap justify-center mb-2">
            <v-chip
              style="opacity: 1"
              class="clue my-1 mx-1 text-uppercase subtitle-1"
              color="red lighten-4"
              v-for="(clue, index) in game.validClues"
              :key="index"
            >
              {{ clue }}
            </v-chip>
          </div>
          <form @submit.prevent="sendGuess">
            <v-text-field
              class="mb-2"
              width="100%"
              v-model="guess"
              :label="t('Your guess')"
              solo
              hide-details="auto"
              required
            />
            <div class="text-center white--text my-2">{{ discarded }}</div>
            <div class="d-flex flex-wrap justify-center">
              <v-btn
                class="mb-4 mx-2 base--text"
                rounded
                @click="passTurn"
                x-large
                color="primary"
                >{{ t("Pass") }}</v-btn
              >
              <v-btn
                class="mb-4 mx-2"
                rounded
                type="submit"
                x-large
                color="base"
                >{{ t("Send guess") }}</v-btn
              >
            </div>
          </form>
        </v-card-text>
      </div>
      <h3 class="display-1 base--text text-center" v-else>
        {{ t("The other players are validating your guess") }}
      </h3>
    </v-col>
    <v-progress-linear
      v-if="!game.validClues || game.guess"
      indeterminate
      absolute
      bottom
      color="base"
    ></v-progress-linear>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    guess: ""
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
      "Wait for other players' clues":
        "Espere pelas dicas dos outros jogadores",
      "No clues were discarded": "Nenhuma pista descartada",
      "One clue was discarded": "Uma pista descartada",
      "clues were discarded": "pistas descartadas",
      "Your guess": "Sua resposta",
      Pass: "Passar",
      "Send guess": "Enviar resposta",
      "The other players are validating your guess":
        "Os outros jogadores estão validando sua resposta"
    }
  },
  computed: {
    players() {
      return Object.keys(this.game.players)
        .map(item => this.game.players[item])
        .filter(
          item =>
            item.index !== this.game.detective &&
            item.index !== this.player.index
        );
    },
    clues() {
      return this.game.clues.filter(item => item !== false);
    },
    discarded() {
      const discarded = this.clues.length - this.game.validClues.length;
      if (discarded === 0) {
        return this.t("No clues were discarded");
      } else if (discarded === 1) {
        return this.t("One clue was discarded");
      } else {
        return `${discarded} ${this.t("clues were discarded")}`;
      }
    }
  },
  methods: {
    async sendGuess() {
      await this.$store.dispatch("makeGuess", {
        game: this.game.gamekey,
        player: this.player,
        guess: this.guess
      });
    },
    async passTurn() {
      await this.$store.dispatch("passTurn", {
        game: this.game.gamekey
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.make-guess {
  .display-1 {
    font-family: "Knewave" !important;
    line-height: 1;
    text-transform: uppercase;
  }
  .v-btn {
    display: flex;
  }
  .v-text-field {
    font-weight: bolder;
    ::v-deep {
      input {
        text-align: center;
        text-transform: uppercase;
        font-weight: bolder;
      }
      label {
        left: 50% !important;
        text-transform: uppercase;
        transform: translateX(-50%);
      }
    }
  }
  .clue {
    font-family: "Knewave" !important;
    letter-spacing: 1px !important;
  }
}
</style>
