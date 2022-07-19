import './list.scss'
import Sidebar from '../components/sidebar/Sidebar'

import CollapsibleTable from '../components/dataTable/Datatable2'
import Navbar from '../components/navbar/Navbar'
// import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersUser } from '../../redux/actions/index'
// import { ordersColumns } from "./ordersColumns";
// import { getAllShoes } from "../../redux/actions";

const ListOrders = () => {
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.UserLog)

  useEffect(() => {
    dispatch(getAllOrdersUser(userDetails.id))
  }, [dispatch, userDetails])
  const OrdersUser = useSelector(state => state.OrdersUser)
  // const  orderRows= useSelector((state) => state.Shoes);
  // console.log(OrdersUser.ordens.map(e=>e))

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CollapsibleTable Orders={OrdersUser} />
      </div>
    </div>
  )
}
// Orders={OrdersUser}
export default ListOrders
