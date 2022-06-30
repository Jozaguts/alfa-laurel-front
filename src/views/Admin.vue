<template>
  <router-view></router-view>
</template>
<script>
export default {
  methods: {
    middleware() {
      // If the user is not an admin
      console.log(this.$gates.getRoles());
      if (!this.$gates.hasAnyRole("admin|control_escolar|Super Admin")) {
        return this.$router.push("/");
      }
    },
  },
  mounted() {
    this.middleware();
  },
};
</script>
