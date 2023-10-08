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

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

function Upgrade() {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  )
}

function Form() {
  const stripe = useStripe()
  const elements = useElements()

  const [canSubmit, setCanSubmit] = React.useState(false)

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()

    if (!canSubmit) {
      return
    }

    try {
      const { error, paymentMethod } = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements?.getElement('card')!,
      })!

      if (paymentMethod == null || !(error == null)) {
        console.error(
          error?.type === 'card_error' || error?.type === 'validation_error'
            ? error?.message
            : 'AnUnexpectedErrorOccurred'
        )
        return
      }

      const response = await fetch(
        'http://localhost:9000/v1/payment/api/create-payment-intent',
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data: {
        success: boolean
        data?: {
          subscriptionId: string
          customerId: string
          clientSecret: string
          subtotal: number
          total: number
          tax: number
          ephemeralKey: string
        }
      } = await response.json()

      console.log('---', data)

      if (!data.success) {
        throw new Error()
      }

      const { error: confirmError, paymentIntent: confirmedPaymentIntent } =
        await stripe?.confirmCardPayment(data?.data?.clientSecret ?? '')!

      if (confirmedPaymentIntent == null || !(confirmError == null)) {
        console.error(
          confirmError?.type === 'card_error' ||
            confirmError?.type === 'validation_error'
            ? confirmError?.message
            : 'AnUnexpectedErrorOccurred'
        )
        return
      }

      // You have 2 options here. You can either confirm the subscription by calling right away to backend from here. This is confirmation with just our backend, the Stripe part is already completed. See DHG backend code for this (Looks something like this.)

      // const { data } = await confirmUpgradeToOrganization({
      //   payment_intent_id: _confirmedPaymentIntent?.id,
      //   payment_intent: JSON.stringify(_confirmedPaymentIntent),
      //   subscription_id: _subscriptionId,
      // });

      // Or, you can listen that via webhook on backend. If you charge right away then, we can call it from here as well. But you still need to confirm that payment via webhook. So setup webhook for reliability.

      console.log(
        'Subscription succeeded. Confirm the payment intent with server.'
      )
    } catch (error) {
      console.log('EXCEPTION', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white max-w-md">
      <CardElement
        onChange={function (cardDetails) {
          setCanSubmit(cardDetails?.complete)
        }}
        options={{ hidePostalCode: true }}
      />
      <Button className="mt-5" type="submit">
        Subscribe
      </Button>
    </form>
  )
}

export default Upgrade
