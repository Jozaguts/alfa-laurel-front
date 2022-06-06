<template>
  <v-dialog :value="$store.state.settings.dialog" max-width="510px">
    <v-card>
      <v-card-title class="title grey--text text--darken-1">{{
        message
      }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          outlined
          text
          @click="$store.commit('settings/TOGGLE_DIALOG', false)"
          >Cancelar</v-btn
        >
        <v-btn color="primary" @click="$emit('store')" :loading="loading"
          >Aceptar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: ["message", "loading"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
