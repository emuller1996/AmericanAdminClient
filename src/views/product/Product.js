import React, { useEffect, useRef, useState } from 'react'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import ProductTable from './ProductTable'
import axios from 'axios'
import ProductForm from './ProductForm'
import { Link } from 'react-router-dom'
import { getAllProductsService } from 'src/services/product.services'
import ProductSize from './sizes/ProductSize'
import ImagesProduct from './images/ImagesProduct'

const ProductList = () => {
  const [productsAll, setProductsAll] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visibleModalTallas, setVisibleModalTallas] = useState(false)
  const [visibleModalImages, setVisibleModalImages] = useState(false)

  const [sizesProduct, setSizesProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [productoSelecionadoEditar, setProductoSelecionadoEditar] = useState(undefined)

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

  const onShowModalTallas = (e, pro) => {
    /* setProductInput(e) */
    setVisibleModalTallas(true)
    setProductoSelecionadoEditar(pro)
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center g-2 mb-2">
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
            className="d-flex align-items-center ms-2 btn btn-warning text-white fw-semibold text-decoration-none rounded-3 shadow-sm"
            to={'/productos/tallas'}
          >
            <i className="fa-solid fa-tag me-2"></i>
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
          <ImagesProduct productoSelecionadoEditar={productoSelecionadoEditar} />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ProductList
