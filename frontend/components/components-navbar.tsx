'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ShoppingCart, Search, Leaf } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

// Mock data for search results
const searchItems = [
  { id: '1', name: 'Organic Salad' },
  { id: '2', name: 'Vegan Burger' },
  { id: '3', name: 'Gluten-Free Pizza' },
  { id: '4', name: 'Sustainable Sushi' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">FreshFusion</span>
        </Link>

        <div className="flex-1 mx-4">
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search items...
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search items..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Items">
                {searchItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      setOpen(false)
                      router.push(`/item?id=${item.id}`)
                    }}
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Avatar>
              <AvatarImage src="/pfp.png" width={32} height={32} alt="User" />
              {/* <AvatarFallback>U</AvatarFallback> */}
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  )
}