'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Package, Truck, Apple, Leaf } from 'lucide-react'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Navbar } from './components-navbar'
import { Footer } from './components-footer'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD_uqBgm6DHO4y1vAk54-I-qnqqBR1EVuU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Mock data for the user
const user = {
  name: "Elisa Smith",
  email: "elisa.smith@mailme.com",
  avatar: "/pfp.png",
  joinDate: "January 2024",
}

// Mock data for carbon footprint
const carbonFootprintData = [
  { month: 'Jan', footprint: 120 },
  { month: 'Feb', footprint: 110 },
  { month: 'Mar', footprint: 130 },
  { month: 'Apr', footprint: 100 },
  { month: 'May', footprint: 90 },
  { month: 'Jun', footprint: 85 },
  { month: 'Jul', footprint: 80 },
  { month: 'Aug', footprint: 75 },
  { month: 'Sep', footprint: 70 },
  { month: 'Oct', footprint: 65 },
  { month: 'Nov', footprint: 60 },
  { month: 'Dec', footprint: 55 },
]

// Mock data for carbon footprint by category
const carbonFootprintByCategory = [
  { name: 'Distance', value: 30 },
  { name: 'Packaging', value: 40 },
  { name: 'Sourcing', value: 20 },
  { name: 'Leftovers', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Mock data for sustainability scores
const sustainabilityScores = {
  distance: 8,
  packaging: 7,
  sourcing: 9,
  leftovers: 8,
}

export function ProfilePageComponent() {
  const [showReport, setShowReport] = useState(false)
  const [reportContent, setReportContent] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false)

  const getReportUsingGemini = async (data: string) => {
    const resp = await model.generateContent([data]);
    return resp;
  }

  const generateReport = async () => {
    setIsGeneratingReport(true)
    setShowReport(true)
    const reportData = await getReportUsingGemini("Based on the carbon footprint {user_carbon_footprint: 20} and past orders (seprate orders) {sustainability score : 25, distance_point : 18, organic_point:12, packaging: 13, leftovers: 14} for each orders generate a sustainability report as a table (with these columns - Metric	Your Score	Maximum Score	Interpretation), keep in mind that the response will be addressed to {sexuality : transgender} and {pronouns : they/them}, so keep the response gender inclusive.");
    if (reportData) {
      setReportContent(reportData.response.text())
      setIsGeneratingReport(false)
    }
  }

  const generateSuggestions = () => {
    setIsGeneratingSuggestions(true)
    // Simulating AI-generated suggestions with a delay
    setTimeout(() => {
      setSuggestions([
        "Try ordering from restaurants within a 5km radius to reduce transportation emissions.",
        "Opt for restaurants that use biodegradable packaging materials.",
        "Choose seasonal menu items to support sustainable farming practices.",
        "Consider portion sizes to minimize food waste.",
        "Bring your own reusable containers for takeout orders when possible."
      ])
      setIsGeneratingSuggestions(false)
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto p-4 space-y-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Carbon Footprint</CardTitle>
              <CardDescription>Your carbon footprint over the past year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={carbonFootprintData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="footprint" stroke="#059669" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={carbonFootprintByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {carbonFootprintByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sustainability Report</CardTitle>
              <CardDescription>Generate a personalized sustainability report based on your purchasing habits</CardDescription>
            </CardHeader>
            <CardContent>
              {!showReport ? (
                <Button onClick={generateReport} className="bg-emerald-600 hover:bg-emerald-700">
                  Generate Report
                </Button>
              ) : (
                <div className="space-y-4">
                  {isGeneratingReport ? (
                    <div className="loading-animation">
                      <div className="loading-bar"></div>
                      <p>Generating your sustainability report...</p>
                    </div>
                  ) : (
                    <div className="fade-in">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {reportContent}
                      </ReactMarkdown>
                      <Button onClick={() => setShowReport(false)} variant="outline" className="mt-4">
                        Generate New Report
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sustainability Suggestions</CardTitle>
              <CardDescription>Get personalized tips to improve your sustainability score</CardDescription>
            </CardHeader>
            <CardContent>
              {suggestions.length === 0 ? (
                <Button onClick={generateSuggestions} className="bg-emerald-600 hover:bg-emerald-700">
                  Generate Suggestions
                </Button>
              ) : (
                <div className="space-y-4">
                  {isGeneratingSuggestions ? (
                    <div className="loading-animation">
                      <div className="loading-bar"></div>
                      <p>Generating your sustainability suggestions...</p>
                    </div>
                  ) : (
                    <div className="fade-in">
                      <ul className="list-disc list-inside space-y-2">
                        {suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                      <Button onClick={generateSuggestions} variant="outline" className="mt-4">
                        Generate New Suggestions
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sustainability Score</CardTitle>
              <CardDescription>Your average sustainability score based on past purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-blue-500 mb-2" />
                  <span className="font-semibold">Distance</span>
                  <div className="text-2xl font-bold">{sustainabilityScores.distance}/10</div>
                </div>
                <div className="flex flex-col items-center">
                  <Package className="w-8 h-8 text-yellow-500 mb-2" />
                  <span className="font-semibold">Packaging</span>
                  <div className="text-2xl font-bold">{sustainabilityScores.packaging}/10</div>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-8 h-8 text-green-500 mb-2" />
                  <span className="font-semibold">Sourcing</span>
                  <div className="text-2xl font-bold">{sustainabilityScores.sourcing}/10</div>
                </div>
                <div className="flex flex-col items-center">
                  <Apple className="w-8 h-8 text-red-500 mb-2" />
                  <span className="font-semibold">Leftovers</span>
                  <div className="text-2xl font-bold">{sustainabilityScores.leftovers}/10</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}