import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import SingleProductPage from '@/pages/SingleProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: HomePage },
        { path: "/products/:id", name: "Singleproduct", component: SingleProductPage },
        { path: "/:pathMatch(.*)*", name: "Notfound", component: NotFoundPage }
    ]
})

export default router