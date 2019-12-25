import React from "react";
import { BOOKHOUSEAPI } from "../config";

const ShowImage = ({ item, url }) => (
  <div>
    <img
      src={`${BOOKHOUSEAPI}/${url}/image/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </div>
);

export default ShowImage;
