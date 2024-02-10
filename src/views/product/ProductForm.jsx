import React, { useState } from 'react'
import {
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
  CFormTextarea,
  CModalBody,
  CModalFooter,
  CButton,
  CFormSwitch,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function ProductForm({ categories, setVisible, producto, getAllProducts }) {
  const [productInput, setProductInput] = useState({
    published: producto?.published,
    is_discount: producto?.is_discount,
  })

  const handleProductInput = (e) => {
    setProductInput({
      ...productInput,
      [e.target.name]: e.target.value,
    })
  }

  const onSaveProduct = async (e) => {
    e.preventDefault()

    console.log(productInput)
    const token = localStorage.getItem('token')

    if (producto) {
      console.log('EDITAR')
      productInput.id = producto.id
      try {
        const result = await axios.put('/products', productInput, {
          headers: { 'access-token': token },
        })
        console.log(result.data)
        setProductInput({})
        setVisible(false)
        toast.success(result.data.message)
      } catch (error) {
        console.log(error)
        if (error.response.status > 400) {
          toast.error(error.response.data.message)
        }
      }
    } else {
      productInput.CategoryId = parseInt(productInput.CategoryId)
      productInput.price = parseInt(productInput.price)
      productInput.stock = parseInt(productInput.stock)
      console.log('onSaveProduct')
      try {
        const result = await axios.post('/products', productInput, {
          headers: { 'access-token': token },
        })
        console.log(result.data)
        setProductInput({})
        setVisible(false)
        toast.success(result.data.message)
      } catch (error) {
        console.log(error.response.data.message)
        if (error.response.status > 400) {
          toast.error(error.response.data.message)
        }
      }
    }
    getAllProducts()
  }
  return (
    <CForm onSubmit={onSaveProduct} autoComplete="off">
      <CModalBody>
        <CRow xs={{ gutterY: 3 }} className="justify-content-center  align-items-center ">
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              label="Nombre"
              placeholder=""
              name="name"
              defaultValue={producto && producto.name}
              value={productInput.name}
              onChange={handleProductInput}
            />
          </CCol>
          <CCol xl={4} md={3}>
            <CFormInput
              type="number"
              id="price"
              label="Precio"
              placeholder=""
              name="price"
              value={productInput.price}
              defaultValue={producto && producto.price}
              onChange={handleProductInput}
            />
          </CCol>
          {/* <CCol xl={2} md={3}>
            <CFormInput
              type="number"
              id="stock"
              label="Cantidad"
              placeholder=""
              name="stock"
              value={productInput.stock}
              onChange={handleProductInput}
            />
          </CCol> */}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="brand"
              label="Marca"
              placeholder=""
              name="brand"
              value={productInput.brand}
              defaultValue={producto && producto.brand}
              onChange={handleProductInput}
            />
          </CCol>
          <CCol md={6}>
            <CFormSelect
              aria-label="Default select example"
              label="Categoria"
              id="CategoryId"
              name="CategoryId"
              value={productInput.CategoryId}
              defaultValue={producto && producto.CategoryId}
              onChange={handleProductInput}
              type="number"
            >
              {categories &&
                categories.map((c) => (
                  <option key={c.id} value={parseInt(c.id)}>
                    {c.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
          {/* <CCol md={12}>
            <CFormInput
              type="text"
              id="image"
              label="URL Image"
              placeholder=""
              name="image"
              value={productInput.image}
              onChange={handleProductInput}
              defaultValue={producto && producto.image}
            />
          </CCol> */}
          <CCol md={12}>
            <CFormTextarea
              id="description"
              label="Descripcion"
              rows={3}
              name="description"
              value={productInput.description}
              defaultValue={producto && producto.description}
              onChange={handleProductInput}
            ></CFormTextarea>
          </CCol>
          <CCol md={12}>
            <CFormSwitch
              checked={productInput.published}
              onChange={(e) => {
                setProductInput({
                  ...productInput,
                  [e.target.name]: !productInput.published,
                })
              }}
              name="published"
              label="Publicado"
              id="published"
            />
          </CCol>
          <CCol md={6}>
            <CFormSwitch
              checked={productInput.is_discount}
              onChange={(e) => {
                setProductInput({
                  ...productInput,
                  [e.target.name]: !productInput.is_discount,
                })
              }}
              name="is_discount"
              label="Esta en Descuento?"
              id="is_discount"
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="number"
              id="discount_percentage"
              label="Porcentaje"
              placeholder=""
              disabled={!productInput?.is_discount}
              name="discount_percentage"
              value={productInput?.discount_percentage}
              defaultValue={producto && producto?.discount_percentage}
              onChange={handleProductInput}
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton
          disabled={Object.keys(productInput).length === 0 ? true : false}
          type="submit"
          color="primary"
        >
          GUARDAR
        </CButton>
      </CModalFooter>
    </CForm>
  )
}
ProductForm.propTypes = {
  categories: PropTypes.array.isRequired,
  setVisible: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  producto: PropTypes.object,
}

export default ProductForm
