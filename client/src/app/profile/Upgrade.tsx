'use client'

import React from 'react'
import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import Button from '@/components/Button'

const STRIPE_PUBLISHABLE_KEY = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string

console.log(STRIPE_PUBLISHABLE_KEY)

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

function Upgrade() {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  )
}

function Form() {
  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white max-w-md">
      <CardElement />
      <Button className="mt-5" type="submit">
        Subscribe
      </Button>
    </form>
  )
}

export default Upgrade
