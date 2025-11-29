import { reactive } from "vue";

export const cart = reactive([])

export function getCartCount() {
    return cart.length;
}

export function addToCart(product, qty) {
    if (!product && qty <= 0) {
        return
    }

    console.log("Product: ", product)
    console.log("qty: ", qty)
    console.log("cart: ", cart)

    const existingProduct = cart.find(item => item.product.id == product.id)

    console.log("existingProduct: ", existingProduct)

    if (existingProduct) {
        existingProduct.quantity += qty
        return
    }

    cart.push({
        product: product,
        quantity: qty
    })
}

export function extractProductForCart(product) {
    if (!product) {
        return
    }

    return {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
    }
}

export function deleteProductFromCart(id) {
    if (!id && typeof id !== 'number') {
        return
    }
    console.log("deletingid: ", id)

    const index = cart.findIndex(item => item.product.id === id)

    if (index !== -1) {
        cart.splice(index, 1)
    }

}