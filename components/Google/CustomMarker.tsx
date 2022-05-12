import { InfoWindow, Marker } from '@react-google-maps/api';
import Link from 'next/link';
import { FC, useState } from 'react';

interface Props {
    name: string,
    price: number,
    id: string,
    position: { lat: number, lng: number },
}

const CustomMarker: FC<Props> = ({ name, price, id, position }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Marker key={id} position={{ lat: position.lat, lng: position.lng }} title={name} onClick={e => setOpen(true)}>
            {open && <InfoWindow onCloseClick={() => setOpen(false)}>
                <div>
                    <h1>{name}</h1>
                    <p>{price}</p>
                    <Link href={`/property/${id}`}>
                        Go to property
                    </Link>
                </div>
            </InfoWindow>
            }
        </Marker>
    )
}

export default CustomMarker