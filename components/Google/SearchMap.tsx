import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { FC, useRef, useState } from 'react';
import STYLE from './style.module.scss';

interface Props {
    address: any
}
const center = { lat: -1.3552439, lng: -88.3922403 };
const libraries = ['places']
const SearchMap: FC<Props> = ({ address }) => {
    const mapsInput = useRef<HTMLInputElement>(null);
    let libRef: any = useRef(libraries)
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [zoom, setZoom] = useState(4);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: libRef.current,
    });

    if (!isLoaded) return (<div className={`${STYLE['map']} ${STYLE['loading']}`}>
        Loading Google Maps...
    </div>)

    const searchOnMap = () => {
        if (mapsInput.current?.value === '') return;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: mapsInput.current?.value }, (results, status) => {
            if (status === 'OK') {
                if (results?.[0]) {
                    map?.setCenter(results[0].geometry.location);
                    setMarker(new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    }));
                    setZoom(16);
                    address({ formatted: results?.[0]?.formatted_address, city: results?.[0]?.address_components[results?.[0]?.address_components.length - 4]?.long_name });
                }
            }
        }
        );
    }

    return (
        <>
            <div className='hb-form--group hb-form--group_map-wrapper'>
                <label htmlFor="address">Address</label>
                <div className='flex-row hb-form--group_map'>
                    <Autocomplete options={{
                        componentRestrictions: { country: 'ec' }
                    }}>
                        <input type="text" className='input-text-alt' id="address" ref={mapsInput} />
                    </Autocomplete>
                    <button className='cta-button' onClick={searchOnMap}>
                        Search
                    </button>
                </div>
            </div>
            <div className={STYLE['map']}>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        fullscreenControl: false,
                        //mapTypeId: 'hybrid',
                        streetViewControl: false,
                        mapTypeControl: false,
                        draggable: false,
                        styles: [
                            {
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#ededed"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#616161"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#f5f5f5"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#bdbdbd"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#eeeeee"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#e5e5e5"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#9e9e9e"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dadada"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dadada"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#616161"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#9e9e9e"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#e5e5e5"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#eeeeee"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#256794"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#ffffff"
                                    }
                                ]
                            }
                        ]
                    }}
                    onLoad={(map) => { setMap(map) }}
                >
                    {marker ? <>
                        <Marker position={marker.getPosition() || center} />
                    </> : null}
                </GoogleMap>
            </div>
        </>
    );
}

export default SearchMap