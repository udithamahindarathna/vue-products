<script setup>
import { toRef } from "vue";
import { getItemTotalValue, deleteProductFromCart } from "@/composables/cart";
import { roundUpPrice } from "@/utils/utils";

const props = defineProps({
  cartItem: {
    type: Object,
    required: true,
  },
});
const cartItem = toRef(props, "cartItem");
</script>

<template>
  <v-row>
    <v-col cols="4">
      <v-img :src="cartItem.product.thumbnail" max-width="100" />
    </v-col>
    <v-col class="d-flex flex-column pa-3 ga-2">
      <p class="font-weight-bold">{{ cartItem.product.title }}</p>
      <p>
        ${{
          roundUpPrice(
            getItemTotalValue(cartItem.product.price, cartItem.quantity)
          )
        }}
      </p>
      <v-number-input
        class="align-self-start"
        control-variant="split"
        :min="0"
        v-model="cartItem.quantity"
      ></v-number-input>

      <div class="d-flex ga-2">
        <v-btn
          class="align-self-start"
          prepend-icon="mdi-delete-forever-outline"
          :ripple="false"
          color="red"
          @click="deleteProductFromCart(cartItem.product.id)"
          >Remove</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>