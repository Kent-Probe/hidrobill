<script setup lang="ts">
import { mdiPencil } from "@mdi/js";
import { ref, watch } from "vue";
import { House } from "../models/houses";

const colorChips = [
  "green",
  "purple",
  "indigo",
  "cyan",
  "teal",
  "orange",
  "pink",
  "amber",
  "lime",
  "blue",
  "red",
  "deep-orange",
];

const editingItem = ref(null);
const items = ref([
  { header: true, id: "Selecciona o crea una casa" },
  { id: "C-101", direction: "Carrera 10 100a 15", colorChip: "green", barrio: "Unidos", description: "Casa colorida" },
  {
    id: "C-102",
    direction: "Carrera 10 100b 15",
    colorChip: "purple",
    barrio: "Unidos",
    description: "Casa de la izuqierda al banco",
  },
  {
    id: "C-103",
    direction: "Carrera 10 100c 15",
    colorChip: "indigo",
    barrio: "Unidos",
    description: "Casa ahi mas o menos",
  },
  {
    id: "C-104",
    direction: "Carrera 10 100d 15",
    colorChip: "cyan",
    barrio: "Unidos",
    description: "Casa del romance",
  },
  { id: "C-105", direction: "Carrera 10 100e 15", colorChip: "teal", barrio: "Unidos", description: "" },
  {
    id: "C-106",
    direction: "Carrera 10 100f 15",
    colorChip: "orange",
    barrio: "Unidos",
    description: "Desenlace del guion",
  },
  {
    id: "C-107",
    direction: "Carrera 10 100g 15",
    colorChip: "pink",
    barrio: "Unidos",
    description: "Te gusto sebtirte la antagonista",
  },
  {
    id: "C-190",
    direction: "Calle 10 100B",
    colorChip: "blue",
    barrio: "Unidos",
    description: "Como se sintio perder al protagonista",
  },
  {
    id: "C-302",
    direction: "Carrera 100 16a 15",
    colorChip: "red",
    barrio: "Unidos",
    description: "La verdad desepcion",
  },
]);
const nonce = ref(1);
const model = defineModel<House[]>({ required: true, type: Array, default: () => [] });
const search = ref(null);

watch(model, (val, prev) => {
  if (val.length === prev.length) return;

  model.value = val.map((v) => {
    if (typeof v === "string") {
      v = {
        id: "C-000",
        direction: v,
        colorChip: colorChips[nonce.value - 1],
      };

      items.value.push(v);
      if (nonce.value >= colorChips.length) nonce.value = 0;
      nonce.value++;
    }

    return v;
  });
});

function edit(item) {
  if (!editingItem.value) {
    editingItem.value = item;
  } else {
    editingItem.value = null;
  }
}

function filter(value, queryText, item) {
  const toLowerCaseString = (val) => String(val != null ? val : "").toLowerCase();

  const query = toLowerCaseString(queryText);

  const availableOptions = items.value.filter((x) => !model.value.includes(x));
  const hasAnyMatch = availableOptions.some((x) => !x.header && toLowerCaseString(x.id + x.direction).includes(query));
  if (item.raw.header) return !hasAnyMatch;

  const text = toLowerCaseString(item.raw.id + item.raw.direction);

  return text.includes(query);
}

function removeSelection(index) {
  const newModel = [...model.value];
  newModel.splice(index, 1);
  model.value = newModel;
}
</script>

<template>
  <v-combobox
    v-model="model"
    v-model:search="search"
    :custom-filter="filter"
    :items="items"
    item-value="direction"
    item-title="id"
    label="Busca la casa o crea una nueva"
    variant="filled"
    hide-selected
    multiple
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
        <v-chip :color="`${colorChips[nonce - 1]}-lighten-3`" size="small" variant="flat" label>
          {{ search }}
        </v-chip>
      </v-list-item>
      <v-list-subheader v-else-if="item.raw.header" :title="item.raw.id"></v-list-subheader>
      <v-list-item v-else @click="props.onClick">
        <v-text-field
          v-if="editingItem === item"
          v-model="editingItem.id"
          bg-color="transparent"
          class="mr-3"
          density="compact"
          variant="plain"
          autofocus
          hide-details
          @click.stop
          @keydown.stop
          @keyup.enter="edit(item)"
        ></v-text-field>
        <v-chip
          v-else
          :color="`${item.raw.colorChip}-lighten-3`"
          :text="item.raw.id + ' - ' + item.raw.direction"
          variant="flat"
          label
        ></v-chip>
        <template v-slot:append>
          <v-btn
            :color="editingItem !== item ? 'primary' : 'success'"
            :icon="editingItem !== item ? mdiPencil : mdiCheck"
            size="small"
            variant="text"
            @click.stop.prevent="edit(item)"
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-combobox>
</template>
