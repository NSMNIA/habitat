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
            <div className='hb-form--group'>
                <label htmlFor="address">Address</label>
                <Autocomplete options={{
                    componentRestrictions: { country: 'ec' }
                }}>
                    <input type="text" id="address" ref={mapsInput} />
                </Autocomplete>
                <button onClick={searchOnMap}>
                    Search
                </button>
            </div>
            <div className={STYLE['map']}>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        fullscreenControl: false,
                        mapTypeId: 'hybrid',
                        streetViewControl: false,
                        mapTypeControl: false,
                        draggable: false
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