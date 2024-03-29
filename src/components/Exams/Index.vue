<template>
  <v-sheet>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Buscar"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :loading="loading"
      loading-text="Cargando... por favor espere"
      :footer-props="{ 'items-per-page-text': 'Exámenes por página' }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Exámenes</v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              persistent
            :value="$store.state.examen.dialog"
            fullscreen
          >
            <v-toolbar
              flat
              dark
              color="primary"
            >
              <template #default>
                <v-btn
                  icon
                  dark
                  @click="$store.commit('examen/CLOSE_CREATE_DIALOG')"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-toolbar>
            <template v-slot:activator="{ attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" @click="$store.commit('examen/OPEN_CREATE_DIALOG')">
                + Añadir Examen
              </v-btn>
            </template>
            <v-card>
              <v-stepper v-model="$store.state.examen.e1" flat outlined tile min-height="100%">
                <v-stepper-header>
                  <v-stepper-step :complete="$store.state.examen.e1 > 1" step="1" editable>
                    Instrucciones
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="$store.state.examen.e1 > 2" step="2" editable>
                    {{ optionName }}
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card>
                      <v-card-title>Instrucciones</v-card-title>
                      <v-card-subtitle
                        >Para generar un nuevo examen tienes las siguientes
                        opciones:</v-card-subtitle
                      >
                      <v-card-text>
                        <v-list>
                          <v-list-item link @click="nextStep('Manual')">
                            <v-list-item-icon>
                              <v-icon color="primary">mdi-typewriter</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Manualmente</v-list-item-title>
                          </v-list-item>
                          <v-list-item link @click="nextStep('Archivo')">
                            <v-list-item-icon>
                              <v-icon color="secondary">mdi-file</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title
                              >Archivo de Excel</v-list-item-title
                            >
                          </v-list-item>
                          <small>Con la siguiente estructura</small>
                        </v-list>
                        <keep-alive>
                          <v-simple-table desnse height="100%">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-center">No.</th>
                                  <th class="text-center">Pregunta</th>
                                  <th class="text-center">
                                    Nivel <br />
                                    A | B | M
                                  </th>
                                  <th class="text-center">Respuesta 1</th>
                                  <th class="text-center">Respuesta 2</th>
                                  <th class="text-center">Respuesta 3</th>
                                  <th class="text-center">Correcta</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="text-center">1</td>
                                  <td class="text-center">Pregunta 1</td>
                                  <td class="text-center">A</td>
                                  <td class="text-center">opcion 1</td>
                                  <td class="text-center">opcion 2</td>
                                  <td class="text-center">opcion 3</td>
                                  <td class="text-center">1</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </keep-alive>
                      </v-card-text>
                    </v-card>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card outlined>
                      <v-card-text>
                        <component
                          :is="typeComponent"
                          :users="users"
                          :subjects="subjects"
                          @saved="init"
                          @close-dialog="closeDialog"
                          ref="createExam"
                        >
                        </component>
                      </v-card-text>
                    </v-card>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-dialog>
          <v-dialog
            @input="resetUpdateForm"
            :value="$store.state.examen.dialogUpdate"
            fullscreen
          >
            <v-card outlined>
              <v-card-text class="mt-lg-16 mt-md-16">
                <ExamForm
                  :users="users"
                  :subjects="subjects"
                   ref="editForm" @saved="init"
                />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <UpdateButton :id="item.id" />
        <DeleteButton :id="item.id" @submitted="init"/>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import { Examenes } from "@/services/Examenes";
const ExamenesService = new Examenes();
import { initExamenes } from "@/services/Examenes";

export default {
  name: "Exámenes",
  components: {
    ExamForm: () => import("@/components/Exams/Form.vue"),
    FileForm: () => import("@/components/Exams/FileForm.vue"),
    UpdateButton: () => import("@/components/Exams/UpdateButton.vue"),
    DeleteButton: () => import("@/components/Exams/DeleteButton.vue"),
  },
  data() {
    return {
      users: [],
      subjects: [],
      typeComponent: "FileForm",
      optionName: "",
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      dialog: false,
      dialogDelete: false,
      search: null,
      headers: [
        {
          text: "Nombre",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      desserts: [],
    };
  },
  created() {
    this.init()
  },
  methods: {
    closeDialog() {
      this.$store.commit("examen/CLOSE_CREATE_DIALOG");
      this.$store.commit("examen/RESET_FORM");
      this.$store.commit("examen/SET_STEP",1);
      if ( this.$refs.createExam.$refs?.['store-exam-form']){
        this.$refs.createExam.$refs?.['store-exam-form'].reset()
      }else if(this.$refs.createExam.$refs?.['store-file-exam-form']){
        this.$refs.createExam.$refs?.['store-file-exam-form'].reset()
      }
    },
    // TODO tratar de mover esto
    // SIRVE PARA QUE CUANDO DEN "ESCAPE" se se haga un reset de todo
    resetUpdateForm(){
      this.$store.commit("examen/RESET_FORM");
      this.$store.commit("examen/CLOSE_UPDATE_DIALOG");
      this.$store.commit("examen/SET_STEP",1);
    },
    ///########################
    async init(){
      /*
      * solo se encarga de la inicialización no de hacer reset en formularios/modelos
      * */
      this.loading = true
      let { examenes, users, subjects } = await initExamenes();
      this.subjects = subjects;
      this.users = users;
      this.desserts = examenes;
      this.loading = false;
    },
    nextStep(type) {
      let isManual = type === "Manual";
      this.$store.commit('examen/SET_STEP',2)
      this.formTitle = isManual ? "Redactar Examen" : "";
      this.optionName = type;
      this.typeComponent = isManual ? "ExamForm" : "FileForm";
    },
    async save(data) {
      try {
        this.isBtbBlocked = true;
        console.log(1);
        let response = await ExamenesService.store(data);
        console.log(response);
        await initExamenes();
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "Examen agregado correctamente",
          color: "success"
        }, { root: true });
      } catch (e) {
        console.log(e);
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "Error al procesar la solicitud",
        }, { root: true });
      } finally {
        this.$store.commit("examen/CLOSE_CREATE_DIALOG")
        this.$store.commit("examen/RESET_FORM")
        this.$store.commit("examen/SET_STEP",1)

        this.isBtbBlocked = false;
        await this.init()
      }
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}
</style>
