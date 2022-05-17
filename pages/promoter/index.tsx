import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import Navbar from '../../components/Navbar'
import PropertyCard from '../../components/PropertyCard'
import styles from '../../styles/promoter.module.scss'

interface Props {
    properties: any,
}

const PromoterIndex: FC<Props> = ({ properties }) => {
    return (
        <>
        <Navbar />
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
            <h1>Promoter</h1>
            <Link href={'/promoter/properties/add'}>
               <button className='cta-button'>
                    Add property
                </button> 
            </Link>
            </div>

            <div className={styles['listing-grid']}>
                <PropertyCard properties={properties} />
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    const session: any = await getSession({ req });
    const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/promoter`, {
        id: session.user.id
    }).then(found => {
        return found.data
    }).catch(err => {
        console.log(err);
    });

    return {
        props: {
            properties: p?.properties || null,
        }
    }
}

export default PromoterIndex