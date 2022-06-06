<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :loading="loading"
    loading-text="Cargando... por favor espere"
    :footer-props="{ 'items-per-page-text': `${plural_name} por página` }"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ plural_name }}</v-toolbar-title>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = !dialog" dark class="mb-2">
          + Añadir Usuario
        </v-btn>
        <user-form
          @close-dialog="dialog = false"
          :dialog="dialog"
          :user_id="user_id"
          :form-title="formTitle"
          @init="$emit('init')"
        ></user-form>
        <dialog-user-delete
          @close-dialog="dialogDelete = false"
          @init="$emit('init')"
          :dialog="dialogDelete"
          :user-id="user_id"
        />
      </v-toolbar>
    </template>
    <template v-slot:item.roles="{ item }">
      {{ item.roles | rolesFilter }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn @click="showDialog(item.id)" plain>
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
      <v-btn @click="showDeleteDialog(item.id)" plain>
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      formTitle: "Añadir Usuario",
      dialog: false,
      dialogDelete: false,
      user_id: null,
      method: "POST",
    };
  },
  props: {
    headers: {
      type: Array,
      require: true,
      default: () => [],
    },
    items: {
      type: Array,
      require: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      require: true,
    },
    search: {
      type: String,
      require: true,
    },
    singular_name: {
      require: true,
      type: String,
    },
    plural_name: {
      require: true,
      type: String,
    },
  },
  filters: {
    rolesFilter(roles) {
      return roles.map((role) => role.name).join(" | ");
    },
  },
  components: {
    "user-form": () => import("@/components/Users/Form.vue"),
    "dialog-user-delete": () =>
      import("@/components/Users/DialogUserDelete.vue"),
  },
  name: "Table",
  methods: {
    showDeleteDialog(user_id) {
      this.user_id = user_id;
      this.dialogDelete = true;
    },
    showDialog(user_id) {
      this.method = "PUT";
      this.formTitle = "Editar Usuario";
      this.user_id = user_id;
      this.dialog = true;
    },
  },
};
</script>
