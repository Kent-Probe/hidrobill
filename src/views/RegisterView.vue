<script setup>
import MessageWelcome from "../components/MessageWelcome.vue";
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

          <v-form @submit.prevent="handleLogin">
            <v-row no-gutter>
              <v-col>
                <v-text-field v-model="name" label="Nombre" variant="outlined" class="mb-4" required></v-text-field>
                <v-text-field
                  v-model="username"
                  label="Usuario"
                  variant="outlined"
                  class="mb-4"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="lastaname"
                  label="Apellidos"
                  variant="outlined"
                  class="mb-4"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  class="mb-6"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn type="submit" color="primary" block size="large" class="mb-4"> Registrarse </v-btn>

            <div class="text-center">
              <router-link to="/" class="text-decoration-none">
                <v-btn variant="text" color="primary"> ¿Ya tienes cuenta? inicia sesión </v-btn>
              </router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
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
