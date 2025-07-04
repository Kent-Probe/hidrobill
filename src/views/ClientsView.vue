<script setup lang="ts">
import { mdiAccount, mdiCancel, mdiEmoticonSad, mdiPlus } from "@mdi/js";
import { ref } from "vue";
import { VDataTable } from "vuetify/components";
import TableClients from "../components/TableClients.vue";
import { Client } from "../models/clients";
import { formatDate, formatPrice, numberToDate } from "../utilities/format";
type Header = VDataTable["$props"]["headers"];

const CLIENT_SELECT_DEFAULT: Client = {
  id: "",
  document: "",
  name: "",
  lastname: "",
  state: "",
  gender: "",
  created_at: "",
  updated_at: "",
  houses: [],
  contracts: [],
  payments: [],
};

const userSelect = ref<Client>({ ...CLIENT_SELECT_DEFAULT });

const headers: Header = [
  { title: "Código", key: "id", sortable: true, align: "start" },
  { title: "Fecha de pago", key: "paymentDate", sortable: true, value: (item) => formatDate(item.date) },
  { title: "Valor total pagado", key: "paymentTotal", sortable: true, value: (item) => formatPrice(item.valueTotal) },
  { title: "Estado", key: "paymentState", sortable: true },
  { title: "Descripción", key: "description", sortable: true },
  { title: "Acciones", key: "actions", sortable: false, align: "end" },
];

function invalidPaymenr(id: string) {
  console.log(`Invalid payment with ID: ${id}`);
  // Aquí puedes agregar la lógica para invalidar el pago
}
</script>

<template>
  <v-row no-gutter>
    <v-col cols="12" lg="6" class="pa-4 container_row">
      <TableClients v-model="userSelect" />
    </v-col>

    <v-col v-if="userSelect.id === ''" cols="12" lg="6" class="pa-4 container_row">
      <v-empty-state :icon="mdiEmoticonSad">
        <template v-slot:media>
          <v-icon color="surface-variant"></v-icon>
        </template>

        <template v-slot:headline>
          <div class="text-h4">No hay un cliente seleccionado</div>
        </template>

        <template v-slot:title>
          <div class="text-h6">Para continuar seleccione un cliente.</div>
        </template>

        <template v-slot:text>
          <p class="text-medium-emphasis text-caption">
            Para seleccionar un cliente, use el mouses para hacer clic en el cliente deseado de la lista de clientes
            registrados.
          </p>
        </template>
      </v-empty-state>
    </v-col>

    <v-col v-else-if="userSelect.id !== ''" cols="12" lg="6" class="pa-4 container_row">
      <v-toolbar flat class="mb-4 rounded-md">
        <v-toolbar-title>
          <v-icon color="medium-emphasis" :icon="mdiAccount" size="x-small" start></v-icon>
          Cliente {{ userSelect.id }}
        </v-toolbar-title>

        <v-btn
          class="me-2"
          :prepend-icon="mdiPlus"
          rounded="lg"
          text="Registrar un nuevo pago"
          color="secundary"
          variant="text"
        ></v-btn>
      </v-toolbar>
      <v-row dense="dense">
        <v-col cols="12">
          <v-text-field
            label="Cliente seleccionado"
            :model-value="`${userSelect.document} - ${userSelect.name} ${userSelect.lastname}`"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :model-value="userSelect.houses.map((e) => `${e.id} : ${e.direction}`).join(' ')"
            label="Casas asignadas"
            readonly
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Fecha de creación del cliente"
            :model-value="formatDate(userSelect.created_at)"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Fecha de última actualización del cliente"
            :model-value="formatDate(userSelect.updated_at)"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <h6 class="text-h6 mb-2">
            <strong>Contratos activos</strong>
          </h6>
          <v-row dense="dense" v-for="(contract, index) in userSelect.contracts" :key="index">
            <v-col cols="12" md="6">
              <v-text-field
                :label="`Fecha de pago oportuno del contrato ${contract.id}`"
                :model-value="numberToDate(contract.payday)"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :label="`Fecha de vencimiento del pago del contrato ${contract.id}`"
                :model-value="numberToDate(contract.payday_due)"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-data-table-virtual :headers="headers" :items="userSelect.payments" height="300" fixed-header>
            <template v-slot:item.actions="{ item }">
              <v-icon color="error" :icon="mdiCancel" size="small" @click="invalidPaymenr(item.id)"></v-icon>
            </template>
          </v-data-table-virtual>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.rounded-md {
  border-radius: 2px 2px 0 0 !important;
}

.container_row {
  height: 800px;
  overflow: auto;
  @media (max-width: 1280px) {
    height: 100%;
  }
}
</style>
