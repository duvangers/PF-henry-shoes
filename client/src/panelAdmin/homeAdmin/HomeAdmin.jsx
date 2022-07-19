import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import { dataBalance, dataEarning, dataOrder, dataUser } from "./dataWidget";

const HomeAdmin = () => {
  const users = {
    amount: 20,
    diff: 5,
  };
  const orders = {
    amount: 6,
    diff: 2,
  };
  const earnings = {
    amount: 500,
    diff: 20,
  };
  const balance = {
    amount: 100,
    diff: 13,
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
          <Widget data={{ ...dataBalance, ...balance }} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
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
