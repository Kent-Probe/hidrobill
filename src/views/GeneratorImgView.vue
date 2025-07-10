<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import GeneratorImage from "../components/GeneratorImage.vue";
import { usePaymetsStore } from "../stores/pagos";
// const contractInfo = ref(null);
// const paymentInfo = ref(null);
// const clientName = ref("");
const router = useRouter();
const storePayments = usePaymetsStore();
const { cargando, pago, result } = storeToRefs(storePayments);
const { fetchPaymentWithDetails } = storePayments;

onMounted(async () => {
  if (!router.currentRoute.value.params) {
    router.back();
  }
  const paymentResult = await fetchPaymentWithDetails(router.currentRoute.value.params.id);
  if (!paymentResult) {
    router.back();
  }
});
</script>

<template>
  <v-skeleton-loader v-if="cargando" type="card"></v-skeleton-loader>
  <!-- ... tu otro contenido ... -->
  <GeneratorImage v-model="pago" v-else />
  <!-- ... -->
</template>
