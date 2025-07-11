<script setup>
import { mdiContentSave, mdiDirections, mdiHomeAlert, mdiHomeGroup, mdiIdentifier, mdiImageText } from "@mdi/js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import TableHouse from "../components/TableHouse.vue";
import { paletteColors } from "../services/colors/paletteColors";
import { useHousesStore } from "../stores/house";

const houseStore = useHousesStore();
const { cargando, result } = storeToRefs(houseStore);
const { updateHouse } = houseStore;
const open = ref(false);

const houseSelect = ref({
  id: "",
  direction: "",
  colorChip: "",
  neighborhood: "",
  description: "",
});

async function saveChanges() {
  await updateHouse(houseSelect.value);
  open.value = true;
}
</script>

<template>
  <v-row no-gutter>
    <v-alert
      v-model="open"
      style="bottom: 20px; right: 20px"
      closable
      :title="result.success ? 'Éxito' : 'Error'"
      :text="result.message"
      :type="result.success ? 'success' : 'error'"
      width="500"
      position="absolute"
      location="bottom right"
    ></v-alert>

    <v-col cols="12" class="pa-4">
      <TableHouse v-model="houseSelect" />
    </v-col>

    <v-col v-if="houseSelect.id !== ''" cols="12">
      <v-card class="pa-4" variant="plain">
        <v-row dense>
          <v-col cols="12">
            <v-card-title>Casa seleccionada</v-card-title>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="houseSelect.id"
              label="ID"
              :prepend-inner-icon="mdiIdentifier"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="houseSelect.direction"
              label="Dirección"
              :prepend-inner-icon="mdiDirections"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="houseSelect.description"
              label="Descripción"
              :prepend-inner-icon="mdiImageText"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="houseSelect.neighborhood"
              label="Barrio"
              :prepend-inner-icon="mdiHomeGroup"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select label="Color del chip" v-model="houseSelect.colorChip" :items="paletteColors">
              <template v-slot:selection="{ item }">
                <v-chip :color="`${item.value}-lighten-3`" size="small" variant="flat" label>
                  {{ item.value }}
                </v-chip>
              </template>

              <template v-slot:item="{ item, props }">
                <v-list-item @click="props.onClick">
                  <v-chip :color="`${item.value}-lighten-3`" :text="item.raw" variant="flat" label></v-chip>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" class="text-right">
            <v-btn
              color="success"
              :prepend-icon="mdiContentSave"
              variant="elevated"
              size="large"
              text="Guardar cambios"
              :loading="cargando"
              @click="saveChanges"
            >
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col v-else cols="12">
      <v-empty-state>
        <template v-slot:media>
          <v-icon color="surface-variant" :icon="mdiHomeAlert"></v-icon>
        </template>

        <template v-slot:headline>
          <div class="text-h4">No hay una casa seleccionada</div>
        </template>

        <template v-slot:title>
          <div class="text-h6">Para continuar seleccione una casa.</div>
        </template>

        <template v-slot:text>
          <p class="text-medium-emphasis text-caption">
            Para seleccionar una casa, use el mouse para hacer clic en el icono del lápiz en la casa deseada de la lista
            de casas registradas.
          </p>
        </template>
      </v-empty-state>
    </v-col>
  </v-row>
</template>
