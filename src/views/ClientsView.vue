<script setup lang="ts">
import {
  mdiAccount,
  mdiCalendar,
  mdiCancel,
  mdiEmoticonSad,
  mdiHomeEdit,
  mdiNewspaper,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { VDataTable } from "vuetify/components";
import ComboBoxHouses from "../components/ComboBoxHouses.vue";
import TableClients from "../components/TableClients.vue";
import { ClientWithInfo } from "../models/clients";
import { Contract } from "../models/contract";
import { House } from "../models/houses";
import { Payment } from "../models/payments";
import { useClientsStore } from "../stores/clients";
import { useContractsStore } from "../stores/contracts";
import { usePaymetsStore } from "../stores/pagos";
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

const DEFAULT_CONTRACT: Contract = {
  id: "",
  payday: 0,
  payday_due: 0,
  created_at: "",
  description: "",
  end_date: "",
  house: {
    id: "",
    direction: "",
    colorChip: "",
    neighborhood: "",
    description: "",
  },
  id_client: "",
  id_house: "",
  monthlyPayment: 0,
  start_date: "",
  state: "",
  updated_at: "",
};

const DEFAULT_PAYMENT: Payment = {
  date: "",
  reconnection: 0,
  remaining_debt: 0,
  enrollment: 0,
  value_total: 0,
  payments: 0,
  late_fee: 0,
  other_charges: 0,
  description: "",
  payment_state: "PAGADO",
  id_contract: "",
  monthly_payment: 0,
};

const router = useRouter();
const selectedClient = ref<ClientWithInfo>({ ...CLIENT_SELECT_DEFAULT });
const dialog = ref(false);
const step = ref(1);
const resultInScreen = ref({
  success: false,
  message: "No se envio ningún pago aún. Por favor, complete el formulario.",
});
const selectedContract = ref({ ...DEFAULT_CONTRACT });
const selectedPayment = ref({ ...DEFAULT_PAYMENT });
const valueTotal = ref(0);

const headers: Header = [
  { title: "Código", key: "id", sortable: true, align: "start" },
  { title: "Fecha de pago", key: "payment_date", sortable: true, value: (item) => formatDate(item.date) },
  { title: "Valor total pagado", key: "payment_total", sortable: true, value: (item) => formatPrice(item.value_total) },
  { title: "Estado", key: "payment_state", sortable: true },
  { title: "Descripción", key: "description", sortable: false },
  { title: "Acciones", key: "actions", sortable: false, align: "end" },
];

function invalidPayment(id: string) {
  console.log(`Invalid payment with ID: ${id}`);
  // Aquí agregar :: invalidar el pago
}

const paymentsOfSelectedClient = computed(() => {
  // Si no hay cliente seleccionado o no tiene contratos, devuelve un array vacío.
  if (!selectedClient.value || !selectedClient.value.contracts) {
    return [];
  }

  return selectedClient.value.contracts.flatMap((contract) => {
    // Si un contrato no tiene pagos, devuelve un array vacío para ese contrato.
    if (!contract.payments) return [];

    // Enriquece cada pago con el ID del contrato para mostrarlo en la tabla.
    return contract.payments.map((payment) => ({
      ...payment,
      contractId: contract.id, // Añade el ID del contrato
      houseDirection: contract.house?.direction || "N/A", // Añade la dirección de la casa
    }));
  });
});

function AddNewPayment() {
  if (selectedClient.value.id === "") {
    resultInScreen.value = { success: false, message: "Debe seleccionar un cliente antes de agregar un pago." };
    step.value = 3;
    dialog.value = true;
    return;
  }
  if (selectedClient.value.contracts.length === 0) {
    resultInScreen.value = { success: false, message: "El cliente seleccionado no tiene contratos activos." };
    step.value = 3;
    dialog.value = true;
    return;
  }
  dialog.value = true;
  step.value = 1;
  resultInScreen.value = { success: false, message: "" };
}

function itemProps(item: Contract) {
  return {
    title: `Contrato ${item.id || "N/A"}`,
    subtitle: `Casa: ${item.house?.direction || "N/A"} - Fecha de pago: ${numberToDate(
      item.payday
    )} - Fecha de vencimiento: ${numberToDate(item.payday_due)}`,
  };
}

async function nexStep() {
  if (selectedContract.value.id === "") {
    return;
  }
  if (step.value === 2) {
    const paymentToSend = {
      ...selectedPayment.value,
      date: Date.now(),
      value_total: valueTotal.value,
      id_contract: selectedContract.value.id,
    };
    selectedPayment.value = paymentToSend;
    const paymentResult = await createPayment(paymentToSend);
    resultInScreen.value = {
      success: paymentResult.success,
      message: paymentResult.message,
    };
  }
  step.value++;
}

watch(
  selectedPayment,
  (newValue) => {
    // Actualiza el valor total del pago automáticamente al cambiar otros campos
    valueTotal.value =
      newValue.monthly_payment +
      newValue.reconnection +
      newValue.late_fee +
      newValue.enrollment +
      newValue.payments +
      newValue.other_charges;
  },
  {
    deep: true,
  }
);

const storePayments = usePaymetsStore();
const { cargando, result } = storeToRefs(storePayments);
const { createPayment } = storePayments;

const sendToDonwloadRecebit = () => {
  router.push({
    name: "generate-bill",
    params: { id: result.value.id_payment },
  });
};

const dialogAddHouseToClient = ref(false);
const houseSelect = ref<House[]>([]);

const verifyHouseToAdd = () => {
  let isHouseExist = false;
  selectedClient.value.contracts?.map((contract) => {
    const isHouseExistContracts = houseSelect.value.some((house) => {
      return house.id === contract.house?.id;
    });
    if (isHouseExistContracts) {
      resultInScreen.value = {
        success: false,
        message: "Hay una casa seleccionada que se encuentra actualmente asignada al cliente.",
      };
      step.value = 3;
      dialogAddHouseToClient.value = true;
      isHouseExist = true;
    }
  });

  if (isHouseExist) return;

  houseSelect.value.forEach((house) => {
    contractsToCreat.value.push({
      id_house: house.id,
      id_client: selectedClient.value.id,
      start_date: new Date().toISOString(),
      payday: 1,
      payday_due: 4,
      description: "",
      state: "ACTIVO",
      monthlyPayment: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      house: { ...house },
    });
  });

  console.log(houseSelect.value);
  console.log(contractsToCreat.value);

  step.value = 2;
};

const contractsToCreat = ref<Contract[]>([]);

const { fetchClients } = useClientsStore();
const contractsStore = useContractsStore();
const { contracts, loading, results } = storeToRefs(contractsStore);
const { createContracts, deleteContract } = contractsStore;

const createContractsToClient = async () => {
  if (contractsToCreat.value.length === 0) {
    resultInScreen.value = { success: false, message: "No hay casas para agregar al cliente." };
    step.value = 3;
    dialogAddHouseToClient.value = true;
    return;
  }

  const resultCreate = await createContracts(contractsToCreat.value);
  if (resultCreate.success) {
    resultInScreen.value = { success: true, message: "Casas agregadas correctamente al cliente." };
    step.value = 3;
    await fetchClients();
  } else {
    resultInScreen.value = { success: false, message: resultCreate.message };
    step.value = 3;
  }
};

watch(dialogAddHouseToClient, () => {
  step.value = 1;
});

/* Contracts edit and deleted */
const dialogContractsInfo = ref(false);
const isEditContracts = ref(false);
const selectContratToEdit = ref<Contract>({});

const openDialogContractsInfo = (contract: Contract) => {
  console.log(contract);
  dialogContractsInfo.value = true;
  selectContratToEdit.value = { ...contract };
};

const deletedContract = async (id: string | number) => {
  const result = await deleteContract(id);
  if (result.success) {
    resultInScreen.value = { success: true, message: "Contrato eliminado correctamente." };
    selectedClient.value.id = "";
    await fetchClients();
  } else {
    resultInScreen.value = { success: false, message: result.message };
  }
  step.value = 2;
};
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
          Cliente {{ selectedClient.id }} - Estado {{ selectedClient.state }}
        </v-toolbar-title>
        <v-btn
          class="me-2"
          :prepend-icon="mdiPlus"
          rounded="lg"
          text="Registrar un nuevo pago"
          color="secundary"
          variant="text"
          @click="AddNewPayment"
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
        <v-col cols="12" class="d-flex flex-column justify-end align-end">
          <v-text-field
            :model-value="
              selectedClient.contracts.map((e) => `ID: ${e.house?.id}; Dirección: ${e.house?.direction}`).join(' || ')
            "
            label="Casas asignadas"
            readonly
            width="100%"
          >
          </v-text-field>
          <v-btn
            width="400px"
            :prepend-icon="mdiHomeEdit"
            rounded="md"
            text="Agregar una casa al cliente"
            color="primary"
            @click="dialogAddHouseToClient = true"
          ></v-btn>
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
            <v-col cols="5.5">
              <v-text-field
                :label="`Fecha de pago oportuno del contrato ${contract.id}`"
                :model-value="numberToDate(contract.payday)"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="5.5">
              <v-text-field
                :label="`Fecha de vencimiento del pago del contrato ${contract.id}`"
                :model-value="numberToDate(contract.payday_due)"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn
                height="56px"
                class="me-2"
                :icon="mdiNewspaper"
                rounded="lg"
                color="success"
                variant="outlined"
                @click="openDialogContractsInfo(contract)"
              ></v-btn>
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
              <v-icon color="error" :icon="mdiCancel" size="small" @click="invalidPayment(item.id)"></v-icon>
            </template>
          </v-data-table-virtual>
        </v-col>
      </v-row>
    </v-col>

    <v-dialog v-model="dialog" max-width="700">
      <v-card subtitle="Generar un nuevo pago" title="Agregar un pago.">
        <template v-slot:text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12">
                  <v-alert type="info" variant="flat">
                    <div class="text-h6">Paso 1: Seleccionar el contrato</div>
                    <div class="text-body-2">Seleccione el contrato para el cual desea registrar un nuevo pago.</div>
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="selectedContract"
                    :items="selectedClient.contracts"
                    :item-props="itemProps"
                    label="Seleccione un contrato"
                    variant="filled"
                    density="compact"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn color="primary" @click="nexStep">Siguiente</v-btn>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12">
                  <v-alert type="info" variant="flat">
                    <div class="text-h6">Paso 2: Confirmar el pago</div>
                    <div class="text-body-2">
                      Confirme los detalles del pago antes de proceder. Asegúrese de que la información sea correcta.
                    </div>
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="ID del contrato" :model-value="selectedContract.id" readonly></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Dirección de la casa"
                    :model-value="selectedContract.house?.direction || 'N/A'"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Fecha de pago"
                    :model-value="numberToDate(selectedContract.payday)"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Fecha de vencimiento"
                    :model-value="numberToDate(selectedContract.payday_due)"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    :reverse="false"
                    controlVariant="default"
                    label="Pago mensual"
                    v-model="selectedPayment.monthly_payment"
                    :hideInput="false"
                    inset
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    :reverse="false"
                    controlVariant="default"
                    label="Pago de Reconexión"
                    v-model="selectedPayment.reconnection"
                    :hideInput="false"
                    inset
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    :reverse="false"
                    controlVariant="default"
                    label="Cargo por atraso/mora"
                    v-model="selectedPayment.late_fee"
                    :hideInput="false"
                    inset
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    :reverse="false"
                    controlVariant="default"
                    label="Pago de matrícula"
                    v-model="selectedPayment.enrollment"
                    :hideInput="false"
                    inset
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    :reverse="false"
                    controlVariant="default"
                    label="Abono"
                    v-model="selectedPayment.payments"
                    :hideInput="false"
                    inset
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    :reverse="false"
                    controlVariant="default"
                    label="Otros cargos"
                    v-model="selectedPayment.other_charges"
                    :hideInput="false"
                    inset
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    controlVariant="default"
                    label="Valor total del pago"
                    v-model="valueTotal"
                    :hideInput="false"
                    inset
                    readonly
                  ></v-number-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Descripción del pago"
                    v-model="selectedPayment.description"
                    variant="filled"
                    density="compact"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" :loading="cargando" @click="nexStep">Confirmar pago</v-btn>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="3">
              <v-row>
                <v-col cols="12">
                  <v-alert :type="resultInScreen.success ? 'success' : 'error'" variant="flat">
                    <div class="text-h6">{{ resultInScreen.success ? "Listo!" : "Error!" }}</div>
                    <div class="text-body-2">
                      {{ resultInScreen.message }}
                    </div>
                  </v-alert>
                </v-col>
                <v-col cols="3">
                  <v-btn color="primary" @click="nexStep">Continuar</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn color="secundary" @click="sendToDonwloadRecebit"> Descargar </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddHouseToClient" max-width="700">
      <v-card subtitle="Agregar una nueva casa" title="Se registrara un nuevo contrato por casa.">
        <template v-slot:text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12">
                  <v-alert type="info" variant="flat">
                    <div class="text-h6">Asignación de casa</div>
                    <div class="text-body-2">Seleccione la casa a asignar o cree una.</div>
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <ComboBoxHouses v-model="houseSelect" />
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" @click="verifyHouseToAdd">Continuar</v-btn>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12">
                  <v-form ref="formHouses">
                    <v-card
                      variant="text"
                      v-for="(item, index) in contractsToCreat"
                      :title="`${item.id_house === 'C-000' ? 'Casa no encontrada' : 'Casa'}: ${item.id_house}`"
                      :key="item.id"
                      class="mb-2"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="item.id_house"
                                label="Código de la casa"
                                :rules="[(v) => !!v || 'Este campo es obligatorio']"
                                disabled
                                :hint="
                                  item.id_house === 'C-000'
                                    ? 'C-000 no será el id de la casa, el id se asignara después de guardar el cliente'
                                    : `El id ${item.id_house} es el identificador de la casa para el cliente`
                                "
                                persistent-hint
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="item.house.direction"
                                label="Direccion"
                                :rules="[(v) => !!v || 'Este campo es obligatorio']"
                                :disabled="item.id_house !== 'C-000'"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="item.house.neighborhood"
                                label="barrio"
                                :rules="[(v) => !!v || 'Este campo es obligatorio']"
                                :disabled="item.id_house !== 'C-000'"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="item.house.description"
                                label="Descripción"
                                :disabled="item.id_house !== 'C-000'"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12">
                              <v-date-input
                                v-model="item.start_date"
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
                                v-model="item.payday"
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
                                v-model="item.payday_due"
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
                                v-model="item.monthlyPayment"
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
                                v-model="item.description"
                                label="Descripción del contrato"
                                :append-inner-icon="mdiPencil"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" @click="createContractsToClient"> Continuar </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="3">
              <v-row>
                <v-col cols="12">
                  <v-alert :type="resultInScreen.success ? 'success' : 'error'" variant="flat">
                    <div class="text-h6">{{ resultInScreen.success ? "Listo!" : "Error!" }}</div>
                    <div class="text-body-2">
                      {{ resultInScreen.message }}
                    </div>
                  </v-alert>
                </v-col>
                <v-col cols="3">
                  <v-btn color="primary" @click="dialogAddHouseToClient = false"> Aceptar </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogContractsInfo" max-width="700">
      <v-card subtitle="Información del contrato" title="Contrato asignado.">
        <template v-slot:text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12">
                  <v-alert :type="isEditContracts ? 'warning' : 'info'" variant="flat">
                    <div class="text-h6">Información del contrato</div>
                    <div class="text-body-2">Detalles del contrato seleccionado.</div>
                    <div v-if="!isEditContracts" class="text-body-2">
                      Para editar seleccione el botón de 'Editar cambios' en la parte de abajo.
                    </div>
                    <div v-else class="text-body-2">
                      Para guardar seleccione el botón de 'Guardar cambios' en la parte de abajo.
                    </div>
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="ID del contrato" :model-value="selectContratToEdit.id" readonly></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Dirección de la casa"
                    :model-value="selectContratToEdit.house.direction"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-date-input
                    prepend-icon=""
                    :prepend-inner-icon="mdiCalendar"
                    label="Fecha de inicio del contrato"
                    :model-value="selectContratToEdit.start_date"
                    :readonly="!isEditContracts"
                  >
                  </v-date-input>
                </v-col>
                <v-col cols="6">
                  <v-date-input
                    prepend-icon=""
                    :prepend-inner-icon="mdiCalendar"
                    label="Fecha de fin del contrato"
                    :model-value="selectContratToEdit.end_date"
                    :readonly="!isEditContracts"
                  >
                  </v-date-input>
                </v-col>
                <v-col cols="12">
                  <v-number-input
                    label="Pago mensualidad"
                    :model-value="selectContratToEdit.monthlyPayment"
                    :readonly="!isEditContracts"
                    prefix="$"
                  ></v-number-input>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    v-if="isEditContracts"
                    :max="28"
                    :min="1"
                    label="Fecha de pago"
                    :model-value="selectContratToEdit.payday"
                  >
                  </v-number-input>
                  <v-text-field
                    v-else
                    label="Fecha de pago"
                    :model-value="numberToDate(selectContratToEdit.payday)"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-number-input
                    v-if="isEditContracts"
                    :max="28"
                    :min="1"
                    label="Fecha de vencimiento"
                    :model-value="selectContratToEdit.payday_due"
                  ></v-number-input>
                  <v-text-field
                    v-else
                    label="Fecha de vencimiento"
                    :model-value="numberToDate(selectContratToEdit.payday_due)"
                    :readonly="!isEditContracts"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Descripción del contrato"
                    :model-value="selectContratToEdit.description"
                    :readonly="!isEditContracts"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" class="d-flex justify-end">
                  <v-btn v-if="!isEditContracts" color="primary" @click="isEditContracts = true">
                    Editar contrato
                  </v-btn>
                  <v-btn :loading="loading" v-else color="success" @click="isEditContracts = false">
                    Guardar cambios
                  </v-btn>
                </v-col>
                <v-col cols="4" class="d-flex justify-end">
                  <v-btn :loading="loading" color="error" @click="deletedContract(selectContratToEdit.id)">
                    Borrar contrato
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12">
                  <v-alert :type="resultInScreen.success ? 'success' : 'error'" variant="flat">
                    <div class="text-h6">{{ resultInScreen.success ? "Listo!" : "Error!" }}</div>
                    <div class="text-body-2">
                      {{ resultInScreen.message }}
                    </div>
                  </v-alert>
                </v-col>
                <v-col cols="3">
                  <v-btn
                    color="primary"
                    @click="
                      step = 1;
                      dialogContractsInfo = false;
                    "
                  >
                    Aceptar
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </template>
      </v-card>
    </v-dialog>
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
