<script setup>
import { getVersion } from "@tauri-apps/api/app";
import { onMounted, ref } from "vue";
import Bubles from "./bubles.vue";
defineProps({
  title: {
    type: String,
    default: "Bienvenido a HidroBill",
  },
  subtitle: {
    type: String,
    default: "Gestiona los pagos de manera eficiente",
  },
  extraInfo: {
    type: String,
    default: "Para iniciar con el registro, por favor inicia sesión",
  },
});

const appVersion = ref("");

onMounted(async () => {
  appVersion.value = await getVersion();
});
</script>

<template>
  <div class="bublesCanvas">
    <Bubles />
  </div>
  <div class="container-card">
    <div class="container-card__content text-center">
      <h1 class="text-h2 text-white mb-4 flex-column text-uppercase">{{ title }}</h1>
      <p class="text-h6 text-white">{{ subtitle }}</p>
      <p class="text-h6 text-secundary extrainfo">{{ extraInfo }}</p>
    </div>
    <div class="container-card__footer">
      <p>
        Desarrollado por <strong class="text-secundary">Kent</strong>
        <img src="../assets/logo.svg" alt="Logo del desarrollador kent" width="25" />
      </p>
      <p>&copy; 2024 Todos los derechos reservados</p>
      <p>
        <strong class="text-secundary"> HIDROBILL v{{ appVersion }} </strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.bublesCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.container-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.container-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-inline: 50px;

  flex-grow: 1;
}

.extrainfo {
  margin-top: 20px;
}

.text-uppercase {
  text-transform: uppercase !important;
  font-weight: 700 !important;
}

.container-card__footer {
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  padding: 20px 0px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  & p {
    padding: 0;
    & img {
      margin-left: 5px;
      width: 20px;
      height: 20px;
    }
  }

  & p:last-child {
    margin-bottom: 0;
  }

  & strong {
    font-weight: 700;
    letter-spacing: 0.5px;

    transition: color 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
