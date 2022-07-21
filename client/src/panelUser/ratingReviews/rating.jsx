import './list.scss'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'

import TableReviews from '../components/ratingReviews/table'


import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserReviews } from '../../redux/actions'

const ListReviewsUser = () => {
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.UserLog)

  useEffect(() => {
    dispatch(getAllUserReviews(1))
  }, [dispatch, userDetails])
  // const reviews = useSelector(state => state.ReviewsUser)


  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <TableReviews  />
      </div>
    </div>
  )
}

export default ListReviewsUser
