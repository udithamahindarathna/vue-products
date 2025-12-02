<script setup>
import { inject } from "vue";
import { getCartCount } from "@/composables/cart";

const openCartDrawer = inject("openCartDrawer");
</script>

<template>
  <v-chip> {{ getCartCount() }} </v-chip>
  <v-btn @click.stop="openCartDrawer = !openCartDrawer" icon="mdi-cart"></v-btn>
</template>