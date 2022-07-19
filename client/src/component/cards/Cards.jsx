// import Card from "../cardProduct/CardProduct";
// const style = {
//   padding: "0 5% 0 5%",
// };
// export default function Cards({ shoes }) {
//   // console.log(Object.keys(shoes[0]));
//   console.log(typeof shoes[0]);
//   shoes = shoes.slice(0, 4);
//   return (
//     <div className="container-fluid" style={style}>
//       <div className="row m-2">
//         <h1>OUR PRODUCTS</h1>
//       </div>
//       <div className="row">
//         {shoes &&
//           shoes?.map((s) => (
//             <div key={s.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
//               <Card
//                 id={s.id}
//                 // name={s.name}
//                 nickname={s.name}
//                 description={s.description}
//                 price={s.price}
//                 img={s.img}
//                 // stock={s.stock_total}
//                 stock_total={0}
//                 size_range={s.size_range}
//                 designer={s.designer}
//                 shoe_condition={s.shoe_condition}
//                 details={s.details}
//                 rating={s.rating}
//                 brand={s.brand}
//                 color={s.color}
//                 gender={s.gender}
//               />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
