import Card from '../cardProduct/CardProduct'

export default function Carousel({ shoes }) {
  const shoesCarousel = shoes.slice(0, 5)
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          {shoesCarousel &&
            shoesCarousel?.map(s => (
              <div
                key={s.id}
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                style={{
                  // minwidth: "300px",
                  // maxwidth: "350px",
                  maxheight: '520px',
                }}
              >
                <Card
                  key={s.id}
                  name={s.name}
                  brand_name={s.brand_name}
                  description={s.description}
                  price={s.price}
                  img={s.img}
                  stock={s.stock}
                  color={s.color}
                  size_range={s.size_range}
                  material={s.material}
                  released={s.released}
                  gender={s.gender}
                  designer={s.designer}
                  details={s.details}
                  shoe_condition={s.shoe_condition}
                  rating={s.rating}
                  categories={s.categories}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
