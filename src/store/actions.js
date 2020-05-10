import database from "@/database";
import rules from "@/api/rules";
import words from "@/data/words";
import words_pt_br from "@/data/words_pt_br";

import router from "@/router";

export default {
  createGame: async (context, payload) => {
    const gameList = database.ref("/");
    const game = await gameList.push();
    const gamekey = game.getKey();
    const gameData = {
      gameId: rules.createRandomId(),
      players: {},
      gamekey,
      finished: false,
      round: 1,
      clues: [false],
      lang: payload
    };
    await game.set(gameData);
    context.commit("setGame", gameData);
    return {
      gameId: gameData.gameId,
      gamekey
    };
  },

  loadGame: async (context, payload) => {
    const loadedGame = database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload);
    await loadedGame.on("child_added", snapshot => {
      context.commit("setGame", snapshot.val());
    });
    loadedGame.on("child_changed", snapshot => {
      context.commit("setGame", snapshot.val());
    });
  },

  async startGame(context, payload) {
    const availableWords = {
      en: words,
      pt_br: words_pt_br
    };
    const lang = payload.lang || "en";
    const gameWords = rules.getRandom(availableWords[lang], 13);
    const players = payload.players;
    let iterate = 0;
    for (let player in players) {
      players[player] = {
        index: iterate,
        ...players[player]
      };
      iterate++;
    }
    const startedGame = {
      started: true,
      words: gameWords,
      answering: Math.floor(Math.random() * players.length),
      players
    };
    await database.ref("/" + payload.game).update(startedGame);
    return startedGame;
  },

  async sendClue(context, payload) {
    const game = context.state.game;
    const players = Object.keys(game.players).length;
    const cluesArray = game.clues || new Array(players).fill(false);
    cluesArray[payload.player.index] = payload.clue;
    await database.ref(`/${payload.game}`).update({
      clues: cluesArray
    });
  },

  async sendValidClues(context, payload) {
    await database.ref(`/${payload.game}`).update({
      validClues: payload.validClues
    });
    if (payload.validClues.length === 0) {
      context.dispatch("checkValidAnswer", {
        game: payload.game,
        isValid: false,
        message: "pass"
      });
    }
  },

  async makeGuess(context, payload) {
    await database.ref(`/${payload.game}`).update({
      guess: payload.guess
    });
  },

  async passTurn(context, payload) {
    const game = context.state.game;
    let lostPoints = game.lostPoints || 0;
    await database.ref(`/${payload.game}`).update({
      lostPoints: lostPoints + 1,
      message: "pass"
    });
    context.dispatch("checkEndGame", payload);
  },

  async checkValidAnswer(context, payload) {
    const game = context.state.game;
    let points = game.points || 0;
    let lostPoints = game.lostPoints || 0;
    const message = payload.message;
    if (payload.isValid) {
      points = points + 1;
    } else {
      lostPoints = lostPoints + 2;
    }
    await database.ref(`/${payload.game}`).update({
      points,
      lostPoints,
      message
    });
    context.dispatch("checkEndGame", payload);
  },

  async checkEndGame(context, payload) {
    const game = context.state.game;
    if (game.points + game.lostPoints >= 13) {
      await database.ref(`/${payload.game}`).update({
        finished: true
      });
    } else {
      let round = game.round + 1;
      let players = Object.keys(game.players).length;
      let answering = round % players;
      await database.ref(`/${payload.game}`).update({
        round,
        answering,
        guess: false,
        clues: false,
        validClues: false
      });
    }
  },

  async finishGame(context, payload) {
    const loadedGame = database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload.game);
    loadedGame.off();
    database
      .ref(`/${payload.game}`)
      .remove()
      .then(function() {
        console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  },

  async addPlayer(context, payload) {
    const loadedGame = await database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload.gameId)
      .once("child_added")
      .then(snaphot => snaphot.val());

    const gamePlayers = await database.ref(`/${loadedGame.gamekey}/players`);

    const oldPlayer = await gamePlayers
      .orderByChild("slug")
      .equalTo(payload.slug)
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      });

    if (oldPlayer && loadedGame.started) {
      router.push(`/game/${payload.gameId}/player/${payload.slug}`);
      return false;
    } else if (loadedGame.started) {
      return { error: "Game has alredy started and no new players can join" };
    }

    const player = gamePlayers.push();
    const playerkey = player.getKey();

    const playerData = {
      name: payload.nickname,
      slug: payload.slug,
      playerkey
    };
    await player.set(playerData);
    context.commit("setPlayer", playerData);
    return playerData;
  },

  async loadPlayer(context, payload) {
    const loadedGame = await database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload.game)
      .once("child_added")
      .then(snapshot => {
        return snapshot.val();
      });
    context.dispatch("loadGame", payload.game);
    const target = await database
      .ref(`/${loadedGame.gamekey}/players/`)
      .orderByChild("slug")
      .equalTo(payload.player)
      .once("child_added")
      .then(snapshot => snapshot.val());
    context.commit("setPlayer", target);
  }
};
