<script setup>
import { useRouter } from "vue-router";
import {
  cart,
  deleteProductFromCart,
  updateQuantityOfProduct,
  cartTotal,
  cartTotalQuantity,
} from "@/composables/cart";
import { roundUpPrice } from "@/utils/utils";
import PriceQuantityDisplay from "@/components/PriceQuantityDisplay.vue";
import { computed } from "vue";
import { hideCartOnRoutes } from "@/composables/cart";
import { useRoute } from "vue-router";
import CartItem from "@/components/CartItem.vue";

const route = useRoute();

const router = useRouter();

const model = defineModel();
const props = defineProps(["location"]);
</script>

<template>
  <v-navigation-drawer
    v-model="model"
    :location="props.location"
    :width="400"
    v-if="!hideCartOnRoutes.includes(route.path)"
  >
    <v-list-item title="Your Cart"></v-list-item>

    <v-divider></v-divider>

    <v-list
      v-for="item in cart"
      :key="item.product.id"
      class="overflow-y-scroll"
    >
      <CartItem :cartItem="item" />
      <v-divider class="ma-5" />
    </v-list>
    <template v-slot:append v-if="cartTotalQuantity > 0">
      <!-- PriceComponent -->
      <PriceQuantityDisplay />
      <div class="px-6 pb-6">
        <v-btn
          block
          prepend-icon="mdi-pencil"
          :ripple="false"
          size="large"
          variant="outlined"
          @click="updateQuantityOfProduct()"
        >
          Update Cart
        </v-btn>
      </div>
      <div class="px-6 pb-6">
        <v-btn
          block
          append-icon="mdi-arrow-right"
          :ripple="false"
          color="black"
          size="large"
          @click="router.push({ name: 'Checkout' })"
        >
          Proceed to Checkout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>