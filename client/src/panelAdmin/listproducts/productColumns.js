import SizeRange from "./SizeRange";

export const productColumns = [
  {
    field: "product",
    headerName: "Producto",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name.split("'")[1]}
        </div>
      );
    },
  },
  { field: "stock_total", headerName: "Stock Total", width: 90 },
  { field: "price", headerName: "Precio $/.", width: 100 },
  {
    field: "color",
    headerName: "Color",
    width: 80,
    renderCell: (params) => {
      return <>{params.row.color.name}</>;
    },
  },
  {
    field: "size_range",
    headerName: "Tallas",
    width: 150,
    renderCell: ({ row }) => (
      <SizeRange key={row.size_range.size} size_range={row.size_range} />
    ),
  },
  {
    field: "category",
    headerName: "Categoria",
    width: 110,
    renderCell: (params) => {
      return <>{params.row.categories.map((c) => c.name)}</>;
    },
  },

  {
    field: "brand_name",
    headerName: "Marca",
    width: 100,
    renderCell: (params) => {
      return <>{params.row.brand.name}</>;
    },
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
