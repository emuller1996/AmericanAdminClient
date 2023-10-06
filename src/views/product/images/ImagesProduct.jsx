/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CContainer } from '@coreui/react'
import axios from 'axios'
import {
  createImagesProductsService,
  getAllImagesProductsService,
} from '../services/Images.services'
import toast from 'react-hot-toast'

const ImagesProduct = ({ productoSelecionadoEditar }) => {
  const [AllImages, setAllImages] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUp, setIsLoadingUp] = useState(false)

  useEffect(() => {
    getAllImageProduct()
    return () => {}
  }, [])

  const getAllImageProduct = async () => {
    setIsLoading(true)
    const r = await getAllImagesProductsService(productoSelecionadoEditar.id)
    console.log(r.data)
    setAllImages(r.data.images)
    setIsLoading(false)
    try {
    } catch (error) {
      setIsLoading(false)
    }
  }

  const inputRef = useRef(null)
  return (
    <CContainer>
      <div className="row">
        <div className="col-md-6">
          <div className="row g-3">
            {isLoading && (
              <div className="pt-3 text-center">
                <div className="sk-spinner sk-spinner-pulse"></div>
              </div>
            )}
            {AllImages &&
              Array.isArray(AllImages) &&
              AllImages.map((c) => (
                <div key={c.id} className="col-md-6">
                  <div className="card text-center d-flex align-items-center">
                    <img
                      src={c.url_image}
                      style={{ width: '100px', height: '100px' }}
                      alt="IMG_PRODUCTO"
                    />
                  </div>
                </div>
              ))}

            {AllImages && Array.isArray(AllImages) && AllImages.length === 0 && (
              <div className="col">
                <p>No hay imagenes de este producto</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="mb-3 text-center">
            <label htmlFor="formFile" className="form-label">
              Agrege la imagen para el producto
            </label>
            {isLoadingUp ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <input ref={inputRef} className="form-control" type="file" id="formFile" />
                <button
                  disabled={!inputRef?.current ? true : false}
                  onClick={async () => {
                    const data = new FormData()
                    data.append('file', inputRef.current.files[0])
                    data.append('upload_preset', 'AmericanImagenes')
                    try {
                      setIsLoadingUp(true)
                      const r = await axios.post(
                        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_KEY_CLOUDINARY}/image/upload`,
                        data,
                      )
                      const token = localStorage.getItem('token')
                      await createImagesProductsService(
                        productoSelecionadoEditar.id,
                        {
                          url_image: r.data.secure_url,
                          ProductId: productoSelecionadoEditar.id,
                        },
                        token,
                      )
                      setIsLoadingUp(false)
                      await getAllImageProduct()
                      toast.success('Se ha Cargado la imagen Correctamente')
                    } catch (error) {
                      console.log(error)
                      setIsLoadingUp(false)
                    }
                  }}
                  className="btn btn-primary mt-3"
                >
                  Subir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </CContainer>
  )
}

ImagesProduct.propTypes = {
  productoSelecionadoEditar: PropTypes.object,
}

export default ImagesProduct
