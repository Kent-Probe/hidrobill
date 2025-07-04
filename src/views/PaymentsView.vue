<script setup lang="ts">
import { ref } from "vue";
import TablePayments from "../components/TablePayment.vue";
import { Payment } from "../models/payments";
const PaymentSelect = ref<Payment>({
  id: "",
  date: "",
  description: "",
  enrollment: 0,
  id_contrato: "",
  late_fee: 0,
  monthly_payment: 0,
  other_charges: 0,
  payments: 0,
  paymentState: "",
  paymentType: "",
  reconnection: 0,
  valueTotal: 0,
  remaining_debt: 0,
});
</script>

<template>
  <v-row>
    <v-col cols="12" class="pa-4">
      <TablePayments v-model="PaymentSelect" />
    </v-col>
  </v-row>
</template>
