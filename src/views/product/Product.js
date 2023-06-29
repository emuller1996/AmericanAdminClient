import React, { useEffect, useRef, useState } from 'react'
import { CButton, CModal, CModalHeader, CModalTitle } from '@coreui/react'
import ProductTable from './ProductTable'
import axios from 'axios'
import ProductForm from './ProductForm'
import { Link } from 'react-router-dom'
import { getAllProductsService } from 'src/services/product.services'

const ProductList = () => {
  const [productsAll, setProductsAll] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const [sizesProduct, setSizesProduct] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllProducts()
    getAllCategories()
    return () => {}
  }, [])

  //OBTENER TODO LAS CATEGORIAS
  const getAllCategories = async () => {
    const result = await axios.get('/category')
    setCategories(result.data)
  }

  //OBTENER TODO LOS PRODUCTOS
  const getAllProducts = async () => {
    try {
      setProductsAll(await getAllProductsService())
    } catch (error) {
      console.log(error)
    }
  }

  //GUARDAR PRODUCTO

  /* const onEditProduct = async (e) => {
    e.preventDefault()
    console.log('onEditProduct')
    productInput.CategoryId = parseInt(productInput.CategoryId)
    productInput.price = parseInt(productInput.price)
    productInput.stock = parseInt(productInput.stock)
    console.log(productInput)
    const token = localStorage.getItem('token')

    try {
      const result = await axios.put('/products', productInput, {
        headers: { 'access-token': token },
      })
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
      addToast(
        createProductToast({
          option: {
            title: error.response.data.message,
            body: error.message,
          },
        }),
      )
    }
  } */

  const onSetEditInput = (e) => {
    /* setProductInput(e) */
    setVisible2(true)
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center g-2">
        <div className="w-100">
          <CButton
            className="rounded-3"
            onClick={() => {
              setVisible(true)
              /*  setProductInput({}) */
            }}
            color="primary"
          >
            Crear Producto
          </CButton>
        </div>
        <div className="d-flex">
          <Link
            className="ms-2 btn btn-secondary text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
            to={'/categorias'}
          >
            Categorias
          </Link>

          <Link
            className="ms-2 btn btn-warning text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
            to={'/productos/tallas'}
          >
            Tallas
          </Link>
        </div>
      </div>

      {/* <Link
        className="ms-2 btn btn-secondary text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
        to={'/categorias'}
      >
        Categorias
      </Link> */}

      <ProductTable products={productsAll && productsAll} setProductInput={onSetEditInput} />

      {/* MODAL CREAR */}
      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>CREAR PRODUCTO</CModalTitle>
        </CModalHeader>
        <ProductForm
          categories={categories}
          setVisible={setVisible}
          setSizesProduct={setSizesProduct}
          sizesProduct={sizesProduct}
        />
      </CModal>

      {/* MODAL ACTUALIZAR */}
      <CModal size="lg" visible={visible2} onClose={() => setVisible2(false)}>
        <CModalHeader onClose={() => setVisible2(false)}>
          <CModalTitle>ACTUALIZAR PRODUCTO</CModalTitle>
        </CModalHeader>
        {/* 
        <ProductForm categories={categories} setVisible={setVisible2} onSubmit={onEditProduct} /> */}
      </CModal>
    </div>
  )
}

export default ProductList
