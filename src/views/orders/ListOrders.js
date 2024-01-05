import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import { Link } from 'react-router-dom'
import { MostrarPesoCOP } from 'src/utils'

const ListOrdersComponent = ({ orders }) => {
  return (
    <div className="row justify-content-start align-items-start g-2">
      {orders &&
        orders.map((o) => (
          <div key={o.id} className="col-12 col-md-6 col-xl-4">
            <div className="card card-order-admin ">
              <div className="card-body row justify-content-start">
                <div className="d-flex flex-column gap-1  ">
                  <div className="d-flex justify-content-between ">
                    <p className="m-0">Order {`#${o.id}`}</p>
                    <span className="fw-semibold text-start">
                      Fecha :{o?.purchase_date.substring(0, 10)}
                    </span>
                  </div>
                  <span className="fw-semibold text-start">Cliente :{o.User.name}</span>

                  <span className="fs-5 fw-semibold align-self-center">
                    {MostrarPesoCOP(o.total_payment)}
                  </span>
                  <div className="align-self-center  gap-2 ">
                    <span className="badge bg-primary me-4">{o.status}</span>
                    <Link to={`${o.id}`} type="button" className="btn button">
                      Detalle <i className="fa-solid fa-eye"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

ListOrdersComponent.propTypes = {
  orders: PropTypes.array.isRequired,
}

export default ListOrdersComponent
