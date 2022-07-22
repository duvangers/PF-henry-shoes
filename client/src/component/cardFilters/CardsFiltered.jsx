import { useState } from 'react'
import { useSelector } from 'react-redux'

import Card from '../cardProduct/CardProduct'

import './Pagination.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function CardsFiltered() {
  const [pageNumber, setPageNumber] = useState(0)
  const shoesFiltered = useSelector(state => state.Filters)
  const usersPerPage = 12
  const pagesVisited = pageNumber * usersPerPage
  const shoes = shoesFiltered.slice(pagesVisited, pagesVisited + usersPerPage)
  const pageCount = Math.ceil(shoesFiltered.length / usersPerPage)

  const changePage = page => {
    setPageNumber(page - 1)
  }

  return (
    <div className="App">
      <Stack direction="row" spacing={12} sx={{ marginBottom: 2, alignItems: 'center' }}>
        <Typography align="center">Resultados: {shoesFiltered.length}</Typography>
        <Stack direction="row">
          <Pagination count={pageCount} defaultPage={1} color="secondary" onChange={(event, page) => changePage(page)} />
        </Stack>
        <Typography align="center">
          Pág. {pageNumber + 1} de {pageCount}
        </Typography>
      </Stack>
      <div className="container-fluid overflow-auto" style={{ height: '800px', width: '900px' }}>
        <div className="row">
          {shoes && shoes.length ? (
            shoes?.map(s => (
              <div
                key={s.id}
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                style={{
                  minwidth: '300px',
                  // maxwidth: "350px",
                  maxheight: '120px',
                }}
              >
                <Card
                  key={s.id}
                  id={s.id}
                  name={s.name}
                  brand={s.brand}
                  description={s.description}
                  price={s.price}
                  img={s.img}
                  stock_total={s.stock_total}
                  color={s.color}
                  size_range={s.size_range}
                  material={s.material}
                  released={s.released}
                  gender={s.gender}
                  designer={s.designer}
                  details={s.details}
                  shoe_condition={s.shoe_condition}
                  rating={s.rating}
                  categories={s.categories}
                />
              </div>
            ))
          ) : (
            <h1>No hay coincidencias</h1>
          )}
        </div>
      </div>
      <Stack direction="row" spacing={12} sx={{ marginBottom: 2, marginTop: 2, alignItems: 'center' }}>
        <Typography align="center">Resultados: {shoesFiltered.length}</Typography>
        <Stack direction="row">
          <Pagination count={pageCount} defaultPage={1} color="secondary" onChange={(event, page) => changePage(page)} />
        </Stack>
        <Typography align="center">
          Pág. {pageNumber + 1} de {pageCount}
        </Typography>
      </Stack>
    </div>
  )
}
