/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import SearchMap from '../../../components/Google/SearchMap';
import Navbar from '../../../components/Navbar';
import Logging from '../../../config/Logging';
import styles from '../../../styles/PropertyAdd.module.scss'

type Props = {}

const config = {
    headers: { 'content-type': 'multipart/form-data', 'cache-control': 'max-age=180000' },
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
    const [images, setImages] = useState<any>(null);
    const [i3d, setI3d] = useState<any>(null);

    const addProperty = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
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
            Logging.warn('Adding images...');
            // TODO: add files
            if (images?.length > 0) {
                const body = new FormData();
                Array.from(images).forEach((file: any) => {
                    body.append(`image-${file.name}`, file);
                });
                body.append('propertyId', found.data.data.propertyId);
                body.append('type', '2d');
                await axios.post(`/api/upload`, body, config).then(async status => {
                    if (status.data.success === 0) return Logging.error(status.data.message);
                    Logging.info('350 files uploaded');
                });
            }
            if (i3d?.length > 0) {
                const body = new FormData();
                Array.from(i3d).forEach((file: any) => {
                    body.append(`image-${file.name}`, file);
                });
                body.append('propertyId', found.data.data.propertyId);
                body.append('type', '360');
                await axios.post(`/api/upload`, body, config).then(async status => {
                    if (status.data.success === 0) return Logging.error(status.data.message);
                    Logging.info('2D files uploaded');
                });
            }
        }).catch(err => {
            Logging.error(err);
        })
    }

    return (
        <>
            <Navbar />
            <main className={styles['propertyAdd']}>
                <div className={styles['propertyAdd-title']}>
                    <h1>Add property</h1>
                </div>
                <div className={styles['propertyAdd-container']}>
                    <div className={styles['propertyAdd-container--left']}>
                        <div className='hb-form--group'>
                            <label htmlFor="type">{t('Type')}</label>
                            <div className='hb-form--group_dropdown'>
                                <select name="type" id="type" className='dropdown-alt' defaultValue={type} onChange={e => setType(e.target.value)}>
                                    <option value="sale">{t('For sale')}</option>
                                    <option value="rent">{t('For rent')}</option>
                                    <option value="new">{t('New project')}</option>
                                </select>
                            </div>
                        </div>

                        <div className='hb-form--group'>
                            <label htmlFor="images">{t('Images')}</label>
                            <div>
                                <div className="custom-file-input">
                                    <input type="file" className='file-input' name="images" multiple accept='image/*' onChange={e => setImages(e.target.files)} id="images" />
                                </div>
                            </div>
                        </div>

                        <div className='hb-form--group'>
                            <label htmlFor="images3d">{t('360 images')}</label>
                            <div>
                                <div className="custom-file-input">
                                    <input type="file" className='file-input' name="images3d" multiple accept='image/*' onChange={e => setI3d(e.target.files)} id="images3d" />
                                </div>
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="title">Title property</label>
                            <div>
                                <input type="text" className='input-text-alt' name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="surface">Surface</label>
                            <div>
                                <input type="number" className='input-number-alt' name="surface" id="surface" value={surface} onChange={e => setSurface(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="rooms">Rooms</label>
                            <div>
                                <input type="number" className='input-number-alt' name="rooms" id="rooms" value={rooms} onChange={e => setRooms(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="bathrooms">Bathrooms</label>
                            <div>
                                <input type="number" className='input-number-alt' name="bathrooms" id="bathrooms" value={bathrooms} onChange={e => setBathrooms(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="livingrooms">Livingrooms</label>
                            <div>
                                <input type="number" className='input-number-alt' name="livingrooms" id="livingrooms" value={livingrooms} onChange={e => setLivingrooms(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="ohterIndoorSpaces">Other indoor spaces</label>
                            <div>
                                <input type="number" className='input-number-alt' name="ohterIndoorSpaces" id="ohterIndoorSpaces" value={otherIndoorSpaces} onChange={e => setOtherIndoorSpaces(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="externalStorage">External storage</label>
                            <div>
                                <input type="number" className='input-number-alt' name="externalStorage" id="externalStorage" value={externalStorage} onChange={e => setexternalStorage(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="totalSurface">Total surface</label>
                            <div>
                                <input type="number" className='input-number-alt' name="totalSurface" id="totalSurface" value={totalSurface} onChange={e => setTotalSurface(e.target.value)} />
                            </div>
                        </div>

                        {/* <div className="hb-form--group">
                                <label htmlFor="status">Status?</label>
                                <div>
                                    <input type="text" className='input-text-alt' name="status" id="status" />
                                </div>
                            </div> */}

                        <div className="hb-form--group">
                            <label htmlFor="extra">Description</label>
                            <div>
                                <textarea name="extra" className='textarea' id="extra" value={extra} onChange={e => setExtra(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="price">Price</label>
                            <div>
                                <input type="text" className='input-text-alt' name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                        </div>

                        <div className="hb-form--group">
                            <label htmlFor="constructionYear">Contsturction year</label>
                            <div className='hb-form--group_dropdown'>
                                <select className='dropdown-alt' name="constructionYear" id="constructionYear" defaultValue={constructionYear} onChange={e => setConstructionYear(e.target.value)}>
                                    {[Array.from(new Array(130), (val, index) => <option key={index} value={(new Date()).getFullYear() - index}>{(new Date()).getFullYear() - index}</option>)]}
                                </select>
                            </div>
                        </div>

                        <button type="submit" className='cta-button' onClick={addProperty}>
                            {t('Add property')}
                        </button>
                    </div>
                    <div className={styles['propertyAdd-container--right']}>
                        <SearchMap address={setAddress} />
                    </div>
                </div>
            </main>

        </>
    )
}

export default add