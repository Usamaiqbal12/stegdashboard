import apiCall from "./api";

const { tokenName } = window.runConfig;

const apiFetchScans = (summary, project_id, callback) => {
  const accessToken = localStorage.getItem(tokenName);

  const query = {}
  if (summary) {
    query.summary = true;
  }

  if (project_id !== -1) {
    query.project_id = project_id;
  }

  setTimeout(
    apiCall({
      path: "api/v1/scans",
      query,
      method: "GET",
      token: accessToken,
      callback: callback,
    }), 0
  );
};

const apiScanStats = (projectId, callback) => {
  const accessToken = localStorage.getItem(tokenName);

  let path = "api/v1/scans?stats=true";
  if (projectId !== -1) {
    path = path + "&project_id=" + projectId;
  }

  setTimeout(
    apiCall({
      path,
      method: "GET",
      token: accessToken,
      callback: callback,
    }), 0
  );
};

export {
  apiFetchScans,
  apiScanStats
};