import React from 'react'
import { CRow, CCol } from '@coreui/react'
import PropTypes from 'prop-types'
import './Category.scss'

const CategoryList = ({ categories, setVisibleEdit }) => {
  return (
    <CRow className="g-2">
      {categories &&
        categories.map((c) => (
          <CCol key={c.id} sm="6">
            <div className="card-category">
              <div className="row justify-content-center align-items-center g-2">
                <div className="col-8">
                  <p>{c.name}</p>
                </div>
                <div className="col-4 text-end">
                  <button
                    onClick={() => setVisibleEdit(true)}
                    type="button"
                    className="btn btn-sm btn-info text-white fw-semibold "
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </CCol>
        ))}
    </CRow>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  setVisibleEdit: PropTypes.func.isRequired,
}
export default CategoryList
