<script setup lang="ts">
import { mdiAccountCheck, mdiAccountOff, mdiEye, mdiEyeOff, mdiKey, mdiPencil } from "@mdi/js";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { UserDB } from "../models/user";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { user, loading, users, result } = storeToRefs(authStore);
const { updateUserState, fetchGetUsers, updateUserInfo, updateUserPassword } = authStore;

// Datos de la tabla
const totalItems = ref(0);
const itemsPerPage = ref(10);

// Headers de la tabla
const headers = [
  { title: "Nombre", key: "name", sortable: true },
  { title: "Usuario", key: "username", sortable: true },
  { title: "Estado", key: "state", sortable: true },
  { title: "Acciones", key: "actions", sortable: false },
];

//Alert
const alert = ref(false);

// Dialogs
const editDialog = ref(false);
const passwordDialog = ref(false);

// Show pawsword
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Datos de edición
const editedUser = ref({
  id: "",
  name: "",
  username: "",
});

const selectedUserId = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// Computed
const isAdmin = computed(() => {
  return user.value.name.toLowerCase() === "admin" && user.value.username.toLowerCase() === "admin";
});

// Métodos
const loadUsers = async (options: any) => {
  await fetchGetUsers();
  totalItems.value = users.value.length;
};

const editUser = (user: any) => {
  editedUser.value = {
    id: user.id,
    name: user.name,
    username: user.username,
  };
  editDialog.value = true;
};

const saveUser = async () => {
  await updateUserInfo(editedUser.value.id, editedUser.value.name, editedUser.value.username);
  await loadUsers({});
  alert.value = true;
  editDialog.value = false;
};

const changePassword = (user: any) => {
  selectedUserId.value = user.id;
  newPassword.value = "";
  confirmPassword.value = "";
  passwordDialog.value = true;
};

const updatePassword = async () => {
  alert.value = false;
  if (newPassword.value !== confirmPassword.value) {
    result.value = {
      success: false,
      message: "Las contraseñas no coinciden.",
    };
    alert.value = true;
    return;
  }
  await updateUserPassword(selectedUserId.value, newPassword.value);
  passwordDialog.value = false;
};

const toggleUserState = async (user: UserDB) => {
  try {
    const newState = user.state === "activo" ? "inactivo" : "activo";
    await updateUserState(user.id, newState);
    await loadUsers({});
  } catch (error) {
    console.error("Error updating user state:", error);
  }
};
</script>

<template>
  <div class="pa-4">
    <v-card>
      <v-card-title>
        <span class="text-h5">Gestión de Usuarios</span>
      </v-card-title>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        no-data-text="No hay usuarios registrados aun o hubo un error a cargarlos."
        loading-text="Cargando usuarios..."
        :items="users"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        @update:options="loadUsers"
        fixed-header
        hide-default-footer
        hover
      >
        <template v-slot:item.state="{ item }">
          <v-chip :color="item.state === 'activo' ? 'success' : 'error'" size="small">
            {{ item.state }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2">
            <!-- Editar nombre y usuario -->
            <v-btn :icon="mdiPencil" density="comfortable" size="small" color="primary" @click="editUser(item)">
            </v-btn>

            <!-- Cambiar contraseña (solo admin) -->
            <v-btn
              v-if="isAdmin"
              density="comfortable"
              :icon="mdiKey"
              size="small"
              color="warning"
              @click="changePassword(item)"
            >
            </v-btn>

            <!-- Activar/Desactivar usuario -->
            <v-btn
              :icon="item.state === 'activo' ? mdiAccountOff : mdiAccountCheck"
              size="small"
              :color="item.state === 'activo' ? 'error' : 'success'"
              @click="toggleUserState(item)"
              density="comfortable"
            >
            </v-btn>
          </div>
        </template>
      </v-data-table-server>
    </v-card>

    <!-- Dialog para editar usuario -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Editar Usuario</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedUser.name" label="Nombre" required></v-text-field>
          <v-text-field v-model="editedUser.username" label="Usuario" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editDialog = false" :loading="loading">Cancelar</v-btn>
          <v-btn color="primary" @click="saveUser" :loading="loading">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para cambiar contraseña -->
    <v-dialog v-model="passwordDialog" max-width="500px">
      <v-card>
        <v-card-title>Cambiar Contraseña</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newPassword"
            :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
            label="Nueva Contraseña"
            :type="showPassword ? 'text' : 'password'"
            required
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="showConfirmPassword ? mdiEye : mdiEyeOff"
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="passwordDialog = false" :loading="loading">Cancelar</v-btn>
          <v-btn :loading="loading" color="primary" @click="updatePassword">Actualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-alert
    v-model="alert"
    style="bottom: 20px; right: 20px"
    closable
    :title="result.success ? 'Éxito' : 'Error'"
    :text="result.message"
    :type="result.success ? 'success' : 'error'"
    width="500"
    position="absolute"
    location="bottom right"
  ></v-alert>
</template>
