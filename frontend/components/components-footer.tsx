'use client'

import Link from 'next/link'
import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">FreshFusion</span>
            </Link>
            <p className="text-sm text-gray-600">
              Sustainable and fresh food delivery for a healthier planet.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link href="/menu" className="text-sm text-gray-600 hover:text-gray-900">Menu</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Facebook</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} FreshFusion. All rights reserved.
        </div>
      </div>
    </footer>
  )
}