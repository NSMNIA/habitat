/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import SearchMap from '../../../components/Google/SearchMap';
import Logging from '../../../config/Logging';

type Props = {}

const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event: any) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    },
};

const add = (props: Props) => {
    const session = useSession();
    const { t } = useTranslation();
    const [address, setAddress] = useState<any>({});
    const [type, setType] = useState<string>('sale');
    const [title, setTitle] = useState<string>('');
    const [surface, setSurface] = useState<string>('');
    const [rooms, setRooms] = useState<string>('');
    const [bathrooms, setBathrooms] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [livingrooms, setLivingrooms] = useState<string>('');
    const [otherIndoorSpaces, setOtherIndoorSpaces] = useState<string>('');
    const [externalStorage, setexternalStorage] = useState<string>('');
    const [totalSurface, setTotalSurface] = useState<string>('');
    const [extra, setExtra] = useState<string>('');
    const [constructionYear, setConstructionYear] = useState<string>((new Date()).getFullYear().toString());
    const [image, setImage] = useState<any>(null);

    const addProperty = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        if (image.length === 0) return Logging.error('No image');
        Logging.info(address);
        // ! BUG: search has to include the street name
        await axios.post(`/api/properties/add`, {
            type: type,
            address: address?.formatted,
            city: address?.city,
            addressTitle: title,
            surface: surface,
            rooms: rooms,
            bathrooms: bathrooms,
            price: price,
            description: description,
            livingrooms: livingrooms,
            otherIndoorSpaces: otherIndoorSpaces,
            externalStorage: externalStorage,
            totalSurface: totalSurface,
            extras: extra,
            constructionYear: constructionYear,
            user: session?.data?.user?.email
        }).then(async found => {
            if (found.data.success === 0) return Logging.error(found.data.message);
            Logging.info('Property created');
            Logging.info(found.data.data.propertyId);
            // TODO: add files
            if (image) {
                console.log(image);
                const body = new FormData();
                body.append('file', image);
                body.append('propertyId', found.data.data.propertyId);
                await axios.post(`/api/upload`, body, config).then(async status => {
                    if (status.data.success === 0) return Logging.error(status.data.message);
                    Logging.info('File uploaded');
                });
            }
        }).catch(err => {
            Logging.error(err);
        })
    }

    return (
        <>
            <form method='post' onSubmit={addProperty}>
                <h1>Add property</h1>
                <div className='hb-form--group'>
                    <label htmlFor="type">{t('Type')}</label>
                    <div>
                        <select name="type" id="type" defaultValue={type} onChange={e => setType(e.target.value)}>
                            <option value="sale">{t('For sale')}</option>
                            <option value="rent">{t('For rent')}</option>
                        </select>
                    </div>
                </div>

                <div className='hb-form--group'>
                    <label htmlFor="images">{t('Images')}</label>
                    <input type="file" name="images" accept='image/*' onChange={e => setImage(e.target.files?.[0])} id="images" />
                </div>

                <SearchMap address={setAddress} />

                <div className="hb-form--group">
                    <label htmlFor="title">Title property</label>
                    <div>
                        <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="surface">Surface</label>
                    <div>
                        <input type="number" name="surface" id="surface" value={surface} onChange={e => setSurface(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="rooms">Rooms</label>
                    <div>
                        <input type="number" name="rooms" id="rooms" value={rooms} onChange={e => setRooms(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="bathrooms">Bathrooms</label>
                    <div>
                        <input type="number" name="bathrooms" id="bathrooms" value={bathrooms} onChange={e => setBathrooms(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="livingrooms">Livingrooms</label>
                    <div>
                        <input type="number" name="livingrooms" id="livingrooms" value={livingrooms} onChange={e => setLivingrooms(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="ohterIndoorSpaces">Other indoor spaces</label>
                    <div>
                        <input type="number" name="ohterIndoorSpaces" id="ohterIndoorSpaces" value={otherIndoorSpaces} onChange={e => setOtherIndoorSpaces(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="externalStorage">External storage</label>
                    <div>
                        <input type="number" name="externalStorage" id="externalStorage" value={externalStorage} onChange={e => setexternalStorage(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="totalSurface">Total surface</label>
                    <div>
                        <input type="number" name="totalSurface" id="totalSurface" value={totalSurface} onChange={e => setTotalSurface(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="status">Status?</label>
                    <div>
                        <input type="text" name="status" id="status" />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="extra">Extra information</label>
                    <div>
                        <textarea name="extra" id="extra" value={extra} onChange={e => setExtra(e.target.value)}></textarea>
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="price">Price</label>
                    <div>
                        <input type="text" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>

                <div className="hb-form--group">
                    <label htmlFor="constructionYear">Contsturction year</label>
                    <div>
                        <select name="constructionYear" id="constructionYear" defaultValue={constructionYear} onChange={e => setConstructionYear(e.target.value)}>
                            {[Array.from(new Array(130), (val, index) => <option key={index} value={(new Date()).getFullYear() - index}>{(new Date()).getFullYear() - index}</option>)]}
                        </select>
                    </div>
                </div>

                <button type="submit">
                    {t('Add property')}
                </button>
            </form>
        </>
    )
}

export default add