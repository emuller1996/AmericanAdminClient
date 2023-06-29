import axios from 'axios'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line react/prop-types
const ProductSize = ({ setSizesProduct, sizesProduct }) => {
  const [sizeAll, setSizeAll] = useState(undefined)

  useEffect(() => {
    getAllSizes()
  }, [])

  const getAllSizes = async () => {
    try {
      const result = await axios.get('/sizes')
      console.log(result.data.sizes)
      setSizeAll(result.data.sizes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSize = (e) => {
    /* console.log(e.target.name)
    setSizesProduct([ 
      {
        [e.target.name]: e.target.value,
      },
    ]) */
  }

  return (
    <div>
      <h4 className="text-center">Tallas</h4>

      <div className="row g-2">
        {sizeAll &&
          sizeAll.map((s) => (
            <div key={s.id} className="col-auto">
              <div className="card">
                <div className="input-group">
                  <div className="input-group-text">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      name=""
                      value=""
                      aria-label="Checkbox for following text input"
                    />
                    <span className="ms-2">{` ${s.id} - ${s.size}`}</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name={s.id}
                    aria-label="Text input with checkbox"
                    onChange={handleSize}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
export default ProductSize
