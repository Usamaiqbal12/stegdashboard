import apiCall from "./api";

const { tokenName, urlBase } = window.runConfig;

const apiFetchProjects = (callback) => {
  const accessToken = localStorage.getItem(tokenName);

  setTimeout(
    apiCall({
      path: "api/v1/projects",
      method: "GET",
      token: accessToken,
      callback: callback,
    }), 0
  );
};

const apiFetchProject = (projectId, callback) => {
  const accessToken = localStorage.getItem(tokenName);

  setTimeout(
    apiCall({
      path: "api/v1/projects/" + projectId,
      method: "GET",
      token: accessToken,
      callback: callback,
    }), 0
  );
};

const apiNewProject = (vals, success, failure) => {
  const accessToken = localStorage.getItem(tokenName);

  const name_internal = vals.projectName.split(' ').join('-').toLowerCase();

  const p_data = {
    name: vals.projectName,
    project_url: vals.projectUrl,
    description: vals.description,
    experience_1_text: vals.experienceOneText,
    experience_1_link: vals.experienceOneLink,
    experience_2_text: vals.experienceTwoText,
    experience_2_link: vals.experienceTwoLink
  };

  const l_data = {
    name_display: vals.projectName,
    material: vals.material,
    print_type: vals.printType,
    project_id: -1
  };

  setTimeout(
    apiCall({
      path: "api/v1/projects",
      method: "POST",
      token: accessToken,
      data: p_data,
      callback: js => {
        l_data.project_id = js.id;

        for (let i = 0; i < vals.mf; i++) {
          l_data.encryptions = vals.encryptions[i];

          if (i === 0) {
            l_data.name_internal = name_internal;
          } else {
            l_data.name_internal = name_internal + "-" + i;
          }
          apiCall({
            path: "api/v1/labels",
            method: "POST",
            token: accessToken,
            data: l_data,
            callback: js2 => {
              success(i, js2);
            },
            onError: failure
          })
        }
      },  
      onError: failure
    }), 0
  );
}; 

const apiEditProject = (vals, label_id, success, failure) => {
  const accessToken = localStorage.getItem(tokenName);

  const p_data = {
    name: vals.projectName,
    project_url: vals.projectUrl,
    description: vals.description,
    experience_1_text: vals.experienceOneText,
    experience_1_link: vals.experienceOneLink,
    experience_2_text: vals.experienceTwoText,
    experience_2_link: vals.experienceTwoLink
  };

  const l_data = {
    name_display: vals.projectName,
    encryptions: vals.encryptions,
    material: vals.material,
    print_type: vals.printType,
  };

  setTimeout(
    apiCall({
      path: "api/v1/projects/" + vals.projectId,
      method: "PATCH",
      token: accessToken,
      data: p_data,
      callback: js => {
        l_data.project_id = js.id;

        apiCall({
          path: "api/v1/labels/" + label_id,
          method: "PATCH",
          token: accessToken,
          data: l_data,
          callback: success,
          onError: failure
        });
      },
      onError: failure
    }), 0
  );
};

const apiUploadImage = (labelId, type, file, callback, onError) => {
  const accessToken = localStorage.getItem(tokenName);

  setTimeout(function() {
    const headers = { 'Authorization': `Bearer ${accessToken}` };

    const formData = new FormData();
    formData.append('img', file);

    const params = {
      method: 'PATCH',
      headers,
      body: formData
    };

    const url = urlBase + "api/v1/labels/" + labelId + "?" + type + "=true";

    fetch(url, params)
    .then(response => response.json())
    .then(data => {
      callback(data);
    });

  }, 0);
};

const apiActivate = (projectId, activate, callback) => {
  const accessToken = localStorage.getItem(tokenName);

  var state = 1;
  if (! activate) {
    state = 2;
  }

  const data = { state };

  setTimeout(
    apiCall({
      path: "api/v1/projects/" + projectId,
      method: "PATCH",
      data,
      token: accessToken,
      callback
    }), 0
  );
};

const apiTest = (projectId, doTest, callback) => {
  const accessToken = localStorage.getItem(tokenName);

  var state = 1;
  if (doTest) {
    state = 0;
  }

  const data = { state };

  setTimeout(
    apiCall({
      path: "api/v1/projects/" + projectId,
      method: "PATCH",
      data,
      token: accessToken,
      callback
    }), 0
  );
};

export {
  apiFetchProjects,
  apiFetchProject,
  apiNewProject,
  apiEditProject,
  apiUploadImage,
  apiActivate,
  apiTest
};