'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Leaf, Truck, Recycle, Apple } from 'lucide-react'
import { Navbar } from './components-navbar'
import { Footer } from './components-footer'
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD_uqBgm6DHO4y1vAk54-I-qnqqBR1EVuU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Mock data for cart items
const cartItems = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2, image: '/pizza.png' },
  { id: 2, name: 'Caesar Salad', price: 8.99, quantity: 1, image: '/caesar-salad.png' },
  { id: 3, name: 'Garlic Bread', price: 4.99, quantity: 1, image: '/garlic-bread.png' },
  { id: 3, name: 'Pasta', price: 4.99, quantity: 1, image: '/pasta.png' }
]

// Mock data for sustainability points
const sustainabilityPoints = {
  earned: {
    distance: 5,
    organic: 10,
    packaging: 10,
    foodWaste: 10,
  },
  potential: {
    distance: 7,
    organic: 10,
    packaging: 10,
    foodWaste: 10,
  },
}

export function CartPageComponent() {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalEarnedPoints = Object.values(sustainabilityPoints.earned).reduce((sum, points) => sum + points, 0)
  const totalPotentialPoints = Object.values(sustainabilityPoints.potential).reduce((sum, points) => sum + points, 0)
  const [suggestionContent, setSuggestionContent] = useState("")

  const getReportUsingGemini = async (data: string) => {
    const resp = await model.generateContent([data]);
    if (resp) {
      setSuggestionContent(resp.response.text())
    }
  }

  useEffect(() => {
    if (!suggestionContent) {
      getReportUsingGemini("Based on the current food selection, {current_orders_selected: apple}, {sustainability_score:18}, {restaurant _distance_point:9}, {organic_point:3}, {packaging_material_point:3}, {leftover_point:3} give me the suggestion how can I improve my sustainability score, the nearest restaurant distance is {restaurant_name:Green Eats} {minimum_restaurant_distance:12}, {maximum_organic_point:16}, {corresponding_restaurant_name: Green Eats}, {maximum_packaging_point: 15}, {corresponding_restaurant_name: Green Eats}, {maximum_leftover_point: 15}, {corresponding_restaurant_name: Green Eats} and based on these suggest me how can I increase my sustainability point, keep in mind that the response will be addressed to {sexuality : transgender} and {pronouns : they/them}, so keep the response gender inclusive. 'PROMPT SHOULD BE 70 WORDS MAX'");
    }
  }, [])

  const handlePayment = () => {
    setIsPaymentProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentProcessing(false)
      alert('Payment processed successfully!')
    }, 2000)
  }

  return (
    <>
    <Navbar />
    <div className="w-full flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4">
                  <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <p className="font-semibold">Total:</p>
                <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={handlePayment}
                disabled={isPaymentProcessing}
              >
                {isPaymentProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Sustainability Points</CardTitle>
                <CardDescription>You've earned {totalEarnedPoints} points out of a potential {totalPotentialPoints}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-blue-500" />
                      <span>Distance</span>
                    </div>
                    <span>{sustainabilityPoints.earned.distance} / {sustainabilityPoints.potential.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <span>Organic</span>
                    </div>
                    <span>{sustainabilityPoints.earned.organic} / {sustainabilityPoints.potential.organic}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Recycle className="h-5 w-5 text-yellow-500" />
                      <span>Packaging</span>
                    </div>
                    <span>{sustainabilityPoints.earned.packaging} / {sustainabilityPoints.potential.packaging}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Apple className="h-5 w-5 text-red-500" />
                      <span>Food Waste</span>
                    </div>
                    <span>{sustainabilityPoints.earned.foodWaste} / {sustainabilityPoints.potential.foodWaste}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Sustainability Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {suggestionContent ? suggestionContent : 'Generating suggestion'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}