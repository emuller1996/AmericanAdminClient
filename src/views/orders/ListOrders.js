import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const ListOrdersComponent = ({ orders }) => {
  return (
    <div className="row justify-content-start align-items-center g-2">
      {orders &&
        orders.map((o) => (
          <div key={o.id} className="col-12 col-md-6 col-xl-4">
            <div className="card card-order-admin">
              <div className="card-body">
                <div className="row justify-content-center align-items-center g-2">
                  <div className="col">
                    <p>{o.id}</p>
                  </div>
                  <div className="col">
                    <p>{o.total_payment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="col">
                    <p>{o.purchase_date}</p>
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
