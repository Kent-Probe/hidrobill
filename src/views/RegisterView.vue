<script setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import MessageWelcome from "../components/MessageWelcome.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { loading, result, isError } = storeToRefs(authStore);
const { registerUser } = authStore;

const alert = ref(false);
const show = ref(false);

const resultScreen = ref({
  success: false,
  message: "",
});

const name = ref([]);
const username = ref("");
const lastaname = ref("");
const password = ref("");

const rules = [(v) => !!v || "Este campo es obligatorio", (v) => v.length >= 3 || "Mínimo 3 caracteres"];

const handleRegister = async () => {
  if (!name.value || !username.value || !lastaname.value || !password.value) {
    alert.value = true;
    return;
  }
  await registerUser({
    names: name.value,
    username: username.value,
    lastnames: lastaname.value,
    password: password.value,
  });
  resultScreen.value = {
    success: result.value.success,
    message: result.value.message,
  };
  alert.value = true;
};
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Right Section - Login Form -->
      <v-col cols="6" class="d-flex align-center justify-center bg-primary h-full position-relative">
        <MessageWelcome
          extraInfo="El primer usuario registrado sera el administrador, por favor no pierda la Contraseña de este usuario, los proximos registros necesitan del permiso del nuevo usuario"
        />
      </v-col>

      <!-- Left Section -->
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-card class="pa-8" width="600" elevation="0">
          <v-card-title class="text-h4 text-center mb-6"> Registrarse </v-card-title>

          <v-form @submit.prevent="handleRegister">
            <v-row no-gutter>
              <v-col cols="6">
                <v-text-field
                  v-model="name"
                  label="Nombre"
                  variant="outlined"
                  class="mb-4"
                  :rules="rules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastaname"
                  label="Apellidos"
                  variant="outlined"
                  class="mb-4"
                  :rules="rules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="username"
                  label="Usuario"
                  variant="outlined"
                  class="mb-4"
                  :rules="rules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="password"
                  :append-inner-icon="show ? mdiEye : mdiEyeOff"
                  :type="show ? 'text' : 'password'"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  class="mb-6"
                  :rules="rules"
                  required
                  @click:append-inner="show = !show"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn :loading="loading" type="submit" color="primary" block size="large" class="mb-4">
              Registrarse
            </v-btn>

            <div class="text-center">
              <router-link to="/" class="text-decoration-none">
                <v-btn :loading="loading" variant="text" color="primary"> ¿Ya tienes cuenta? inicia sesión </v-btn>
              </router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-alert
      v-model="alert"
      style="bottom: 20px; right: 20px"
      closable
      :title="resultScreen.success ? 'Éxito' : 'Error'"
      :text="resultScreen.message"
      :type="resultScreen.success ? 'success' : 'error'"
      width="500"
      position="absolute"
      location="bottom right"
    ></v-alert>
  </v-container>
</template>

<style scoped>
.h-full {
  height: 100vh;
}
</style>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Lógica de login aquí
      console.log("Login attempt:", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
