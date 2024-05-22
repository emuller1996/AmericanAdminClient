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
import { putUpdateProductsService } from 'src/services/product.services'

const ImagesProduct = ({
  productoSelecionadoEditar,
  setProductoSelecionadoEditar,
  getAllProducts,
}) => {
  const [AllImages, setAllImages] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUp, setIsLoadingUp] = useState(false)

  const [urlImage, seturlImage] = useState('')

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
      <div className="row g-4 ">
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
                <div key={c.id} className="col-4 col-md-6">
                  <div
                    className={`card text-center d-flex align-items-center overflow-hidden ${
                      productoSelecionadoEditar.image === c.url_image ? 'bg-dark' : ''
                    }`}
                  >
                    <img src={c.url_image} alt="IMG_PRODUCTO" className="img-fluid " />
                    <button
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem('token')
                          console.log(productoSelecionadoEditar)
                          const r = await putUpdateProductsService(
                            {
                              id: productoSelecionadoEditar.id,
                              image: c.url_image,
                            },
                            token,
                          )
                          await getAllProducts()
                          setProductoSelecionadoEditar((status) => {
                            return {
                              ...status,
                              image: c.url_image,
                            }
                          })
                          console.log(r.data)
                          toast.success(r.data.message)
                          console.log(c.url_image)
                        } catch (error) {
                          console.log(error)
                        }
                      }}
                      className="btn btn-secondary my-2"
                    >
                      Selecionar
                    </button>
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
        <div className="col-md-6 ">
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
                <input
                  ref={inputRef}
                  className="form-control"
                  onChange={() => {
                    seturlImage('')
                  }}
                  type="file"
                  id="formFile"
                />
                <div className="mb-3 mt-3">
                  <span className=""> o Ingrese la URL de una imagen </span>
                </div>

                <input
                  className="form-control"
                  value={urlImage}
                  onChange={(e) => {
                    seturlImage(e.target.value)
                  }}
                  type="url"
                  id=""
                />

                <button
                  disabled={!inputRef?.current ? true : false}
                  onClick={async () => {
                    console.log(urlImage)
                    console.log(urlImage === '')
                    if (urlImage === '') {
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
                    } else {
                      try {
                        setIsLoadingUp(true)

                        const token = localStorage.getItem('token')
                        await createImagesProductsService(
                          productoSelecionadoEditar.id,
                          {
                            url_image: urlImage,
                            ProductId: productoSelecionadoEditar.id,
                          },
                          token,
                        )
                        setIsLoadingUp(false)
                        await getAllImageProduct()
                        seturlImage('')
                        toast.success('Se ha Cargado la imagen Correctamente')
                      } catch (error) {
                        console.log(error)
                        setIsLoadingUp(false)
                      }
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
  setProductoSelecionadoEditar: PropTypes.func,
  getAllProducts: PropTypes.func,
}

export default ImagesProduct
