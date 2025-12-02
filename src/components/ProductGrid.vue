<script setup>
import { apiClient } from "@/utils/apiClient.js";
import { ref, onMounted } from "vue";
import ProductItem from "@/components/ProductItem.vue";

const products = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    const resp = await apiClient.get(
      "/products?limit=20&select=id,title,price,rating,thumbnail"
    );
    products.value = resp.data.products;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <v-row align="center">
      <v-col v-for="product in products" :key="product.id" cols="3">
        <!-- On Loading state we set a loader -->
        <v-skeleton-loader
          type="image, list-item-two-line"
          v-if="isLoading"
        ></v-skeleton-loader>
        <!-- Otherwise load the products grid -->
        <div v-else>
          <ProductItem :product="product" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>