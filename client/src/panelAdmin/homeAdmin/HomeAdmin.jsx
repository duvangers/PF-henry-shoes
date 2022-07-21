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
  totalPrice,
} from "./filterFuntions";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllOrders());
    dispatch(getAllShoes());
  }, [dispatch]);

  var allUsers = useSelector((state) => state.Users),
    allOrders = useSelector((state) => state.Orders),
    allShoes = useSelector((state) => state.Shoes);

  const [type, setType] = useState(0),
    newUsers = filterToday(allUsers),
    newOrders = filterToday(allOrders),
    newShoes = filterToday(allShoes),
    dataToday = filterToday(datas, options[type].equal),
    data = dataToGraph(groupBy(dataToday, groups[options[type].groupBy]));

  const finished = dataToday.filter((o) => o.state === "Entregada"),
    approved = dataToday.filter((o) => o.state === "En proceso"),
    pending = dataToday.filter((o) => o.state === "En camino"),
    rejected = dataToday.filter((o) => o.state === "Cancelada"),
    dataFeatured = [
      { name: "Entregada", value: finished.length, color: "#00C49F" },
      { name: "En proceso", value: approved.length, color: "#0088FE" },
      { name: "En camino", value: pending.length, color: "#f0b11e" },
      { name: "Cancelada", value: rejected.length, color: "#ff5842" },
    ],
    all = dataToday.length ? dataToday : 1,
    value = (finished.length / all.length) * 100,
    total_revenue = totalPrice(finished);

  const users = {
      amount: allUsers.length,
      diff: newUsers.length,
    },
    orders = {
      amount: allOrders.length,
      diff: newOrders.length,
    },
    earnings = {
      amount: allOrders
        .map((product) => product.price_total)
        .reduce((prev, curr) => prev + curr, 0),
      diff: 20,
    },
    products = {
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
          {/* <Widget data={{ ...dataEarning, ...earnings }} /> */}
          <Widget data={{ ...dataProducts, ...products }} />
        </div>
        <div className="charts">
          <Featured
            className="featured"
            value={value.toFixed(2)}
            price_total={total_revenue}
            title={options[type].title}
            dataFeatured={dataFeatured}
          />
          <div className="graph">
            <ChooseType type={type} setType={setType} options={options} />
            <Chart title={null} aspect={2 / 1} data={data} />
          </div>
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default HomeAdmin;
