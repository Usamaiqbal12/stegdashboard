import apiCall from "./api";

const { emailName, tokenName } = window.runConfig;

const apiLogin = (email, password, success, failure) => {
  const data = { username: email, password };

  apiCall({
    path: "auth",
    method: "POST",
    data,
    callback: vals => {
      localStorage.setItem(tokenName, vals.access_token);
      localStorage.setItem(emailName, email);
      success();
    },
    onError: error => {
      failure(error.description);
    }
  });
};

const apiLogout = () => {
  localStorage.removeItem(tokenName);
};

const apiGetLogin = (callback) => {
  const email = encodeURIComponent(localStorage.getItem(emailName));
  const accessToken = localStorage.getItem(tokenName);

  const query = { email: email };
  apiCall({
    path: "api/v1/logins",
    method: "GET",
    token: accessToken,
    query,
    callback: vals => {
      callback(vals[0]);
    }
  });
};

const apiSetPassword = (password, success, failure) => {
  apiGetLogin((vals) => {
    const accessToken = localStorage.getItem(tokenName);
    const data = { password };

    apiCall({
      path: "api/v1/logins/" + vals.id,
      method: "PATCH",
      token: accessToken,
      data,
      callback: success,
      onError: failure
    });

  });
};

const apiUpdateLogin = (loginId, company, email, success, failure) => {
  localStorage.setItem(emailName, email);

  const accessToken = localStorage.getItem(tokenName);

  const data = {company_name: company, email: email };

  apiCall({
    path: "api/v1/logins/" + loginId,
    method: "PATCH",
    token: accessToken,
    data,
    callback: success,
    onError: failure
  })
};

const apiUpdateNotification = (loginId, getNotifications) => {
  const accessToken = localStorage.getItem(tokenName);

  const data = {get_notifications: getNotifications}

  apiCall({
    path: "api/v1/logins/" + loginId,
    method: "PATCH",
    token: accessToken,
    data
  })
};

const apiDisableAccount = (loginId, success, failure) => {
  const data = {client_enabled: false};
  const accessToken = localStorage.getItem(tokenName);

  apiCall({
    path: "api/v1/logins/" + loginId,
    method: "PATCH",
    token: accessToken,
    data,
    callback: vals => {
      apiLogout();
      success();
    },
    onError: failure
  });
};

const apiIsLoggedIn = () => {
  return localStorage.getItem(tokenName) !== null;
};

export {
  apiLogin,
  apiLogout,
  apiGetLogin,
  apiUpdateLogin,
  apiDisableAccount,
  apiSetPassword,
  apiIsLoggedIn,
  apiUpdateNotification
};
