<template>
  <v-row v-if="$store.state.examen.dialogUpdate || visibleForce">
    <v-col class="d-flex justify-end">
      <CancelButton @reset-form="$emit('reset-form')" />
      <SaveButton :invalid="invalid" @saved="$emit('saved')" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ActionsForm",
  props:['invalid','visibleForce'],
  components: {
    CancelButton: () => import("@/components/Exams/CancelButton.vue"),
    SaveButton: () => import("@/components/Exams/SaveButton.vue"),
  },
};
</script>
