import React from "react";
import { BOOKHOUSEAPI } from "../config";

const ShowImage = ({ item, url }) => (
  <div>
    <img
      align="left"
      src={`${BOOKHOUSEAPI}/${url}/image/${item._id}`}
      alt={item.name}
      className="card-img-top"
      style={{ width: "400px", height: "400px" }}
    />
  </div>
);

export default ShowImage;
