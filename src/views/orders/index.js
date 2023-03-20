import { CCard, CContainer } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListOrdersComponent from './ListOrders'

const OrderComponent = () => {
  const [orders, setOrders] = useState()

  useEffect(() => {
    getAllOrder()
    return () => {
      console.log('DESMONTE')
    }
  }, [])

  const getAllOrder = async () => {
    const result = await axios.get('http://localhost:3001/order')
    console.log(result.data.orders)

    setOrders(result.data.orders)
  }

  return (
    <CContainer>
      <h3>List Orders</h3>
      <ListOrdersComponent orders={orders} />
    </CContainer>
  )
}

export default OrderComponent
