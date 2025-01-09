import React, { useEffect, useState } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'


const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function LiveTracking({ captainLocation, rideConfirmed }) {

    const [currentPosition, setCurrentPosition] = useState(center);
    const [directions, setDirections] = useState(null);


    useEffect(() => {

        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });

            console.log('User Position:', updatePosition);
        };

        navigator.geolocation.getCurrentPosition(updatePosition);

        const watchId = navigator.geolocation.watchPosition(updatePosition);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        if (rideConfirmed && currentPosition && captainLocation) {

            console.log('Captain Position:', captainLocation);
            
            const directionsService = new google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: currentPosition,
                    destination: captainLocation,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error('Error fetching directions:', status);
                    }
                }
            );
        } else {
            setDirections(null); // Clear directions if ride not confirmed
        }
    }, [rideConfirmed, currentPosition, captainLocation]);


    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} label="YOU" />

                {captainLocation && !rideConfirmed && (
                    <Marker position={captainLocation} label="Captain" />


                )}

                {rideConfirmed && directions && (
                    <DirectionsRenderer directions={directions} />
                )}
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking