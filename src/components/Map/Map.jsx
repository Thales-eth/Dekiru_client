import MapStyles from './MapStyles.json'
import { memo, useCallback, useContext, useState } from 'react';
import { StylesContext } from '../../contexts/styles.context'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = ({ users }) => {

    const { triggerFadeOut } = useContext(StylesContext)

    const containerStyle = {
        width: '1000px',
        height: '600px',
        marginBottom: "100px"
    };

    const center = {
        lat: 40.4023728,
        lng: -3.7130593
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            options={{ styles: MapStyles }}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {
                users.map(user => {

                    return (
                        <Marker
                            key={user._id}
                            title={user.username}
                            position={{ lat: user.location.coordinates[0], lng: user.location.coordinates[1] }}
                            onClick={() => triggerFadeOut(`/users/${user._id}`)}
                        />
                    )
                })
            }
            <></>
        </GoogleMap>
    ) : <></>
}

export default memo(Map)
