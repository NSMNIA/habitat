import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import "@fontsource/inter";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBathtub, faSquare, faHouse } from '@fortawesome/free-solid-svg-icons'

type Props = {
  properties: any
}

const Home = (props: Props) => {
  const { t } = useTranslation();
  const { properties } = props

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
              <div className={styles['home_tours-content--top-row']}>
                <PropertyCard properties={properties} />
              </div>
              <div className={styles['home_tours-content--bottom-row']}>
                <PropertyCard properties={properties} />
              </div>
            </div>
          </div>
        </section>
        <section className={styles['home_highlighted-section']}>
          <div className={styles['home_highlighted']}>
            <p className='title-top'>Highlighted</p>
            <div className="title">
              <h2 className="title--left">{t('In the ')} <span>{t('neighbourhood')}</span> </h2>
              <Link href={'/properties'}>
                <a className="title--right">Visit <ArrowRight className="title--right-arrow" size={22} /></a>
              </Link>
            </div>
          </div>
        </section>
        <section className={styles['home_highlighted-content-section']}>
          <div className={styles['home_highlighted-content']}>
            <div className={styles['home_highlighted-content--left']}>
              <Image src='/assets/images/house-6.jpg' blurDataURL='/assets/images/house-6.jpg' alt="home-preview" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
            </div>
            <div className={styles['home_highlighted-content--right']}>
              <h3>House For Sale in Imbabura</h3>
              <div className={styles['home_highlighted-content--right-images']}>
                <div>
                  <Image src='/assets/images/house-6_1.jpg' blurDataURL='/assets/images/house-6_2.jpg' alt="home-preview" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                </div>
                <div>
                  <Image src='/assets/images/house-6_2.jpg' blurDataURL='/assets/images/house-6_2.jpg' alt="home-preview" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                </div>
                <div>
                  <Image src='/assets/images/house-6_3.jpg' blurDataURL='/assets/images/house-6_3.jpg' alt="home-preview" layout="fill" objectPosition="center center" objectFit="cover" placeholder='blur' />
                </div>
              </div>
              <div className={styles['home_highlighted-content--right-info']}>
                <div className={styles['home_highlighted-content--right-info__icons']}>
                  <div>
                    <FontAwesomeIcon icon={faBed} />
                    <p>4 bedrooms</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faBathtub} />
                    <p>3 bathrooms</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faSquare} />
                    <p>1500 m2</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faHouse} />
                    <p>For sale</p>
                  </div>
                </div>
                <div className={styles['home_highlighted-content--right-info__text']}>
                  <p>This home is a must see. Beatiful craftsmanship troughout. The wooden floored entrance leads to the large prisitine formal living room. Kitchen constructed of Amish cabinets. With a beautiful mountain view. A big garden with stone walls.</p>
                  <span>$250,000</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      properties: [{
        propertyId: '40f03a1b69274029b09a8e859d16b93f',
        addressTitle: 'Ayacucho 1921 y Los Ríos',
        city: 'Guayas',
        type: 'For Sale',
        price: '250,000'
      },
      {
        propertyId: '478538039412404490578be7e10838d4',
        addressTitle: 'Omni Hospital Ciudad del Sol',
        city: 'Guayaquil',
        type: 'For Sale',
        price: '220,000'
      },
      {
        propertyId: '4d66c6d2374c47f5ad1818d83ca07d6f',
        addressTitle: 'Av.10 De Agosto N13-38 Y Ante',
        city: 'Esq.',
        type: 'For Sale',
        price: '270,000'
      },
      {
        propertyId: '92bccb1f7d3a4a63b49e4a0ae375637b',
        addressTitle: "O'Connor N 1009",
        city: 'Guayas',
        type: 'For Sale',
        price: '133,000'
      }]
    }
  }
}


export default Home
