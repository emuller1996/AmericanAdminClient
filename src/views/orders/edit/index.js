import { CAvatar } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MessagesComponent from './Messages'

const OrderUpdate = () => {
  const { id } = useParams()
  const [orderDetail, setOrderDetail] = useState()

  useEffect(() => {
    console.log('OrderUpdate MONT')
    getOrderById(id)
    return () => {
      console.log('OrderUpdate LEAVE')
    }
  }, [])

  const getOrderById = async (id) => {
    const token = localStorage.getItem('token')

    const result = await axios.get(`/order/comfirmation/${id}`, {
      headers: { 'access-token': token },
    })
    setOrderDetail(result.data.order)
  }

  return (
    <div className="container-xxl">
      <h4>Editar Orden #{id} </h4>
      <div className="row justify-content-start align-items-start g-2">
        <div className="col-md-4 col-12">
          <div className="card border-0 rounded-0">
            <div className="card-body">
              <small className="text-muted">Datos Cliente</small>
              <h4 className="card-title">{orderDetail && orderDetail.User.name}</h4>
              <small className="text-dark d-block">
                Correo : {orderDetail && orderDetail.User.email}
              </small>
              <small className="text-dark d-block">
                Telefono : {orderDetail && orderDetail.User.phone}
              </small>
              <small className="text-dark d-block">
                CC : {orderDetail && orderDetail.User.documentNumber}
              </small>
            </div>
          </div>

          <div className="card border-0 rounded-0 mt-2">
            <div className="card-body">
              <small className="text-muted">Datos Envio</small>
              <h4 className="card-title">{orderDetail && orderDetail.DeliveryAddress.name}</h4>
              <small className="text-dark d-block">
                Dirreccion : {orderDetail && orderDetail.DeliveryAddress.address}
              </small>
              <small className="text-dark d-block">
                Barrio : {orderDetail && orderDetail.DeliveryAddress.neighborhood}
              </small>
              <small className="text-dark d-block">
                Cuidad : {orderDetail && orderDetail.DeliveryAddress.city}
              </small>
              <small className="text-dark d-block">
                Departamento : {orderDetail && orderDetail.DeliveryAddress.department}
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-8 col-12">
          <div className="card border-0 rounded-0">
            <div className="card-body">
              <small className="text-muted">Datos Pedido</small>
              <div className="row justify-content-center align-items-center g-2">
                <div className="col">
                  Fecha : {orderDetail && orderDetail.purchase_date.substring(0, 10)}
                </div>
                <div className="col">
                  <span className="badge bg-info">{orderDetail && orderDetail.status}</span>
                </div>
              </div>
              <hr className="border-dark"></hr>
              <div className="table-responsive">
                <table className="table table-white">
                  <thead>
                    <tr>
                      <th scope="col">IMG</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Valor Unit</th>
                      <th scope="col">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail &&
                      orderDetail.Products.map((p) => (
                        <tr key={p.id} className="">
                          <td>
                            <CAvatar src={p.image} size="md" />
                          </td>
                          <td>{p.name}</td>
                          <td>{p.OrderDetail.units}</td>
                          <td>{p.OrderDetail.unitPrice}</td>
                          <td>{p.OrderDetail.totalPrice}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {orderDetail && <MessagesComponent id={orderDetail.id} />}
      </div>
    </div>
  )
}

export default OrderUpdate
