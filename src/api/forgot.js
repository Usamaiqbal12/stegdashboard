import apiCall from "./api";

const apiForgot = (email, success, failure) => {
  const data = {
    username: email
  };

  apiCall({
    path: "api/v1/forgot",
    method: "POST",
    data,
    callback: vals => {
      success(vals);
    },
    onError: error => {
      failure(error);
    }
  });
};

const apiReset = (email, password, token, success, failure) => {
  const data = {
    username: email,
    password,
    token
  };

  apiCall({
    path: "api/v1/reset",
    method: "POST",
    data,
    callback: vals => {
      success(vals);
    },
    onError: error => {
      failure(error);
    }
  });
};

export {
  apiForgot,
  apiReset
};