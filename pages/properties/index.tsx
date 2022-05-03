import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
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
                    <div key={property.propertyId}>
                        <Link href={`/properties/${property.propertyId}`} >
                            {property.addressTitle}
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
            properties: p?.data
        }
    }
}

export default Properties