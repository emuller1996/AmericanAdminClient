import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ProductSize.scss'
// eslint-disable-next-line react/prop-types
const ProductSize = ({ setSizesProduct, sizesProduct }) => {
  const [sizeAll, setSizeAll] = useState(undefined)
  const [sizeSelecionado, setsizeSelecionado] = useState(undefined)

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
    <div className="container_size p-4">
      <h4 className="text-start text-white">Tallas</h4>

      <div className="row g-2">
        <div className="col-6">
          <div className="input-group mb-3">
            <input
              disabled={!sizeSelecionado}
              type="text"
              className="form-control p-2"
              placeholder="8"
            />
            <button className="btn btn-size-save text-white fw-bold" type="button">
              Agregar
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="row g-3">
            {sizeAll &&
              sizeAll.map((s) => (
                <div key={s.size} className="col-4 col-md-4 col-xl-3  mb-2">
                  <div className={sizeSelecionado === s.id ? 'card_size_selected ' : 'card_size '}>
                    <label
                      htmlFor={s.hour}
                      className="text-center  fw-bold text-white w-100 h-100 m-0 p-2"
                    >
                      <input
                        type="radio"
                        name="hour"
                        value={s.id}
                        id={s.id}
                        hidden
                        onClick={(e) => {
                          setsizeSelecionado(parseInt(e.target.value))
                        }}
                      />
                      <span className=""> {s.size} </span>
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductSize
