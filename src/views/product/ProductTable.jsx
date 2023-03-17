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

const ProductTable = ({ products }) => {
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
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ProductTable
