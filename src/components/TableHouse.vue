<script setup lang="ts">
import { mdiAccountMultiple, mdiHomeEdit, mdiMagnify, mdiPlus } from "@mdi/js";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { House } from "../models/houses";
import { useHousesStore } from "../stores/house";

const storeHouses = useHousesStore();
const { cargando, houses, pageLength } = storeToRefs(storeHouses);
const { fetchHouses } = storeHouses;

const DEFAULT_HOUSE: House = {
  id: "",
  direction: "",
  colorChip: "",
  description: "",
  neighborhood: "",
  created_at: "",
  updated_at: "",
};

const houseSelect = defineModel<House>({
  default: () => ({}),
  required: true,
  type: Object as House,
});

const headers = ref([
  { title: "id", key: "id", align: "start", sortable: true },
  { title: "Dirección", key: "direction", align: "end" },
  { title: "Color", key: "colorChip", align: "end" },
  { title: "Barrio", key: "neighborhood", align: "end" },
  { title: "Descripción", key: "description", align: "end" },
  { title: "Fecha de creación", key: "created_at", align: "end" },
  { title: "Fecha de última actualización", key: "created_at", align: "end" },
  { title: "", key: "actions", align: "end" },
]);

const page = ref(1);
const direction = ref("");
const search = ref("");

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

function reset() {
  houseSelect.value = { ...DEFAULT_HOUSE };
}

function loadItems(options: any) {
  console.log(options);
  // fetchHouses({ page, itemsPerPage, sortBy, sortDesc });
  reset();
  fetchHouses();
}
</script>

<template>
  <v-data-table-server
    v-model:page="page"
    :headers="headers"
    :items="houses"
    :loading="cargando"
    :items-per-page="5"
    :search="search"
    no-data-text="No hay casas registradas"
    items-length="5"
    loading-text="Cargando clientes..."
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
        <td :colspan="headers.length">
          <v-row no-gutters dense>
            <v-col cols="3">
              <v-text-field
                v-model="direction"
                class="ma-2"
                density="compact"
                placeholder="Buscar por dirección"
                type="text"
                variant="outlined"
                :prepend-inner-icon="mdiMagnify"
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
