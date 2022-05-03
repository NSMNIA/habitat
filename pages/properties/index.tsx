import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar'

type Props = {
    properties: any,
    cities: any
}

const Properties = (props: Props) => {
    const { properties, cities } = props;
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <h1>Cities</h1>
            {cities?.map((city: any, i: number) => {
                return (
                    <div key={i}>
                        <Link href={`/properties/${city.city}`} >
                            {city.city}
                        </Link>
                    </div>
                )
            })}
            <h1>{t('Properties')}</h1>
            {properties?.map((property: any) => {
                return (
                    <div key={property.propertyId}>
                        <Link href={`/property/${property.propertyId}`} >
                            {`${property.addressTitle} | ${property.city}`}
                        </Link>
                    </div>
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
            properties: p?.properties,
            cities: p?.cities,
        }
    }
}

export default Properties