<script setup lang="ts">
import {
  mdiAccountMultiple,
  mdiCalendar,
  mdiDelete,
  mdiFaceMan,
  mdiFaceWoman,
  mdiHomePlus,
  mdiMagnify,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";
import { storeToRefs } from "pinia";
import { ref, shallowRef, watch } from "vue";
import { ClientWithInfo } from "../models/clients";
import { House } from "../models/houses";
import { useClientsStore } from "../stores/clients";
import ComboBoxHouses from "./ComboBoxHouses.vue";

const DEFAULT_RECORD: ClientWithInfo = {
  id: "",
  document: "",
  name: "",
  lastname: "",
  created_at: "",
  updated_at: "",
  state: "Al dia",
  gender: "",
  phone: "",
  contracts: [],
};

const DEFAULT_HOUSE: House[] = [];

const selectClient = defineModel<ClientWithInfo>({
  required: true,
  type: Object as ClientWithInfo,
  default: () => ({}),
});

const clientsStore = useClientsStore();
const { clients, cargando, pageLength } = storeToRefs(clientsStore);
const { fetchClients, createClient, createClientWithContracts, updateClient, alterStateClient } = clientsStore;
const resultsCreateorEditClients = ref({ success: false, message: "" });

const search = ref();
const page = ref(1);
const record = ref({ ...DEFAULT_RECORD });
const recordHouse = ref(DEFAULT_HOUSE);
const form = ref();
const formHouses = ref();
const dialog = shallowRef(false);
const isEditing = shallowRef(false);
const rules = [(v) => !!v || "Este campo es obligatorio", (v) => v.length >= 3 || "Mínimo 3 caracteres"];

const headers = [
  { title: "Documento", key: "document", align: "start" },
  { title: "Nombres", key: "name" },
  { title: "Apellidos", key: "lastname" },
  { title: "Estado", key: "state" },
  { title: "Casa", key: "houses", align: "end", maxWith: "50px", sortable: false },
  { title: "Actions", key: "actions", align: "end", sortable: false },
];

const step = ref(1);

watch(dialog, (val) => {
  if (!val) {
    record.value = { ...DEFAULT_RECORD };
    recordHouse.value = [];
    isEditing.value = false;
    step.value = 1;
  }
});

function add() {
  isEditing.value = false;
  record.value = { ...DEFAULT_RECORD };
  recordHouse.value = [];
  dialog.value = true;
}

function edit(id) {
  isEditing.value = true;

  const found = clients.value.find((client) => client.id === id);

  record.value = {
    id: found.id,
    name: found.name,
    lastname: found.lastname,
    gender: found.gender,
    houses: found.houses,
  };

  dialog.value = true;
}

async function alterState(id: string | number, isActived: boolean) {
  await alterStateClient(id, isActived);
  await fetchClients();
}

async function save() {
  if (isEditing.value) {
    const result = await updateClient(record.value);
    await fetchClients();
    resultsCreateorEditClients.value = {
      message: result.message,
      success: result.success,
    };
  } else {
    const result = await createClientWithContracts(record.value);
    await fetchClients();
    resultsCreateorEditClients.value = {
      message: result.message,
      success: result.success,
    };
    record.value = { ...DEFAULT_RECORD };
    recordHouse.value = [];
  }
}

async function reset() {
  dialog.value = false;
  record.value = { ...DEFAULT_RECORD };
  recordHouse.value = [];
  step.value = 1;
}

async function nexStep() {
  const validForm = await form.value.validate();
  if (validForm.valid !== undefined && !validForm.valid) {
    return;
  }
  if (isEditing.value) {
    await save();
    step.value = 3;
    return;
  }
  if (recordHouse.value.length === 0) {
    recordHouse.value.push({ id: "C-000", direction: "", colorChip: "green", neighborhood: "", description: "" });
  }
  if (step.value === 1) {
    for (let house of recordHouse.value) {
      record.value.contracts.push({
        id_house: house.id,
        id_client: record.value.id,
        start_date: new Date().toISOString(),
        payday: 1,
        payday_due: 4,
        description: "",
        state: "Activo",
        monthlyPayment: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        house: {
          id: house.id,
          direction: house.direction,
          colorChip: house.colorChip,
          neighborhood: house.neighborhood,
        },
      });
    }
  }
  if (step.value === 2) {
    const validFormHouses = await formHouses.value.validate();
    if (validFormHouses.valid !== undefined && !validFormHouses.valid) {
      return;
    }
    for (let [index, house] of recordHouse.value?.entries()) {
      record.value.contracts[index].house.direction = house.direction;
      record.value.contracts[index].house.neighborhood = house.neighborhood;
      record.value.contracts[index].house.description = house.description;
    }
  }
  if (step.value === 2) {
    await save();
  }
  step.value++;
}

async function selectClientHandler(client: ClientWithInfo) {
  if (client) {
    selectClient.value = client;
    record.value = client;
  } else {
    selectClient.value = { ...DEFAULT_RECORD };
  }
}

async function loadItems(options: any) {
  const searchValue: string | undefined = search.value;
  const itemsPerPage: number = 8;
  const pageOpt: number = options.page || 1;
  if (searchValue) {
    await fetchClients(itemsPerPage, pageOpt, searchValue);
  } else {
    await fetchClients(itemsPerPage, pageOpt);
  }
}
</script>

<template>
  <v-sheet border rounded>
    <v-data-table-server
      v-model:page="page"
      :search="search"
      :headers="headers"
      :items="clients"
      :loading="cargando"
      no-data-text="Sin datos a mostrar"
      loading-text="Cargando clientes..."
      fixed-header
      items-length="100"
      hover
      @update:options="loadItems"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" :icon="mdiAccountMultiple" size="x-small" start></v-icon>
            Clientes registrados
          </v-toolbar-title>

          <v-btn
            class="me-2"
            :prepend-icon="mdiPlus"
            rounded="lg"
            text="Agregar un nuevo cliente"
            border
            variant="text"
            @click="add"
          ></v-btn>
        </v-toolbar>
        <div class="pa-4">
          <v-text-field
            v-model="search"
            label="Buscar"
            placeholder="Buscar por documento, nombre o apellido"
            :prepend-inner-icon="mdiMagnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </div>
      </template>

      <template v-slot:item="{ item }">
        <tr @click="selectClientHandler(item)" class="text-no-wrap">
          <td>
            <v-chip
              :text="item.document"
              border="thin opacity-25"
              :prepend-icon="item.gender.toLowerCase() === 'masculino' ? mdiFaceMan : mdiFaceWoman"
              :color="item.gender.toLowerCase() === 'masculino' ? 'indigo' : 'pink'"
              label
            >
              <template v-slot:prepend> <v-icon color="medium-emphasis"></v-icon> </template>
            </v-chip>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.state }}</td>
          <td class="text-end">
            <v-chip
              v-if="item.contracts === null || item.contracts.length === 0"
              text="Sin casas"
              color="grey lighten-3"
              size="small"
              variant="flat"
            >
              Sin casas
            </v-chip>
            <v-chip
              v-else
              v-for="(contract, index) in item.contracts"
              :key="index"
              :text="contract.id"
              :color="`${contract.house.colorChip}-lighten-3`"
              size="small"
              variant="flat"
              :class="index > 0 && 'ml-1'"
            >
              {{ contract.id }}
            </v-chip>
          </td>
          <td class="text-end">
            <div class="d-flex ga-2 justify-end">
              <v-icon color="success" :icon="mdiPencil" size="small" @click="edit(item.id)"></v-icon>

              <v-icon
                :color="item.state === 'Desactivado' ? 'info' : 'error'"
                :icon="item.state === 'Desactivado' ? mdiHomePlus : mdiDelete"
                size="small"
                @click="alterState(item.id, item.state !== 'Desactivado')"
              ></v-icon>
            </div>
          </td>
        </tr>
      </template>

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageLength" total-visible="5"></v-pagination>
        </div>
      </template>
    </v-data-table-server>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="700">
    <v-card
      :subtitle="`${isEditing ? 'Actualiza' : 'Crea'} el cliente`"
      :title="`${isEditing ? 'Edita' : 'Agrega'} un cliente`"
    >
      <template v-slot:text>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field :rules="rules" v-model="record.document" label="Cédula"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field :rules="rules" v-model="record.name" label="Nombres"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field :rules="rules" v-model="record.lastname" label="Apellidos"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :rules="rules"
                    v-model="record.gender"
                    :items="['Masculino', 'Femenino']"
                    label="Género"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field :rules="rules" v-model="record.phone" label="Número de celular"></v-text-field>
                </v-col>
                <v-col v-if="!isEditing" cols="12">
                  <ComboBoxHouses v-model="recordHouse" />
                </v-col>
              </v-row>
            </v-form>
          </v-window-item>
          <v-window-item :value="2">
            <v-form ref="formHouses">
              <v-card
                variant="text"
                v-for="(item, index) in recordHouse"
                :title="`${item.id === 'C-000' ? 'Casa no encontrada' : 'Casa'}: ${item.id}`"
                :key="item.id"
                class="mb-2"
              >
                <v-row>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="item.id"
                          label="Código de la casa"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          disabled
                          :hint="
                            item.id === 'C-000'
                              ? 'C-000 no será el id de la casa, el id se asignara después de guardar el cliente'
                              : `El id ${item.id} es el identificador de la casa para el cliente`
                          "
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="item.direction"
                          label="Direccion"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          :disabled="item.id !== 'C-000'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="item.neighborhood"
                          label="barrio"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          :disabled="item.id !== 'C-000'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="item.description"
                          label="Descripción"
                          :disabled="item.id !== 'C-000'"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <v-date-input
                          v-model="record.contracts[index].start_date"
                          label="Fecha de inicio del contrato"
                          :format="(val) => new Date(val).toLocaleDateString()"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          :prepend-inner-icon="mdiCalendar"
                          prepend-icon=""
                          hint="Fecha en la que inicia el contrato para la gestión casa"
                          persistent-hint
                        ></v-date-input>
                      </v-col>
                      <v-col cols="12">
                        <v-number-input
                          v-model="record.contracts[index].payday"
                          label="Día del mes en el que se paga"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          :min="1"
                          :max="28"
                          control-variant="split"
                          persistent-hint
                        ></v-number-input>
                      </v-col>
                      <v-col cols="12">
                        <v-number-input
                          v-model="record.contracts[index].payday_due"
                          label="Día del mes en el que se vence el pago"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          :min="1"
                          :max="28"
                          control-variant="split"
                          persistent-hint
                        ></v-number-input>
                      </v-col>
                      <v-col cols="12">
                        <v-number-input
                          v-model="record.contracts[index].monthlyPayment"
                          label="Pago de la mensualidad"
                          :rules="[(v) => !!v || 'Este campo es obligatorio']"
                          :min="100"
                          control-variant="split"
                          persistent-hint
                        ></v-number-input>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="record.contracts[index].description"
                          label="Descripción del contrato"
                          :append-inner-icon="mdiPencil"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-window-item>
          <v-window-item :value="3">
            <v-row>
              <v-col cols="12">
                <v-alert :type="resultsCreateorEditClients.success ? 'success' : 'error'" variant="flat">
                  <div class="text-h6">{{ resultsCreateorEditClients.success ? "Listo!" : "Error!" }}</div>
                  <div class="text-body-2">
                    {{ resultsCreateorEditClients.message }}
                  </div>
                </v-alert>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </template>
      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn :text="step === 3 ? 'Continuar' : 'Cancelar'" variant="plain" @click="dialog = false"></v-btn>
        <v-btn
          v-if="step < 3"
          :text="step === 1 ? 'Siguiente' : 'Guardar'"
          variant="elevated"
          base-color="success"
          @click="nexStep"
          :loading="cargando"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.table__tr {
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.3;
  }
}
</style>
