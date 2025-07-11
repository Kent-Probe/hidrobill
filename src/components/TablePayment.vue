<script setup lang="ts">
import { mdiAccountMultiple, mdiHomeEdit, mdiMagnify } from "@mdi/js";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { usePaymetsStore } from "../stores/pagos";
import { formatDate, formatPrice } from "../utilities/format";

const storePayments = usePaymetsStore();
const { cargando, pagos, pageLength, result } = storeToRefs(storePayments);
const { fetchPayments, updatePaymentStatus } = storePayments;
const page = ref(1);

const DEFAULT_PAYMENT: Payment = {
  id: "",
  direction: "",
  colorChip: "",
  barrio: "",
  description: "",
};

const paymentSelect = defineModel<Payment>({
  default: () => ({}),
  required: true,
  type: Object as Payment,
});

const idPayment = ref("");
const idClient = ref("");

const itemsPerPage = ref(5);

const headers = [
  { title: "id", key: "id", align: "start", sortable: true, maxWidth: "100px", width: "100px", minWidth: "100px" },
  {
    title: "Fecha",
    key: "date",
    align: "end",
    value: (val) => formatDate(val.date),
    maxWidth: "200px",
    width: "200px",
    minWidth: "200px",
  },
  { title: "Reconexión", key: "monthly_payment", align: "end", value: (val) => formatPrice(val.monthly_payment) },
  { title: "Reconexión", key: "reconnection", align: "end", value: (val) => formatPrice(val.reconnection) },
  { title: "Deuda restante", key: "remaining_debt", align: "end", value: (val) => formatPrice(val.remaining_debt) },
  { title: "Matrícula", key: "enrollment", align: "end", value: (val) => formatPrice(val.enrollment) },
  { title: "Valor total", key: "value_total", align: "end", value: (val) => formatPrice(val.valueTotal) },
  { title: "Abono", key: "payments", align: "end", value: (val) => formatPrice(val.payments) },
  { title: "Cargo por pago atrasado", key: "late_fee", align: "end", value: (val) => formatPrice(val.late_fee) },
  { title: "Otros cargos", key: "other_charges", align: "end", value: (val) => formatPrice(val.other_charges) },
  { title: "Descripción", key: "description", align: "end" },
  { title: "Estado", key: "payment_state", align: "end" },
  { title: "", key: "actions", align: "end" },
];

const serverItems = ref([]);
const totalItems = ref(0);
const direction = ref("");
const search = ref("");

function loadItems(value) {
  fetchPayments();
}

watch(direction, () => {
  search.value = String(Date.now());
});

function SelectItem(item: Payment) {
  if (item) {
    paymentSelect.value = item;
  } else {
    paymentSelect.value = { ...DEFAULT_PAYMENT };
  }
}

async function alterPStatePaymemt(id: string, newStatus: string) {
  const result = await updatePaymentStatus(id, newStatus);
}
</script>

<template>
  <v-data-table-server
    :headers="headers"
    :items="pagos"
    :loading="cargando"
    :search="search"
    :items-length="pageLength"
    no-data-text="No hay pagos registradas"
    item-value="id"
    fixed-header
    hover
    @update:options="loadItems"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon color="medium-emphasis" :icon="mdiAccountMultiple" size="x-small" start></v-icon>
          Casas registrados
        </v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.id="{ value }">
      <v-chip :text="value" size="small" variant="flat"></v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-icon
              v-bind="props"
              :color="isHovering ? 'primary' : 'success'"
              :icon="mdiHomeEdit"
              size="small"
              @click="SelectItem(item)"
            ></v-icon>
          </template>
        </v-hover>
      </div>
    </template>
    <template v-slot:tfoot>
      <tr>
        <td :colspan="headers.length">
          <v-row no-gutters dense>
            <v-col cols="3">
              <v-text-field
                :prepend-inner-icon="mdiMagnify"
                v-model="idClient"
                class="ma-2"
                density="compact"
                placeholder="Número de documento cliente"
                type="text"
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageLength" total-visible="5"></v-pagination>
      </div>
    </template>
  </v-data-table-server>
</template>
