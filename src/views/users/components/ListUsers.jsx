/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import './ListUsers.scss'
export default function ListUsers({ users }) {
  return (
    <>
      <div className="row g-3 my-2">
        {users.map((c) => (
          <div key={c?.id} className="col-md-6">
            <div className="card  bg-secondary-subtle  py-3 px-2">
              <div className="d-flex align-items-center">
                <div className="w-100 d-flex flex-column ">
                  <span>
                    Nombre <b>{c?.name}</b>
                  </span>
                  <span>
                    Usuario : <b>{c?.username}</b>
                  </span>
                  <span>
                    Role : <b>{c?.role}</b>
                  </span>
                </div>
                <div>
                  <button className="btn btn-secondary  text-nowrap fw-semibold mb-2 ">
                    <i className="fa-regular fa-pen-to-square me-2"></i>
                    Editar
                  </button>
                  <button className="btn btn-primary  text-nowrap fw-semibold">
                    <i className="fa-solid fa-key  me-2"></i>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

ListUsers.propTypes = {
  users: PropTypes.array,
}
