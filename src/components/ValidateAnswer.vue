<template>
  <v-row class="validate" style="height:100%" align="center" justify="center">
    <v-col cols="12" lg="6">
      <h3
        v-if="game.guess && nextPlayer !== player.index"
        class="primary--text text-center mt-2"
      >
        {{ players[nextPlayer].name }} {{ t("needs to validate") }}
        {{ players[game.answering].name }}{{ t("'s guess") }}:
      </h3>
      <h3
        v-else-if="game.guess && nextPlayer === player.index"
        class="primary--text text-center mt-2"
      >
        {{ t("You need to validate") }} {{ players[game.answering].name
        }}{{ t("'s guess") }}:
      </h3>
      <h3 v-else class="display-1 base--text text-center">
        {{ t("Wait for") }} {{ players[game.answering].name
        }}{{ t("'s guess!") }}
      </h3>
      <div v-if="game.guess">
        <h2 class="display-2 base--text text-center">
          {{ game.guess }}
        </h2>
        <div class="text-center white--text my-2">
          {{ t("The word to guess was") }} "{{ game.words[game.round] }}"
        </div>
      </div>
      <div class="d-flex justify-center">
        <v-btn
          @click="sendValidation(false)"
          color="red lighten-2"
          class="ma-2"
          v-if="game.guess && nextPlayer === player.index"
          rounded
          x-large
          ><v-icon>mdi-close-thick</v-icon></v-btn
        >
        <v-btn
          @click="sendValidation(true)"
          color="green lighten-2"
          class="ma-2"
          v-if="game.guess && nextPlayer === player.index"
          rounded
          x-large
          ><v-icon>mdi-check-bold</v-icon></v-btn
        >
      </div>
    </v-col>
    <v-progress-linear
      v-if="!game.guess"
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
    isValid: true
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
      "needs to validate": "precisa validar a resposta que",
      "'s guess": " enviou",
      "'s guess!": " enviará",
      "You need to validate": "Você precisa validar a resposta que",
      "Wait for": "Espere pela resposta que",
      "The word to guess was": "A palavra para advinhar era"
    }
  },
  computed: {
    clues() {
      return this.game.clues.filter(item => item !== false);
    },
    players() {
      if (!this.game || !this.game.players) return false;
      return Object.keys(this.game.players).map(
        item => this.game.players[item]
      );
    },
    nextPlayer() {
      const playersLength = this.players.length;
      return (this.game.round + 1) % playersLength;
    },
    validClues() {
      return this.clues.filter((item, index) => this.valid.indexOf(index) >= 0);
    }
  },
  methods: {
    validate() {
      this.isValid = !this.isValid;
    },
    async sendValidation(isValid) {
      await this.$store.dispatch("checkValidAnswer", {
        game: this.game.gamekey,
        isValid,
        message: isValid ? "right" : "wrong"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.validate {
  .display-1,
  .display-2 {
    font-family: "Knewave" !important;
    text-transform: uppercase;
  }
  .v-btn {
    display: flex;
  }
}
</style>
