<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
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
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                + Añadir Examen
              </v-btn>
            </template>
            <v-stepper v-model="e1" flat outlined tile>
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1" editable>
                  Instrucciones
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2" editable>
                  {{ optionName }}
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" editable> Configurar </v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-banner>
                    <p>
                      Para generar un nuevo examen tienes las siguientes
                      opciones:
                    </p>
                    <v-list>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title>Manualmente</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Archivo de Excel</v-list-item-title>
                      </v-list-item>
                    </v-list>
                    <template>
                      <small>Con la siguiente estructura</small>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">No.</th>
                              <th class="text-left">Pregunta</th>
                              <th class="text-left">Nivel A | B | M</th>
                              <th class="text-left">Respuesta 1</th>
                              <th class="text-left">Respuesta 2</th>
                              <th class="text-left">Respuesta 3</th>
                              <th class="text-left">Correcta</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Pregunta 1</td>
                              <td>A</td>
                              <td>opcion 1</td>
                              <td>opcion 2</td>
                              <td>opcion 3</td>
                              <td>1</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </template>
                    <template #actions>
                      <v-btn color="primary" @click="nextStep('Manual')"
                        >Manual</v-btn
                      >
                      <v-btn color="secondary" @click="nextStep('Archivo')"
                        >Archivo</v-btn
                      >
                    </template>
                  </v-banner>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <h3>Importar Examen</h3>
                        <small> Solo archivos CSV xlsx xls máximo 35 MB.</small>
                      </v-col>
                      <v-col cols="12">
                        <v-form>
                          <v-text-field
                            label="Titulo del examen"
                            v-model="editedItem.name"
                          ></v-text-field>
                          <v-select
                            label="Materia"
                            :items="subjects"
                            v-model="editedItem.subject_id"
                          >
                          </v-select>
                          <v-select
                            v-model="editedItem.user_id"
                            label="Profesor"
                            :items="users"
                          >
                          </v-select>
                          <v-file-input
                            show-size
                            v-model="editedItem.file"
                          ></v-file-input>
                          <!-- accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" -->
                          <v-btn @click="save">Aceptar</v-btn>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                  ></v-card>

                  <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estas seguro de eliminar esta Examen ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  :disabled="isBtbBlocked"
                  text
                  @click="deleteSubject"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="showDialog('delete', item.id)" plain>
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { Examenes } from "@/services/Examenes";
import { Subjects } from "@/services/Subjects";
import { Users } from "@/services/Users";
import snackbar from "@/mixins/snackbar";
const ExamenesService = new Examenes();
const SubjectsService = new Subjects();
const UserService = new Users();
export default {
  mixins: [snackbar],
  name: "Exámenes",
  data() {
    return {
      users: [],
      subjects: [],
      e1: 1,
      optionName: "",
      formTitle: "Añadir Examen ",
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      editedItem: { name: null, user_id: null, subject_id: null, file: null },
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
    this.init();
  },
  methods: {
    nextStep(type) {
      this.e1 = 2;
      this.optionName = type;
    },
    showDialog(name, idSelected = 0) {
      switch (name) {
        case "delete":
          this.dialogDelete = !this.dialogDelete;
          this.idSelected = idSelected;
          break;
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        this.isBtbBlocked = true;
        await ExamenesService.store(this.editedItem);
        await this.init();
        await this.showSnackBar(
          "Exito",
          "Examen  agregada correctamente",
          "success"
        );
        this.dialog = false;
        this.isBtbBlocked = false;
      } catch (e) {
        let text = "Desconocido",
          tag = "Error";
        if (e.response?.data?.message?.includes("already exists")) {
          text = "Ya existe";
          tag = `Role ${this.editedItem.name}`;
        }
        this.showSnackBar(tag, text);
      }
    },
    async deleteSubject() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await ExamenesService.delete({
            examenId: this.idSelected,
          });
          await this.init();
          await this.showSnackBar(
            "Exito",
            "Examen  Eliminada correctamente",
            "success"
          );
          this.dialogDelete = false;
          this.isBtbBlocked = false;
        } catch (e) {
          this.showSnackBar(
            "Error",
            "No fue posible eliminar la Examen ",
            "error"
          );
        }
    },
    async init() {
      let { data } = await ExamenesService.all();
      let users = await UserService.all();
      let subjects = await SubjectsService.all();
      this.subjects = subjects.data.map((item) => {
        return { value: item.id, text: item.name };
      });
      this.users = users.data.map((item) => {
        return { value: item.id, text: item.name };
      });
      this.desserts = data;
      this.editedItem = { name: null };
      this.loading = false;
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
</style>