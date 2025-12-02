<script setup>
import Cart from "@/components/Cart.vue";
import { hideCartOnRoutes } from "@/composables/cart";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <v-app-bar scroll-behaviour="elevate">
    <template v-slot:prepend>
      <router-link to="/" class="d-flex align-center text-decoration-none ga-5">
        <v-icon icon="mdi-store" class="pl-7"></v-icon>
        <v-toolbar-title>VueStore</v-toolbar-title>
      </router-link>
    </template>
    <template v-slot:append>
      <Cart v-if="!hideCartOnRoutes.includes(route.path)" />
    </template>
  </v-app-bar>
</template>