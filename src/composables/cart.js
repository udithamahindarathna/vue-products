import { computed, reactive } from "vue";

// Constants
export const cart = reactive(getCartFromLocalStorage())

export const cartTotalQuantity = computed(() =>
    cart.reduce((total, item) => total + item.quantity, 0)
)

export const cartTotal = computed(() =>
    cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
)

export const hideCartOnRoutes = ["/checkout", "/confirm-order"]


// Functions

export function getCartCount() {
    return cart.length;
}

export function addToCart(product, qty) {
    if (!product || qty <= 0) {
        return
    }

    const existingProductIndex = getExistingProductIndex(product.id)

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += qty
    }
    else {
        cart.push({
            product: product,
            quantity: qty
        })
    }
    syncCartToLocalStorage(cart)
    alert("Added to Cart")
}

function getExistingProductIndex(id) {
    return cart.findIndex(item => item.product.id == id)
}

export function updateQuantityOfProduct() {
    removeZeroQuantityCartItems()
    syncCartToLocalStorage(cart)
    alert("Updated Cart")
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

    const index = cart.findIndex(item => item.product.id === id)

    if (index !== -1) {
        cart.splice(index, 1)
        syncCartToLocalStorage(cart)
    }

}

export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("cart")
    return JSON.parse(cart) || []
}

export function syncCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function removeZeroQuantityCartItems() {
    cart.forEach((item, index) => {
        if (item.quantity === 0) {
            cart.splice(index, 1)
        }
    })
}

export function getCartQuantity() {
    let qty = 0
    cart.forEach((item) => {
        qty += item.qty
    })

    return qty
}


export function getItemTotalValue(price, qty) {
    return price * qty
}

export function clearCartFromStorage() {
    cart.splice(0)
    syncCartToLocalStorage(cart)
}