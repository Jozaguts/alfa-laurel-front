<template>
  <v-dialog :value="show"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable>
    <v-card tile>
      <v-toolbar
        flat
        dark
        prominent
        color="primary"
      >

        <template #default class="text-center">
          <v-btn
            icon
            dark
            @click="$emit('close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-container>
            <v-row >
              <v-col cols="12">
               Examen: {{answerDetail.exam_name}}
              </v-col>
              <v-col>
                <v-text-field
                dark
                disabled
                filled
                dense
                label="Nombre del alumno"
                :value="answerDetail.student_name"
                >

                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  dark
                  disabled
                  filled
                  dense
                  label="Materia"
                  :value="answerDetail.subject_name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  dark
                  disabled
                  filled
                  dense
                  label="Aciertos"
                  :value="result"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  dark
                  disabled
                  filled
                  dense
                  label="Calificación"
                  :value="calif"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </template>

      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12"
                     v-for="(question,index) in questions"
                     :key="question.id"
                     :class="[index % 2 === 0 ? 'grey lighten-4': '']"
              >

                <p class="text-uppercase text-subtitle-1 font-weight-bold">{{index + 1}}.- {{ question.question }}</p>
                <v-radio-group
                 hint="_"
                 persistent-hint
                  v-model="question.answer"
                  row
                  readonly
                  :active-class="question.is_correct ? 'light-green lighten-2 rounded-lg pa-1': 'red darken-1 rounded-lg  pa-1'"
                >
                  <template #message >
                    <div class="d-flex justify-end align-end flex-column">
                      <div class="text-center text--disabled">
                        <p class="text-caption mb-0 ">Respuesta correcta</p>
                        <span class="light-green--text">{{question.correct_answer.option}}</span>
                      </div>
                      </div>


                  </template>
                  <v-radio
                    class="mr-auto"

                    :value="question.option1"
                    :label="question.option1"/>
                  <v-radio
                    class="mr-auto "
                    :value="question.option2"
                    :label="question.option2"/>
                  <v-radio
                    class="mr-auto "
                    :value="question.option3"
                    :label="question.option3"/>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "ExamAnswered",
  props:['answerDetail','show'],
  data(){
    return {
      user: null,
      student_name: null,
      minutes_assigns: null,
      timer: null,
    }
  },
  computed:{
    calif() {
      let total = this.answerDetail.answer_details.length;
      let correct = this.answerDetail.answer_details.filter(
        (answer) => answer.is_correct === 1
      );
      return ((correct.length / total) * 10).toFixed(1);
    },

    result(){
      return `${this.answerDetail.answer_details.reduce((previousValue,currentValue)=> {return previousValue + currentValue.is_correct},0)} de ${this.answerDetail.answer_details.length}`
    },
    questions() {
      return this.answerDetail.answer_details;
    },
    timerStyle(){
      let style = 'green--text'
      if (this.timer >= 31) {
        style = 'green--text'
      }else if(this.timer <= 30 && this.timer < 5){
        style = 'yellow--text'
      }else if(this.timer <= 5){
        style = 'red--text'
      }
      return style
    },
  }
};
</script>