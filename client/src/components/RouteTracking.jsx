import React, { useEffect, useState, useMemo } from 'react';
import { LoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import io from 'socket.io-client';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function RouteTracking({ userId, captainId }) {
    const [userLocation, setUserLocation] = useState(center);
    const [captainLocation, setCaptainLocation] = useState(center);
    const [directions, setDirections] = useState(null);
    const [directionsLoaded, setDirectionsLoaded] = useState(false);
    const mapRef = React.useRef(null);

    const googleMapsApiKey = useMemo(() => import.meta.env.VITE_GOOGLE_MAPS_API, []);

    useEffect(() => {
        const socket = io('http://localhost:4000'); // Replace with your server URL

        socket.emit('join', { userId, userType: 'user' });
        socket.emit('join', { userId: captainId, userType: 'captain' });

        socket.on('captain-location', (data) => {
            if (data.captainId === captainId) {
                setCaptainLocation(data.location);
                console.log('Captain location:', data.location);
            }
        });

        socket.on('user-location', (data) => {
            if (data.userId === userId) {
                setUserLocation(data.location);
                console.log('User location:', data.location);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [captainId, userId]);

    useEffect(() => {
        if (window.google && window.google.maps && userLocation && captainLocation) {
            const directionsService = new google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: userLocation,
                    destination: captainLocation,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                        setDirectionsLoaded(true);
                    } else {
                        console.error('Error fetching directions:', status);
                    }
                }
            );
        }
    }, [userLocation, captainLocation]);

    useEffect(() => {
        if (window.google && mapRef.current) {
            const { AdvancedMarkerElement } = google.maps.marker;

            // User Marker
            new AdvancedMarkerElement({
                map: mapRef.current,
                position: userLocation,
                title: 'You',
            });

            // Captain Marker
            new AdvancedMarkerElement({
                map: mapRef.current,
                position: captainLocation,
                title: 'Captain',
            });
        }
    }, [userLocation, captainLocation]);

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation}
                zoom={15}
                onLoad={(map) => (mapRef.current = map)}
            >
                {directionsLoaded && directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default RouteTracking;
