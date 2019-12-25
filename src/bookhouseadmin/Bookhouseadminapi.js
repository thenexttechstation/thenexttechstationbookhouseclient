import { BOOKHOUSEAPI } from "../config";
export const addCategory = (userId, token, categoryname) => {
  return fetch(`${BOOKHOUSEAPI}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(categoryname)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const addProducts = (userId, token, product) => {
  return fetch(`${BOOKHOUSEAPI}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log("Inside error" + err);
    });
};

export const updateOrderStatus = (
  bookhouseuserId,
  signedtoken,
  orderId,
  status
) => {
  return fetch(`${BOOKHOUSEAPI}/order/${orderId}/status/${bookhouseuserId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${signedtoken}`
    },
    body: JSON.stringify({ status, orderId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getOrderStatusValues = (bookhouseuserId, token) => {
  return fetch(`${BOOKHOUSEAPI}/order/orderstatus-values/${bookhouseuserId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getcategories = () => {
  return fetch(`${BOOKHOUSEAPI}/category/all`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const listOrders = (bookhouseuserId, token) => {
  return fetch(`${BOOKHOUSEAPI}/order/list/${bookhouseuserId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProducts = () => {
  return fetch(`${BOOKHOUSEAPI}/products?limit=undefined`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = (bookhouseproductId, bookhouseuserId, token) => {
  return fetch(
    `${BOOKHOUSEAPI}/product/remove/${bookhouseproductId}/${bookhouseuserId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = bookhouseproductId => {
  return fetch(`${BOOKHOUSEAPI}/product/${bookhouseproductId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProduct = (
  bookhouseproductId,
  bookhouseuserId,
  token,
  product
) => {
  return fetch(
    `${BOOKHOUSEAPI}/product/update/${bookhouseproductId}/${bookhouseuserId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
