import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
} from '@coreui/react'
import ProductTable from './ProductTable'
import axios from 'axios'
import ProductForm from './ProductForm'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [productsAll, setProductsAll] = useState([])
  const [visible, setVisible] = useState(false)
  const [productInput, setProductInput] = useState()
  const [categories, setCategories] = useState([])
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const handleProductInput = (e) => {
    setProductInput({
      ...productInput,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    getAllProducts()
    getAllCategories()
    return () => {}
  }, [])

  //OBTENER TODO LAS CATEGORIAS
  const getAllCategories = async () => {
    console.log('getAllCategories')
    const result = await axios.get('http://localhost:3001/category')
    setCategories(result.data)
  }

  //OBTENER TODO LOS PRODUCTOS
  const getAllProducts = async () => {
    console.log('getAllProducts')
    const result = await axios.get('http://localhost:3001/products')
    setProductsAll(result.data.products)
  }

  //GUARDAR PRODUCTO
  const onSaveProduct = async (e) => {
    e.preventDefault()
    console.log('onSaveProduct')
    productInput.CategoryId = parseInt(productInput.CategoryId)
    productInput.price = parseInt(productInput.price)
    productInput.stock = parseInt(productInput.stock)

    console.log(productInput)
    try {
      const result = await axios.post('http://localhost:3001/products', productInput)
      console.log(result.data)
      setProductInput({})
      addToast(createProductToast)
      setVisible(false)
      getAllProducts()
    } catch (error) {
      console.log(error)
    }
  }

  //TOAST
  const createProductToast = (
    <CToast>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">Producto Registrado</div>
        <small>Mul</small>
      </CToastHeader>
      <CToastBody>El producto se ha resgistrado correctamente a la base de datos.</CToastBody>
    </CToast>
  )

  return (
    <div className="container">
      <CButton onClick={() => setVisible(true)} color="primary">
        Crear Producto
      </CButton>
      <CButton className="ms-2" color="secondary">
        <Link className="fw-semibold text-decoration-none" to={'/categorias'}>
          Categorias
        </Link>
      </CButton>
      <ProductTable products={productsAll && productsAll} />

      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <ProductForm
          handleProductInput={handleProductInput}
          categories={categories}
          setVisible={setVisible}
          onSubmit={onSaveProduct}
        />
      </CModal>

      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default ProductList
