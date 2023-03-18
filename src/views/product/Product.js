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
  const [visible2, setVisible2] = useState(false)

  const [productInput, setProductInput] = useState({
    name: '',
  })
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
      addToast(
        createProductToast({
          option: {
            title: 'Producto Registrado',
            body: ' El producto se ha resgistrado correctamente a la base de datos.',
          },
        }),
      )
      setVisible(false)
      getAllProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const onEditProduct = async (e) => {
    e.preventDefault()
    console.log('onEditProduct')
    productInput.CategoryId = parseInt(productInput.CategoryId)
    productInput.price = parseInt(productInput.price)
    productInput.stock = parseInt(productInput.stock)
    console.log(productInput)

    try {
      const result = await axios.put('http://localhost:3001/products', productInput)
      console.log(result.data)
      setProductInput({})
      addToast(
        createProductToast({
          option: {
            title: 'Producto Actualizado',
            body: ' El producto se ha actualizado correctamente a la base de datos.',
          },
        }),
      )
      setVisible2(false)
      getAllProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const onSetEditInput = (e) => {
    setProductInput(e)
    setVisible2(true)
  }

  //TOAST
  const createProductToast = ({ option }) => (
    <CToast>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">{option.title}</div>
        <small>Mul</small>
      </CToastHeader>
      <CToastBody>{option.body}</CToastBody>
    </CToast>
  )

  return (
    <div className="container">
      <CButton
        className="rounded-3"
        onClick={() => {
          setVisible(true)
          setProductInput({})
        }}
        color="primary"
      >
        Crear Producto
      </CButton>

      <Link
        className="ms-2 btn btn-secondary text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
        to={'/categorias'}
      >
        Categorias
      </Link>

      <ProductTable products={productsAll && productsAll} setProductInput={onSetEditInput} />

      {/* MODAL CREAR */}
      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>CREAR PRODUCTO</CModalTitle>
        </CModalHeader>
        <ProductForm
          handleProductInput={handleProductInput}
          categories={categories}
          setVisible={setVisible}
          onSubmit={onSaveProduct}
          productInput={productInput}
        />
      </CModal>

      {/* MODAL ACTUALIZAR */}
      <CModal size="lg" visible={visible2} onClose={() => setVisible2(false)}>
        <CModalHeader onClose={() => setVisible2(false)}>
          <CModalTitle>ACTUALIZAR PRODUCTO</CModalTitle>
        </CModalHeader>
        <ProductForm
          handleProductInput={handleProductInput}
          categories={categories}
          setVisible={setVisible2}
          onSubmit={onEditProduct}
          productInput={productInput}
        />
      </CModal>

      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default ProductList
