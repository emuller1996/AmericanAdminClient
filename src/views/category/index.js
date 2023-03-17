import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList'
import { CContainer, CRow, CCol, CModal, CModalHeader, CModalTitle } from '@coreui/react'
import CategoryForm from './CategoryForm'

const CategoryComponent = () => {
  const [categories, setCategories] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  const [categoryInput, setCategoryInput] = useState()
  const [categoryInputEdit, setCategoryInputEdit] = useState()

  useEffect(() => {
    getAllCategories()
  }, [])

  const handleCategoryInput = (e) => {
    setCategoryInput({
      ...categoryInput,
      [e.target.name]: e.target.value,
    })
  }

  //OBTENER TODO LAS CATEGORIAS
  const getAllCategories = async () => {
    console.log('getAllCategories')
    const result = await axios.get('http://localhost:3001/category')
    setCategories(result.data)
  }

  const onSaveCategory = async (e) => {
    e.preventDefault()
    console.log(categoryInput)
    try {
      const result = await axios.post(
        `http://localhost:3001/category/${categoryInput.name}`,
        categoryInput,
      )
      console.log(result.data)
      setCategoryInput({})
      setVisible(false)
      getAllCategories()
    } catch (error) {}
  }

  const onEditCategory = () => {
    console.log(categoryInputEdit)
  }

  return (
    <CContainer>
      <h5>Lista de Categorias</h5>

      <CRow className="g-2 mb-3">
        <CCol size="auto">
          <button type="button" className="btn btn-secondary" onClick={() => setVisible(!visible)}>
            Crear Categoria
          </button>
        </CCol>
      </CRow>

      <CategoryList categories={categories} setVisibleEdit={setVisibleEdit} />

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CategoryForm
          setVisible={setVisible}
          onSubmit={onSaveCategory}
          handleCategoryInput={handleCategoryInput}
        />
      </CModal>

      {/* MODAL EDITAR CATEGORIA */}
      <CModal visible={visibleEdit} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Editar</CModalTitle>
        </CModalHeader>
        <CategoryForm
          setVisible={setVisibleEdit}
          onSubmit={onEditCategory}
          handleCategoryInput={handleCategoryInput}
        />
      </CModal>
    </CContainer>
  )
}

export default CategoryComponent
