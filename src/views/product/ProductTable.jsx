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

const ProductTable = ({
  products,
  setProductoSelecionadoEditar,
  setVisible2,
  setVisibleModalTallas,
  setVisibleModalImages,
}) => {
  return (
    <CTable responsive="md">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
          <CTableHeaderCell scope="col">Existencia</CTableHeaderCell>
          <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
          <CTableHeaderCell scope="col">Categoria</CTableHeaderCell>
          <CTableHeaderCell scope="col">Marca</CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {products &&
          products.map((p) => (
            <CTableRow key={p.id}>
              <CTableDataCell>{p.name}</CTableDataCell>
              <CTableDataCell>{p.stock}</CTableDataCell>
              <CTableDataCell>
                {p.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </CTableDataCell>
              <CTableDataCell>{p?.Category?.name}</CTableDataCell>
              <CTableDataCell>{p.brand}</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-sm btn-info text-white rounded-3"
                    onClick={() => {
                      setVisible2(true)
                      console.log(p)
                      setProductoSelecionadoEditar(p)
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    type="button"
                    title="Tallas"
                    className="ms-1 btn btn-sm btn-warning text-white rounded-3"
                    onClick={() => {
                      console.log('modal de tallas')
                      setVisibleModalTallas(true)
                      setProductoSelecionadoEditar(p)
                    }}
                  >
                    <i className="fa-solid fa-tag"></i>
                  </button>
                  <button
                    type="button"
                    title="Imagenes"
                    className="ms-1 btn btn-sm btn-dark text-white rounded-3"
                    onClick={() => {
                      setVisibleModalImages(true)
                      setProductoSelecionadoEditar(p)
                    }}
                  >
                    <i className="fa-solid fa-images"></i>
                  </button>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  setProductoSelecionadoEditar: PropTypes.func.isRequired,
  setVisible2: PropTypes.func.isRequired,
  setVisibleModalTallas: PropTypes.func,
  setVisibleModalImages: PropTypes.func,
}

export default ProductTable
