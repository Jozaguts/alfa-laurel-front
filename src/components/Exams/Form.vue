<template>
  <ValidationObserver v-slot="{ invalid }" ref="store-exam-form">
    <v-form ref="form">
      <v-container>
        <!--regresar | guardar Examen. visible solo en update -->
        <actions-form
          :invalid="invalid"
          @reset-form="$refs['store-exam-form'].reset()"
          @saved="saved"
        />
        <!--<h5> y <small> tags  -->
        <header-form />
        <!--titulo de examen | materia | profesor -->
        <general-inputs :subjects="subjects" :users="users" />
        <!--  nivel alto | nivel medio | nivel bajo      -->
        <config-inputs />
        <questions-component
          ref="questionComponent"
          v-for="question in questions"
          :options="question.options"
          :key="question.name"
          :question="question"
          :questionID="question.id"
        />
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn color="secondary" tile class="mx-3" @click="addRow"
              >Agregar pregunta</v-btn
            >
          </v-col>
          <actions-form
            :invalid="invalid"
            :visible-force="true"
            @reset-form="$refs['store-exam-form'].reset()"
            @saved="saved"
          />
        </v-row>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "Form",
  props: ["users", "subjects"],
  components: {
    HeaderForm: () => import("@/components/Exams/HeaderForm.vue"),
    GeneralInputs: () => import("@/components/Exams/GeneralInputs.vue"),
    ConfigInputs: () => import("@/components/Exams/ConfigInputs.vue"),
    QuestionsComponent: () => import("./Question.vue"),
    ActionsForm: () => import("@/components/Exams/ActionsForm.vue"),
  },
  data() {
    return {
      id: 1,
      isBtbBlocked: false,
    };
  },
  computed: {
    questions() {
      return this.$store.state.examen.editedItem.questions;
    },
  },
  methods: {
    saved() {
      this.$refs["store-exam-form"].validate().then((success) => {
        if (success) {
          this.$emit("saved");
          this.reset();
        }
      });
    },
    reset() {
      this.e1 = 1;
      this.$refs.form.reset();
      this.$refs["store-exam-form"].reset();
    },
    addRow() {
      this.id += 1;
      this.$store.commit("examen/ADD_QUESTION");
    },
    removeRow() {
      this.id--;
      this.$store.commit("examen/REMOVE_QUESTION");
    },
  },
};
</script>
