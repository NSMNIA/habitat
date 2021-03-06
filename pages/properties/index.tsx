import axios from 'axios'
import { ChevronUp } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Footer from '../../components/Footer'
import ShowMultipleMap from '../../components/Google/ShowMultipleMap'
import Highlighted from '../../components/Highlighted'
import Navbar from '../../components/Navbar'
import PropertyCard from '../../components/PropertyCard'
import styles from '../../styles/Properties.module.scss'

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
            <Head>
                <title>Habitat - {t('Properties')}</title>
            </Head>
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
                                <Link href={`/filter/reset`}><span>{t('Reset filter')}</span></Link>
                            </div>
                            <div className={styles['properties_search-filter-tags--active']}>
                            </div>
                        </div>
                        <div className={styles['properties_search-filter-inputs']}>
                            <h2>{t('Filter your search')}</h2>
                            <input className='input-text input-type--search' type="text" placeholder={t('Search')} />
                            <div className="accordion-menu">
                                <ul>
                                    <li>
                                        <input type="checkbox" />
                                        <ChevronUp className='arrow' size={22} />
                                        <h4>{t('Prijs')}</h4>
                                        <div>
                                            test
                                        </div>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <ChevronUp className='arrow' size={22} />
                                        <h4>{t('Type')}</h4>
                                        <div className='filters'>
                                            <div className='checkbox'>
                                                <input type="checkbox" name="sale" />
                                                <label>For Sale</label>
                                            </div>
                                            <div className='checkbox'>
                                                <input type="checkbox" name="sale" />
                                                <label>For Rent</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <ChevronUp className='arrow' size={22} />
                                        <h4>Construction year</h4>
                                        <div>
                                            Test
                                        </div>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <ChevronUp className='arrow' size={22} />
                                        <h4>Rooms</h4>
                                        <div>
                                            Test
                                        </div>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <ChevronUp className='arrow' size={22} />
                                        <h4>Surface area</h4>
                                        <div>
                                            Test
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles['properties_search-map']}>
                        <ShowMultipleMap properties={properties} />
                        <div className={styles['properties_search-map--grid']}>
                            {highlighted && <PropertyCard properties={highlighted.slice(0, 4)} />}
                        </div>
                    </div>
                </section>
                <section className={styles['properties_highlighted-section']}>
                    {highlighted && <Highlighted properties={highlighted?.slice(0, 3)} />}
                </section>
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