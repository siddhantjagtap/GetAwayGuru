import React, { useState } from 'react'
import CheckoutForm from '../components/CheckoutForm'

const CheckoutPage = () => {
    const [details, setDetails] = useState([])
  return (
    <div>
      <CheckoutForm />
    </div>
  )
}

export default CheckoutPage
