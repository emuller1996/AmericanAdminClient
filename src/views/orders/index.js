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
    const result = await axios.get('/order')
    console.log(result.data.orders)

    setOrders(result.data.orders)
  }

  return (
    <CContainer>
      <h3>Listado de Pedidos/Ordenes</h3>
      <div className="bg-body-secondary">
        <span>Filtrados</span>
      </div>

      {orders && Array.isArray(orders) && orders.length === 0 && (
        <div
          style={{ minHeight: '20vh' }}
          className="d-flex justify-content-center  align-items-center "
        >
          <div className="alert alert-light" role="alert">
            <strong>No Hay Ordenes</strong>
          </div>
        </div>
      )}
      <ListOrdersComponent orders={orders} />
    </CContainer>
  )
}

export default OrderComponent
