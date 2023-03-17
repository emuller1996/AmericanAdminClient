import React from 'react'
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
} from '@coreui/react'
import PropTypes from 'prop-types'

function ProductForm({ handleProductInput, categories, setVisible, onSubmit }) {
  return (
    <CForm onSubmit={onSubmit} autoComplete="off">
      <CModalBody>
        <CRow xs={{ gutterY: 3 }}>
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              label="Nombre"
              placeholder=""
              name="name"
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
              onChange={handleProductInput}
            />
          </CCol>
          <CCol xl={2} md={3}>
            <CFormInput
              type="number"
              id="stock"
              label="Cantidad"
              placeholder=""
              name="stock"
              onChange={handleProductInput}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              id="brand"
              label="Marca"
              placeholder=""
              name="brand"
              onChange={handleProductInput}
            />
          </CCol>
          <CCol md={6}>
            <CFormSelect
              aria-label="Default select example"
              label="Categoria"
              id="CategoryId"
              name="CategoryId"
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
          <CCol md={12}>
            <CFormInput
              type="text"
              id="image"
              label="URL Image"
              placeholder=""
              name="image"
              onChange={handleProductInput}
            />
          </CCol>
          <CCol md={12}>
            <CFormTextarea
              id="description"
              label="Descripcion"
              rows={3}
              name="description"
              onChange={handleProductInput}
            ></CFormTextarea>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton type="submit" color="primary">
          Save changes
        </CButton>
      </CModalFooter>
    </CForm>
  )
}
ProductForm.propTypes = {
  handleProductInput: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ProductForm
