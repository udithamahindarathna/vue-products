<script setup>
import CartSummary from "@/components/CartSummary.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
</script>

<template>
    <v-row class="d-flex justify-space-between items-start">
        <v-col cols="7">
            <CheckoutForm />
        </v-col>
        <v-col>
            <CartSummary />
        </v-col>
    </v-row>
</template>