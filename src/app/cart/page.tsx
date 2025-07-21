"use client"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, Shield, RotateCcw, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import {removeItem, updateQuantity} from "@/lib/features/todos/cartSlice";

// Cart Item Component
function CartItem({ item }: { item: any }) {
    const dispatch = useAppDispatch()

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity >= 0) {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
        }
    }

    const handleRemoveItem = () => {
        dispatch(removeItem(item.id))
    }

    const maxQuantity = item.stock || 999
    console.log('img :',item.thumbnail)
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image
                        src={item.thumbnail || "/placeholder.svg?height=60&width=60"}
                        alt={`${item.name} product image`}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                        unoptimized={item.thumbnail?.includes("cdn.dummyjson.com")}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">${item.price}</p>
                    {item.stock && item.stock <= 10 && (
                        <p className="text-sm text-orange-600 mt-1">Only {item.stock} left in stock</p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.quantity - 1)}
                        className="h-8 w-8 rounded-full"
                        aria-label={`Decrease quantity of ${item.name}`}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>

                    <span className="text-base font-medium min-w-[2rem] text-center" aria-label={`Quantity: ${item.quantity}`}>
            {item.quantity}
          </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.quantity + 1)}
                        disabled={item.quantity >= maxQuantity}
                        className="h-8 w-8 rounded-full"
                        aria-label={`Increase quantity of ${item.name}`}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveItem}
                        className="text-red-500 hover:text-red-700 mt-1"
                        aria-label={`Remove ${item.name} from cart`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Order Summary Component
function OrderSummary({ itemsCount, subtotal }: { itemsCount: number; subtotal: number }) {
    const shipping = 0 // Free shipping
    const tax = Math.round(subtotal * 0.08 * 100) / 100 // 8% tax, rounded to 2 decimal places
    const total = subtotal + shipping + tax

    const handleCheckout = () => {
        alert("Proceeding to checkout...")
    }

    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({itemsCount} items)</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-3">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleCheckout}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 font-medium"
                    size="lg"
                    aria-label="Proceed to checkout with current cart items"
                >
                    Proceed to Checkout
                </Button>

                <div className="space-y-2 text-sm text-gray-600 pt-2">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" aria-hidden="true" />
                        <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        <span>30-day return policy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Headphones className="h-4 w-4" aria-hidden="true" />
                        <span>Customer support</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Main Cart Page Component (No Navigation Bar)
export default function Cart() {
    const { items, itemsCount, subtotal } = useAppSelector((state) => state.cart)

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {itemsCount === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                        <Button asChild className="mt-4">
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <OrderSummary itemsCount={itemsCount} subtotal={subtotal} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
