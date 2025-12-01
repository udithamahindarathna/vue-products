<script setup>
import { cart, getItemTotalValue } from "@/composables/cart";
import PriceQuantityDisplay from "@/components/PriceQuantityDisplay.vue";
import { onBeforeMount, reactive } from "vue";
import {
  formData,
  formRules,
  isFormValid,
  handleSumbit,
  isFormSubmitting,
  errors,
} from "@/composables/checkoutForm";
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(() => {
  formData.products = cart.map((item) => {
    return {
      id: String(item.product.id),
      image: item.product.thumbnail,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
    };
  });
});
</script>

<template>
  <v-card class="d-flex flex-column ga-2 pa-4">
    <v-card-title>Checkout</v-card-title>
    <v-card-subtitle>Enter you details to complete the order</v-card-subtitle>
    <v-divider />
    <v-form
      v-model="isFormValid"
      @submit.prevent="handleSumbit(router)"
      class="d-flex flex-column ga-4"
    >
      <div v-for="(error, index) in errors" :key="index">
        <v-alert :text="error" type="error"></v-alert>
      </div>

      <v-text-field
        v-model="formData.name"
        :rules="formRules.name"
        label="Name"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        :rules="formRules.email"
        label="Email"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="formData.phone"
        :rules="formRules.phone"
        label="Phone"
        variant="outlined"
      ></v-text-field>
      <v-textarea
        v-model="formData.address"
        :rules="formRules.address"
        label="Address"
        variant="outlined"
      ></v-textarea>
      <v-btn
        block
        :ripple="false"
        append-icon="mdi-arrow-right"
        color="black"
        size="x-large"
        type="submit"
        :disabled="isFormSubmitting"
      >
        Place Order
      </v-btn>
    </v-form>
  </v-card>
</template>