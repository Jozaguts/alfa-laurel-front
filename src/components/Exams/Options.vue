<template>
  <v-row>
    <v-col
      v-for="(option, index) in options"
      :key="index"
      :cols="option.cols"
      :md="option.md"
    >
      <validation-provider
        v-slot="{ errors }"
        :name="`Opción-${index + 1}`"
        :rules="{ required: true }"
      >
        <v-text-field
          :label="`Opción-${index + 1}`"
          v-model="option.option"
          :error-messages="errors"
        ></v-text-field>
      </validation-provider>
    </v-col>
    <!--    <v-col cols="1" md="1" class="align-center d-flex">-->
    <!--      <v-btn-->
    <!--          color="error"-->
    <!--          tile-->
    <!--          small-->
    <!--          @click="dialog = true"-->
    <!--      >-->
    <!--        <v-icon>mdi-delete</v-icon>-->
    <!--      </v-btn>-->
    <!--    </v-col>-->
    <!--    <v-dialog :value="dialog" max-width="454px">-->
    <!--      <v-card >-->
    <!--        <v-card-title class="title grey&#45;&#45;text text&#45;&#45;darken-1">Se eliminara la pregunta  ¿Estas de acuerdo?</v-card-title>-->
    <!--        <v-card-actions>-->
    <!--          <v-spacer></v-spacer>-->
    <!--          <v-btn color="primary" outlined text @click="dialog = false"-->
    <!--          >Cancelar</v-btn-->
    <!--          >-->
    <!--          <v-btn-->
    <!--              color="primary"-->
    <!--              @click="removeQuestion"-->
    <!--              :loading="loading"-->
    <!--          >Aceptar</v-btn-->
    <!--          >-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
  </v-row>
</template>

<script>
export default {
  name: "Options",
  props: ["options", "questionID"],
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  watch: {
    options: {
      deep: true,
      handler(value) {
        this.$emit("option-updated", value);
      },
    },
  },
};
</script>
