<script setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import MessageWelcome from "../components/MessageWelcome.vue";

const router = useRouter();
const username = ref("");
const password = ref("");
const show = ref(false);

const rules = [(v) => !!v || "Este campo es obligatorio", (v) => v.length >= 3 || "Mínimo 3 caracteres"];

const handleLogin = () => {
  // Aquí puedes agregar la lógica de autenticación
  console.log("Intento de inicio de sesión:", {
    username: username.value,
    password: password.value,
  });

  router.push({ name: "Clients" });

  // redirigir a la página principal o manejar el error
};
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Left Section -->
      <v-col cols="6" class="d-flex align-center justify-center bg-primary h-full position-relative">
        <MessageWelcome />
      </v-col>

      <!-- Right Section - Login Form -->
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-card class="pa-8" width="400" elevation="0">
          <v-card-title class="text-h4 text-center mb-6"> Iniciar Sesión </v-card-title>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              :rules="rules"
              variant="outlined"
              label="Usuario"
              name="username"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-inner-icon="show ? mdiEye : mdiEyeOff"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              hint="Mínimo 3 caracteres"
              variant="outlined"
              label="Contraseña"
              name="password"
              counter
              @click:append-inner="show = !show"
            ></v-text-field>

            <v-btn type="submit" color="primary" block size="large" class="mb-4"> Iniciar Sesión </v-btn>

            <div class="text-center">
              <router-link to="/register" class="text-decoration-none">
                <v-btn variant="text" color="primary"> ¿No tienes cuenta? Regístrate </v-btn>
              </router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.h-full {
  height: 100vh;
}
</style>

<!-- <script>
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
</script> -->
