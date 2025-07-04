<script setup lang="ts">
import { mdiAccountMultiple, mdiHomeEdit, mdiPlus } from "@mdi/js";
import { ref, watch } from "vue";
import { House } from "../models/houses";

const DEFAULT_HOUSE: House = {
  id: "",
  direction: "",
  colorChip: "",
  barrio: "",
  description: "",
};

const houseSelect = defineModel<House>({
  default: () => ({}),
  required: true,
  type: Object as House,
});

const house: House[] = [
  {
    id: "1",
    direction: "Calle 123 #45-67",
    colorChip: "yellow",
    barrio: "Centro",
    description: "Casa de dos pisos con patio amplio",
  },
  {
    id: "2",
    direction: "Carrera 8 #12-34",
    colorChip: "teal",
    barrio: "Norte",
    description: "Apartamento moderno con balcón",
  },
  {
    id: "3",
    direction: "Avenida 15 #78-90",
    colorChip: "red",
    barrio: "Sur",
    description: "Casa familiar con jardín frontal",
  },
  {
    id: "4",
    direction: "Diagonal 20 #56-78",
    colorChip: "purple",
    barrio: "Oriente",
    description: "Duplex con terraza y garaje",
  },
  {
    id: "5",
    direction: "Transversal 5 #23-45",
    colorChip: "pink",
    barrio: "Occidente",
    description: "Casa esquinera con local comercial",
  },
  {
    id: "6",
    direction: "Calle 67 #89-12",
    colorChip: "orange",
    barrio: "Centro",
    description: "Edificio de apartamentos, piso 3",
  },
  {
    id: "7",
    direction: "Carrera 45 #34-56",
    colorChip: "lime",
    barrio: "Norte",
    description: "Casa con piscina y zona BBQ",
  },
  {
    id: "8",
    direction: "Avenida 30 #78-90",
    colorChip: "light-green",
    barrio: "Sur",
    description: "Townhouse en conjunto cerrado",
  },
  {
    id: "9",
    direction: "Diagonal 12 #23-45",
    colorChip: "light-blue",
    barrio: "Oriente",
    description: "Casa colonial restaurada",
  },
  {
    id: "10",
    direction: "Transversal 18 #67-89",
    colorChip: "indigo",
    barrio: "Occidente",
    description: "Apartamento estudio amoblado",
  },
  {
    id: "11",
    direction: "Calle 90 #12-34",
    colorChip: "grey",
    barrio: "Centro",
    description: "Penthouse con vista panorámica",
  },
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = house.slice().filter((item) => {
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
const headers = ref([
  { title: "id", key: "id", align: "start", sortable: true },
  { title: "Dirección", key: "direction", align: "end" },
  { title: "Color", key: "colorChip", align: "end" },
  { title: "Barrio", key: "barrio", align: "end" },
  { title: "Descripción", key: "description", align: "end" },
  { title: "", key: "actions", align: "end" },
]);
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

function SelectItem(item: House) {
  if (item) {
    houseSelect.value = item;
  } else {
    houseSelect.value = { ...DEFAULT_HOUSE };
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
        <td>
          <v-text-field
            v-model="direction"
            class="ma-2"
            density="compact"
            placeholder="Minimum direction"
            type="number"
            hide-details
          ></v-text-field>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>
