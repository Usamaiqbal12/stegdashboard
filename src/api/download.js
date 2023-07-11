import apiCall from "./api";

const { tokenName, urlBase } = window.runConfig;

const apiScansDownload = (project_id, callback) => {
  const accessToken = localStorage.getItem(tokenName);

  apiCall({
    path: "api/v1/scans?project_id=" + project_id,
    method: "GET",
    token: accessToken,
    callback: (js) => {
      var res = "id,code,end_user_id,latitude,longitude,location,project_id,"
          + "result,timestamp\n";
      js.map((el) => {
        res += el.id + "," + el.code + "," + el.end_user_id + "," + 
          el.latitude + "," + el.longitude + ",\"" + el.location + "\"," +
          el.project_id + "," + el.result + ",\"" + el.timestamp + "\"\n";
        return null;
      });

      callback(res);
    }
  });
};

const apiEncodingsDownload = (project_id, callback) => {
  const accessToken = localStorage.getItem(tokenName);
  const url = urlBase + "api/v1/codes?project_id=" + project_id + "&zip=true";

  const headers = {
    "Accept": "application/zip",
    "Authorization": "Bearer " + accessToken
  }

  const params = {
    method: "GET",
    headers
  }

  fetch(url, params)
  .then(resp => {
    return resp.blob();
  })
  .then(data => {
    callback(data);
  });
};

export {
  apiScansDownload,
  apiEncodingsDownload
}