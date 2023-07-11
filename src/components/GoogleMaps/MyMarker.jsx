import React from 'react';

const MyMarker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    const { urlBase } = window.runConfig;
    const src = urlBase + "api/v1/labels/" + options.scan.label_id
        + "?master_image=true"

    const res = options.scan.result === 0 ? "Succes" : "Fail";

    const infowindow = new window.google.maps.InfoWindow({
      content:
        "<table><tr><td>"
        + "<img src=\"" + src + "\" alt=\"img\" width=\"40\" />"
        + "</td><td>&nbsp;&nbsp;</td><td>"
        + options.scan.timestamp + "<br />"
        + options.scan.location + "<br />"
        + "Label: " + options.scan.label_name + "<br />"
        + "User ID: " + options.scan.end_user_id + "<br />"
        + "Result: " + res
        + "</td></tr></table"
    });

    if (marker) {
      marker.setOptions(options);
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: options.map,
          shouldFocus: false,
        });
      })
    }
  }, [marker, options]);

  return null;
};

export { MyMarker };