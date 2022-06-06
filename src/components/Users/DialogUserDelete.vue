<template>
  <v-dialog :value="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title class="text-h5"
        >¿Estas seguro de eliminar este usuario?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close-dialog')"
          >Cancel</v-btn
        >
        <v-btn
          color="blue darken-1"
          :disabled="disabled"
          text
          @click="deleteUser"
          >Aceptar</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { destroy } from "@/services/Users";

export default {
  name: "DialogUserDelete",
  props: {
    userId: {
      type: Number || String,
      require: false,
    },
    dialog:{
      type: Boolean,
    }
  },
  data() {
    return {
      disabled: false,
    }
  },
  methods:{
    async deleteUser() {
      if (this.userId)
        try {
          this.disabled = true;
          await destroy({
            userId: this.userId,
          });
          this.$store.commit(
            "settings/SHOW_SNACKBAR",
            {
              text: "¡Usuario Eliminado correctamente!",
              color: this.$vuetify.theme.themes.light.secondary,
            },
            { root: true }
          );
          this.$emit('init')
          this.$emit('close-dialog')
        } catch (e) {
          this.$store.commit(
            "settings/SHOW_SNACKBAR",
            {
              text: "¡No fue posible eliminar al usuario!",
            },
            { root: true }
          );
        } finally {
          this.disabled = false;
        }
    },
  }
};
</script>
