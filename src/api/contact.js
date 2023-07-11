import apiCall from "./api";

const apiContact = (name, email, description, success, failure) => {
  const data = {
    name,
    email,
    description
  };

  apiCall({
    path: "api/v1/contactUs",
    method: "POST",
    data,
    callback: success,
    onError: failure
  });
};

export {
  apiContact
};