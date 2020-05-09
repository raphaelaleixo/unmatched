<template>
  <lobby v-if="game" />
</template>

<script>
import Lobby from "@/components/Lobby";
export default {
  name: "Game",
  components: { Lobby },
  computed: {
    game() {
      return this.$store.state.game;
    }
  },
  mounted() {
    this.$store.dispatch("loadGame", this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped></style>
