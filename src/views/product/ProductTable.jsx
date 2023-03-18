import React from 'react'
import PropTypes from 'prop-types'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'

const ProductTable = ({ products, setProductInput }) => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
          <CTableHeaderCell scope="col">Existencia</CTableHeaderCell>
          <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {products &&
          products.map((p) => (
            <CTableRow key={p.id}>
              <CTableHeaderCell scope="row">{p.id}</CTableHeaderCell>
              <CTableDataCell>{p.name}</CTableDataCell>
              <CTableDataCell>{p.stock}</CTableDataCell>
              <CTableDataCell>
                {p.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </CTableDataCell>
              <CTableDataCell>
                <button
                  type="button"
                  className="btn btn-sm btn-info text-white rounded-3"
                  onClick={() => {
                    setProductInput(p)
                  }}
                >
                  Editar
                </button>
              </CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  setProductInput: PropTypes.func.isRequired,
}

export default ProductTable
