<script setup>
import { toRef } from "vue";
import { addToCart, extractProductForCart } from "@/composables/cart";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const product = toRef(props, "product");
</script>

<template>
  <v-card class="d-flex flex-column ga-2">
    <v-img :src="product.thumbnail" aspect-ratio="1" cover />
    <div
      class="d-flex flex-column justify-start align-start overflow-hidden ga-3 pa-2"
    >
      <router-link
        :key="product.id"
        :to="{ name: 'Singleproduct', params: { id: product.id } }"
        class="text-black text-decoration-none"
      >
        <v-card-subtitle>
          <v-rating
            :model-value="product.rating"
            readonly
            small
            dense
            background-color="orange"
            color="orange"
            :size="25"
          />
        </v-card-subtitle>
        <v-card-title class="text-body-2">
          {{ product.title }}
        </v-card-title>
        <v-card-text>
          <p class="text-h6 font-weight-bold">${{ product.price }}</p>
        </v-card-text>
      </router-link>
      <v-btn
        class="w-100"
        prepend-icon="mdi-cart"
        size="large"
        :ripple="false"
        color="black"
        @click="addToCart(extractProductForCart(product), 1)"
        >Add to Cart</v-btn
      >
    </div>
  </v-card>
</template>