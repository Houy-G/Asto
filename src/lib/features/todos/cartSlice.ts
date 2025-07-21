import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    stock?: number
}

interface CartState {
    items: CartItem[]
    itemsCount: number
    subtotal: number
}

const initialState: CartState = {
    items: [
        {
            id: "1",
            name: "9318LamTanBlack & Brown Slipper",
            price: 19,
            quantity: 1,
            image: "/placeholder.svg?height=60&width=60&text=Slipper",
            stock: 10,
        },
        {
            id: "2",
            name: "Adidas shoes",
            price: 486,
            quantity: 1,
            image: "/placeholder.svg?height=60&width=60&text=Adidas",
            stock: 5,
        },
    ],
    itemsCount: 2,
    subtotal: 505,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
            const newItem = { ...action.payload, quantity: action.payload.quantity || 1 }
            const existingItem = state.items.find((item) => item.id === newItem.id)

            if (existingItem) {
                const maxQuantity = newItem.stock || 999
                existingItem.quantity = Math.min(existingItem.quantity + newItem.quantity, maxQuantity)
            } else {
                state.items.push(newItem)
            }

            // Recalculate totals
            state.itemsCount = state.items.reduce((total, item) => total + item.quantity, 0)
            state.subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload
            const item = state.items.find((item) => item.id === id)

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((item) => item.id !== id)
                } else {
                    const maxQuantity = item.stock || 999
                    item.quantity = Math.min(quantity, maxQuantity)
                }

                // Recalculate totals
                state.itemsCount = state.items.reduce((total, item) => total + item.quantity, 0)
                state.subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.items = state.items.filter((item) => item.id !== id)

            // Recalculate totals
            state.itemsCount = state.items.reduce((total, item) => total + item.quantity, 0)
            state.subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        clearCart: (state) => {
            state.items = []
            state.itemsCount = 0
            state.subtotal = 0
        },
    },
})

export const { addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
