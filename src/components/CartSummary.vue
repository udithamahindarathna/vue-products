<script setup>
import { cart, getItemTotalValue } from "@/composables/cart"
import PriceQuantityDisplay from "@/components/PriceQuantityDisplay.vue"

</script>

<template>
    <v-card class="d-flex flex-column ga-2 pa-4">
    <v-card-title>Order Summary</v-card-title>
    <v-card-subtitle>review your order</v-card-subtitle>
    <v-divider />
    <v-list v-for="item in cart" :key="item.id">
        <v-list-item>
        <template v-slot:prepend>
          <v-avatar>
            <v-img :src="item.product.thumbnail"></v-img>
          </v-avatar>
        </template>

        <v-list-item-title>{{ item.product.title }}</v-list-item-title>
        <v-list-item-subtitle>QTY: {{ item.quantity }}</v-list-item-subtitle>

        <template v-slot:append>
          ${{ getItemTotalValue(item.product.price, item.quantity) }}
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <PriceQuantityDisplay />
  </v-card>
</template>