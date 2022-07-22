import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllColors, getAllGenders, getAllBrands, updateFilters } from '../../redux/actions'

import './FiltersContainer.css'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export default function FiltersContainer() {
  const dispatch = useDispatch()

  const colors = useSelector(store => store.Colors)
  const genders = useSelector(store => store.Genders)
  const products = useSelector(store => store.backupFilters)

  const mathMin = () => {
    let arrayPrices = products.map(value => value.price)
    if (!arrayPrices.length) arrayPrices = [0]
    return Math.min(...arrayPrices)
  }

  const mathMax = () => {
    let arrayPrices = products.map(value => value.price)
    if (!arrayPrices.length) arrayPrices = [10]
    return Math.max(...arrayPrices)
  }

  const [gender, setGender] = useState([])
  const [color, setColor] = useState([])
  const [price, setPrice] = useState([mathMin(), mathMax()])
  const [priceInput, setPriceInput] = useState([mathMin(), mathMax()])

  useEffect(() => {
    dispatch(getAllColors())
    dispatch(getAllGenders())
    dispatch(getAllBrands())
  }, [dispatch])

  const handleChangeGender = event => {
    const array = gender.includes(event.target.name) ? gender.filter(value => value !== event.target.name) : gender.push(event.target.name) && gender
    setGender([...array])
  }

  const handleChangeColor = event => {
    const array = color.includes(event.target.name) ? color.filter(value => value !== event.target.name) : color.push(event.target.name) && color
    setColor([...array])
  }

  const handleChangePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < 10) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], mathMax() - 10)
        setPrice([clamped, clamped + 10])
        setPriceInput([clamped, clamped + 10])
      } else {
        const clamped = Math.max(newValue[1], 10)
        setPrice([clamped - 10, clamped])
        setPriceInput([clamped - 10, clamped])
      }
    } else {
      setPrice(newValue)
      setPriceInput(newValue)
    }
  }

  const handleChangePriceInput = event => {
    if (event.target.name === 'min') setPriceInput([parseInt(event.target.value), priceInput[1]])
    else if (event.target.name === 'max') setPriceInput([priceInput[0], parseInt(event.target.value)])
  }

  const handleButtonClick = () => {
    dispatch(
      updateFilters({
        genders: gender,
        colors: color,
        prices: { min: price[0], max: price[1] },
      })
    )
  }

  return (
    <div className="d-flex align-items-start flex-column" style={{ height: '200px' }}>
      <Box className="modal-content p-2 my-1">
        <Typography align="left" variant="button" display="block">
          GÉNERO
        </Typography>
        <Divider />
        <FormGroup onChange={handleChangeGender}>
          {genders.map(e => (
            <FormControlLabel control={<Checkbox color="default" name={e.name} />} label={e.name} />
          ))}
        </FormGroup>
        <Button variant="contained" onClick={handleButtonClick}>
          Aplicar
        </Button>
      </Box>
      <Box className="modal-content p-2 my-1">
        <Typography align="left" variant="button" display="block">
          PRECIO
        </Typography>
        <Divider />
        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          size="small"
          min={mathMin()}
          max={mathMax()}
          value={price}
          onChange={handleChangePrice}
          valueLabelFormat={`$${price[0]} - $${price[1]}`}
          valueLabelDisplay="auto"
          disableSwap
        />
        <Box sx={{ width: 200, display: 'flex' }}>
          <div className="form-floating mb-1 p-1">
            <TextField label="Mín" id="outlined-size-small" defaultValue={priceInput[0]} type="number" value={priceInput[0]} onChange={handleChangePriceInput} size="small" name="min" />
          </div>
          <div className="form-floating mb-1 p-1">
            <TextField label="Máx" id="outlined-size-small" defaultValue={priceInput[1]} type="number" value={priceInput[1]} size="small" onChange={handleChangePriceInput} name="max" />
          </div>
        </Box>
        <Button variant="contained" onClick={handleButtonClick}>
          Aplicar
        </Button>
      </Box>
      <Box className="modal-content h-auto p-2 my-1">
        <Typography align="left" variant="button" display="block">
          COLOR
        </Typography>
        <Divider />
        <Paper sx={{ width: 200, height: 230, marginTop: 1, marginBottom: 1, padding: 1, overflow: 'auto' }}>
          <FormGroup onChange={handleChangeColor}>
            {colors.map(e => (
              <FormControlLabel control={<Checkbox color="default" name={e.name} />} label={e.name} />
            ))}
          </FormGroup>
        </Paper>
        <Button variant="contained" onClick={handleButtonClick}>
          Aplicar
        </Button>
      </Box>
    </div>
  )
}
