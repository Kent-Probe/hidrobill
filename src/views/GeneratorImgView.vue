<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import GeneratorImage from "../components/GeneratorImage.vue";
import { usePaymetsStore } from "../stores/pagos";

const router = useRouter();
const storePayments = usePaymetsStore();
const { cargando, pago } = storeToRefs(storePayments);
const { fetchPaymentWithDetails } = storePayments;

onMounted(async () => {
  const paymentId = router.currentRoute.value.params.id as string;

  if (!paymentId) {
    router.back();
    return;
  }

  const success = await fetchPaymentWithDetails(paymentId);

  if (!success) {
    console.error("No se pudo cargar el pago, redirigiendo.");
    router.back();
  }
});
</script>

<template>
  <v-skeleton-loader v-if="cargando || !pago" type="card"></v-skeleton-loader>
  <GeneratorImage v-else v-model="pago" />
</template>
