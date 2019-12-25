import { BOOKHOUSEAPI } from "../config";

export const createanuserentry = bookhouseuser => {
  return fetch(`${BOOKHOUSEAPI}/socialuser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookhouseuser)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      //console.log(error);
    });
};

export const registerUser = bookhouseuser => {
  return fetch(`${BOOKHOUSEAPI}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookhouseuser)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const loginUser = bookhouseuser => {
  console.log("Inside LoginUser");
  return fetch(`${BOOKHOUSEAPI}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookhouseuser)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const authenticateUser = (userdata, next) => {
  console.log("Inside authenticateUser");
  if (typeof window != undefined) {
    localStorage.setItem("jwt", JSON.stringify(userdata));
    next();
  }
};

export const authenticateSocialUser = (userdata, next) => {
  console.log("Inside authenticateUser");
  if (typeof window != undefined) {
    localStorage.setItem("socialjwt", JSON.stringify(userdata));
    next();
  }
};

export const logout = next => {
  if (typeof window != undefined) {
    localStorage.removeItem("jwt");
    //localStorage.removeItem("socialjwt");
    next();
    return fetch(`${BOOKHOUSEAPI}/logout`, {
      method: "GET"
    })
      .then(response => {
        console.log("signout", response);
      })
      .catch(error => {
        console.log("error", error);
      });
  }
};

export const sociallogout = next => {
  if (typeof window != undefined) {
    localStorage.removeItem("socialjwt");
    //localStorage.removeItem("socialjwt");
    next();
    return fetch(`${BOOKHOUSEAPI}/logout`, {
      method: "GET"
    })
      .then(response => {
        console.log("signout", response);
      })
      .catch(error => {
        console.log("error", error);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const isSocialAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }

  if (localStorage.getItem("socialjwt")) {
    return JSON.parse(localStorage.getItem("socialjwt"));
  } else {
    return false;
  }
};
