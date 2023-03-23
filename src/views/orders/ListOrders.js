import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const ListOrdersComponent = ({ orders }) => {
  return (
    <div className="row justify-content-start align-items-start g-2">
      {orders &&
        orders.map((o) => (
          <div key={o.id} className="col-12 col-md-6 col-xl-4">
            <div className="card card-order-admin ">
              <div className="card-body">
                <div className="row justify-content-center align-items-center g-2">
                  <div className="col-12">
                    <span className="fw-bold fs-5">Cliente :{o.User.name}</span>
                  </div>
                  <div className="col-6">
                    <span className="fs-6">Tel : {o.User.phone}</span>
                  </div>
                  <div className="col-6">
                    <span className="fs-6">Fecha : {o.purchase_date.substring(0, 10)}</span>
                  </div>
                  <div className="col-6">
                    <span className="fs-5 fw-semibold">
                      {' $'}
                      {o.total_payment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
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
