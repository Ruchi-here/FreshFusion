'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Leaf, MapPin, Star, Coffee, Wine } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { cn } from '@/lib/utils'
import { Navbar } from './components-navbar'
import { Footer } from './components-footer'

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: 'Green Eats',
    image: '/restaurant1.png',
    inStock: true,
    price: '$$',
    description: 'Organic and locally sourced ingredients',
    sustainabilityScore: 9,
    isOrganic: true,
    isLocal: true,
    isSeasonal: true,
    rating: 4.5,
    lat: 26.90283,
    lng: 75.79240,
  },
  {
    id: 2,
    name: 'Sustainable Bites',
    image: '/restaurant2.png',
    inStock: true,
    price: '$$$',
    description: 'Farm-to-table cuisine with a focus on sustainability',
    sustainabilityScore: 8,
    isOrganic: true,
    isLocal: true,
    isSeasonal: false,
    rating: 4.2,
    lat: 26.91634,
    lng: 75.80809,
  },
  {
    id: 3,
    name: 'Eco Diner',
    image: '/restaurant3.png',
    inStock: false,
    price: '$',
    description: 'Affordable and eco-friendly dining options',
    sustainabilityScore: 7,
    isOrganic: false,
    isLocal: true,
    isSeasonal: true,
    rating: 3.8,
    lat: 26.91872,
    lng: 75.81296,
  },
]

// Custom icon for map markers
const createCustomIcon = (imageUrl: string) => {
  return new L.Icon({
    iconUrl: imageUrl,
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

export function HomePageComponent() {
  const [sortedRestaurants, setSortedRestaurants] = useState(restaurants)
  const [sortBy, setSortBy] = useState('sustainabilityScore')

  useEffect(() => {
    const sorted = [...restaurants].sort((a, b) => {
      if (sortBy === 'sustainabilityScore') return b.sustainabilityScore - a.sustainabilityScore
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'organic') return b.isOrganic ? 1 : -1
      if (sortBy === 'local') return b.isLocal ? 1 : -1
      if (sortBy === 'seasonal') return b.isSeasonal ? 1 : -1
      return 0
    })
    setSortedRestaurants(sorted)
  }, [sortBy])

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Nearby Restaurants</h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant="outline"
              onClick={() => setSortBy('organic')}
              className={cn(
                'rounded-full px-4 py-2 flex items-center gap-2',
                sortBy === 'organic' ? 'bg-orange-100 border-orange-200' : ''
              )}
            >
              <Leaf className="w-4 h-4" />
              Organically sourced
            </Button>
            <Button
              variant="outline"
              onClick={() => setSortBy('local')}
              className={cn(
                'rounded-full px-4 py-2 flex items-center gap-2',
                sortBy === 'local' ? 'bg-gray-100 border-gray-200' : ''
              )}
            >
              <Coffee className="w-4 h-4" />
              Locally sourced
            </Button>
            <Button
              variant="outline"
              onClick={() => setSortBy('seasonal')}
              className={cn(
                'rounded-full px-4 py-2 flex items-center gap-2',
                sortBy === 'seasonal' ? 'bg-gray-100 border-gray-200' : ''
              )}
            >
              <Wine className="w-4 h-4" />
              Seasonal
            </Button>
            <Button
              variant="outline"
              onClick={() => setSortBy('rating')}
              className={cn(
                'rounded-full px-4 py-2 flex items-center gap-2',
                sortBy === 'rating' ? 'bg-gray-100 border-gray-200' : ''
              )}
            >
              <Star className="w-4 h-4" />
              Ratings
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedRestaurants.map((restaurant) => (
              <Link href={`/restaurant`} key={restaurant.id}>
                <Card className="bg-white/80 hover:shadow-lg transform transition-transform hover:scale-105 p-2">
                  <CardHeader>
                    <Image src={restaurant.image} alt={restaurant.name} width={300} height={250} className="rounded-lg" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="flex justify-between items-center text-lg">
                      {restaurant.name}
                      <Badge variant={restaurant.inStock ? 'default' : 'destructive'}>
                        {restaurant.inStock ? 'Open' : 'Closed'}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm">{restaurant.description}</CardDescription>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span className="font-bold">{restaurant.price}</span>
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 text-green-500 mr-1" />
                        <span>{restaurant.sustainabilityScore}/10</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex space-x-2">
                      {restaurant.isOrganic && <Badge variant="outline">Organic</Badge>}
                      {restaurant.isLocal && <Badge variant="outline">Local</Badge>}
                      {restaurant.isSeasonal && <Badge variant="outline">Seasonal</Badge>}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 h-[400px] rounded-lg overflow-hidden">
            <MapContainer center={[26.9088315, 75.8059263]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {restaurants.map((restaurant) => (
                <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lng]} icon={createCustomIcon(restaurant.image)}>
                  <Popup>
                    <strong>{restaurant.name}</strong>
                    <br />
                    Sustainability Score: {restaurant.sustainabilityScore}/10
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
