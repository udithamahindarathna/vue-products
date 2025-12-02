import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { clearCartFromStorage } from "@/composables/cart";
import { apiClient } from "@/utils/apiClient";

export const formData = reactive({
    name: "",
    address: "",
    phone: "",
    email: "",
    products: [],
})

export const isFormValid = ref(false)
export const errors = reactive([])
export const isFormSubmitting = ref(false)

export const formRules = {
    name: [
        (value) => {
            if (value) return true
            return "Name is required"
        },
        (value) => {
            if (value.length > 1) return true
            return "Name must be atleast 2 characters long"
        }
    ],
    address: [
        (value) => {
            if (value) return true
            return "Address is required"
        },
        (value) => {
            if (value.length > 10) return true
            return "Address must be atleast 10 characters long"
        }
    ],
    email: [
        (value) => {
            if (value) return true
            return "Email is required"
        },
        (value) => {
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return true
            return "Email must be valid"
        }
    ],
    phone: [
        (value) => {
            if (value) return true
            return "Phone is required"
        },
        (value) => {
            if (/^\d{10}$/.test(value)) return true
            return "Phone number must be 10 digits"
        }
    ]
}


export async function handleSumbit(router) {
    isFormSubmitting.value = true
    errors.splice(0)
    try {
        const payload = toRaw(formData)

        const response = await apiClient.post(import.meta.env.VITE_CHECKOUT_URL,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )

        if (response.status === 201) {
            clearCartFromStorage()
            router.replace({ name: "Orderconfirmation", state: { order: response.data } })
            return
        }

        const error = response.error || "Error submitting form. Please try again later"
        errors.push(error)
    } catch (err) {
        errors.push(err.message || "Error submitting form. Please try again later")
    } finally {
        isFormSubmitting.value = false
    }
}