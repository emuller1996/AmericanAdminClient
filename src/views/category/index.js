import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList'
import { CContainer, CRow, CCol, CModal, CModalHeader, CModalTitle } from '@coreui/react'
import CategoryForm from './CategoryForm'

const CategoryComponent = () => {
  const [categories, setCategories] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [error, setError] = useState()

  const [categoryInput, setCategoryInput] = useState({})

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
    try {
      console.log('getAllCategories')
      const result = await axios.get('/category')
      setCategories(result.data)
    } catch (error) {
      console.log(error)
      setError({
        title: error.response.data.message,
        body: `CODESTATUS:${error.response.status}>>${error.code}>>${error.message}`,
      })
    }
  }

  const onSaveCategory = async (e) => {
    e.preventDefault()
    console.log(categoryInput)
    const token = localStorage.getItem('token')
    try {
      const result = await axios.post(`/category/${categoryInput.name}`, categoryInput, {
        headers: { 'access-token': token },
      })
      console.log(result.data)
      setCategoryInput({})
      setVisible(false)
      getAllCategories()
    } catch (error) {
      alert(error.message)
    }
  }

  const onEditCategory = async (e) => {
    e.preventDefault()
    console.log(categoryInput)
    const token = localStorage.getItem('token')

    try {
      const result = await axios.put(`/category/${categoryInput.id}`, categoryInput, {
        headers: { 'access-token': token },
      })
      console.log(result.data)
      setCategoryInput({})
      setVisibleEdit(false)
      getAllCategories()
    } catch (error) {}
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

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <p className="fw-bold m-0">{error.title}</p>
          <small>{error.body}</small>
        </div>
      )}
      <CategoryList
        categories={categories}
        setVisibleEdit={setVisibleEdit}
        setCategoryInput={setCategoryInput}
      />

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CategoryForm
          setVisible={setVisible}
          onSubmit={onSaveCategory}
          handleCategoryInput={handleCategoryInput}
          categoryInput={categoryInput}
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
          categoryInput={categoryInput}
        />
      </CModal>
    </CContainer>
  )
}

export default CategoryComponent
