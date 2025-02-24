'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from './use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Info, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const foodPreferences = [
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Gluten-Free', value: 'gluten-free' },
  { label: 'Dairy-Free', value: 'dairy-free' },
  { label: 'Keto', value: 'keto' },
  { label: 'Paleo', value: 'paleo' },
]

const dietaryPreferences = [
  { label: 'Low-Carb', value: 'low-carb' },
  { label: 'High-Protein', value: 'high-protein' },
  { label: 'Low-Fat', value: 'low-fat' },
  { label: 'Low-Sodium', value: 'low-sodium' },
  { label: 'Low-Sugar', value: 'low-sugar' },
]

const cuisinePreferences = [
  { label: 'Italian', value: 'italian' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Indian', value: 'indian' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Thai', value: 'thai' },
  { label: 'Mediterranean', value: 'mediterranean' },
]

const FormSchema = z.object({
  foodPreferences: z.array(z.string()).min(1, {
    message: 'Please  select at least one food preference.',
  }),
  location: z.string().min(1, {
    message: 'Please enter your location.',
  }),
  dietaryPreferences: z.array(z.string()),
  cuisinePreferences: z.array(z.string()).min(1, {
    message: 'Please select at least one cuisine preference.',
  }),
  participateInRewards: z.enum(['yes', 'no'], {
    required_error: 'Please select whether you want to participate in the reward system.',
  }),
})

interface UserPreferencesFormProps {
  onClose: () => void
}

export default function UserPreferencesForm({ onClose }: UserPreferencesFormProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      foodPreferences: [],
      location: '',
      dietaryPreferences: [],
      cuisinePreferences: [],
      participateInRewards: 'no',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Preferences submitted!',
      description: 'Your food preferences have been saved successfully.',
    })
    console.log(data)
    onClose()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>Tell us more about your food preferences to personalize your experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="foodPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Preferences</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {foodPreferences.map((item) => (
                        <label
                          key={item.value}
                          className={cn(
                            'flex items-center rounded-full px-3 py-1 text-sm font-semibold',
                            field.value.includes(item.value)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(field.value?.filter((value) => value !== item.value))
                            }}
                            className="mr-2 h-4 w-4"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Location</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value || 'Select your location'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search location..." />
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'].map((location) => (
                            <CommandItem
                              key={location}
                              value={location}
                              onSelect={() => {
                                form.setValue('location', location)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn('mr-2 h-4 w-4', location === field.value ? 'opacity-100' : 'opacity-0')}
                              />
                              {location}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dietaryPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Preferences</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {dietaryPreferences.map((item) => (
                        <label
                          key={item.value}
                          className={cn(
                            'flex items-center rounded-full px-3 py-1 text-sm font-semibold',
                            field.value.includes(item.value)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(field.value?.filter((value) => value !== item.value))
                            }}
                            className="mr-2 h-4 w-4"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuisinePreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Preferences</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {cuisinePreferences.map((item) => (
                        <label
                          key={item.value}
                          className={cn(
                            'flex items-center rounded-full px-3 py-1 text-sm font-semibold',
                            field.value.includes(item.value)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(field.value?.filter((value) => value !== item.value))
                            }}
                            className="mr-2 h-4 w-4"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participateInRewards"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Participate in Reward System</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription className="flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Earn points for every order and redeem them for discounts
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}