const { urlBase } = window.runConfig;

const apiCall = ({
  path = "",
  method = "GET",
  query = null,
  token = null,
  data = null,
  callback = null,
  onError = null
}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const params = {
    method,
    headers
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  let url = urlBase + path;
  if (query) {
    url += `?${Object.keys(query)
      .map(k => `${k}=${query[k]}`)
      .join("&")}`;
  }

  fetch(url, params)
    .then(resp => {
      // console.log(`returned: ${resp.status}`);
      if (resp.status !== 200) {
        if (onError) {
          resp.json()
          .then(x => {
            onError(x);
          });
        } else {
          throw new Error(`bad httpd code: ${resp.status}`);
        }
      } else if (callback) {
        resp.json().then(js => {
          callback(js);
        });
      }
    })
    .catch(error => {
      console.log(`catch: ${error}`);
      if (onError) {
        onError(error);
      } else {
        // alert(`API error: ${error}`);
        console.log(`API error: ${error}`);
        console.log("on: " + url);
      }

      // if (token) {
      //   apiLogout();
      // }
    });
};

export default apiCall;
