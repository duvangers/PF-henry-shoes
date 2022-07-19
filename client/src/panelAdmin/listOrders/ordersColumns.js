export const ordersColumns = [
  {
    field: "product",
    headerName: "Producto",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name.split("'")[1]}
        </div>
      );
    },
  },
  { field: "stock", headerName: "Stock", width: 70 },
  { field: "price", headerName: "Precio $/.", width: 100 },
  { field: "color", headerName: "Color", width: 80 },
  { field: "size_range", headerName: "Tallas", width: 240 },
  {
    field: "category",
    headerName: "Categoria",
    width: 110,
  },

  {
    field: "brand_name",
    headerName: "Marca",
    width: 100,
  },
  // {
  //   field: "color",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
