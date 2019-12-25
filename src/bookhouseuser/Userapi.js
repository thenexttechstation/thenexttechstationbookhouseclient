import { BOOKHOUSEAPI } from "../config";

export const findProfileByUserId = (bookhouseuserId, token) => {
  return fetch(`${BOOKHOUSEAPI}/bookhouseuser/${bookhouseuserId}`, {
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

export const update = (bookhouseuserId, token, bookhouseuser) => {
  console.log("inside update" + JSON.stringify(bookhouseuser));
  return fetch(`${BOOKHOUSEAPI}/bookhouseuser/update/${bookhouseuserId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(bookhouseuser)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateUser = (bookhouseuser, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.bookhouseuser = bookhouseuser;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

export const getBookPurchaseHistory = (bookhouseUserid, token) => {
  return fetch(
    `${BOOKHOUSEAPI}/orderspurchase/by/bookhouseuser/${bookhouseUserid}`,
    {
      method: "GET",
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
