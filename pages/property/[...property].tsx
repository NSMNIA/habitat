import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import ShowMap from '../../components/Google/ShowMap';
import Navbar from '../../components/Navbar';

type Props = {
    property: any;
}

const Property = ({ property }: Props) => {
    return (
        <>
            <Navbar />
            <h1>
                Property {property?.addressTitle}
            </h1>
            <p>
                {property?.type}
            </p>
            <ShowMap address={property?.address} />
            <p>
                {property?.city}
            </p>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { property } = context.query;
    if (!property?.[0]) {
        return {
            redirect: {
                destination: '/properties',
                permanent: false,
            },
            props: {}
        }
    }

    const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/find`, {
        id: property[0]
    }).then(found => {
        return found.data
    }).catch(err => {
        return {
            redirect: {
                destination: '/properties',
                permanent: false,
            },
            props: {},
        }
    });

    if (p.success === 1) {
        return {
            props: {
                property: p.data
            }
        }
    }

    return {
        redirect: {
            destination: '/properties',
            permanent: false,
        },
        props: {},
    }
}

export default Property