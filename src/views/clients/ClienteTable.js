import React from 'react'
import PropTypes from 'prop-types'

const ClientTable = ({ clientes }) => {
  return (
    <>
      <div className="table-responsive">
        <table
          className="table table-striped
        table-hover
        table-borderless
        table-secondary
        align-middle"
        >
          <thead className="table-light">
            <caption>Clientes</caption>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {clientes &&
              clientes.map((c) => (
                <tr key={c.id} className="table-light">
                  <td scope="row">{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button type="button" className="btn btn-dark">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  )
}

ClientTable.propTypes = {
  clientes: PropTypes.array.isRequired,
}

export default ClientTable
