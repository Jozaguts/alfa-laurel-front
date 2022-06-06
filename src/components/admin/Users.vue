<template>
  <v-sheet>
    <table-component
      :headers="headers"
      :items="desserts"
      :search="search"
      plural_name="Usuarios"
      singular_name="Usuario"
      :loading="loading"
      @init="init"
    ></table-component>
  </v-sheet>
</template>

<script>
import { Users } from "@/services/Users";
const UserService = new Users();
export default {
  components:{
    'table-component': ()=> import('@/components/shared/Table.vue'),
  },
  filters: {
    rolesFilter(roles) {
      return roles.map((role) => role.name).join(" | ");
    },
  },
  name: "usuarios",
  data() {
    return {
      formTitle: "Añadir Usuario",
      user_id: null,
      loading: true,
      dialog: false,
      search: null,
      headers: [
        {
          text: "Nombre",
          align: "start",
          filterable: true,
          value: "name",
        },
        {
          text: "Correo Electrónico",
          filterable: true,
          value: "email",
        },
        {
          text: "Rol",
          filterable: true,
          value: "roles",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      desserts: [],
      roles: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let { data } = await UserService.all();
      this.desserts = data;
      this.loading = false;
      this.user_id = null;
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
</style>
