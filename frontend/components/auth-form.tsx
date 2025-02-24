'use client'

import { useState } from 'react'
import { Apple, Facebook, Leaf, Lock, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import UserPreferencesForm from '../hooks/user-preferences-form'

export function AuthFormComponent() {
  const [accountType, setAccountType] = useState('user')
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="container flex items-center justify-center md:gap-12">
        <div className="relative hidden md:flex w-1/2 h-full min-h-[500px] items-center">
          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-30" />
          
          {/* Main Illustration */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96">
                {/* Custom Image */}
                <Image
                  src="/test.webp"
                  alt="FreshFusion Illustration"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />

                {/* Floating Food Items */}
                <div className="absolute top-0 left-0 p-4 bg-white rounded-lg shadow-lg transform -rotate-12 animate-float">
                  <Leaf className="w-8 h-8 text-emerald-500" />
                  <div className="mt-2 text-sm font-medium">Eco-Friendly</div>
                </div>
                <div className="absolute top-1/3 right-0 p-4 bg-white rounded-lg shadow-lg transform rotate-12 animate-float-delayed">
                  <Apple className="w-8 h-8 text-emerald-500" />
                  <div className="mt-2 text-sm font-medium">Fresh Food</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-center">Create Account</h1>
                  <p className="text-sm text-center text-muted-foreground">
                    Join the sustainable food delivery revolution
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={accountType === 'user' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setAccountType('user')}
                      >
                        User
                      </Button>
                      <Button
                        type="button"
                        variant={accountType === 'seller' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setAccountType('seller')}
                      >
                        Seller
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setShowPreferences(true)}
                >
                  Create Account
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="login">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
                  <p className="text-sm text-center text-muted-foreground">
                    Enter your credentials to access your account
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" />
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        {showPreferences && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <UserPreferencesForm onClose={() => setShowPreferences(false)} />
          </div>
        )}
      </div>
    </div>
  )
}