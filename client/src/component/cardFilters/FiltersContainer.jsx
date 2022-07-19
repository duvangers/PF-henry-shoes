import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllColors, getAllGenders, getAllBrands, updateFilters } from '../../redux/actions'

import './FiltersContainer.css'

export default function FiltersContainer() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllColors())
    dispatch(getAllGenders())
    dispatch(getAllBrands())
  }, [dispatch])

  const colors = useSelector(state => state.Colors)
  const genders = useSelector(state => state.Genders)

  const [filters, setFilters] = useState({
    genders: [],
    prices: { min: 0, max: 100000 },
    colors: [],
  })

  function handleInputGendersClick(event) {
    let array

    if (filters.genders.includes(event.target.value)) {
      array = filters.genders.filter(value => value !== event.target.value)
    } else {
      array = filters.genders
      array.push(event.target.value)
    }
    setFilters({
      ...filters,
      genders: array,
    })
  }

  function handleInputGendersPrices(event) {
    let confi
    if (event.target.id === 'filterPrice_min') {
      confi = {
        ...filters.prices,
        min: event.target.value,
      }
    }
    if (event.target.id === 'filterPrice_max') {
      confi = {
        ...filters.prices,
        max: event.target.value,
      }
    }

    setFilters({
      ...filters,
      prices: confi,
    })
  }

  function handleInputColorsClick(event) {
    let array

    if (filters.colors.includes(event.target.value)) {
      array = filters.colors.filter(value => value !== event.target.value)
    } else {
      array = filters.colors
      array.push(event.target.value)
    }
    setFilters({
      ...filters,
      colors: array,
    })
  }
  //  Submit
  function handleSubmitGenders() {
    dispatch(updateFilters(filters))
  }

  function handleSubmitColors() {
    dispatch(updateFilters(filters))
  }

  function handleSubmitPrices() {
    dispatch(updateFilters(filters))
  }

  return (
    <div className="d-flex align-items-start flex-column" style={{ height: '200px' }}>
      <div className="modal-content p-2 my-1">
        <div className="col w-90 p-2 fw-bold" style={{ width: '200px' }}>
          GÉNERO
        </div>
        <ul className='list-group text-start mb-1'>
          {genders.map(e => (
            <li className="list-group-item">
              <input key={e.name} className='form-check-input me-1' type="checkbox" name={e.name} value={e.name} onClick={handleInputGendersClick} />
              <label>{e.name}</label>
            </li>
          ))}
        </ul>
        <button className='btn btn-primary' onClick={handleSubmitGenders}>Aplicar </button>
      </div>
      <div className='modal-content p-2 my-1'>
        <div className="col w-90 p-2 fw-bold" style={{ width: '200px' }}>
          PRECIO
        </div>
        <div className='form-floating mb-1'>
          <input id="filterPrice_min" className='form-control' type="numbers" min="0" max="100000" value={filters.prices.min} onChange={handleInputGendersPrices} placeholder='a' />
          <label for='filterPrice_min'>Mín.</label>
        </div>  
        <div className='form-floating mb-1'>
          <input id="filterPrice_max" className='form-control' type="numbers" min="0" max="100000" value={filters.prices.max} onChange={handleInputGendersPrices} placeholder='a' />
          <label for='filterPrice_max'>Max.</label>
        </div>
        <button className='btn btn-primary' onClick={handleSubmitPrices}>Aplicar</button>
      </div>
      <div className='modal-content h-auto p-2 my-1'>
        <div className="p-2 fw-bold" style={{ width: '200px' }}>
          COLOR
        </div>
        <ul className='list-group text-start overflow-auto mb-1 colorFilters_box'>
          {colors.map(e => (
            <li className='list-group-item'>
              <input key={e.name} className='form-check-input me-1' type="checkbox" name={e.name} value={e.name} onClick={handleInputColorsClick} />
              <label>{e.name}</label>
            </li>
          ))}
        </ul>
        <button className='btn btn-primary' onClick={handleSubmitColors}>Aplicar </button>
      </div>
    </div>
  )
}
