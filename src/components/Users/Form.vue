<template>
  <v-dialog :value="dialog" max-width="900px" scrollable persistent>
    <ValidationObserver v-slot="{ invalid }" ref="user-form">
      <v-card max-width="900px">
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col>
                  <h4 class="text-h5">{{ formTitle }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" lg="6" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Apellido paterno"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.paternal_name"
                      label="Apellido paterno"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6" lg="6" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Apellido materno"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.maternal_name"
                      label="Apellido Materno"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6" lg="6" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Nombre(s)"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nombre(s)"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6" lg="6" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Correo electrónico"
                    :rules="{
                      required: true,
                      email: true,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Correo electrónico"
                      :error-messages="errors"
                      type="email"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4" lg="4" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Contraseña"
                    :rules="{
                      min: 6,
                      required: formTitle === 'Añadir Usuario',
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      type="password"
                      label="Contraseña"
                      :error-messages="errors"
                      counter="6"
                      maxlength="6"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4" lg="4" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Código"
                    :rules="{
                      min: 4,
                      required: formTitle === 'Añadir Usuario',
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.code"
                      label="Código"
                      :error-messages="errors"
                      counter="4"
                      maxlength="4"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4" lg="4" sm="12">
                  <v-dialog
                    ref="dialog"
                    v-model="ModalBirthday"
                    :return-value.sync="editedItem.birthday"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Fecha de nacimiento"
                        :rules="{
                          required: true,
                        }"
                      >
                        <v-text-field
                          v-model="editedItem.birthday"
                          label="Fecha de nacimiento"
                          prepend-icon="mdi-calendar"
                          readonly
                          :error-messages="errors"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </validation-provider>
                    </template>
                    <v-date-picker v-model="editedItem.birthday" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="ModalBirthday = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(editedItem.birthday)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" md="4" lg="4" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Dirección"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.address"
                      label="Dirección"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4" lg="4" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Teléfono"
                    :rules="{
                      required: true,
                      digits: 10,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Teléfono"
                      type="text"
                      :error-messages="errors"
                      counter="10"
                      maxlength="10"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4" lg="4" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Contacto"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="editedItem.contact_name"
                      label="Contacto"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6" lg="6" sm="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Rol"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-select
                      dense
                      label="Rol"
                      :error-messages="errors"
                      :items="roles"
                      v-model="editedItem.role"
                    >
                    </v-select>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6" lg="6" class="pt-0">
                  <v-textarea
                    auto-grow
                    dense
                    v-model="editedItem.comments"
                    label="Comentarios"
                    rows="1"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <roles-permissions-card
                    :roles="roles"
                    :roleSelected="editedItem.role"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="isBtbBlocked || invalid"
            text
            :loading="isBtbBlocked"
            @click="submit"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script>
import { get, Users } from "@/services/Users";
import { RolesPermissions } from "@/services/RolePermissions";
const RolePermissionsService = new RolesPermissions();
const UserService = new Users();

export default {
  name: "user-form",
  components: {
    "roles-permissions-card": () =>
      import("@/components/Users/RolesPermissionsCard.vue"),
  },
  props: {
    formTitle: {
      type: String,
      default: "Añadir Usuario",
    },
    user_id: {
      type: Number || null,
      require: false,
    },
    dialog: {
      type: Boolean,
      require: true,
    },
  },
  methods: {
    close() {
      this.$refs["user-form"].reset();
      this.$refs.form.reset();
      this.$emit("close-dialog");
      this.$emit('init')
    },
    async submit() {
      try {
        this.isBtbBlocked = true;
        this.formTitle === "Añadir Usuario"
          ? await this.createUser()
          : await this.updateUser();
        this.$emit("init");
      } catch (e) {
        this.$store.commit(
          "settings/SHOW_SNACKBAR",
          {
            text:
              e?.response?.data?.message ??
              "¡No fue posible agregar al usuario!",
          },
          { root: true }
        );
      } finally {
        this.isBtbBlocked = false;
        this.close();
      }
    },
    async createUser() {
      await UserService.store({ userData: this.editedItem });
      this.$store.commit(
        "settings/SHOW_SNACKBAR",
        {
          text: "¡Usuario agregado correctamente!",
          color: this.$vuetify.theme.themes.light.secondary,
        },
        { root: true }
      );
    },
    async updateUser() {
      await UserService.update({
        userId: this.user_id,
        data: this.editedItem,
      });

    },
    async getRoles() {
      let { data } = await RolePermissionsService.getRoles();
      this.roles = data.map((role) => {
        return {
          value: role.name,
          text: role.name.toUpperCase(),
          permissions: role.permissions,
        };
      });
    },
  },
  watch:{
    //todo refactor hace peticion GET antes del delete
    user_id(newValue, oldValue) {
      if (newValue && newValue !== oldValue && this.formTitle === "Editar Usuario") {
        get({ userId: newValue }).then(({ data }) => {
          this.editedItem.name = data.name;
          this.editedItem.paternal_name = data.paternal_name;
          this.editedItem.paternal_name = data.paternal_name;
          this.editedItem.maternal_name = data.maternal_name;
          this.editedItem.email = data.email;
          this.editedItem.code = data.code;
          this.editedItem.birthday = data.birthday;
          this.editedItem.address = data.address;
          this.editedItem.phone = data.phone;
          this.editedItem.contact_name = data.contact_name;
          this.editedItem.comments = data.comments;
          this.editedItem.role = data.roles[0]?.name;
        })

      }
    }
  },
  data() {
    return {
      editedItem: {
        name: null,
        paternal_name: null,
        maternal_name: null,
        email: null,
        password: null,
        code: null,
        birthday: null,
        address: null,
        phone: null,
        contact_name: null,
        comments: null,
        role: null,
      },
      ModalBirthday: false,
      roles: [],
      isBtbBlocked: false,
    };
  },
  created() {
    this.getRoles();
  },
};
</script>

<style scoped></style>
