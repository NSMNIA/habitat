import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import ShowMultipleMap from '../../components/Google/ShowMultipleMap'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from '../../styles/Properties.module.scss'
import PropertyCard from '../../components/PropertyCard'
import Image from 'next/image'

type Props = {
    properties: any,
    cities: any,
    highlighted: any,
}

const Properties = (props: Props) => {
    const { properties, cities, highlighted } = props;
    const { t } = useTranslation();

    return (
        <>
            <Navbar />

            <main className={styles['properties']}>
                <section className={styles['properties_header']}>
                    <div className={styles['properties_header-title']}>
                        <h1>{t('Search for a property')}</h1>
                    </div>
                </section>
                <section className={styles['properties_search']}>
                    <div className={styles['properties_search-filter']}>
                        <div className={styles['properties_search-filter-tags']} >
                            <div className={styles['properties_search-filter-tags--title']}>
                                <p>{t('You are now searching')}</p>
                                <Link href={`/filter/reset`} ><span>Reset filter</span></Link>
                            </div>
                            <div className={styles['properties_search-filter-tags--active']}>
                            </div>
                        </div>
                        <h2>{t('Filter your search')}</h2>
                    </div>
                    <div className={styles['properties_search-map']}>
                        <ShowMultipleMap properties={properties} />
                        <div className={styles['properties_search-map--grid']}>
                            <PropertyCard properties={properties.slice(0, 4)} />
                        </div>
                    </div>
                </section>
                <section className={styles['properties_highlighted']}>
                    <div className={styles['properties_highlighted-content']}>
                        <div className={styles['properties_highlighted-content--title']}>
                            <p className='title-top'>{t('Highlighted')}</p>
                            <div className="title">
                                <h2 className="title--left">{t('Also interesting to look at')}</h2>
                            </div>
                        </div>
                        <div className={styles['properties_highlighted-content--properties']}>
                            <PropertyCard properties={highlighted.slice(0, 3)} />
                        </div>
                    </div>
                </section>


                {/* 
                {cities?.map((city: any, i: number) => {
                    return (
                        <div key={i}>
                            <Link href={`/properties/${city.city}`} >
                                {city.city}
                            </Link>
                        </div>
                    )
                })} 
                

                {properties?.slice(0, 4).map((property: any) => {
                    return (
                        <div key={property.propertyId}>


                            <Link href={`/property/${property.propertyId}`} >
                                {property.addressTitle}
                            </Link>
                        </div>
                    )
                })}
                
                */}

            </main>

            <Footer />

        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/properties/all`).then(found => {
        return found.data
    }).catch(err => {
        console.log(err);
    });

    const h = await axios.post(`${process.env.NEXTAUTH_URL}/api/home`, {
        city: 'Quito'
    }).then(found => {
        return found.data
    }).catch(err => {
        console.log(err);
    });

    return {
        props: {
            properties: p?.properties || null,
            cities: p?.cities || null,
            highlighted: h?.properties || null,
        }
    }
}

export default Properties