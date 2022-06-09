<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <transition name="slide-fade">
          <v-card outlined v-if="showCard">
            <v-card-title
              ><h2 class="text-h3">Instituto Alfa Laurel</h2>
             <v-spacer></v-spacer>
              <span>
                <img
                  src="../assets/logo.png"
                  alt="insituto alfa laurel logo"
                  width="100"
                  height="100"
                />
              </span
            ></v-card-title>
            <v-card-subtitle>
              <p class="text-body-1">
                Ingrese sus datos para comenzar el examen.
              </p></v-card-subtitle
            >
            <v-card-text>
              <validation-observer ref="exam" v-slot="{ handleSubmit }">
                <v-form ref="form" @submit.prevent="handleSubmit(onSubmit)">
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Nombre del alumno"
                          :rules="{ required: true }"
                        >
                          <v-text-field
                            :error-messages="errors"
                            filled
                            outlined
                            v-model="examRequest.student_name"
                            label="Nombre del alumno"
                          >
                          </v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Código del alumno"
                          :rules="{ required: true }"
                        >
                          <v-text-field
                            :error-messages="errors"
                            label="Código del alumno"
                            maxlength="10"
                            filled
                            outlined
                            v-model="examRequest.student_code"
                          >
                          </v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Profesor"
                          :rules="{ required: true }"
                        >
                          <v-autocomplete
                            :items="users"
                            :error-messages="errors"
                            v-model="examRequest.user_id"
                            clearable
                            outlined
                            filled
                            @change="resetValues"
                            label="Profesor"
                            placeholder="Seleccione a un profesor"
                            no-data-text="La lista de profesores no esta disponible"
                          ></v-autocomplete>
                        </validation-provider>
                      </v-col>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Materia"
                          rules="required"
                        >
                          <v-autocomplete
                            clearable
                            :error-messages="errors"
                            filled
                            outlined
                            :items="subjects"
                            v-model="examRequest.subject_id"
                            :disabled="!examRequest.user_id"
                            @input="getExams"
                            placeholder="Selecciona una materia"
                            label="Materia"
                          ></v-autocomplete>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Examen"
                          rules="required"
                        >
                          <v-autocomplete
                            clearable
                            :error-messages="errors"
                            filled
                            outlined
                            v-model="examRequest.exam_id"
                            :loading="exams.loading"
                            :items="exams.values"
                            no-data-text="No existen examenes para el profesor y materia seleccionada"
                            laber="Examen"
                            placeholder="Selecciona un examen"
                          ></v-autocomplete>
                        </validation-provider>
                      </v-col>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="Código del examen"
                        >
                          <v-text-field
                            label="Código del examen"
                            placeholder="Ingrese el código del examen"
                            v-model="teacher_code"
                            maxlength="10"
                            trim
                            filled
                            outlined
                            :error-messages="errors"
                          >
                          </v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          block
                          color="primary"
                          x-large
                          :loading="loading"
                          @click="onSubmit"
                        >
                          Aceptar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
          <v-sheet v-else>
            <v-form ref="alum-exam">
              <v-container>
                <v-row>
                  <v-col>
                    <v-card outlined>
                      <v-card-title class="grey lighten-2">
                        <section class="grid-container">
                          <p
                            class="grid-item-1 text-subtitle-2 font-weight-medium text-capitalize"
                          >
                            Materia: {{ subjectSelected[0].text }}
                          </p>
                          <p
                            class="grid-item-2 text-subtitle-2 font-weight-medium text-capitalize"
                          >
                            Examen: {{ examenSelected[0].text }}
                          </p>
                          <p
                            class="grid-item-3 text-subtitle-2 font-weight-medium text-capitalize"
                          >
                            nombre del alumno: {{ examRequest.student_name }}
                          </p>
                          <p
                            class="grid-item-4 text-subtitle-1 font-weight-medium text-capitalize"
                          >
                            Tiempo: {{ examRequest.minutes_assigns }}
                          </p>
                          <p
                            class="grid-item-5 text-subtitle-1 font-weight-medium text-capitalize"
                            :class="timerStyle"
                          >
                            Tiempo restante: {{ timer }}
                          </p>
                        </section>
                      </v-card-title>
                      <v-card-text>
                        <v-form>
                          <v-container>
<!--                            <v-row>-->
<!--                              <v-col> </v-col>-->
<!--                            </v-row>-->
                            <v-row>
                              <v-col
                                cols="12"
                                v-for="(question, index) in questions"
                                :key="question.id"
                                :class="[
                                  index % 2 === 0 ? 'grey lighten-4' : '',
                                ]"
                              >
                                <p
                                  class="text-uppercase text-subtitle-1 font-weight-bold"
                                >
                                  {{ index + 1 }}.- {{ question.question }}
                                </p>
                                <v-radio-group v-model="question.answer" row>
                                  <v-radio
                                    class="mr-auto"
                                    v-for="option in question.options"
                                    :key="option.option"
                                    :value="option.option"
                                    :label="option.option"
                                  ></v-radio>
                                </v-radio-group>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          x-large
                          color="primary"
                          block
                          @click="$store.commit('settings/TOGGLE_DIALOG', true)"
                        >
                          Terminar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-sheet>
        </transition>
      </v-col>
      <dialog-component
        :message="dialogMessage"
        :loading="loading"
        @store="store"
      ></dialog-component>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  components: {
    DialogComponent: () => import("@/components/shared/Dialog.vue"),
  },
  data() {
    return {
      timer: 60,
      dialog: false,
      loading: false,
      questions: [],
      answers: [],
      showCard: 1,
      teacher_code: null,
      questionRequest: [],
      examRequest: {
        subject_id: null,
        exam_id: null,
        user_id: null,
        minutes_assigns: null,
        minutes: 45,
        student_code: null,
        student_name: null,
        answers_details: [],
      },
      users: [],
      subjects: [],
      exams: {
        loading: false,
        values: [],
      },
    };
  },
  watch: {
    questions: {
      deep: true,
      handler(values) {
        if (!this.questionRequest.length) {
          values.map((value, index) => {
            this.questionRequest.push({
              answer_id: index + 1,
              question_id: null,
              number: null,
              question: null,
              option1: null,
              option2: null,
              option3: null,
              level: null,
              answer: null,
            });
          });
        } else {
          values.map((value, index) => {
            let [number_answer] = value.options.filter(
              (option) => option.option === value.answer
            ); //numero de la opción 1|2|3
            this.questionRequest[index].question_id =
              value.options[0].question_id;
            this.questionRequest[index].number = index + 1; // en numero de la pregunta en el examen
            this.questionRequest[index].question = value.question; // en numero de la pregunta en el examen
            this.questionRequest[index].option1 = value.options[0].option;
            this.questionRequest[index].option2 = value.options[1].option;
            this.questionRequest[index].option3 = value.options[2].option;
            this.questionRequest[index].level = value.level;
            this.questionRequest[index].answer = value.answer;
            this.questionRequest[index].number_answer = number_answer?.number;
          });
        }
      },
    },
    timer(newValue, oldValue) {
      if (newValue !== oldValue && newValue === 0) {
        this.store();
      }
    },
  },
  async created() {
    axios.get("/api/init-exam").then(({ data }) => {
      this.users = data.users.map((user) => {
        return { value: user.id, text: user.name };
      });
      this.subjects = data.subjects.map((subject) => {
        return { value: subject.id, text: subject.name };
      });
    });
  },
  computed: {
    dialogMessage() {
      let message = "¿Terminar Examen?";
      if (this.questionRequest.some((answer) => answer.answer == null)) {
        message =
          "No haz terminado responder todas las preguntas ¿Deseas terminar el examen?";
      }
      return message;
    },
    timerStyle() {
      let style = "green--text";
      if (this.timer >= 31) {
        style = "green--text";
      } else if (this.timer <= 30 && this.timer < 5) {
        style = "yellow--text";
      } else if (this.timer <= 5) {
        style = "red--text";
      }
      return style;
    },
    subjectSelected() {
      return this.subjects.filter(
        (subject) => subject.value === this.examRequest.subject_id
      );
    },
    examenSelected() {
      return this.exams.values.filter(
        (exam) => exam.value === this.examRequest.exam_id
      );
    },
  },
  methods: {
    resetValues() {
      if (this.examRequest.subject_id) {
        this.examRequest.subject_id = null;
        this.examRequest.exam_id = null;
      }
    },
    initTimer() {
      setInterval(() => {
        if (this.timer) {
          this.timer = this.timer - 1;
        }
      }, 1000); // todo cambiar a 60000
    },
    onSubmit() {
      this.loading = true;
      this.$refs.exam
        .validate()
        .then(async (success) => {
          if (!success) {
            return;
          }
          if (!this.validateCode()) {
            this.$refs.exam.setErrors({
              "Código del examen": ["El código del examen es incorrecto"],
            });
          } else {
            await this.getExam();
            this.showCard = !success;
            this.initTimer();
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    validateCode() {
      let [examSelected] = this.exams.values.filter(
        (exam) => exam.value === this.examRequest.exam_id
      );
      return examSelected?.code === this.teacher_code;
    },
    async store() {
      try {
        this.loading = true;
        let respuestas = this.examRequest;
        respuestas.answers_details = this.questionRequest;
        await axios.post("/api/respuestas", respuestas); // aqui se envia
        this.$store.commit(
          "settings/SHOW_SNACKBAR",
          {
            text: "Su Examen ha sido guardado correctamente",
            color: "success",
          },
          { root: true }
        );
      } catch (e) {
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "Error al guardar examen: Tiene que responder al menos una pregunta",
        }, { root: true });
        console.error(e.message);
      } finally {
        this.loading = false;
        this.$store.commit("settings/TOGGLE_DIALOG", false);
        setTimeout(() => window.location.reload(), 3000);
      }
    },
    async getExams() {
      try {
        this.exams.loading = true;
        let { data } = await axios.get(
          `/api/exams/${this.examRequest.user_id}/${this.examRequest.subject_id}`
        );
        this.exams.values = data.exams.map((exam) => {
          return { value: exam.id, text: exam.name, code: exam.code };
        });
      } catch (e) {
        console.error(e.message);
      } finally {
        this.exams.loading = false;
      }
    },
    async getExam() {
      try {
        let { data } = await axios.get(`/api/exam/${this.examRequest.exam_id}`);
        let { low, medium, high } = this.getRandomExam({
          low: data.data.low,
          medium: data.data.medium,
          high: data.data.high,
          splitQuestions: this.splitQuestionsByLevel(data.data.questions),
        });
        this.examRequest.minutes_assigns = data.data.minutes;
        let exam = low.concat(medium).concat(high);
        let amount = exam.length;
        exam = this.getRandomQuestions({
          amount,
          questions: low.concat(medium).concat(high),
        });
        this.questions = exam.map((exam_questions_options) => {
          return {
            level: exam_questions_options.level,
            question_number: exam_questions_options.number,
            question: exam_questions_options.question,
            options: exam_questions_options.options,
            answer: null,
          };
        });
      } catch (e) {
        console.error(e.message);
      }
    },
    splitQuestionsByLevel(questions) {
      let splitQuestions = {
        low: [],
        medium: [],
        high: [],
      };
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].level === "B") {
          splitQuestions.medium.push(questions[i]);
        }
        if (questions[i].level === "M") {
          splitQuestions.low.push(questions[i]);
        }
        if (questions[i].level === "A") {
          splitQuestions.high.push(questions[i]);
        }
      }
      return splitQuestions;
    },
    getRandomExam({ low, medium, high, splitQuestions }) {
      return {
        low: this.getRandomQuestions({
          amount: low,
          questions: splitQuestions.low,
        }),
        medium: this.getRandomQuestions({
          amount: medium,
          questions: splitQuestions.medium,
        }),
        high: this.getRandomQuestions({
          amount: high,
          questions: splitQuestions.high,
        }),
      };
    },
    getRandomQuestions({ amount, questions }) {
      let randomQuestions = [];
      do {
        let question = questions[Math.floor(Math.random() * questions.length)];
        if (randomQuestions.findIndex((rq) => rq.id === question.id) === -1) {
          randomQuestions.push(question);
        }
      } while (!(randomQuestions.length === amount));
      return randomQuestions;
    },
  },
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.grid-container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 15px 20px;
  grid-template-areas:
    "grid-item-1 grid-item-4"
    "grid-item-2 grid-item-5"
    "grid-item-3 .";
  width: 100%;
  height: 100%;
}
.grid-item-2 {
  grid-area: grid-item-2;
}
.grid-item-3 {
  grid-area: grid-item-3;
}
.grid-item-1 {
  grid-area: grid-item-1;
}
.grid-item-4 {
  grid-area: grid-item-4;
}
.grid-item-5 {
  grid-area: grid-item-5;
}
</style>
