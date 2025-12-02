<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiClient } from "@/utils/apiClient.js";
import Review from "@/components/Review.vue";
import { addToCart, extractProductForCart } from "@/composables/cart";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const isLoading = ref(true);
const tab = ref("desc");
const qty = ref(1);

onMounted(async () => {
  isLoading.value = true;
  try {
    const resp = await apiClient.get(`products/${route.params.id}`);
    product.value = resp.data;
  } catch (err) {
    router.replace({
      name: "Notfound",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <v-skeleton-loader type="card" v-if="isLoading"></v-skeleton-loader>
  <v-card v-else-if="product">
    <v-row>
      <v-col>
        <v-img :src="product.images[0]" aspect-ratio="1" cover />
      </v-col>
      <v-col class="d-flex flex-column pa-12 ga-2">
        <v-chip variant="outlined" class="align-self-start">
          {{ product.category.toUpperCase() }}
        </v-chip>

        <h2>{{ product.title }}</h2>

        <div class="d-flex ga-3 align-center">
          <v-rating
            :model-value="product.rating"
            readonly
            small
            dense
            background-color="orange"
            color="orange"
            :size="25"
          />
          <p>{{ product.rating }}</p>
        </div>

        <v-divider />
        {{ product.description }}

        <v-divider />

        <p class="text-h4 font-weight-bold pt-4">${{ product.price }}</p>

        <v-number-input
          class="align-self-start"
          control-variant="split"
          :min="1"
          :max="product.stock"
          style="max-height: 80px"
          v-model="qty"
        ></v-number-input>

        <v-btn
          class="align-self-start"
          prepend-icon="mdi-cart"
          size="x-large"
          :ripple="false"
          color="black"
          @click="addToCart(extractProductForCart(product), qty)"
          >Add to Cart</v-btn
        >

        <div>
          <v-chip-group
            v-for="tag in product.tags"
            :key="tag"
            class="d-flex flex-row ga-2"
          >
            <v-chip>{{ tag }}</v-chip>
          </v-chip-group>
        </div>
      </v-col>
    </v-row>
    <v-sheet class="pa-4 ma-4">
      <v-tabs v-model="tab">
        <v-tab value="rating">Rating</v-tab>
        <v-tab value="additional">Additional Information</v-tab>
        <v-tab value="shipping">Shipping</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="rating">
          <v-sheet class="pa-5">
            <v-row>
              <v-col cols="3">
                <p>
                  <span class="text-h1 font-weight-bold">{{
                    product.rating
                  }}</span>
                  <span class="text-h6"> /5</span>
                </p>
                <p>({{ product.reviews.length }} reviews)</p>
              </v-col>
              <v-col
                v-for="review in product.reviews"
                :key="review.reviewerEmail"
              >
                <Review
                  :name="review.reviewerName"
                  :rating="review.rating"
                  :date="review.date"
                  :comment="review.comment"
                />
              </v-col>
            </v-row>
          </v-sheet>
        </v-tabs-window-item>

        <v-tabs-window-item value="additional">
          <v-sheet class="pa-5">
            <v-table>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{{ product.brand }}</td>
                </tr>
                <tr>
                  <td>SKU</td>
                  <td>{{ product.sku }}</td>
                </tr>
                <tr>
                  <td>Warranty</td>
                  <td>{{ product.warrantyInformation }}</td>
                </tr>
                <tr>
                  <td>Availability</td>
                  <td>{{ product.availabilityStatus }}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{{ product.weight }}g</td>
                </tr>
                <tr>
                  <td>Return Policy</td>
                  <td>{{ product.returnPolicy }}</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>
                    {{ product.dimensions.width }} x
                    {{ product.dimensions.height }} x
                    {{ product.dimensions.depth }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-tabs-window-item>

        <v-tabs-window-item value="shipping">
          <v-sheet class="pa-5">
            {{ product.shippingInformation }}
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-sheet>
  </v-card>
</template>