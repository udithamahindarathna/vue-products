import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import SingleProductPage from '@/pages/SingleProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import OrderConfirmationPage from '@/pages/OrderConfirmationPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Home", component: HomePage },
        { path: "/products/:id", name: "Singleproduct", component: SingleProductPage },
        { path: "/checkout", name: "Checkout", component: CheckoutPage },
        { path: "/confirm-order", name: "Orderconfirmation", component: OrderConfirmationPage },
        { path: "/:pathMatch(.*)*", name: "Notfound", component: NotFoundPage },
    ]
})

export default router