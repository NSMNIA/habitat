import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { FC, useRef, useState } from 'react';
import CustomMarker from './CustomMarker';
import STYLE from './style.module.scss';

interface Props {
    properties: any
}

const centerEC = { lat: -1.3552439, lng: -88.3922403 };
const libraries = ['places']
const ShowMultipleMap: FC<Props> = ({ properties }) => {
    let libRef: any = useRef(libraries)
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<any>([]);
    const [zoom, setZoom] = useState(5);
    const [loaded, setLoaded] = useState(false);
    const [center, setCenter] = useState<any>(centerEC);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: libRef.current,
    });

    if (!isLoaded) return (<div className={`${STYLE['map']} ${STYLE['loading']}`}>
        Loading Google Maps...
    </div>)

    const geocoder = new google.maps.Geocoder();
    properties.map((property: any) => {
        geocoder.geocode({ address: property.address }, (results, status) => {
            if (status === 'OK') {
                if (results?.[0]) {
                    setMarkers((markers: any) => [...markers.filter((marker: any) => marker.id !== property.propertyId),
                    {
                        name: property.addressTitle,
                        id: property.propertyId,
                        price: property.price,
                        position: { lat: results?.[0].geometry.location.lat(), lng: results?.[0].geometry.location.lng() },
                    }
                    ]);
                    setLoaded(true);
                }
            }
        });
    })

    const goToProperty = (id: string) => {
        console.log(id);

    }

    return (
        <>
            <div className={STYLE['map']}>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        fullscreenControl: false,
                        mapTypeId: 'hybrid',
                        mapTypeControl: false,
                    }}
                    onLoad={(map) => { setMap(map) }}
                >
                    {markers?.map((marker: any) => {
                        return (<CustomMarker key={marker.id} name={marker.name} price={marker.price} id={marker.id} position={marker.position} />)
                    })}
                </GoogleMap>
            </div>
        </>
    )
}

export default ShowMultipleMap