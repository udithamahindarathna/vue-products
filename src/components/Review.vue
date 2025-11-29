<script setup>
const props = defineProps(["name", "rating", "comment", "date"]);
</script>

<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle
      ><v-rating
        :model-value="rating"
        readonly
        small
        dense
        background-color="orange"
        color="orange"
        :size="20"
      />
    </v-card-subtitle>
    <v-card-text>{{ comment }}</v-card-text>
  </v-card>
</template>