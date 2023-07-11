/*global google*/
import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const markers = [
    {
        id: 1,
        name: "Chicago, Illinois",
        position: { lat: 41.881832, lng: -87.623177 }
    },
    {
        id: 2,
        name: "Denver, Colorado",
        position: { lat: 39.739235, lng: -104.99025 }
    },
    {
        id: 3,
        name: "Los Angeles, California",
        position: { lat: 34.052235, lng: -118.243683 }
    },
    {
        id: 4,
        name: "New York, New York",
        position: { lat: 40.712776, lng: -74.005974 }
    }
];
//const google=window.google
function Map(props) {
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "500px", height: "400px" }}
        >
            {console.log('props',props.scans)}
            {props.scans.map(({ id, label,latitude,longitude }) => (
                <Marker
                    key={id}
                    position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>{label}</div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default Map;
