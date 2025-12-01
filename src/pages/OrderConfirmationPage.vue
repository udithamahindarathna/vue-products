<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiClient } from "@/utils/apiClient.js";
import Review from "@/components/Review.vue";
import { roundUpPrice, formatDateforDisplay } from "@/utils/utils";
import { getItemTotalValue } from "@/composables/cart";

const router = useRouter();

const order = ref(null);

onBeforeMount(() => {
  order.value = history.state.order;

  console.log(order.value);

  if (!order) {
    router.replace({ name: "Home" });
    return;
  }
});

const handleClose = () => {
  order.value = null;
  router.replace({ name: "Home" });
  return;
};
</script>


<template>
  <v-card class="w-75 d-flex flex-column ga-2 pa-4 mx-auto" v-if="order">
    <v-card-title class="text-center">
      <v-icon
        color="green-darken-2"
        size="x-large"
        icon="mdi-check-circle"
      ></v-icon>
      Order Confirmed: <strong>{{ order.orderId }}</strong></v-card-title
    >
    <v-card-subtitle class="text-center"
      >your order is was confirmed on
      {{ formatDateforDisplay(order.createdAt) }} , we will dispatch it
      soon</v-card-subtitle
    >
    <v-divider />

    <div class="text-center">
      <h5>Delivery Details:</h5>

      <p>{{ order.name }}</p>
      <p>{{ order.address }}</p>
      <p>{{ order.email }}</p>
      <p>{{ order.phone }}</p>
    </div>

    <v-divider />
    <v-list v-for="product in order.products" :key="product.id">
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar>
            <v-img :src="product.image"></v-img>
          </v-avatar>
        </template>

        <v-list-item-title>{{ product.title }}</v-list-item-title>
        <v-list-item-subtitle>QTY: {{ product.quantity }}</v-list-item-subtitle>

        <template v-slot:append>
          ${{ getItemTotalValue(product.price, product.quantity) }}
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <div class="d-flex px-6 pb-6 justify-space-between font-weight-bold">
      <p>Total</p>
      <p>$ {{ roundUpPrice(order.totalAmount) }}</p>
    </div>
  </v-card>

  <div class="w-100 d-flex justify-center">
    <v-btn
      class="mt-2"
      prepend-icon="mdi-home"
      size="large"
      :ripple="false"
      color="black"
      @click="handleClose"
      >Return to home</v-btn
    >
  </div>
</template>