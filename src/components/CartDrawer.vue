<script setup>
const model = defineModel();
const props = defineProps(["location"]);
import { cart, deleteProductFromCart } from "@/utils/cart";
</script>

<template>
  <v-navigation-drawer v-model="model" :location="props.location" :width="400">
    <v-list-item title="Your Cart"></v-list-item>

    <v-divider></v-divider>

    <v-list v-for="item in cart" :key="item.product.id">
      <v-row>
        <v-col cols="4">
          <v-img :src="item.product.thumbnail" max-width="100" />
        </v-col>
        <v-col class="d-flex flex-column pa-3 ga-2">
          <p class="font-weight-bold">{{ item.product.title }}</p>
          <p class="font-weight-bold">QTY: {{ item.quantity }}</p>
          <v-btn
            class="align-self-start"
            prepend-icon="mdi-delete-forever-outline"
            :ripple="false"
            color="red"
            @click="deleteProductFromCart(item.product.id)"
            >Remove</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="ma-5" />
    </v-list>
  </v-navigation-drawer>
</template>