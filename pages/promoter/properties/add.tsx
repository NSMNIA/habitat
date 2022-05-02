/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import SearchMap from '../../../components/Google/SearchMap';

type Props = {}

const add = (props: Props) => {
    const { t } = useTranslation();
    const [address, setAddress] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [surface, setSurface] = useState<string>('');
    const [rooms, setRooms] = useState<string>('');
    const [bathrooms, setBathrooms] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [livingrooms, setLivingrooms] = useState<string>('');
    const [otherIndoorSpaces, setOtherIndoorSpaces] = useState<string>('');
    const [externalSpaces, setExternalSpaces] = useState<string>('');
    const [totalSurface, setTotalSurface] = useState<string>('');
    const [extra, setExtra] = useState<string>('');
    const [constructionYear, setConstructionYear] = useState<string>((new Date()).getFullYear().toString());

    const addProperty = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        console.log({ address, title, surface, rooms, bathrooms, price, description, livingrooms, otherIndoorSpaces, externalSpaces, totalSurface, extra, constructionYear });
    }

    return (
        <>
            <form method='post' onSubmit={addProperty}>
                <h1>Add property</h1>
                <div className='hb-form--group'>
                    <label htmlFor="type">{t('Type')}</label>
                    <div>
                        <select name="type" id="type">
                            <option value="sale">{t('For sale')}</option>
                            <option value="rent">{t('For rent')}</option>
                        </select>
                    </div>
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
                    <label htmlFor="externalSpaces">External spaces</label>
                    <div>
                        <input type="number" name="externalSpaces" id="externalSpaces" value={externalSpaces} onChange={e => setExternalSpaces(e.target.value)} />
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