<script setup>
import Appbar from "@/components/Appbar.vue";
import ProductGrid from "@/components/ProductGrid.vue";
import CartDrawer from "@/components/CartDrawer.vue";
import { provide, ref } from "vue";

const openCartDrawer = ref(false);
provide("openCartDrawer", openCartDrawer);
</script>

<template>
  <v-app>
    <Appbar />
    <CartDrawer v-model="openCartDrawer" location="right" />
    <v-main class="d-flex align-center justify-center">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
