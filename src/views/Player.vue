<template>
  <Start-Game v-if="!game || !game.started" />
  <v-container
    class="player"
    style="height:100%"
    v-else-if="player && game && game.started && !game.finished"
  >
    <v-row
      style="height:100%"
      align="center"
      justify="center"
      v-if="!game.finished"
    >
      <v-col>
        <h2 class="display-1 text-center accent--text">
          {{ turnName }}
        </h2>
        <div v-if="game.answering === player.index">
          <Make-Guess :game="game" :player="player" />
        </div>
        <div v-else-if="game.answering != player.index && !game.validClues">
          <Send-Clue
            v-if="!game.clues || !game.clues[player.index]"
            :game="game"
            :player="player"
          />
          <Filter-Clues v-else :game="game" :player="player" />
        </div>
        <div v-else>
          <Validate-Answer :game="game" :player="player" />
        </div>
        <div class="d-flex flex-wrap justify-center">
          <div class="white--text player-name">
            {{ player.name }} - Game
            <strong class="text-uppercase">{{ game.gameId }}</strong>
          </div>
          <div class="rating">
            <div class="rating-base">
              <div
                class="point"
                v-for="(point, index) in 13"
                :key="index"
              ></div>
            </div>
            <div class="rating-base right">
              <div
                class="point"
                v-for="(point, index) in game.points"
                :key="index"
              ></div>
            </div>
            <div class="rating-base wrong">
              <div
                class="point"
                v-for="(point, index) in game.lostPoints"
                :key="index"
              ></div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-snackbar
      color="accent"
      class="black--text"
      v-model="snackbar"
      top
      :timeout="3000"
    >
      <strong>{{ game.message }}</strong>
      <v-btn class="black--text" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
  <Finish-Game :game="game" v-else-if="game && game.finished" />
</template>

<script>
import SendClue from "@/components/SendClue";
import FilterClues from "@/components/FilterClues";
import MakeGuess from "@/components/MakeGuess";
import ValidateAnswer from "@/components/ValidateAnswer";
import FinishGame from "@/components/FinishGame";
import StartGame from "@/components/StartGame";
export default {
  name: "Player",
  locales: {
    pt_br: {
      "You are in room": "Você está na sala",
      "It's ": "É a vez do",
      "Waiting for the game start.": "Esperando o jogo começar."
    }
  },
  data: () => ({
    snackbar: false
  }),
  components: {
    SendClue,
    FilterClues,
    MakeGuess,
    ValidateAnswer,
    FinishGame,
    StartGame
  },
  computed: {
    game() {
      return this.$store.state.game;
    },
    player() {
      return this.$store.state.player;
    },
    players() {
      if (!this.game || !this.game.players) return false;
      return Object.keys(this.game.players).map(
        item => this.game.players[item]
      );
    },
    turnName() {
      return this.game.answering != this.player.index
        ? `${this.t("It's ")} ${this.players[this.game.answering].name}${this.t(
            "'s turn to answer!"
          )}`
        : this.t("It's your turn to answer");
    }
  },
  methods: {},
  async mounted() {
    await this.$store.dispatch("loadPlayer", {
      game: this.$route.params.id,
      player: this.$route.params.slug
    });
    this.$translate.setLang(this.game.lang);
  },
  watch: {
    game(newRound, oldRound) {
      console.log(oldRound, newRound);
      if (oldRound && newRound.round !== oldRound.round) {
        this.snackbar = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.player {
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
.rating {
  position: relative;
  width: 16.25em;
  height: 1em;
  margin: 0.5em 0;
  .rating-base {
    position: absolute;
    left: 0;
    display: flex;
  }
  .point {
    display: inline-block;
    width: 0.75em;
    height: 0.75em;
    margin: 0 0.25em;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
  .right .point {
    background: lightgreen;
  }
  .wrong {
    left: auto;
    right: 0;
    flex-direction: row-reverse;
    .point {
      background: crimson;
    }
  }
}
</style>
