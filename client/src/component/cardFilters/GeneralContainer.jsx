import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllShoes } from '../../redux/actions'
import CardsFiltered from './CardsFiltered'
import FiltersContainer from './FiltersContainer'
const style = {
  margin: '5px 0 0 0',
}
export default function GeneralContainer() {
  const dispatch = useDispatch()

  let shoes = useSelector(state => state.Shoes)

  useEffect(() => {
    if (!shoes.length) dispatch(getAllShoes())
  }, [])

  return (
    <div className="container-fluid justify-content-center d-flex p-0" style={style}>
      <FiltersContainer shoes={shoes} />

      <CardsFiltered dispatch={dispatch} />
    </div>
  )
}
