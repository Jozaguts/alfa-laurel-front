<template>
  <v-card v-if="!!roleSelected" tile flat>
    <v-card-text>
      <small>Permisos:</small>
      <v-chip-group active-class="primary--text" column>
        <v-chip v-for="permissionRole in permissionsRole" :key="permissionRole" small>
          {{ permissionRole }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "roles-permissions-card",
  props: {
    roles:{
      type: Array,
      default: ()=> [],
      required: true,
    },
    roleSelected: {
      type: String,
      require: true,
    },
  },
  computed: {
    permissionsRole() {
      let [permissionsRole] = this.roles
        .filter((role) => role.value === this.roleSelected)
        .map((role) => role.permissions.map((permission) => permission.name));
      return permissionsRole || [];
    },
  },
};
</script>

<style scoped></style>
