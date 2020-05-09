<template>
  <v-row
    class="filter-clues"
    style="height:100%"
    align="center"
    justify="center"
  >
    <v-col cols="12" lg="4">
      <h3
        v-if="
          clues.length === game.players.length - 1 &&
            nextPlayer !== player.index
        "
        class="primary--text text-center mt-2 mb-6"
      >
        {{ players[nextPlayer].name }} needs to validate the clues. Only
        <strong>different</strong> clues are valid.
      </h3>
      <h3
        v-else-if="
          clues.length === game.players.length - 1 &&
            nextPlayer === player.index
        "
        class="primary--text text-center mt-2 mb-6"
      >
        You need to validate the clues. Tap on any clues that are repeated.
      </h3>
      <h3 v-else class="display-1 base--text text-center">
        Clue sent! Wait for other players.
      </h3>
      <v-card v-if="clues.length === game.players.length - 1" class="mt-4">
        <v-list>
          <v-list-item
            @click="selectClue(index)"
            two-line
            v-for="(clue, index) in clues"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title
                :class="{ invalid: valid.indexOf(index) >= 0 }"
                class="list-item font-weight-bold subtitle-1 text-center text-uppercase"
                >{{ clue }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-btn
        @click="sendValidClues"
        class="base mt-4 mx-auto"
        v-if="
          player.index === nextPlayer &&
            clues.length === game.players.length - 1
        "
        rounded
        x-large
        >Send valid clues</v-btn
      >
    </v-col>
    <v-progress-linear
      v-if="clues.length !== game.players.length - 1"
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
    valid: []
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
      return (
        this.clues &&
        this.clues.filter((item, index) => this.valid.indexOf(index) < 0)
      );
    }
  },
  methods: {
    selectClue(index) {
      if (this.nextPlayer !== this.player.index) {
        return false;
      }
      if (this.valid.indexOf(index) < 0) {
        this.valid = [...this.valid, index];
      } else {
        this.valid = this.valid.filter(item => item !== index);
      }
    },
    async sendValidClues() {
      await this.$store.dispatch("sendValidClues", {
        game: this.game.gamekey,
        validClues: this.validClues
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-clues {
  .list-item {
    font-size: 1.5em !important;
    position: relative;
    backface-visibility: none;
  }
  .invalid {
    &:before {
      content: "-";
      font-size: 2em;
      position: absolute;
      left: 50%;
      color: crimson;
      transform: rotate(-5deg) translateX(-50%) scale(5, 0.5);
    }
  }
  .display-1 {
    font-family: "Knewave" !important;
    text-transform: uppercase;
  }
  .v-btn {
    display: flex;
  }
}
</style>
