import { CForm, CFormInput, CButton, CModalBody, CModalFooter, CFormTextarea } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

const CategoryForm = ({ setVisible, handleCategoryInput, onSubmit }) => {
  return (
    <CForm onSubmit={onSubmit}>
      <CModalBody>
        <CFormInput
          type="text"
          className="mb-3"
          id="name"
          label="Nombre Categoria"
          placeholder="Tenis"
          name="name"
          onChange={handleCategoryInput}
        />
        <CFormTextarea
          id="exampleFormControlTextarea1"
          label="Descripcion"
          rows={3}
          name="description"
          onChange={handleCategoryInput}
        ></CFormTextarea>
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

CategoryForm.propTypes = {
  setVisible: PropTypes.func.isRequired,
  handleCategoryInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default CategoryForm
