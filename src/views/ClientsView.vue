<script setup lang="ts">
import { mdiAccount, mdiCancel, mdiEmoticonSad, mdiPlus } from "@mdi/js";
import { computed, ref } from "vue";
import { VDataTable } from "vuetify/components";
import TableClients from "../components/TableClients.vue";
import { ClientWithInfo } from "../models/clients";
import { formatDate, formatPrice, numberToDate } from "../utilities/format";
type Header = VDataTable["$props"]["headers"];

const CLIENT_SELECT_DEFAULT: ClientWithInfo = {
  id: "",
  document: "",
  name: "",
  lastname: "",
  state: "",
  gender: "",
  created_at: "",
  updated_at: "",
  contracts: [],
};

const selectedClient = ref<ClientWithInfo>({ ...CLIENT_SELECT_DEFAULT });

const headers: Header = [
  { title: "Código", key: "id", sortable: true, align: "start" },
  { title: "Fecha de pago", key: "payment_date", sortable: true, value: (item) => formatDate(item.date) },
  { title: "Valor total pagado", key: "payment_total", sortable: true, value: (item) => formatPrice(item.value_total) },
  { title: "Estado", key: "payment_state", sortable: true },
  { title: "Descripción", key: "description", sortable: true },
  { title: "Acciones", key: "actions", sortable: false, align: "end" },
];

function invalidPaymenr(id: string) {
  console.log(`Invalid payment with ID: ${id}`);
  // Aquí agregar :: invalidar el pago
}

const paymentsOfSelectedClient = computed(() => {
  // Si no hay cliente seleccionado o no tiene contratos, devuelve un array vacío.
  if (!selectedClient.value || !selectedClient.value.contracts) {
    return [];
  }

  // flatMap es perfecto para esto. Recorre cada contrato y devuelve su array de pagos.
  // Luego, flatMap aplana todos esos arrays en uno solo.
  return selectedClient.value.contracts.flatMap((contract) => {
    // Si un contrato no tiene pagos, devuelve un array vacío para ese contrato.
    if (!contract.payments) return [];

    // Enriquece cada pago con el ID del contrato para mostrarlo en la tabla.
    return contract.payments.map((payment) => ({
      ...payment, // Copia todas las propiedades originales del pago
      contractId: contract.id, // Añade el ID del contrato
      houseDirection: contract.house?.direction || "N/A", // Añade la dirección de la casa
    }));
  });
});
</script>

<template>
  <v-row no-gutter>
    <v-col cols="12" lg="6" class="pa-4 container_row">
      <TableClients v-model="selectedClient" />
    </v-col>

    <v-col v-if="selectedClient.id === ''" cols="12" lg="6" class="pa-4 container_row">
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

    <v-col v-else-if="selectedClient.id !== ''" cols="12" lg="6" class="pa-4 container_row">
      <v-toolbar flat class="mb-4 rounded-md">
        <v-toolbar-title>
          <v-icon color="medium-emphasis" :icon="mdiAccount" size="x-small" start></v-icon>
          Cliente {{ selectedClient.id }}
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
            :model-value="`${selectedClient.document} - ${selectedClient.name} ${selectedClient.lastname}`"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :model-value="selectedClient.contracts.map((e) => `${e.house?.id} : ${e.house?.direction}`).join(' ')"
            label="Casas asignadas"
            readonly
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Fecha de creación del cliente"
            :model-value="formatDate(selectedClient.created_at)"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Fecha de última actualización del cliente"
            :model-value="formatDate(selectedClient.updated_at)"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <h6 class="text-h6 mb-2">
            <strong>Contratos activos</strong>
          </h6>
          <v-row dense="dense" v-for="(contract, index) in selectedClient.contracts" :key="index">
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
          <v-data-table-virtual
            no-data-text="No hay datos que mostrar"
            :headers="headers"
            :items="paymentsOfSelectedClient"
            height="300"
            fixed-header
          >
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
