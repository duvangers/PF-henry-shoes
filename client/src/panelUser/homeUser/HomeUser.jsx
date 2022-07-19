import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Chart from "../components/chart/chart"
import Featured from "../components/featured/feactured";
import "./home.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux/actions"


const HomeUser = () => {
  const dispatch = useDispatch();
  const OrdersUser = useSelector((state)=> state.OrdersUser)
  useEffect(() => {
    dispatch(getAllOrdersUser(1));
  }, [dispatch]);
 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
          <Navbar />
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
