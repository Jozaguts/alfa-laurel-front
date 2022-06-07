<template>
  <v-row>
    <v-col cols="12">
      <p class="text-caption mb-1">
        ¿Numero de preguntas por nivel?
        <span class="ml-1">
          <small
            v-if="$store.getters['examen/totalQuestions']"
            class="text-caption"
            >Total: {{ $store.getters["examen/totalQuestions"] }}</small
          ></span
        >
      </p>
    </v-col>
    <v-col cols="12" md="2" lg="2">
      <validation-provider
        v-slot="{ errors }"
        name="Nivel bajo"
        :rules="{ required: true }"
      >
        <v-text-field
          :error-messages="errors"
          outlined
          dense
          type="number"
          label="Nivel bajo"
          v-model.number="low"
        ></v-text-field>
      </validation-provider>
    </v-col>
    <v-col cols="12" md="2" lg="2">
      <validation-provider
        v-slot="{ errors }"
        name="Nivel medio"
        :rules="{ required: true }"
      >
        <v-text-field
          outlined
          :error-messages="errors"
          dense
          type="number"
          label="Nivel medio"
          v-model.number="medium"
        ></v-text-field>
      </validation-provider>
    </v-col>
    <v-col cols="12" md="2" lg="2">
      <validation-provider
        v-slot="{ errors }"
        name="Nivel alto"
        :rules="{ required: true }"
      >
        <v-text-field
          outlined
          :error-messages="errors"
          dense
          type="number"
          label="Nivel alto"
          v-model.number="high"
        ></v-text-field>
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ConfigInputs",
  computed: {
    low: {
      get() {
        return this.$store.state.examen.editedItem.low;
      },
      set(value) {
        this.$store.commit("examen/SET_LOW", value);
      },
    },
    medium: {
      get() {
        return this.$store.state.examen.editedItem.medium;
      },
      set(value) {
        this.$store.commit("examen/SET_MEDIUM", value);
      },
    },
    high: {
      get() {
        return this.$store.state.examen.editedItem.high;
      },
      set(value) {
        this.$store.commit("examen/SET_HIGH", value);
      },
    },
  },
};
</script>

<style scoped></style>
