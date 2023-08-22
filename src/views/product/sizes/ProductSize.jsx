import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ProductSize.scss'
import { createSizeProductsService, getAllSizeProductsService } from 'src/services/product.services'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'

const ProductSize = ({ productoSelecionadoEditar, getAllProducts }) => {
  const [sizeAll, setSizeAll] = useState(undefined)
  const [sizeSelecionado, setsizeSelecionado] = useState(undefined)
  const [sizeProduct, setSizeProduct] = useState(undefined)
  const [cantidad, setCantidad] = useState(undefined)

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
      const result = await getAllSizeProductsService(id)
      console.log(result.data)
      console.log()
      setSizeProduct(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSize = async (e) => {
    try {
      const result = await createSizeProductsService(productoSelecionadoEditar.id, {
        SizeId: sizeSelecionado,
        quantity: cantidad,
        ProductId: productoSelecionadoEditar.id,
      })
      getAllSizesByProduct(productoSelecionadoEditar.id)
      toast.success(result.data.message)
      setCantidad('')
      setsizeSelecionado(undefined)
      getAllProducts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container_size p-4">
      <h4 className="text-start text-white">Tallas</h4>

      <div className="row g-2">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              disabled={!sizeSelecionado}
              type="text"
              className="form-control p-2"
              placeholder="8"
              value={cantidad}
              onChange={(e) => {
                setCantidad(e.target.value)
              }}
            />
            <button
              onClick={handleSize}
              className="btn btn-size-save text-white fw-bold"
              type="button"
            >
              Agregar
            </button>
          </div>
          {sizeProduct &&
            sizeProduct.map((s) => (
              <div className="card mt-2" key={s.id}>
                <div className="card-body">
                  {` Talla :${s.Size.size} -  Cantidad : ${s.quantity}`}
                  <button className="btn btn-info">Editar</button>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-6">
          <div className="row g-3">
            {sizeAll &&
              sizeAll.map((s) => (
                <div key={s.size} className="col-4 col-md-4 col-xl-3">
                  <div className={sizeSelecionado === s.id ? 'card_size_selected ' : 'card_size '}>
                    <label
                      htmlFor={s.id}
                      className="text-center  fw-bold text-white w-100 h-100 m-0 p-2"
                    >
                      <input
                        type="radio"
                        name={s.id}
                        value={s.id}
                        id={s.id}
                        disabled={sizeProduct && sizeProduct.map((s) => s.SizeId).includes(s.id)}
                        onClick={(e) => {
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
      </div>
    </div>
  )
}

ProductSize.propTypes = {
  productoSelecionadoEditar: PropTypes.object,
  getAllProducts: PropTypes.func,
}
export default ProductSize
