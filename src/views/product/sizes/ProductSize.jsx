import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './ProductSize.scss'
import {
  DeleteSizeProductsService,
  UpdateSizeProductsService,
  createSizeProductsService,
  getAllSizeProductsService,
} from 'src/services/product.services'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import AuthContext from 'src/context/AuthContext'

const ProductSize = ({ productoSelecionadoEditar, getAllProducts }) => {
  const [sizeAll, setSizeAll] = useState(undefined)
  const [sizeSelecionado, setsizeSelecionado] = useState(undefined)
  const [sizeSelecionadoEditar, setsizeSelecionadoEditar] = useState(undefined)
  const [sizeProduct, setSizeProduct] = useState(undefined)
  const [cantidad, setCantidad] = useState(undefined)
  const { authTokens } = useContext(AuthContext)

  useEffect(() => {
    getAllSizes()
    getAllSizesByProduct(productoSelecionadoEditar.id)
  }, [productoSelecionadoEditar])

  const getAllSizes = async () => {
    try {
      const result = await axios.get('/sizes')
      setSizeAll(result.data.sizes)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllSizesByProduct = async (id) => {
    try {
      const result = await getAllSizeProductsService(id, authTokens)
      console.log(result.data)
      console.log()
      setSizeProduct(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSize = async (e) => {
    const token = localStorage.getItem('token')
    if (sizeSelecionadoEditar) {
      try {
        sizeSelecionadoEditar.quantity = cantidad
        const s = await UpdateSizeProductsService(sizeSelecionadoEditar)
        setCantidad('')
        setsizeSelecionadoEditar(undefined)
        await getAllSizesByProduct(productoSelecionadoEditar.id)
        toast.success(s.data.message)
        getAllProducts()
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const result = await createSizeProductsService(
          productoSelecionadoEditar.id,
          {
            SizeId: sizeSelecionado,
            quantity: cantidad,
            ProductId: productoSelecionadoEditar.id,
          },
          token,
        )
        getAllSizesByProduct(productoSelecionadoEditar.id)
        toast.success(result.data.message)
        setCantidad('')
        setsizeSelecionado(undefined)
        getAllProducts()
      } catch (error) {
        console.log(error.response.status)
        if (error.response.status > 400) {
          toast.error(error.response.data.message)
        }
      }
    }
  }

  const handleDeleteSize = async (id, idProducto) => {
    try {
      const r = await DeleteSizeProductsService(id, idProducto)
      getAllSizesByProduct(productoSelecionadoEditar.id)
      toast.success(r.data.message)
      setCantidad('')
      setsizeSelecionado(undefined)
      getAllProducts()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="p-4">
      <div className="row g-2">
        <div className="col-lg-5">
          <p className="fw-semibold text-center mb-1">Selecione la talla</p>
          <div className="row g-3">
            {sizeAll &&
              sizeAll.map((s) => (
                <div key={s.size} className="col-6 col-lg-6 col-xl-6">
                  <div
                    className={`
                      ${
                        sizeSelecionado === s.id
                          ? 'rounded-2 border border-info '
                          : ' rounded-2 border'
                      } ${
                      sizeProduct && sizeProduct.map((s) => s.SizeId).includes(s.id)
                        ? 'border-secondary'
                        : ''
                    }`}
                  >
                    <label htmlFor={s.id} className="text-center fw-bold w-100 h-100 m-0 p-2">
                      <input
                        type="radio"
                        name="sizes"
                        value={s.id}
                        id={s.id}
                        disabled={sizeProduct && sizeProduct.map((s) => s.SizeId).includes(s.id)}
                        onClick={(e) => {
                          setCantidad('')
                          setsizeSelecionadoEditar(undefined)
                          setsizeSelecionado(parseInt(e.target.value))
                        }}
                      />
                      <span className=""> {s.size} </span>
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="input-group mb-3">
            <input
              disabled={!sizeSelecionado && !sizeSelecionadoEditar ? true : false}
              type="number"
              className="form-control p-2"
              placeholder="Ingresa aca la cantidad"
              value={cantidad}
              onChange={(e) => {
                setCantidad(e.target.value)
              }}
            />
            <button onClick={handleSize} className="btn btn-success fw-bold" type="button">
              {!sizeSelecionadoEditar ? 'Agregar' : 'Editar'}
            </button>
          </div>
          {sizeProduct &&
            sizeProduct.map((s) => (
              <div className="card mt-2" key={s.id}>
                <div className="py-1 px-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="w-100 m-0">{` Talla :${s.Size.size} -  Cantidad : ${s.quantity}`}</p>
                    <button
                      onClick={() => {
                        setsizeSelecionadoEditar(s)
                        setCantidad(s.quantity)
                      }}
                      className="btn btn-sm btn-info"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteSize(s.id, s.ProductId)
                      }}
                      className="ms-2 btn btn-sm btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

ProductSize.propTypes = {
  productoSelecionadoEditar: PropTypes.object,
  getAllProducts: PropTypes.func,
}
export default ProductSize
