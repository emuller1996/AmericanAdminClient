/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

export default function CardComments({ c, onResponse }) {
  return (
    <div className="col-md-6">
      <div className="card p-2">
        <div className="d-flex flex-column gap-2">
          <div className=" d-flex flex-column card p-1">
            <span className="text-center fw-semibold text-muted">Cliente</span>
            <small>{c?.User?.name}</small>
            <small>{c?.User?.email}</small>
          </div>
          <div className="card p-1">
            <span className="text-center fw-semibold text-muted">Comentario</span>
            <small>{c?.comment}</small>
          </div>
          <div className="card p-1">
            <span className="text-center fw-semibold text-muted">Producto</span>
            <div className="d-flex  justify-content-start align-items-center  gap-2">
              <img
                width={40}
                height={40}
                className="rounded-circle border"
                src={c?.Product?.image}
                alt=""
              />
              <small>{c?.Product?.name}</small>
            </div>
          </div>
          <div className="d-flex justify-content-center gap-4">
            <button className="btn btn-info text-white ">
              <i className="fa-solid fa-check me-2"></i>Marcar Leido
            </button>
            <button className="btn btn-primary" onClick={() => onResponse(c)}>
              <i className="fa-brands fa-readme me-2"></i>Responder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
CardComments.propTypes = {
  c: PropTypes.object.isRequired,
  onResponse: PropTypes.func,
}
