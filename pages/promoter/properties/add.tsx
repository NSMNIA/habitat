/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import SearchMap from '../../../components/Google/SearchMap';

type Props = {}

const add = (props: Props) => {
    const { t } = useTranslation();
    const [address, setAddress] = useState<string>('');

    const addProperty = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        console.log(address);
        console.log('add property');
    }

    return (
        <>
            <form method='post' onSubmit={addProperty}>
                <div className='hb-form--group'>
                    <label htmlFor="type">{t('Type')}</label>
                    <select name="type" id="type">
                        <option value="sale">{t('For sale')}</option>
                        <option value="rent">{t('For rent')}</option>
                    </select>
                </div>

                <div className="hb-form--group">
                    <label htmlFor=""></label>
                </div>

                <SearchMap address={setAddress} />

                <button type="submit">
                    {t('Add property')}
                </button>
            </form>
        </>
    )
}

export default add