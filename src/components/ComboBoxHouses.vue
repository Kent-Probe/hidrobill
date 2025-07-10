<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { debounce } from "vuetify/lib/util/helpers.mjs";
import { House } from "../models/houses";
import { useHousesStore } from "../stores/house";
const paletteColors = [
  "amber",
  "blue",
  "blue-grey",
  "brown",
  "cyan",
  "deep-orange",
  "deep-purple",
  "green",
  "grey",
  "indigo",
  "light-blue",
  "light-green",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
];
const editingItem = ref(null);

const storeHouses = useHousesStore();
const { cargando, housesLimities } = storeToRefs(storeHouses);
const { searchHouses } = storeHouses;

const model = defineModel<House[]>({ required: true, type: Array, default: () => [] });
const search = ref(null);

watch(model, (val, prev) => {
  if (val.length === prev.length) return;

  model.value = val.map((v) => {
    if (typeof v === "string") {
      v = {
        id: "C-000",
        direction: v,
        colorChip: paletteColors[Math.floor(Math.random() * paletteColors.length)],
        neighborhood: "",
      };
    }
    return v;
  });
});

onMounted(() => {
  searchHouseFunction("");
});

function removeSelection(index) {
  const newModel = [...model.value];
  newModel.splice(index, 1);
  model.value = newModel;
}

function searchHouseFunction(query) {
  searchHouses(query || "", true);
}

const debouncedFetch = debounce(searchHouseFunction, 300);
</script>

<template>
  <v-combobox
    v-model="model"
    v-model:search="search"
    :loading="cargando"
    :items="housesLimities"
    filter-mode="some"
    item-value="direction"
    item-title="id"
    label="Busca la casa o crea una nueva"
    variant="filled"
    hide-selected
    multiple
    no-filter
    @update:search="debouncedFetch"
    @update:model-value="model = $event"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.raw.colorChip}-lighten-3`"
        :text="item.raw.direction"
        size="small"
        variant="flat"
        closable
        label
        @click:close="removeSelection(index)"
      ></v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-if="item.raw.header && search">
        <span class="mr-3">Crea:</span>
        <v-chip
          :color="`${paletteColors[Math.floor(Math.random() * paletteColors.length)]}-lighten-3`"
          size="small"
          variant="flat"
          label
        >
          {{ search }}
        </v-chip>
      </v-list-item>
      <v-list-subheader v-else-if="item.raw.header" :title="item.raw.id"></v-list-subheader>
      <v-list-item v-else @click="props.onClick">
        <v-chip
          :color="`${item.raw.colorChip}-lighten-3`"
          :text="item.raw.id + ' - ' + item.raw.direction"
          variant="flat"
          label
        ></v-chip>
      </v-list-item>
    </template>
  </v-combobox>
</template>
