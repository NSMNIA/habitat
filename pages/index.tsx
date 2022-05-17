import styles from '../styles/Home.module.scss'
import "@fontsource/inter"
import { faBathtub, faBed, faHouse, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from "react-i18next"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import ReactDOM from 'react-dom'


type Props = {
  properties: any,
  neighbourhood: any
}

const Home = (props: Props) => {
  const { t } = useTranslation();
  const { properties, neighbourhood } = props
  return (
    <>
      <Head>
        <title>Habitat - Home</title>
      </Head>
      <Navbar />
      <main className={styles['home']}>
        <section>
          <div className={styles['home_teaser']}>
            <div className={styles['home_teaser-content']}>
              <h1 className={styles['home_teaser-content--title']}>{t('Take a ')}<span>{t('look ')}</span> {t('inside')}</h1>
              <ArrowRight className={styles['home_teaser-content--arrow']} size={48} />
            </div>
            <Image src='/assets/images/home-teaser-enhanced.jpg' alt="home-teaser" layout="fill" objectPosition="center -300px" objectFit="cover" placeholder='blur' blurDataURL='/assets/images/home-teaser.png' />
          </div>
        </section>
        <section className={styles['home_search-section']}>
          <div className={styles['home_search']}>
            <h2 className={styles['home_search--title']}>{t('Find a property')}</h2>
            <div className={styles['home_search--inputs']}>
              <input className={styles['search-field'] + ' input-text input-type--search'} type="text" placeholder={t('Place, address or zipcode')} />
              <button className="cta-button--alt">
                {t('Search')}
              </button>
            </div>
          </div>
        </section>
        <section className={styles['home_tours-section']}>
          <div className={styles['home_tours']}>
            <div className="title">
              <h2 className="title--left">{t('Visit our')} <span>{t('3D tours')}</span> </h2>
              <Link href={'/properties'}>
                <a className="title--right">Explore All <ArrowRight className="title--right-arrow" size={22} /></a>
              </Link>
            </div>
            <div className={styles['home_tours-content']}>
              <div className={styles['home_tours-content--grid']}>
                <PropertyCard properties={properties} />
              </div>
            </div>
          </div>
        </section>
        {neighbourhood && <>
          <section className={styles['home_highlighted-section']}>
            <div className={styles['home_highlighted']}>
              <p className='title-top'>{t('Highlighted')}</p>
              <div className="title">
                <h2 className="title--left">{t('In the ')} <span>{t('neighbourhood')}</span> </h2>
                <Link href={`/property/${neighbourhood?.propertyId}`}>
                  <a className="title--right">Visit <ArrowRight className="title--right-arrow" size={22} /></a>
                </Link>
              </div>
            </div>
          </section>
          <section className={styles['home_highlighted-content-section']}>
            <div className={styles['home_highlighted-content']}>
              <div className={styles['home_highlighted-content--left']}>
                {neighbourhood?.PropertyFiles?.[0] ? <Image src={`/assets/uploads/${neighbourhood?.PropertyFiles?.[0]?.fileName}`} blurDataURL={`/assets/uploads/${neighbourhood?.PropertyFiles?.[0]?.fileName}`} alt="home-preview" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' /> : ''}
              </div>
              <div className={styles['home_highlighted-content--right']}>
                <h3>{neighbourhood?.type === 'new' ? 'New project' : `House for ${neighbourhood?.type}`} in {neighbourhood?.city}</h3>
                <div className={styles['home_highlighted-content--right-images']}>
                  {neighbourhood?.PropertyFiles?.filter((file: any, i: number) => i !== 0).map((file: any, i: number) => {
                    return <div key={i}>
                      <Image src={`/assets/uploads/${file.fileName}`} blurDataURL={`/assets/uploads/${file.fileName}`} alt="home-preview" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                    </div>;
                  })}
                </div>
                <div className={styles['home_highlighted-content--right-info']}>
                  <div className={styles['home_highlighted-content--right-info__icons']}>
                    <div>
                      <FontAwesomeIcon icon={faBed} />
                      <p>{neighbourhood?.rooms} bedrooms</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faBathtub} />
                      <p>{neighbourhood?.bathrooms} bathrooms</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faSquare} />
                      <p>{neighbourhood?.totalSurface} m2</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faHouse} />
                      <p>{neighbourhood?.type === 'new' ? 'New project' : `For ${neighbourhood?.type}`}</p>
                    </div>
                  </div>
                  <div className={styles['home_highlighted-content--right-info__text']}>
                    <p>{neighbourhood?.extras}</p>
                    <span>${neighbourhood?.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>}
      </main>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/home`, {
    city: 'Quito'
  }).then(found => {
    return found.data
  }).catch(err => {
    console.log(err);
  });

  return {
    props: {
      properties: p?.properties || null,
      neighbourhood: p?.neighbourhood || null,
    }
  }
}


export default Home
