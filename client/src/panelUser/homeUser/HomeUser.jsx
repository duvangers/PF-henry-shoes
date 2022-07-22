import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Chart from "../components/chart/chart"
import Featured from "../components/featured/feactured";
import "./home.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getAllOrdersUser, getAllUserReviews } from "../../redux/actions"


const HomeUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllOrdersUser(1));
    // dispatch(getAllUserReviews(1));
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
