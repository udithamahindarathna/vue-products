<script setup>
import { cartTotalQuantity, cartTotal } from "@/composables/cart";
import { roundUpPrice } from "@/utils/utils";
</script>
<template>
  <div class="d-flex pa-6 justify-space-between font-weight-bold">
    <p>Quantity</p>
    <p>{{ cartTotalQuantity }}</p>
  </div>
  <div class="d-flex px-6 pb-6 justify-space-between font-weight-bold">
    <p>Total</p>
    <p>$ {{ roundUpPrice(cartTotal) }}</p>
  </div>
</template>