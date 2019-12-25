import { BOOKHOUSEAPI } from "../config";
import queryString from "query-string";

export const getProducts = sortBy => {
  return fetch(`${BOOKHOUSEAPI}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
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

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  console.log("details" + filters);
  return fetch(`${BOOKHOUSEAPI}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log("Inside getfilter" + JSON.stringify(response));
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const listProducts = params => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${BOOKHOUSEAPI}/products/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listAuthorProducts = params => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${BOOKHOUSEAPI}/products/authorsearch?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const fetchSingleBook = bookhouseproductId => {
  return fetch(`${BOOKHOUSEAPI}/product/${bookhouseproductId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const fetchRelatedProduct = bookhouseproductId => {
  return fetch(`${BOOKHOUSEAPI}/relatedproducts/${bookhouseproductId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getBraintreeClientToken = (bookhouseuserId, token) => {
  console.log("Inside getBraintreeClientToken" + bookhouseuserId);
  console.log("Inside getBraintreeClientToken" + token);

  return fetch(`${BOOKHOUSEAPI}/braintree/getToken/${bookhouseuserId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const processPayment = (bookhouseuserId, token, paymentData) => {
  return fetch(`${BOOKHOUSEAPI}/braintree/payment/${bookhouseuserId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
export function matchStocks(state, value) {
  return state.bookname.toLowerCase().indexOf(value.toLowerCase()) !== -1;
}
export const createBookhouseOrder = (
  bookhouseuserId,
  token,
  createOrderData
) => {
  console.log(
    "InsidecreateBookhouseOrder " + JSON.stringify({ order: createOrderData })
  );
  return fetch(`${BOOKHOUSEAPI}/order/create/${bookhouseuserId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: createOrderData })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
