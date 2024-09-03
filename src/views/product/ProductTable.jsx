import React from 'react'
import PropTypes from 'prop-types'
import { CTable, CBadge, CAvatar } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { MostrarPesoCOP } from 'src/utils'

const ProductTable = ({
  products,
  setProductoSelecionadoEditar,
  setVisible2,
  setVisibleModalTallas,
  setVisibleModalImages,
}) => {
  const columns = [
    {
      name: 'Aciones',
      width: '110px',
      cell: (p) => (
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
      ),
    },
    {
      name: 'Img',
      width: '90px',
      selector: (row) => row.image,
      cell: (row, index, column, id) => (
        <div className="p-2">
          {row.image && (
            <img
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
              src={row.image}
              alt="TST"
            />
          )}
        </div>
      ),
    },
    {
      name: 'Nombre',
      style: { fontWeight: '600' },
      selector: (row) => row.name,
      sortable: true,
    },
    {
      width: '100px',
      name: 'Existencia',
      selector: (row) => row.stock,
    },
    {
      name: 'Precio',
      width: '170px',
      sortable: true,
      style: { fontWeight: '800' },
      selector: (row) => row.price,
      format: (row) => MostrarPesoCOP(row.price),
    },
    {
      name: 'Categoria',
      width: '100px',
      selector: (row) => row.Category?.name,
    },
    {
      name: 'Estado',
      width: '90px',
      selector: (row) => row.Category?.name,
      cell: (row) => (
        <div>
          {row.published ? (
            <CBadge color="success">Publicado</CBadge>
          ) : (
            <CBadge color="danger">No Publicado</CBadge>
          )}
        </div>
      ),
    },
    {
      name: 'Descuento',
      width: '90px',
      selector: (row) => row.Category?.name,
      cell: (row) => (
        <div>
          {row.is_discount ? (
            <>
              <CBadge color="success">{`En ${row.discount_percentage}% de Descuento`} </CBadge>
              <small>
                {MostrarPesoCOP(row.price - row.price * (row.discount_percentage / 100))}
              </small>
            </>
          ) : (
            <CBadge color="danger">No</CBadge>
          )}
        </div>
      ),
    },
  ]

  const conditionalRowStyles = []

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }
  return (
    <CTable responsive="xl">
      {products && (
        <div className="bg-white rounded-2 mt-1">
          <DataTable
            className="p-0"
            responsive
            pagination
            paginationComponentOptions={paginationComponentOptions}
            paginationPerPage={10}
            columns={columns}
            data={products}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
      )}
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
