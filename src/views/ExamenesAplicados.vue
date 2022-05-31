<template>
  <v-card>
    <v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="2" lg="2">
            <date-picker label="Desde" @save="from = $event" />
          </v-col>
          <v-col cols="12" md="2" lg="2">
            <date-picker label="Hasta" @save="to = $event"
          /></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              label="Profesor"
              :items="users"
              clearable
              v-model="user_id"
              @change="filterBy()"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              label="Materia"
              :items="subjects"
              clearable
              v-model="subject_id"
              @change="filterBy()"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              label="Examen"
              :items="exams"
              clearable
              v-model="exam_id"
              @change="filterBy()"
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
        :footer-props="{
          'items-per-page-text': 'Exámenes realizados por página',
        }"
      >
        <template v-slot:item.answer_details="{ item }">
          {{ result(item) }}
        </template>
        <template v-slot:item.user="{ item }">
          {{ item.user.name }} {{ item.user.paternal_name }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="showDialog({answerId: item.id})" outlined color="primary"><v-icon>mdi-eye</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <exam-answered @close="dialog = false" :show="dialog" :answerDetail="answerDetails"/>
  </v-card>
</template>

<script>
import { all as Subjects } from "@/services/Subjects";
import { all as Users } from "@/services/Users";
import { all as Exams } from "@/services/Examenes";
import axios from "axios";
export default {
  name: "ExamenesAplicados",
  components: {
    "date-picker": () => import("../components/shared/DatePicker.vue"),
    "exam-answered": () => import("../components/Exams/ExamAnswered.vue"),
  },
  data() {
    return {
      answerDetails: {},
      dialog: false,
      user_id: null,
      subject_id: null,
      exam_id: null,
      from: null,
      to: null,
      exams: [],
      loading: false,
      headers: [
        { text: "Fecha", value: "created_at" },
        { text: "Profesor", value: "user" },
        { text: "Materia", value: "subject.name" },
        { text: "Nombre del examen", value: "exam.name" },
        { text: "Cod. Alumno", value: "student_code" },
        { text: "Nombre del alumno", value: "student_name" },
        { text: "Calificación", value: "answer_details" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      subjects: [],
      users: [],
      examsDone: [],
      examsDoneCopy: [],

    };
  },
  created() {
    Subjects().then(({ data }) => {
      this.subjects = data.map((subject) => {
        return { value: subject.id, text: subject.name };
      });
    });
    Users().then(({ data }) => {
      this.users = data.map((user) => {
        return { value: user.id, text: `${user.name} ${user.paternal_name}` };
      });
    });
    Exams().then(({ data }) => {
      this.exams = data.map((exam) => {
        return { value: exam.id, text: `${exam.name}` };
      });
    });
    axios
      .get(`/api/respuestas`)
      .then(({ data }) => {
        this.examsDoneCopy = data;
        this.examsDone = data;
      });

  },
  methods: {
    async showDialog({ answerId }) {
      let { data }  = await axios.get('/api/respuestas/'+ answerId)
      this.answerDetails = data.data
      this.dialog = !this.dialog;
    },
    filterByDate(){
      axios
        .get(`/api/respuestas?from=${this.from}&to=${this.to}`)
        .then(({ data }) => {
          this.examsDoneCopy = data;
          this.examsDone = data;
        });
    },
    filterBy() {
      this.examsDone = this.examsDoneCopy;

      this.examsDone = this.examsDoneCopy
        .filter((exam) => {
          if (this.user_id) {
            return exam.user_id === this.user_id;
          }
          return true;
        })
        .filter((exam) => {
          if (this.subject_id) {
            return exam.subject_id === this.subject_id;
          }
          return true;
        })
        .filter((exam) => {
          if (this.exam_id) {
            return exam.exam_id === this.exam_id;
          }
          return true;
        });
    },
    result(item) {
      let total = item.answer_details.length;
      let correct = item.answer_details.filter(
        (answer) => answer.is_correct === 1
      );
      return ((correct.length / total) * 10).toFixed(1);
    },
  },
  watch:{
    to(newValue, oldValue){
      if (newValue !== oldValue && newValue && this.from ){
        this.filterByDate()
      }
    },
    from(newValue, oldValue){
      if (newValue !== oldValue && newValue && this.to){
        this.filterByDate()
      }
    }
  }
};
</script>

<style scoped></style>
