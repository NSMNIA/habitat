import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type Props = {
  properties: any
}

const Home = (props: Props) => {
  const { properties } = props;
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Habitat - Home</title>
      </Head>
      <Navbar />
      <main className={styles['home']}>
        <div className={styles['home_teaser']}>
          <div className={styles['home_teaser-content']}>
            <h1 className={styles['home_teaser-content--title']}>Take a <span>look</span> inside</h1>
            <ArrowRight className={styles['home_teaser-content--arrow']} size={48} />
          </div>
          <Image src='/assets/images/home-teaser.png' alt="home-teaser" layout='fill' placeholder='blur' blurDataURL='/assets/images/home-teaser.png' />
        </div>
        <div className={styles['home_search']}>
          <h2 className={styles['home_search--title']}>Find a property</h2>
          <div className={styles['home_search--inputs']}>
            <input className={styles['search-field'] + ' input-text input-type--search'} type="text" placeholder='Place, neighborhood, address, etc.' />
            <button className="cta-button--alt">
              {t('Search')}
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
