<template>
  <v-container style="height:100%">
    <v-row class="finished" style="height:100%" align="center" justify="center">
      <v-col cols="12" lg="4">
        <h2 class="display-2 base--text text-center mb-2">
          The game wil start soon!
        </h2>
        <h3 class="display-1 white--text text-center mb-6">
          Waiting for other players...
        </h3>
      </v-col>
    </v-row>
    <v-progress-linear
      indeterminate
      absolute
      bottom
      rounded
      color="base"
    ></v-progress-linear>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.finished {
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
</style>
