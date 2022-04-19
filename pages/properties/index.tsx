import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

type Props = {
    properties: any
}

const Properties = (props: Props) => {
    const { properties } = props;
    console.log(properties);
    return (
        <>
            <h1>
                Properties
            </h1>
            {properties?.map((property: any) => {
                return (
                    <a href={`${process.env.NEXTAUTH_URL}/properties/${property.propertyId}`} key={property.propertyId}>
                        <h2>
                            {property.type}
                        </h2>
                        <p>
                            {property.address}
                            {property.city}
                        </p>
                    </a>
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