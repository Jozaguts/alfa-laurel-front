<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      locale="es-Mx"
      :first-day-of-week="1"

    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="save()"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DadePicker",
  props:['label'],
  data() {
    return {
      date:'',
      menu:''
    }
  },
  methods:{
    save() {
      this.$refs.menu.save(this.date)
      this.$emit('save',this.date)
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${day}/${month}/${year}`
    },
  },
  created() {
    let toDay = new Date();
    if (this.label === 'Desde'){
      this.date = `${toDay.getFullYear()}-${toDay.getMonth()+1}-1`
    }else if (this.label === "Hasta") {
      this.date =`${toDay.getFullYear()}-${toDay.getMonth()}-${toDay.getDate()}`
    }
    // this.from = `${from.getDate()}/${from.getMonth()}/${from.getFullYear()}`
  }
};
</script>

<style scoped>

</style>