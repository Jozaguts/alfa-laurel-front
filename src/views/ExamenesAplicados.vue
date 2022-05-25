<template>
  <v-card>
    <v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="2" lg="2"> <v-text-field
              label="Desde"
              v-model="from"
              type="date">
          </v-text-field></v-col>
          <v-col cols="12" md="2" lg="2">  <v-text-field
              label="Hasta"
              v-model="to"
              type="date">
          </v-text-field></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
            label="Profesor"
            :items="users"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
                label="Materia"
                :items="subjects"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
                label="Examen"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="examsDone"
          :loading="loading"
          loading-text="Cargando... por favor espere"
          :footer-props="{ 'items-per-page-text': 'Exámenes realizados por página' }"
      >
        <template v-slot:item.answer_details="{ item }">
          {{ result(item) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {all as Subjects} from '@/services/Subjects'
import {all as Users} from '@/services/Users'
import axios from "axios";
export default {
  name: "ExamenesAplicados",
  data() {
    return {
      from: '', to:'',
      loading:false,
      headers:[
        {text: 'Fecha',value:'created_at',},
        {text: 'Profesor',value:'user.name',},
        {text: 'Materia',value:'subject.name',},
        {text: 'Examen',value:'exam.name',},
        {text: 'Cod. Alumno',value:'student_code',},
        {text: 'Nombre del alumno',value:'student_name',},
        {text: 'Calificación',value:'answer_details',},
      ],
      subjects: [],
      users: [],
      examsDone: []
    }
  },
  created() {
     Subjects().then(({data}) => {
       this.subjects = data.map((subject) =>  { return { value: subject.id, text:subject.name }})
     })
     Users().then(({data}) => {
       this.users = data.map((user) => {return {value:user.id, text: `${user.name} ${user.paternal_name}`}})
     })
     axios.get('/api/respuestas')
     .then(({data})=>{
       this.examsDone = data
     })
  },
  watch:{
    from(value){
      if (this.to && value){
        console.log(value)
        this.examsDone = this.examsDone.filter((exam) => {
          return exam.created_at <= value
        })
      }
    },

  },
  methods: {
    result(item) {
      let total = item.answer_details.length
      let correct = item.answer_details.filter(answer => answer.is_correct === 1)
      return ((correct.length / total) * 10).toFixed(1)
  },
  }
}
</script>

<style scoped>

</style>
