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

  const [base64Image, setBase64Image] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

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
                      productoSelecionadoEditar.image === c.imageBase64 ? 'bg-dark' : ''
                    }`}
                  >
                    <img src={c.imageBase64} alt="IMG_PRODUCTO" className="img-fluid " />
                    <button
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem('token')
                          console.log(productoSelecionadoEditar)
                          const r = await putUpdateProductsService(
                            {
                              id: productoSelecionadoEditar.id,
                              image: c.imageBase64,
                            },
                            token,
                          )
                          await getAllProducts()
                          setProductoSelecionadoEditar((status) => {
                            return {
                              ...status,
                              image: c.imageBase64,
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
                
                

                <div className="mb-4">
            <label
              htmlFor="img_url"
              className="block mb-2  text-gray-400 dark:text-white"
            >
              URL image
            </label>
            <input
              /* {...register("img_url", { required: true })} */
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />

            {base64Image && (
              <div className="flex justify-center  my-8">
                <img src={base64Image} alt="Selected" style={{height:"150px"}} className="h-52" />
              </div>
            )}
          </div>
                

                <button
                  onClick={async () => {
                      try {
                        setIsLoadingUp(true)
                        const token = localStorage.getItem('token')
                        await createImagesProductsService(
                          productoSelecionadoEditar.id,
                          {
                            url_image: "test",
                            ProductId: productoSelecionadoEditar.id,
                            imageBase64:base64Image
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
  setProductoSelecionadoEditar: PropTypes.func,
  getAllProducts: PropTypes.func,
}

export default ImagesProduct
