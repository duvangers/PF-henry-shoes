import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import { dataProducts, dataEarning, dataOrder, dataUser } from "./dataWidget";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllShoes, getUsers } from "../../redux/actions";
import ChooseType from "../components/chart/ChooseType";
import { groupBy } from "lodash";
import {
  datas,
  dataToGraph,
  filterToday,
  groups,
  options,
} from "./filterFuntions";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllOrders());
    dispatch(getAllShoes());
  }, [dispatch]);

  var allUsers = useSelector((state) => state.Users);
  var allOrders = useSelector((state) => state.Orders);
  var allShoes = useSelector((state) => state.Shoes);

  const [type, setType] = useState(0);
  const newUsers = filterToday(allUsers);
  const newOrders = filterToday(allOrders);
  const newShoes = filterToday(allShoes);

  const data = dataToGraph(
    groupBy(
      filterToday(datas, options[type].equal),
      groups[options[type].groupBy]
    )
  );
  const users = {
    amount: allUsers.length,
    diff: newUsers.length,
  };
  const orders = {
    amount: allOrders.length,
    diff: newOrders.length,
  };
  const earnings = {
    amount: allOrders
      .map((product) => product.price_total)
      .reduce((prev, curr) => prev + curr, 0),
    diff: 20,
  };
  const products = {
    amount: allShoes.length,
    diff: newShoes.length,
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget data={{ ...dataUser, ...users }} />
          <Widget data={{ ...dataOrder, ...orders }} />
          <Widget data={{ ...dataEarning, ...earnings }} />
          <Widget data={{ ...dataProducts, ...products }} />
        </div>
        <div className="charts">
          <Featured className="featured" />
          <div className="graph">
            <ChooseType type={type} setType={setType} options={options} />
            <Chart title={null} aspect={2 / 1} data={data} />
          </div>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
