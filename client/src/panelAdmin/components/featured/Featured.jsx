import "./featured.scss";
import { PieChart, Pie, Cell, Label } from "recharts";
const Featured = ({ value, price_total, title, dataFeatured }) => {
  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#ff5842"];

  return (
    <div className="featured">
      <div className="top">
        <p className="title">Exito de ventas: </p>
        <p className="title"> {title}</p>
      </div>
      <div className="bottom">
        <PieChart width={180} height={120}>
          <Pie
            data={dataFeatured}
            innerRadius={40}
            outerRadius={55}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
          >
            <Label
              style={{ color: "blue" }}
              value={`${value ? value : "--"}%`}
              position="center"
            />
            {dataFeatured.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="legend">
          {dataFeatured?.map((e) => (
            <strong
              className="itemL"
              key={e.name}
              style={{ color: e.color, backgroundColor: `${e.color}30` }}
            >
              ◉{e.name}
            </strong>
          ))}
        </div>
        <p className="amount">${price_total}</p>
        <p className="desc">
          El índice de éxito es la relación entre ordenes finalizadas y ordenes
          canceladas
        </p>
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
