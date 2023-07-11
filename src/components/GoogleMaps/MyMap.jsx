import React from 'react';
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import './mymap.css';

function MyMap(params) {
  const { children, scans } = params;

  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  const options = {
    center: { lat: 38.1, lng: -121.3 },
    zoom: 10
  };

  const doFitBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();

    if (scans.length > 0) {
      scans.map(scan => {
        bounds.extend({lat: scan.latitude, lng: scan.longitude});
        return scan.id;
      })
      if (scans.length === 1) {
        bounds.extend({
          lat: scans[0].latitude + 0.1,
          lng: scans[0].longitude + 0.1
        });
        bounds.extend({
          lat: scans[0].latitude - 0.1,
          lng: scans[0].longitude - 0.1
        });
      }
    } else {
      const defaultCenter = { lat: 37.87, lng:  -122.27 };
      bounds.extend({
        lat: defaultCenter.lat + 0.1,
        lng: defaultCenter.lng + 0.1
      });
      bounds.extend({
        lat: defaultCenter.lat - 0.1,
        lng: defaultCenter.lng - 0.1
      });
    }
    map.fitBounds(bounds);
  }

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
      doFitBounds();
    }
  }, [map, options]);

  return (
    <>
      <div className="google-map" ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
}

// Yikes!!  Thanks Google!!  Would be great to hide this boilerplate...
const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof window.google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof window.google.maps.LatLng
    ) {
      return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
    }

    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export { MyMap };