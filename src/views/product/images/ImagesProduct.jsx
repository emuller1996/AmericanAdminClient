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

  useEffect(() => {
    getAllImageProduct()
    return () => {}
  }, [])

  const getAllImageProduct = async () => {
    const r = await getAllImagesProductsService(productoSelecionadoEditar.id)
    console.log(r.data)
    setAllImages(r.data.images)
    try {
    } catch (error) {}
  }

  const inputRef = useRef(null)
  return (
    <CContainer>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            {AllImages &&
              Array.isArray(AllImages) &&
              AllImages.map((c) => (
                <div key={c.id} className="col-md-4">
                  <img src={c.url_image} style={{width:"100px"}} alt="IMG_PRODUCTO" />
                </div>
              ))}

            {AllImages && Array.isArray(AllImages) && AllImages.length === 0 && (
              <div className="col">
                <p>No hay imagenes de este producto</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3 text-center">
            <label htmlFor="formFile" className="form-label">
              Agrege la imagen para el producto
            </label>
            <input ref={inputRef} className="form-control" type="file" id="formFile" />
            <button
              onClick={async () => {
                console.log(inputRef.current)
                console.log(inputRef.current.files[0])

                const data = new FormData()
                data.append('file', inputRef.current.files[0])
                data.append('upload_preset', 'AmericanImagenes')

                try {
                  const r = await axios.post(
                    'https://api.cloudinary.com/v1_1/dc6lvesqe/image/upload',
                    data,
                  )
                  console.log(r.data.secure_url)
                  const token = localStorage.getItem('token')
                  await createImagesProductsService(
                    productoSelecionadoEditar.id,
                    {
                      url_image: r.data.secure_url,
                      ProductId: productoSelecionadoEditar.id,
                    },
                    token,
                  )
                  await getAllImageProduct()
                  toast.success('Se ha Cargado la imagen Correctamente')
                } catch (error) {
                  console.log(error)
                }
              }}
              className="btn btn-primary mt-3"
            >
              Subir
            </button>
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
