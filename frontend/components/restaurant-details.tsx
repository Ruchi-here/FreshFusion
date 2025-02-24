'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Leaf, MapPin, Clock, Package, Truck, Apple } from 'lucide-react'
import { Navbar } from './components-navbar'
import { Footer } from './components-footer'

// Mock data for the restaurant
const restaurant = {
  name: "Sustainable Bites",
  address: "GT Galleria Towers, Krishna Marg, Ashok Marg, Jaipur, Rajasthan",
  rating: 4.2,
  sustainabilityScore: 8,
  image: "/restaurant2.png",
  description: "Sustainable Bites is committed to providing delicious, sustainable meals that are good for you and the planet.",
  hours: "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM",
  phone: "+91 9876543210",
}

// Mock data for menu items
const menuItems = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", image: "/pizza.png", description: "Classic Margherita with fresh basil, mozzarella, and a rich tomato sauce.", price: 12.99, rating: 4.7 },
  { id: 2, name: "Caesar Salad", category: "Salads", image: "/caesar-salad.png", description: "Crisp romaine lettuce with Caesar dressing, parmesan, and crunchy croutons.", price: 8.99, rating: 4.5 },
  { id: 3, name: "Garlic Bread", category: "Pizza", image: "/garlic-bread.png", description: "Warm, garlic-infused bread with melted butter and herbs.", price: 4.99, rating: 4.8 },
  { id: 4, name: "Pasta Primavera", category: "Popular", image: "/pasta.png", description: "A vibrant mix of pasta and seasonal vegetables in a light sauce.", price: 4.99, rating: 4.6 },
  { id: 5, name: "Pepperoni Pizza", category: "Pizza", image: "/pepperoni-pizza.png", description: "Classic pizza topped with spicy pepperoni and mozzarella.", price: 13.99, rating: 4.8 },
  { id: 6, name: "Greek Salad", category: "Salads", image: "/greek-salad.png", description: "A refreshing mix of cucumbers, olives, feta, and tomatoes.", price: 8.99, rating: 4.7 },
  { id: 7, name: "Lemon Iced Tea", category: "Beverage", image: "/lemon-iced-tea.png", description: "Chilled tea with a hint of lemon and a dash of sweetness.", price: 2.99, rating: 4.4 },
  { id: 8, name: "Margarita Cocktail", category: "Beverage", image: "/margarita.png", description: "Classic cocktail with tequila, lime juice, and a salted rim.", price: 7.99, rating: 4.6 },
  { id: 9, name: "BBQ Chicken Pizza", category: "Popular", image: "/bbq-chicken-pizza.png", description: "Smoky BBQ sauce, grilled chicken, and red onions on a crisp crust.", price: 14.99, rating: 4.9 },
  { id: 10, name: "Caprese Salad", category: "Salads", image: "/caprese-salad.png", description: "Fresh tomatoes, mozzarella, and basil drizzled with balsamic.", price: 10.99, rating: 4.5 },
  { id: 11, name: "Espresso", category: "Beverage", image: "/espresso.png", description: "Rich and aromatic espresso, freshly brewed for a bold taste.", price: 3.49, rating: 4.8 },
  { id: 12, name: "Fruit Smoothie", category: "Beverage", image: "/fruit-smoothie.png", description: "A blend of seasonal fruits for a refreshing, healthy drink.", price: 5.99, rating: 4.7 }
]

// Mock data for sustainability scores
const sustainabilityScores = [
  { category: "Distance", score: 9, description: "0.6 km away" },
  { category: "Packaging", score: 8, description: "95% recyclable materials" },
  { category: "Sourcing", score: 9, description: "90% locally sourced ingredients" },
  { category: "Food Waste", score: 8, description: "Composts 85% of food waste" },
]

// Mock data for reviews
const reviews = [
  { id: 1, author: "Jane D.", rating: 5, comment: "Absolutely love the commitment to sustainability and the food is delicious!" },
  { id: 2, author: "John S.", rating: 4, comment: "Great flavors and appreciate the eco-friendly packaging." },
  { id: 3, author: "Emily R.", rating: 5, comment: "The organic veggie burger is out of this world! Highly recommend." },
]

export function RestaurantDetailsComponent() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...new Set(menuItems.map(item => item.category))]

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <>
    <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Image 
                src={restaurant.image} 
                alt={restaurant.name} 
                width={300} 
                height={200} 
                className="rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-2">{restaurant.address}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  <span>Sustainability Score: {restaurant.sustainabilityScore}/10</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button 
                        key={category} 
                        variant={activeCategory === category ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="md:w-3/4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map(item => (
                      <Card key={item.id} className="bg-white/80 backdrop-blur-sm">
                        <CardHeader className="p-0">
                          <Image src={item.image} alt={item.name} width={300} height={200} className="rounded-t-lg object-cover w-full h-40" />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2">{item.name}</CardTitle>
                          <CardDescription className="text-sm mb-4">{item.description}</CardDescription>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sustainability">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {sustainabilityScores.map(score => (
                  <Card key={score.category} className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {score.category === "Distance" && <MapPin className="w-5 h-5 text-blue-500" />}
                        {score.category === "Packaging" && <Package className="w-5 h-5 text-yellow-500" />}
                        {score.category === "Sourcing" && <Truck className="w-5 h-5 text-green-500" />}
                        {score.category === "Food Waste" && <Apple className="w-5 h-5 text-red-500" />}
                        {score.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{score.score}/10</div>
                      <CardDescription>{score.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="about">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>About {restaurant.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-600" /> Hours
                      </h3>
                      <p>{restaurant.hours}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-600" /> Address
                      </h3>
                      <p>{restaurant.address}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p>{restaurant.phone}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">Description</h3>
                      <p>{restaurant.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-6">
                {reviews.map(review => (
                  <Card key={review.id} className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{review.author}</span>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-500 mr-1" />
                          <span>{review.rating}</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    <Footer />
    </>
  )
}