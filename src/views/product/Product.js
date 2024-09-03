import React, { useContext, useEffect, useRef, useState } from 'react'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import ProductTable from './ProductTable'
import axios from 'axios'
import ProductForm from './ProductForm'
import { Link } from 'react-router-dom'
import { getAllProductsService } from 'src/services/product.services'
import ProductSize from './sizes/ProductSize'
import ImagesProduct from './images/ImagesProduct'
import AuthContext from 'src/context/AuthContext'
import { Button, Form, InputGroup } from 'react-bootstrap'
import ImportForm from './ImportForm'

const ProductList = () => {
  const [productsAll, setProductsAll] = useState(null)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visibleModalTallas, setVisibleModalTallas] = useState(false)
  const [visibleModalImages, setVisibleModalImages] = useState(false)
  const [visibleModalImportar, setVisibleModalImportar] = useState(false)

  const [sizesProduct, setSizesProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [productoSelecionadoEditar, setProductoSelecionadoEditar] = useState(undefined)

  const { authTokens, user } = useContext(AuthContext)

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
      setProductsAll(await getAllProductsService(authTokens))
    } catch (error) {
      console.log(error)
    }
  }

  const onShowModalTallas = (e, pro) => {
    /* setProductInput(e) */
    setVisibleModalTallas(true)
    setProductoSelecionadoEditar(pro)
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between gap-2  flex-wrap  align-items-center g-2 mb-2">
        <div className=" d-flex gap-2 ">
          {user.role === 'Admin' && (
            <CButton
              className="rounded-3  d-flex align-items-center   gap-1"
              onClick={() => {
                setVisible(true)
                /*  setProductInput({}) */
              }}
              color="primary"
              title="Crear Producto"
            >
              <i className="fa-solid fa-square-plus"></i>
              <span className="d-none d-md-flex">Crear Producto</span>
            </CButton>
          )}
          {user.role === 'Admin' && (
            <CButton
              className="rounded-3  d-flex align-items-center   gap-1"
              onClick={() => {
                setVisibleModalImportar(true)
                /*  setProductInput({}) */
              }}
              color="primary"
              title="Crear Producto"
            >
              <i className="fa-solid fa-file-csv"></i>
              <span className="d-none d-md-flex">Importar Productos / XSL</span>
            </CButton>
          )}
        </div>
        <div className="d-flex flex-wrap gap-2 ">
          <Link
            className="ms-2 d-flex align-items-center   gap-1 btn btn-secondary text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
            to={'/categorias'}
            title="Categorias"
          >
            <i className="fa-solid fa-list"></i>
            <span className="d-none d-md-flex">Categorias</span>
          </Link>

          <Link
            className="d-flex align-items-center ms-2 btn btn-warning text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
            to={'/productos/tallas'}
            title="Tallas"
          >
            <i className="fa-solid fa-tag me-2"></i>
            <span className="d-none d-md-flex">Tallas</span>
          </Link>
        </div>
      </div>

      {/* <Link
        className="ms-2 btn btn-secondary text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
        to={'/categorias'}
      >
        Categorias
      </Link> */}

      <ProductTable
        products={productsAll && productsAll}
        setProductoSelecionadoEditar={setProductoSelecionadoEditar}
        setVisible2={setVisible2}
        setVisibleModalTallas={setVisibleModalTallas}
        setVisibleModalImages={setVisibleModalImages}
      />

      {/* MODAL CREAR */}
      <CModal
        backdrop="static"
        keyboard={false}
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>CREAR PRODUCTO</CModalTitle>
        </CModalHeader>
        <ProductForm
          categories={categories}
          setVisible={setVisible}
          getAllProducts={getAllProducts}
        />
      </CModal>

      {/* MODAL ACTUALIZAR */}
      <CModal
        backdrop="static"
        keyboard={false}
        size="lg"
        visible={visible2}
        onClose={() => setVisible2(false)}
      >
        <CModalHeader onClose={() => setVisible2(false)}>
          <CModalTitle>ACTUALIZAR PRODUCTO</CModalTitle>
        </CModalHeader>

        <ProductForm
          categories={categories}
          setVisible={setVisible2} /* onSubmit={onEditProduct} */
          producto={productoSelecionadoEditar}
          getAllProducts={getAllProducts}
        />
      </CModal>

      {/* MODAL TALLAS */}
      <CModal
        backdrop="static"
        keyboard={false}
        size="lg"
        visible={visibleModalTallas}
        onClose={() => setVisibleModalTallas(false)}
      >
        <CModalHeader onClose={() => setVisibleModalTallas(false)}>
          <CModalTitle>TALLAS</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ProductSize
            getAllProducts={getAllProducts}
            productoSelecionadoEditar={productoSelecionadoEditar}
          />
        </CModalBody>
      </CModal>

      {/* MODAL Imagenes */}
      <CModal
        backdrop="static"
        keyboard={false}
        size="lg"
        visible={visibleModalImages}
        onClose={() => setVisibleModalImages(false)}
      >
        <CModalHeader onClose={() => setVisibleModalImages(false)}>
          <CModalTitle>Imagenes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ImagesProduct
            setProductoSelecionadoEditar={setProductoSelecionadoEditar}
            productoSelecionadoEditar={productoSelecionadoEditar}
            getAllProducts={getAllProducts}
          />
        </CModalBody>
      </CModal>
      {/* MODAL Importar */}
      <CModal
        backdrop="static"
        keyboard={false}
        size="lg"
        visible={visibleModalImportar}
        onClose={() => setVisibleModalImportar(false)}
      >
        <CModalHeader onClose={() => setVisibleModalImportar(false)}>
          <CModalTitle>Importar Productos</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ImportForm />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ProductList
