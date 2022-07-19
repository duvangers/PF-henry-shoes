import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Link } from "react-router-dom";

const Widget = ({ data }) => {
  console.log(data);
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">
          <Link
            to={data.linkTo}
            style={{ textDecoration: "none", color: "black" }}
          >
            {data.link}
          </Link>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.isMoney ? `+${data.diff}$` : `+${data.diff}`}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
