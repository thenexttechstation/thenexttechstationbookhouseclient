import React from "react";
import { BOOKHOUSEAPI } from "../config";
import { width } from "@material-ui/system";

const ShowImage = ({ item, url }) => (
  <div>
    <img
      align="left"
      src={`${BOOKHOUSEAPI}/${url}/image/${item._id}`}
      alt={item.name}
      className="card-img-top"
      style={{ height: "240px", width: "240px" }}
    />
  </div>
);

export default ShowImage;
