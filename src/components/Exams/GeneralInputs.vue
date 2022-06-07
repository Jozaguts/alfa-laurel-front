<template>
  <v-row>
    <v-col cols="4">
      <validation-provider
        v-slot="{ errors }"
        name="Nombre"
        :rules="{ required: true }"
      >
        <v-text-field
          label="Titulo del examen"
          v-model="name"
          :error-messages="errors"
        ></v-text-field>
      </validation-provider>
    </v-col>
    <v-col cols="4">
      <validation-provider
        v-slot="{ errors }"
        name="Materia"
        :rules="{ required: true }"
      >
        <v-select
          label="Materia"
          :items="subjects"
          v-model="subject_id"
          :error-messages="errors"
        />
      </validation-provider>
    </v-col>
    <v-col cols="4">
      <validation-provider
        v-slot="{ errors }"
        name="Profesor"
        :rules="{ required: true }"
      >
        <v-select
          label="Profesor"
          :items="users"
          :error-messages="errors"
          v-model="user_id"
        />
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "GeneralInputs",
  props: ["users", "subjects"],
  computed: {
    name: {
      get() {
        return this.$store.state.examen.editedItem.name;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_NAME", value);
      },
    },
    user_id: {
      get() {
        return this.$store.state.examen.editedItem.user_id;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_USER_ID", value);
      },
    },
    subject_id: {
      get() {
        return this.$store.state.examen.editedItem.subject_id;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_SUBJECT_ID", value);
      },
    },
  },
};
</script>
