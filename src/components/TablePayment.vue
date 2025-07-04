<script setup lang="ts">
import { mdiAccountMultiple, mdiHomeEdit, mdiMagnify, mdiPlus } from "@mdi/js";
import { ref, watch } from "vue";
import { formatDate, formatPrice } from "../utilities/format";

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

const payment: Payment[] = [];
for (let i = 1; i <= 11; i++) {
  payment.push({
    id: `PAY-${i.toString().padStart(3, "0")}`,
    id_contrato: `CONT-${i.toString().padStart(3, "0")}`,
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    valueTotal: Math.floor(Math.random() * 500000) + 50000,
    remaining_debt: Math.floor(Math.random() * 200000),
    reconnection: Math.floor(Math.random() * 50000),
    enrollment: Math.floor(Math.random() * 30000) + 10000,
    monthly_payment: Math.floor(Math.random() * 80000) + 20000,
    payments: Math.floor(Math.random() * 5) + 1,
    late_fee: Math.floor(Math.random() * 15000),
    other_charges: Math.floor(Math.random() * 10000),
    paymentState: ["PAGADO", "PENDIENTE", "ANULADO"][Math.floor(Math.random() * 3)] as
      | "PAGADO"
      | "PENDIENTE"
      | "ANULADO",
    description: `Pago mensual de servicio de agua - ${i}`,
  });
}

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = payment.slice().filter((item) => {
          if (search.direction && search.direction !== "") {
            return false;
          }
          return true;
        });
        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }
        const paginated = items.slice(start, end === -1 ? undefined : end);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

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
  { title: "Valor total", key: "valueTotal", align: "end", value: (val) => formatPrice(val.valueTotal) },
  { title: "Abono", key: "payments", align: "end", value: (val) => formatPrice(val.payments) },
  { title: "Cargo por pago atrasado", key: "late_fee", align: "end", value: (val) => formatPrice(val.late_fee) },
  { title: "Otros cargos", key: "other_charges", align: "end", value: (val) => formatPrice(val.other_charges) },
  { title: "Descripción", key: "description", align: "end" },
  { title: "Estado", key: "paymentState", align: "end" },
  { title: "", key: "actions", align: "end" },
];

const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const direction = ref("");
const search = ref("");

function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy, search: { direction: direction.value } }).then(({ items, total }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
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
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    no-data-text="No hay casas registradas"
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

        <v-btn
          class="me-2"
          :prepend-icon="mdiPlus"
          rounded="lg"
          text="Agregar una nueva casa"
          border
          variant="text"
        ></v-btn>
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
                v-model="idPayment"
                class="ma-2"
                label="Código de pago"
                type="text"
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                :prepend-inner-icon="mdiMagnify"
                v-model="idClient"
                class="ma-2"
                label="Número de documento cliente"
                type="text"
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>
