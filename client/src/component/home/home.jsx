import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShoes, getAllCategories } from "../../redux/actions";
import { Wrapper } from "../wrapper/wrapper";
import Footer from "../footer/footer.jsx";
import Card from "../cardProduct/CardProduct";
const style = {
  padding: "0 5% 0 5%",
};
// import Loading from "../loading/loading";

export function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllShoes());
    dispatch(getAllCategories());
  }, [dispatch]);

  let shoes = useSelector((state) => state.Shoes);
  shoes = shoes.slice(0, 4);
  // console.log(shoes[0].nickname);
  return (
    <div className="home p-1" style={{ display: "grid" }}>
      <Wrapper></Wrapper>
      <div className="container-fluid" style={style}>
        <div className="row m-2">
          <h1>OUR PRODUCTS</h1>
        </div>
        <div className="row">
          {shoes &&
            shoes?.map((s) => (
              <div key={s.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card
                  id={s.id}
                  name={s.name}
                  nickname={s.nickname}
                  description={s.description}
                  price={s.price}
                  img={s.img}
                  // stock={s.stock_total}
                  stock_total={s.stock_total}
                  size_range={s.size_range}
                  designer={s.designer}
                  shoe_condition={s.shoe_condition}
                  details={s.details}
                  rating={s.rating}
                  brand={s.brand}
                  color={s.color}
                  gender={s.gender}
                />
              </div>
            ))}
        </div>
      </div>
      {/* <Carousel shoes={shoes} /> */}
    </div>
  );
}
