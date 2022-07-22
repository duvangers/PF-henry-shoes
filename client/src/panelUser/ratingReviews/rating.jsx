import './list.scss'
import Sidebar from '../components/sidebar/Sidebar'

import TableReviews from '../components/ratingReviews/table'
import Navbar from '../components/navbar/Navbar'


import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserReviews } from '../../redux/actions/index'


const ListReviewsUser = () => {
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.UserLog)

  useEffect(() => {
    dispatch(getAllUserReviews(1))
  }, [dispatch, userDetails])
  const reviews = useSelector(state => state.ReviewsUser)
  const Review = reviews.reviews
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
         { Review ? (
        <TableReviews reviews={Review} />
        ): (<div> No hay Reviews Disponibles </div>)
         }
      </div>
    </div>
  )
}

export default ListReviewsUser
