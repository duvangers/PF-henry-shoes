import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./component/home/home";
import Navbar from "./component/navbar/navbar.jsx";
import ProductDetail from "./component/productDetail/productDetail";
import Footer from "./component/footer/footer";
import { Questions } from "./component/question/question";
import Copyright from "./component/copyright/copyright";

import Terms from "./component/terms/terms";
import CarShopContainer from "./component/carShop/Container/CarshopContainer";
import GeneralContainer from "./component/cardFilters/GeneralContainer";
import { InfoProfile } from "./component/infoProfile/infoProfile";

import ListProductsAdmin from "./panelAdmin/listproducts/ListProductsAdmin";
import New from "./panelAdmin/new/New";

import ListClients from "./panelAdmin/listClients/ListClients";
import HomeAdmin from "./panelAdmin/homeAdmin/HomeAdmin";
import ListOrdersAdmin from "./panelAdmin/listOrders/ListOrdersAdmin";
import DetailAdmin from "./panelAdmin/single/DetailAdmin";

//    User Panel
import HomeUser from "./panelUser/homeUser/HomeUser";
import ListOrders from "./panelUser/listOrders/ListOrdenes";
import DetailUser from "./panelUser/userDetail/userDetail";
import Review from "./panelUser/ratingReviews/rating";

import { useSelector } from "react-redux";

function App() {
  const userLog = useSelector((state) => state.UserLog);
  return (
    <div className="container-fluid text-center">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/productDetails/:id" element={<ProductDetail />} />
        <Route exact path="/questions" element={<Questions />} />
        <Route exact path="/copyright" element={<Copyright />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/filters" element={<GeneralContainer />} />
        <Route exact path="/carshop" element={<CarShopContainer />} />
        <Route exact path="/infoperfil" element={<InfoProfile />} />
        <Route exact path="/paneladmin" element={<HomeAdmin />} />
        {!userLog.name ? (
          ""
        ) : userLog.roleId === 1 ? (
          <Route path="admin">
            {/* <Route index element={<DashBoard />} /> */}
            <Route index element={<HomeAdmin />} />
            <Route path="products/new" element={<New />} />
            <Route path="products" element={<ListProductsAdmin />} />
            <Route path="clients" element={<ListClients />} />
            <Route path="orders" element={<ListOrdersAdmin />} />
            <Route path="profile" element={<DetailAdmin />} />
          </Route>
        ) : (
          <Route path="user">
            {/* <Route index element={<HomeUser />} /> */}
            <Route index element={<Review />} />
            <Route path="orders" element={<ListOrders />} />
            <Route path="profile" element={<DetailUser />} />
            <Route path="update" element={<HomeUser />} />
            <Route path="reviews" element={<Review />} />
          </Route>
        )}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
