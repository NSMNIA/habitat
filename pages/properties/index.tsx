import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar'

type Props = {
    properties: any
}

const Properties = (props: Props) => {
    const { properties } = props;
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <h1>{t('Properties')}</h1>
            {properties?.map((property: any) => {
                return (
                    <Link href={`/properties/${property.propertyId}`} key={property.propertyId}>
                        {property.address}
                    </Link>
                )
            })}
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/all`).then(found => {
        return found.data
    }).catch(err => {
        console.log(err);
    });

    return {
        props: {
            properties: p?.data
        }
    }
}

export default Properties