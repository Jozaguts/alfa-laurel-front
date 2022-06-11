<template>
  <v-col cols="12" class="align-center d-flex">
    <v-btn color="error" tile small @click="dialog = true">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-dialog :value="dialog" max-width="454px">
      <v-card>
        <v-card-title class="title grey--text text--darken-1"
          >Se eliminara la pregunta ¿Estas de acuerdo?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="primary" @click="removeQuestion" :loading="loading"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { deleteExamQuestion } from "@/services/Examenes";

export default {
  name: "DeleteQuestion",
  data() {
    return {
      loading: false,
      dialog: false,
    };
  },
  methods: {
    async removeQuestion() {
      this.loading = true;
      try {
        if (!this.$store.state.examen.dialog) {
          let { data } = await deleteExamQuestion({
            examenID: this.$store.state.examen.editedItem.examen_id,
            questionID: this.$parent.question.id,
          });
          if (data.success) {
            this.$store.commit("settings/SHOW_SNACKBAR", {
              text: "Pregunta eliminada correctamente",
              color: "success",
            });
          } else if (!data.success) {
            this.$store.commit("settings/SHOW_SNACKBAR", {
              text: "No fue posible eliminar la pregunta",
            });
          }
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        this.$nextTick(() => {
          this.$store.commit(
            "examen/REMOVE_QUESTION",
            this.$parent.question.id
          );
          this.loading = false;
          this.dialog = false;
        });
      }
    },
  },
};
</script>

<style scoped></style>
