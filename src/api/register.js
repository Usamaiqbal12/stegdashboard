import apiCall from "./api";

const apiRegister = (company, firstName, lastName, email, password, success,
    failure) => {
  const data = {
    company,
    first_name: firstName,
    last_name: lastName,
    username: email,
    password
  };

  apiCall({
    path: "api/v1/accounts",
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

export default apiRegister;