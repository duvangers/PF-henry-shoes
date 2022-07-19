import CardShop from "../Card/CardShop";
import "./Products.scss";
export default function ProductsContainer({ carProducts }) {
  return (
    <>
      {carProducts && carProducts.length ? (
        carProducts?.map((s) => (
          <div key={s.key_value}>
            <CardShop
              key_value={s.key_value}
              id={s.id}
              nickname={s.nickname}
              price={s.price}
              img={s.img}
              rating={s.rating}
              brand={s.brand}
              stock_size={s.stock_size}
              color={s.color}
              gender={s.gender}
              size_range={s.size_range}
              size={s.size}
              amount={s.amount}
              // material={s.material}
              // released={s.released}
              // designer={s.designer}
              // details={s.details}
              // shoe_condition={s.shoe_condition}
              // categories={s.categories}
            />
          </div>
        ))
      ) : (
        <h1 className="text">El carrito está vacío</h1>
      )}
    </>
  );
}
